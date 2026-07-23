import { randomBytes } from "node:crypto";

import { count, desc, eq, sql } from "drizzle-orm";
import nodemailer from "nodemailer";

import { getDb, schema } from "@/db";
import { CONTACT_EMAIL, CONTACT_PERSON, CONTACT_PHONE_DISPLAY } from "@/lib/company-contact";

export const MAIL_SLOTS = ["pdf1", "pdf2"] as const;
export type MailSlot = (typeof MAIL_SLOTS)[number];

export const DEFAULT_MAIL_SUBJECT = "Restadigi – digipalvelut ja verkkosivupaketit";

export const DEFAULT_MAIL_BODY_FI = `Hei!

Kiitos mielenkiinnostanne Restadigiä kohtaan.

Liitteenä lähetämme teille kaksi PDF-dokumenttia:
• Digipalvelut
• Verkkosivupaketit

Niistä näette palvelumme, hinnoittelun ja miten voimme auttaa ravintolaanne digitaalisesti.

Jos teillä on kysyttävää tai haluatte keskustella tarkemmin, vastaamme mielellämme tähän viestiin.

Ystävällisin terveisin,
${CONTACT_PERSON}
Restadigi Finland
${CONTACT_EMAIL}
${CONTACT_PHONE_DISPLAY}`;

const PIXEL_GIF = Buffer.from("R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", "base64");

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
  await db.execute(
    sql`CREATE INDEX IF NOT EXISTS idx_outbound_emails_sent_at ON outbound_emails(sent_at DESC)`,
  );
}

/** PDFs are uploaded manually from the dashboard — never auto-seeded from disk. */
export async function listMailAttachments() {
  await ensureMailTables();
  const db = getDb();
  const rows = await db.query.mailAttachments.findMany();
  return MAIL_SLOTS.map((slot) => {
    const row = rows.find((r) => r.slot === slot);
    if (!row) {
      return { slot, filename: null, sizeBytes: 0, updatedAt: null, hasFile: false };
    }
    return {
      slot,
      filename: row.filename,
      sizeBytes: row.sizeBytes,
      updatedAt: row.updatedAt,
      hasFile: true,
    };
  });
}

export async function upsertMailAttachment(
  slot: MailSlot,
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

export async function deleteMailAttachment(slot: MailSlot) {
  await ensureMailTables();
  const db = getDb();
  await db.delete(schema.mailAttachments).where(eq(schema.mailAttachments.slot, slot));
}

function getSmtpConfig() {
  const host = process.env.SMTP_HOST ?? "smtp.zoho.eu";
  const port = Number(process.env.SMTP_PORT ?? "465");
  const user = process.env.SMTP_USER ?? process.env.SMTP_EMAIL;
  const pass = process.env.SMTP_PASS ?? process.env.SMTP_PASSWORD;
  const from = process.env.SMTP_FROM ?? `Restadigi <${user ?? CONTACT_EMAIL}>`;

  if (!user || !pass) {
    throw new Error("SMTP_USER and SMTP_PASS must be configured (Zoho)");
  }

  return { host, port, user, pass, from, secure: port === 465 };
}

function buildHtmlBody(textBody: string, trackingUrl: string) {
  const paragraphs = textBody
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      const html = block.replaceAll("\n", "<br />");
      return `<p style="margin:0 0 16px;line-height:1.55;color:#2a2018;font-size:15px;">${html}</p>`;
    })
    .join("");

  return `<!DOCTYPE html>
<html lang="fi">
<body style="margin:0;padding:0;background:#f4f1ec;font-family:Segoe UI,Arial,sans-serif;">
  <div style="max-width:560px;margin:24px auto;background:#ffffff;border:1px solid #e0d6cb;border-radius:8px;padding:28px 28px 20px;">
    ${paragraphs}
  </div>
  <img src="${trackingUrl}" width="1" height="1" alt="" style="display:block;width:1px;height:1px;border:0;" />
</body>
</html>`;
}

export async function sendClientMail(input: {
  toEmail: string;
  toName?: string;
  subject?: string;
  body?: string;
  origin: string;
}) {
  await ensureMailTables();
  const db = getDb();
  const smtp = getSmtpConfig();

  const attachments = await db.query.mailAttachments.findMany();
  const ready = MAIL_SLOTS.map((slot) => attachments.find((a) => a.slot === slot)).filter(
    Boolean,
  ) as (typeof attachments)[number][];

  if (ready.length < MAIL_SLOTS.length) {
    throw new Error("Lataa molemmat PDF-tiedostot ennen lähetystä (PDF 1 ja PDF 2)");
  }

  const trackingToken = randomBytes(24).toString("base64url");
  const subject = (input.subject ?? DEFAULT_MAIL_SUBJECT).trim();
  const body = (input.body ?? DEFAULT_MAIL_BODY_FI).trim();
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
      text: body,
      html: buildHtmlBody(body, trackingUrl),
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
        attachmentSlots: ready.map((f) => f.slot).join(","),
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
      attachmentSlots: ready.map((f) => f.slot).join(","),
    });
    throw new Error(message);
  }
}

export async function listOutboundEmails(limit = 50) {
  await ensureMailTables();
  const db = getDb();
  return db.query.outboundEmails.findMany({
    orderBy: [desc(schema.outboundEmails.sentAt)],
    limit,
  });
}

export async function getMailStats() {
  await ensureMailTables();
  const db = getDb();
  const [total] = await db.select({ count: count() }).from(schema.outboundEmails);
  const [sent] = await db
    .select({ count: count() })
    .from(schema.outboundEmails)
    .where(eq(schema.outboundEmails.status, "sent"));
  const [failed] = await db
    .select({ count: count() })
    .from(schema.outboundEmails)
    .where(eq(schema.outboundEmails.status, "failed"));
  const openedResult = await db.execute<{ count: number }>(
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
