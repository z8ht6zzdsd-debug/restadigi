import { randomBytes } from "node:crypto";

import { and, count, desc, eq, sql } from "drizzle-orm";
import nodemailer from "nodemailer";

import { getDb, schema } from "@/db";
import {
  CONTACT_ADDRESS,
  CONTACT_COMPANY,
  CONTACT_EMAIL,
  CONTACT_PERSON,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_TEL,
} from "@/lib/company-contact";
import {
  applyMailPlaceholders,
  DEFAULT_MAIL_BODY_FI,
  DEFAULT_MAIL_SUBJECT,
  isMailTemplateId,
  MAIL_TEMPLATE_DEFAULTS,
  MAIL_TEMPLATE_IDS,
  physicalSlotForLogical,
  physicalSlotsForTemplate,
  type MailTemplateId,
} from "@/lib/mail-template";

export {
  applyMailPlaceholders,
  DEFAULT_MAIL_BODY_FI,
  DEFAULT_MAIL_SUBJECT,
  isMailTemplateId,
  MAIL_TEMPLATE_DEFAULTS,
  MAIL_TEMPLATE_IDS,
  physicalSlotForLogical,
  physicalSlotsForTemplate,
  type MailTemplateId,
};

/** Legacy logical slots used by the UI. */
export const MAIL_SLOTS = ["pdf1", "pdf2"] as const;
export type MailSlot = (typeof MAIL_SLOTS)[number];

/** Bundled A4 package PDFs served from /mail/* (public/mail). */
export const DEFAULT_MAIL_PDFS: Record<MailSlot, { filename: string; publicPath: string }> = {
  pdf1: {
    filename: "Restadigi-digipalvelut-A4.pdf",
    publicPath: "/mail/Restadigi-digipalvelut-A4.pdf",
  },
  pdf2: {
    filename: "Restadigi-verkkosivupaketit-A4.pdf",
    publicPath: "/mail/Restadigi-verkkosivupaketit-A4.pdf",
  },
};

const PIXEL_GIF = Buffer.from("R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", "base64");

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function resolveTemplateId(raw?: string | null): MailTemplateId {
  return isMailTemplateId(raw) ? raw : "default";
}

/** Creates Neon tables if missing (safe to call on every request). */
export async function ensureMailTables() {
  const db = getDb();
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS mail_attachments (
      slot TEXT PRIMARY KEY,
      filename TEXT NOT NULL,
      mime_type TEXT NOT NULL DEFAULT 'application/pdf',
      content_base64 TEXT NOT NULL,
      size_bytes INTEGER NOT NULL DEFAULT 0,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS outbound_emails (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      to_email TEXT NOT NULL,
      to_name TEXT,
      subject TEXT NOT NULL,
      tracking_token TEXT NOT NULL UNIQUE,
      status TEXT NOT NULL DEFAULT 'sent',
      error_message TEXT,
      attachment_slots TEXT NOT NULL DEFAULT 'pdf1,pdf2',
      open_count INTEGER NOT NULL DEFAULT 0,
      opened_at TIMESTAMPTZ,
      last_opened_at TIMESTAMPTZ,
      sent_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS mail_templates (
      id TEXT PRIMARY KEY DEFAULT 'default',
      subject TEXT NOT NULL,
      body_text TEXT NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await db.execute(
    sql`CREATE INDEX IF NOT EXISTS idx_outbound_emails_sent_at ON outbound_emails(sent_at DESC)`,
  );
  await db.execute(sql`
    ALTER TABLE outbound_emails
    ADD COLUMN IF NOT EXISTS template_id TEXT NOT NULL DEFAULT 'default'
  `);
  await db.execute(
    sql`CREATE INDEX IF NOT EXISTS idx_outbound_emails_template_id ON outbound_emails(template_id)`,
  );
}

export async function getMailTemplate(templateIdRaw?: string | null) {
  await ensureMailTables();
  const templateId = resolveTemplateId(templateIdRaw);
  const defaults = MAIL_TEMPLATE_DEFAULTS[templateId];
  const db = getDb();
  const row = await db.query.mailTemplates.findFirst({
    where: eq(schema.mailTemplates.id, templateId),
  });
  if (!row) {
    return {
      id: templateId,
      subject: defaults.subject,
      body: defaults.body,
      updatedAt: null as string | null,
      requireAttachments: defaults.requireAttachments,
    };
  }
  return {
    id: templateId,
    subject: row.subject,
    body: row.bodyText,
    updatedAt: row.updatedAt?.toISOString?.() ?? String(row.updatedAt),
    requireAttachments: defaults.requireAttachments,
  };
}

export async function saveMailTemplate(input: {
  id?: string | null;
  subject: string;
  body: string;
}) {
  await ensureMailTables();
  const templateId = resolveTemplateId(input.id);
  const db = getDb();
  const subject = input.subject.trim();
  const bodyText = input.body.trim();
  if (!subject || !bodyText) {
    throw new Error("Aihe ja viesti ovat pakollisia");
  }

  await db
    .insert(schema.mailTemplates)
    .values({
      id: templateId,
      subject,
      bodyText,
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: schema.mailTemplates.id,
      set: {
        subject,
        bodyText,
        updatedAt: new Date(),
      },
    });

  return getMailTemplate(templateId);
}

/** PDFs are uploaded manually from the dashboard — never auto-seeded from disk. */
export async function listMailAttachments(templateIdRaw?: string | null) {
  await ensureMailTables();
  const templateId = resolveTemplateId(templateIdRaw);
  const [slot1, slot2] = physicalSlotsForTemplate(templateId);
  const db = getDb();
  const rows = await db.query.mailAttachments.findMany();

  return (["pdf1", "pdf2"] as const).map((logical, index) => {
    const physical = index === 0 ? slot1 : slot2;
    const row = rows.find((r) => r.slot === physical);
    if (!row) {
      return {
        slot: logical,
        physicalSlot: physical,
        filename: null,
        sizeBytes: 0,
        updatedAt: null,
        hasFile: false,
      };
    }
    return {
      slot: logical,
      physicalSlot: physical,
      filename: row.filename,
      sizeBytes: row.sizeBytes,
      updatedAt: row.updatedAt,
      hasFile: true,
    };
  });
}

/** Fetches bundled /mail/*.pdf from this origin and upserts both Neon slots for a template. */
export async function seedDefaultMailAttachments(origin: string, templateIdRaw?: string | null) {
  const templateId = resolveTemplateId(templateIdRaw);
  const results: Awaited<ReturnType<typeof upsertMailAttachment>>[] = [];
  for (const logical of MAIL_SLOTS) {
    const meta = DEFAULT_MAIL_PDFS[logical];
    const physical = physicalSlotForLogical(templateId, logical);
    const url = new URL(meta.publicPath, origin).toString();
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Oletus-PDF:n lataus epäonnistui (${meta.filename}): ${res.status}`);
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    results.push(
      await upsertMailAttachment(
        physical,
        meta.filename,
        buffer.toString("base64"),
        "application/pdf",
      ),
    );
  }
  return results;
}

export async function upsertMailAttachment(
  slot: string,
  filename: string,
  contentBase64: string,
  mimeType = "application/pdf",
) {
  await ensureMailTables();
  const db = getDb();
  const sizeBytes = Buffer.from(contentBase64, "base64").length;
  if (sizeBytes > 8 * 1024 * 1024) {
    throw new Error("PDF on liian suuri (max 8 Mt)");
  }

  await db
    .insert(schema.mailAttachments)
    .values({
      slot,
      filename,
      mimeType,
      contentBase64,
      sizeBytes,
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: schema.mailAttachments.slot,
      set: {
        filename,
        mimeType,
        contentBase64,
        sizeBytes,
        updatedAt: new Date(),
      },
    });

  return { slot, filename, sizeBytes, hasFile: true };
}

export async function deleteMailAttachment(slot: string) {
  await ensureMailTables();
  const db = getDb();
  await db.delete(schema.mailAttachments).where(eq(schema.mailAttachments.slot, slot));
}

export function resolveAttachmentSlot(
  templateIdRaw: string | null | undefined,
  logicalOrPhysical: string,
): string | null {
  const templateId = resolveTemplateId(templateIdRaw);
  if (logicalOrPhysical === "pdf1" || logicalOrPhysical === "pdf2") {
    return physicalSlotForLogical(templateId, logicalOrPhysical);
  }
  const allowed = physicalSlotsForTemplate(templateId);
  if (allowed.includes(logicalOrPhysical as (typeof allowed)[number])) {
    return logicalOrPhysical;
  }
  // Legacy: allow pdf1/pdf2 only for default when template omitted
  if (templateId === "default" && (logicalOrPhysical === "pdf1" || logicalOrPhysical === "pdf2")) {
    return logicalOrPhysical;
  }
  return null;
}

function getSmtpConfig(templateId: MailTemplateId) {
  const host = process.env.SMTP_HOST ?? "smtp.zoho.eu";
  const port = Number(process.env.SMTP_PORT ?? "465");
  const user = process.env.SMTP_USER ?? process.env.SMTP_EMAIL;
  const pass = process.env.SMTP_PASS ?? process.env.SMTP_PASSWORD;

  const fromByType: Partial<Record<MailTemplateId, string | undefined>> = {
    default: process.env.SMTP_FROM,
    cold: process.env.SMTP_FROM_COLD || process.env.SMTP_FROM,
    order: process.env.SMTP_FROM_ORDER || process.env.SMTP_FROM,
    free: process.env.SMTP_FROM_FREE || process.env.SMTP_FROM,
  };

  const from = fromByType[templateId] ?? `Restadigi <${user ?? CONTACT_EMAIL}>`;

  if (!user || !pass) {
    throw new Error("SMTP_USER and SMTP_PASS must be configured (Zoho)");
  }

  return { host, port, user, pass, from, secure: port === 465 };
}

function logoUrl(origin: string) {
  return `${origin.replace(/\/$/, "")}/restadigi-logo.png`;
}

function buildHtmlBody(textBody: string, trackingUrl: string, origin: string) {
  const paragraphs = textBody
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      const isTagline = block.startsWith("Restadigi.fi —");
      const isSite = block.startsWith("Tutustu palveluumme");
      // Preserve full block text (old site-only rewrite dropped the closing tagline).
      const linked = escapeHtml(block).replace(
        /(https?:\/\/[^\s<]+)/g,
        '<a href="$1" style="color:#432f24;">$1</a>',
      );
      if (isTagline) {
        return `<p style="margin:1.4em 0 1em;font-size:17px;line-height:1.55;font-family:Georgia,'Times New Roman',serif;color:#432f24;font-style:italic;">${linked}</p>`;
      }
      if (isSite) {
        return `<p style="margin:0 0 1.6em;font-size:17px;line-height:1.55;font-family:Georgia,'Times New Roman',serif;color:#1a1512;">${linked}</p>`;
      }
      return `<p style="margin:0 0 1em;font-size:17px;line-height:1.55;font-family:Georgia,'Times New Roman',serif;color:#1a1512;">${linked}</p>`;
    })
    .join("");

  const logo = escapeHtml(logoUrl(origin));

  // Structure & styles mirror Restadigi-sahkopostipohjat/esikatselu.html
  return `<!DOCTYPE html>
<html lang="fi">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
<body style="margin:0;padding:0;background:#f7f3ee;color:#1a1512;font-family:Georgia,'Times New Roman',serif;line-height:1.55;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f7f3ee;padding:24px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:720px;background:#ffffff;border:1px solid #e6dfd7;border-radius:12px;box-shadow:0 8px 28px rgba(67,47,36,0.06);">
          <tr>
            <td style="padding:36px 40px 40px;">
              ${paragraphs}
              <div style="margin-top:2rem;padding-top:1.4rem;border-top:1px solid #e6dfd7;font-family:system-ui,-apple-system,Segoe UI,sans-serif;">
                <p style="margin:0.2em 0;font-size:15px;color:#1a1512;">Parhain terveisin,</p>
                <p style="margin:0.35em 0 1em;font-size:16px;font-weight:600;color:#1a1512;">${escapeHtml(CONTACT_PERSON)}</p>
                <img src="${logo}" alt="Restadigi" width="180" height="72" style="display:block;height:72px;width:auto;margin:0 0 0.85em -2mm;padding:0;border:0;object-fit:contain;object-position:left center;" />
                <div style="color:#5c534c;font-size:14px;line-height:1.45;">
                  <p style="margin:0 0 0.35em;font-size:14px;color:#5c534c;">${escapeHtml(CONTACT_COMPANY)}</p>
                  <a href="mailto:${CONTACT_EMAIL}" style="color:#432f24;text-decoration:none;">${CONTACT_EMAIL}</a><br />
                  <a href="tel:${CONTACT_PHONE_TEL}" style="color:#432f24;text-decoration:none;">${CONTACT_PHONE_DISPLAY}</a><br />
                  <a href="https://restadigi.fi" style="color:#432f24;text-decoration:none;">https://restadigi.fi</a><br />
                  ${escapeHtml(CONTACT_ADDRESS)}
                </div>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
  <img src="${escapeHtml(trackingUrl)}" width="1" height="1" alt="" style="display:block;width:1px;height:1px;border:0;" />
</body>
</html>`;
}

function buildPlainText(body: string) {
  return `${body.trim()}

Parhain terveisin,
${CONTACT_PERSON}
${CONTACT_COMPANY}

${CONTACT_EMAIL}
${CONTACT_PHONE_DISPLAY}
https://restadigi.fi
${CONTACT_ADDRESS}`;
}

export async function sendClientMail(input: {
  toEmail: string;
  toName?: string;
  company?: string;
  subject?: string;
  body?: string;
  origin: string;
  templateId?: string | null;
  requireAttachments?: boolean;
  subjectPrefix?: string;
}) {
  await ensureMailTables();
  const templateId = resolveTemplateId(input.templateId);
  const defaults = MAIL_TEMPLATE_DEFAULTS[templateId];
  const db = getDb();
  const smtp = getSmtpConfig(templateId);
  const saved = await getMailTemplate(templateId);

  const [slot1, slot2] = physicalSlotsForTemplate(templateId);
  const attachments = await db.query.mailAttachments.findMany();
  const ready = [slot1, slot2]
    .map((slot) => attachments.find((a) => a.slot === slot))
    .filter(Boolean) as (typeof attachments)[number][];

  const requireAttachments =
    input.requireAttachments !== undefined ? input.requireAttachments : defaults.requireAttachments;

  if (requireAttachments && ready.length < 2) {
    throw new Error("Lataa molemmat PDF-tiedostot ennen lähetystä (PDF 1 ja PDF 2)");
  }

  const firstName = input.toName?.trim().split(/\s+/)[0] || undefined;
  const vars = {
    firstName: firstName || "Jani",
    company: input.company?.trim() || "Oluthuone Hannikainen",
  };

  const trackingToken = randomBytes(24).toString("base64url");
  const subject = `${input.subjectPrefix ?? ""}${applyMailPlaceholders(
    (input.subject ?? saved.subject).trim(),
    vars,
  )}`;
  const body = applyMailPlaceholders((input.body ?? saved.body).trim(), vars);
  const trackingUrl = `${input.origin.replace(/\/$/, "")}/api/mail/track/${trackingToken}`;

  const transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.secure,
    auth: { user: smtp.user, pass: smtp.pass },
  });

  try {
    await transporter.sendMail({
      from: smtp.from,
      to: input.toName ? `"${input.toName}" <${input.toEmail}>` : input.toEmail,
      subject,
      text: buildPlainText(body),
      html: buildHtmlBody(body, trackingUrl, input.origin),
      attachments: ready.map((file) => ({
        filename: file.filename,
        content: Buffer.from(file.contentBase64, "base64"),
        contentType: file.mimeType || "application/pdf",
      })),
    });

    const [row] = await db
      .insert(schema.outboundEmails)
      .values({
        toEmail: input.toEmail,
        toName: input.toName?.trim() || null,
        subject,
        trackingToken,
        status: "sent",
        attachmentSlots: ready.map((f) => f.slot).join(",") || "none",
        templateId,
      })
      .returning();

    return row;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Lähetys epäonnistui";
    await db.insert(schema.outboundEmails).values({
      toEmail: input.toEmail,
      toName: input.toName?.trim() || null,
      subject,
      trackingToken,
      status: "failed",
      errorMessage: message,
      attachmentSlots: ready.map((f) => f.slot).join(",") || "none",
      templateId,
    });
    throw new Error(message);
  }
}

export async function listOutboundEmails(limit = 50, templateIdRaw?: string | null) {
  await ensureMailTables();
  const db = getDb();
  if (templateIdRaw && isMailTemplateId(templateIdRaw)) {
    return db.query.outboundEmails.findMany({
      where: eq(schema.outboundEmails.templateId, templateIdRaw),
      orderBy: [desc(schema.outboundEmails.sentAt)],
      limit,
    });
  }
  return db.query.outboundEmails.findMany({
    orderBy: [desc(schema.outboundEmails.sentAt)],
    limit,
  });
}

export async function getMailStats(templateIdRaw?: string | null) {
  await ensureMailTables();
  const db = getDb();
  const templateId = templateIdRaw && isMailTemplateId(templateIdRaw) ? templateIdRaw : null;

  const baseWhere = templateId ? eq(schema.outboundEmails.templateId, templateId) : undefined;

  const [total] = await db.select({ count: count() }).from(schema.outboundEmails).where(baseWhere);
  const [sent] = await db
    .select({ count: count() })
    .from(schema.outboundEmails)
    .where(
      templateId
        ? and(
            eq(schema.outboundEmails.status, "sent"),
            eq(schema.outboundEmails.templateId, templateId),
          )
        : eq(schema.outboundEmails.status, "sent"),
    );
  const [failed] = await db
    .select({ count: count() })
    .from(schema.outboundEmails)
    .where(
      templateId
        ? and(
            eq(schema.outboundEmails.status, "failed"),
            eq(schema.outboundEmails.templateId, templateId),
          )
        : eq(schema.outboundEmails.status, "failed"),
    );

  const openedResult = templateId
    ? await db.execute<{ count: number }>(
        sql`SELECT COUNT(*)::int AS count FROM outbound_emails WHERE open_count > 0 AND template_id = ${templateId}`,
      )
    : await db.execute<{ count: number }>(
        sql`SELECT COUNT(*)::int AS count FROM outbound_emails WHERE open_count > 0`,
      );

  return {
    total: total?.count ?? 0,
    sent: sent?.count ?? 0,
    failed: failed?.count ?? 0,
    opened: openedResult.rows[0]?.count ?? 0,
  };
}

export async function recordMailOpen(trackingToken: string) {
  await ensureMailTables();
  const db = getDb();
  const row = await db.query.outboundEmails.findFirst({
    where: eq(schema.outboundEmails.trackingToken, trackingToken),
  });
  if (!row) return false;

  const now = new Date();
  await db
    .update(schema.outboundEmails)
    .set({
      openCount: sql`${schema.outboundEmails.openCount} + 1`,
      openedAt: row.openedAt ?? now,
      lastOpenedAt: now,
    })
    .where(eq(schema.outboundEmails.id, row.id));

  return true;
}

export function trackingPixelResponse() {
  return new Response(PIXEL_GIF, {
    status: 200,
    headers: {
      "Content-Type": "image/gif",
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
}
