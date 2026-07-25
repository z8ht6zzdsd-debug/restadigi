import { eq, sql } from "drizzle-orm";

import { getDb, schema } from "@/db";
import {
  DEFAULT_STAY_BOOKING_CONFIG,
  parseStayBookingConfig,
  type StayBookingConfig,
} from "@/lib/stay-booking-config";

export async function ensureStayBookingTable() {
  const db = getDb();
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS stay_booking_widget_config (
      id TEXT PRIMARY KEY DEFAULT 'default',
      config_json TEXT NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
}

export async function getStayBookingConfig(): Promise<{
  config: StayBookingConfig;
  updatedAt: string | null;
}> {
  await ensureStayBookingTable();
  const db = getDb();
  const row = await db.query.stayBookingWidgetConfig.findFirst({
    where: eq(schema.stayBookingWidgetConfig.id, "default"),
  });
  if (!row) {
    return { config: structuredClone(DEFAULT_STAY_BOOKING_CONFIG), updatedAt: null };
  }
  let parsed: unknown = {};
  try {
    parsed = JSON.parse(row.configJson);
  } catch {
    parsed = {};
  }
  return {
    config: parseStayBookingConfig(parsed),
    updatedAt: row.updatedAt?.toISOString?.() ?? String(row.updatedAt),
  };
}

export async function saveStayBookingConfig(input: unknown) {
  await ensureStayBookingTable();
  const config = parseStayBookingConfig(input);
  const db = getDb();
  const json = JSON.stringify(config);
  await db
    .insert(schema.stayBookingWidgetConfig)
    .values({
      id: "default",
      configJson: json,
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: schema.stayBookingWidgetConfig.id,
      set: {
        configJson: json,
        updatedAt: new Date(),
      },
    });
  return getStayBookingConfig();
}
