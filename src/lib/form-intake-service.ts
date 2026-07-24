import nodemailer from "nodemailer";
import { z } from "zod";

import { getDb, schema } from "@/db";
import { ensureSalesLeadsTable } from "@/lib/chat-service";
import { CONTACT_EMAIL, CONTACT_PERSON } from "@/lib/company-contact";
import { getDatabaseUrl } from "@/lib/database-url";
import { FORM_SERVICE_OPTIONS } from "@/lib/form-services";

export const formIntakeSchema = z.object({
  contactName: z.string().trim().min(2).max(120),
  company: z.string().trim().min(1).max(160),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().min(5).max(40),
  industry: z.string().trim().min(1).max(80),
  city: z.string().trim().max(100).optional().default(""),
  websiteUrl: z.string().trim().max(200).optional().default(""),
  socialLinks: z.string().trim().max(400).optional().default(""),
  languages: z.string().trim().max(120).optional().default(""),
  serviceIds: z.array(z.string()).min(1).max(20),
  businessDescription: z.string().trim().min(20).max(4000),
  targetCustomers: z.string().trim().max(1000).optional().default(""),
  desiredPages: z.string().trim().max(1500).optional().default(""),
  brandNotes: z.string().trim().max(1000).optional().default(""),
  hasLogo: z.enum(["yes", "no", "need"]),
  openingHours: z.string().trim().max(800).optional().default(""),
  menuOrServices: z.string().trim().max(2000).optional().default(""),
  domainStatus: z.enum(["have", "need", "unsure"]),
  timeline: z.string().trim().min(1).max(80),
  budget: z.string().trim().min(1).max(80),
  extraNotes: z.string().trim().max(3000).optional().default(""),
  preferredContact: z.enum(["phone", "email", "whatsapp", "any"]).default("any"),
});

export type FormIntakeInput = z.infer<typeof formIntakeSchema>;

function serviceLabels(ids: string[]) {
  const map = new Map(FORM_SERVICE_OPTIONS.map((s) => [s.id, s]));
  return ids.map((id) => {
    const s = map.get(id);
    return s ? `${s.name} (${s.price})` : id;
  });
}

function buildNotes(input: FormIntakeInput) {
  const lines = [
    "=== RESTADIGI PALVELUPYYNTÖ ===",
    `Yhteyshenkilö: ${input.contactName}`,
    `Yritys: ${input.company}`,
    `Sähköposti: ${input.email}`,
    `Puhelin: ${input.phone}`,
    `Toimiala: ${input.industry}`,
    `Paikkakunta: ${input.city || "—"}`,
    `Nykyinen sivusto: ${input.websiteUrl || "—"}`,
    `Some: ${input.socialLinks || "—"}`,
    `Kielet: ${input.languages || "—"}`,
    `Yhteydenotto: ${input.preferredContact}`,
    "",
    "— Valitut palvelut —",
    ...serviceLabels(input.serviceIds).map((l) => `• ${l}`),
    "",
    "— Yrityksen kuvaus —",
    input.businessDescription,
    "",
    `Kohderyhmä: ${input.targetCustomers || "—"}`,
    `Toivotut sivut/sisällöt: ${input.desiredPages || "—"}`,
    `Brändi / värit: ${input.brandNotes || "—"}`,
    `Logo: ${input.hasLogo}`,
    `Aukioloajat: ${input.openingHours || "—"}`,
    `Palvelut/menu: ${input.menuOrServices || "—"}`,
    `Domain: ${input.domainStatus}`,
    `Aikataulu: ${input.timeline}`,
    `Budjetti: ${input.budget}`,
    "",
    "— Lisätiedot —",
    input.extraNotes || "—",
  ];
  return lines.join("\n");
}

async function notifyByEmail(input: FormIntakeInput, notes: string) {
  const host = process.env.SMTP_HOST ?? "smtp.zoho.eu";
  const port = Number(process.env.SMTP_PORT ?? "465");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM ?? `Restadigi <${CONTACT_EMAIL}>`;
  if (!user || !pass) return;

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  const services = serviceLabels(input.serviceIds).join(", ");
  await transporter.sendMail({
    from,
    to: CONTACT_EMAIL,
    replyTo: input.email,
    subject: `Uusi palvelupyyntö: ${input.company}`,
    text: `${notes}\n\n—\nLähetetty form.restadigi.fi\nVastaanottaja: ${CONTACT_PERSON}`,
    html: `<pre style="font-family:system-ui,sans-serif;white-space:pre-wrap;line-height:1.45">${notes
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")}</pre>
      <p style="color:#5c534c;font-size:13px">Palvelut: ${services.replaceAll("&", "&amp;")}</p>`,
  });
}

export async function submitFormIntake(input: FormIntakeInput) {
  const notes = buildNotes(input);
  const interest = serviceLabels(input.serviceIds).join(" · ");

  if (!getDatabaseUrl()) {
    await notifyByEmail(input, notes).catch(() => undefined);
    return { id: null as string | null, emailed: true };
  }

  await ensureSalesLeadsTable();
  const db = getDb();
  const [row] = await db
    .insert(schema.salesLeads)
    .values({
      name: input.contactName,
      company: input.company,
      phone: input.phone,
      email: input.email.toLowerCase(),
      interest,
      notes,
      status: "new",
      source: "service_form",
      updatedAt: new Date(),
    })
    .returning({ id: schema.salesLeads.id });

  try {
    await notifyByEmail(input, notes);
  } catch (error) {
    console.error("Form intake email notify failed:", error);
  }

  return { id: row?.id ?? null, emailed: true };
}
