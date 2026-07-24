import { eq, sql } from "drizzle-orm";

import { getDb, schema } from "@/db";
import {
  DEFAULT_BOOKING_WIDGET_CONFIG,
  parseBookingWidgetConfig,
  type BookingWidgetConfig,
} from "@/lib/booking-widget-config";

export async function ensureBookingWidgetTable() {
  const db = getDb();
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS booking_widget_config (
      id TEXT PRIMARY KEY DEFAULT 'default',
      config_json TEXT NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
}

export async function getBookingWidgetConfig(): Promise<{
  config: BookingWidgetConfig;
  updatedAt: string | null;
}> {
  await ensureBookingWidgetTable();
  const db = getDb();
  const row = await db.query.bookingWidgetConfig.findFirst({
    where: eq(schema.bookingWidgetConfig.id, "default"),
  });
  if (!row) {
    return { config: { ...DEFAULT_BOOKING_WIDGET_CONFIG }, updatedAt: null };
  }
  let parsed: unknown = {};
  try {
    parsed = JSON.parse(row.configJson);
  } catch {
    parsed = {};
  }
  return {
    config: parseBookingWidgetConfig(parsed),
    updatedAt: row.updatedAt?.toISOString?.() ?? String(row.updatedAt),
  };
}

export async function saveBookingWidgetConfig(input: unknown) {
  await ensureBookingWidgetTable();
  const config = parseBookingWidgetConfig(input);
  const db = getDb();
  const json = JSON.stringify(config);
  await db
    .insert(schema.bookingWidgetConfig)
    .values({
      id: "default",
      configJson: json,
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: schema.bookingWidgetConfig.id,
      set: {
        configJson: json,
        updatedAt: new Date(),
      },
    });
  return getBookingWidgetConfig();
}
