-- =============================================================================
-- Restadigi · Neon SQL Editor
-- Client mailouts: persistent PDF slots (manual upload) + sent-mail tracking
-- Safe to run multiple times (IF NOT EXISTS).
-- =============================================================================

CREATE TABLE IF NOT EXISTS mail_attachments (
  slot TEXT PRIMARY KEY,
  filename TEXT NOT NULL,
  mime_type TEXT NOT NULL DEFAULT 'application/pdf',
  content_base64 TEXT NOT NULL,
  size_bytes INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE mail_attachments IS
  'Two PDF slots (pdf1, pdf2). Uploaded manually from /dashboard/mail. Stored in Neon as base64.';

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
);

COMMENT ON TABLE outbound_emails IS
  'Outbound client emails with open tracking (pixel).';

CREATE INDEX IF NOT EXISTS idx_outbound_emails_sent_at
  ON outbound_emails (sent_at DESC);

CREATE INDEX IF NOT EXISTS idx_outbound_emails_tracking_token
  ON outbound_emails (tracking_token);
