-- Restadigi Restabooking (stay / lodging) widget config (safe to run multiple times)
CREATE TABLE IF NOT EXISTS stay_booking_widget_config (
  id TEXT PRIMARY KEY DEFAULT 'default',
  config_json TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
