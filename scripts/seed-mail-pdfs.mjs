/**
 * Upserts the two package PDFs into Neon mail_attachments (pdf1 / pdf2).
 *
 * Requires DATABASE_URL in the environment.
 *
 *   node scripts/build-package-pdfs.mjs --pdf
 *   node scripts/seed-mail-pdfs.mjs
 */
import { neon } from "@neondatabase/serverless";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error("DATABASE_URL is required");
  process.exit(1);
}

const sql = neon(databaseUrl);

const files = [
  {
    slot: "pdf1",
    filename: "Restadigi-digipalvelut-A4.pdf",
    path: path.join(root, "docs/Restadigi-digipalvelut-A4.pdf"),
  },
  {
    slot: "pdf2",
    filename: "Restadigi-verkkosivupaketit-A4.pdf",
    path: path.join(root, "docs/Restadigi-verkkosivupaketit-A4.pdf"),
  },
];

await sql`
  CREATE TABLE IF NOT EXISTS mail_attachments (
    slot TEXT PRIMARY KEY,
    filename TEXT NOT NULL,
    mime_type TEXT NOT NULL DEFAULT 'application/pdf',
    content_base64 TEXT NOT NULL,
    size_bytes INTEGER NOT NULL DEFAULT 0,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )
`;

for (const file of files) {
  if (!fs.existsSync(file.path)) {
    console.error("Missing PDF:", file.path);
    console.error("Run first: node scripts/build-package-pdfs.mjs --pdf");
    process.exit(1);
  }
  const buffer = fs.readFileSync(file.path);
  if (buffer.length > 8 * 1024 * 1024) {
    console.error("PDF too large:", file.filename);
    process.exit(1);
  }
  const contentBase64 = buffer.toString("base64");
  const sizeBytes = buffer.length;

  await sql`
    INSERT INTO mail_attachments (slot, filename, mime_type, content_base64, size_bytes, updated_at)
    VALUES (${file.slot}, ${file.filename}, ${"application/pdf"}, ${contentBase64}, ${sizeBytes}, NOW())
    ON CONFLICT (slot) DO UPDATE SET
      filename = EXCLUDED.filename,
      mime_type = EXCLUDED.mime_type,
      content_base64 = EXCLUDED.content_base64,
      size_bytes = EXCLUDED.size_bytes,
      updated_at = NOW()
  `;

  console.log(`OK ${file.slot}: ${file.filename} (${Math.round(sizeBytes / 1024)} kt)`);
}

console.log("Mail attachments updated.");
