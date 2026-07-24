-- Restadigi mail tables (safe to run multiple times)
-- Run this in Neon SQL Editor if columns are missing.

CREATE TABLE IF NOT EXISTS mail_attachments (
  slot TEXT PRIMARY KEY,
  filename TEXT NOT NULL,
  mime_type TEXT NOT NULL DEFAULT 'application/pdf',
  content_base64 TEXT NOT NULL,
  size_bytes INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS outbound_emails (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  to_email TEXT NOT NULL,
  to_name TEXT,
  subject TEXT NOT NULL,
  tracking_token TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'sent',
  error_message TEXT,
  attachment_slots TEXT NOT NULL DEFAULT 'pdf1,pdf2',
  template_id TEXT NOT NULL DEFAULT 'default',
  is_test BOOLEAN NOT NULL DEFAULT false,
  open_count INTEGER NOT NULL DEFAULT 0,
  opened_at TIMESTAMPTZ,
  last_opened_at TIMESTAMPTZ,
  sent_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Existing DBs: add columns if missing
ALTER TABLE outbound_emails
  ADD COLUMN IF NOT EXISTS template_id TEXT NOT NULL DEFAULT 'default';

ALTER TABLE outbound_emails
  ADD COLUMN IF NOT EXISTS is_test BOOLEAN NOT NULL DEFAULT false;

CREATE INDEX IF NOT EXISTS idx_outbound_emails_sent_at
  ON outbound_emails (sent_at DESC);

CREATE INDEX IF NOT EXISTS idx_outbound_emails_tracking_token
  ON outbound_emails (tracking_token);

CREATE INDEX IF NOT EXISTS idx_outbound_emails_template_id
  ON outbound_emails (template_id);

CREATE INDEX IF NOT EXISTS idx_outbound_emails_is_test
  ON outbound_emails (is_test);

CREATE TABLE IF NOT EXISTS mail_templates (
  id TEXT PRIMARY KEY DEFAULT 'default',
  subject TEXT NOT NULL,
  body_text TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Optional cleanup: hide old test sends from tracking lists
UPDATE outbound_emails
SET is_test = true
WHERE subject LIKE '[TESTI] %' AND is_test = false;
