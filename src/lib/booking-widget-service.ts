import { eq, sql } from "drizzle-orm";

import { getDb, schema } from "@/db";
import {
  DEFAULT_BOOKING_WIDGET_CONFIG,
  parseBookingWidgetConfig,
  type BookingWidgetConfig,
} from "@/lib/booking-widget-config";
import { LOCALES } from "@/i18n/types";

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
    return { config: structuredClone(DEFAULT_BOOKING_WIDGET_CONFIG), updatedAt: null };
  }
  let parsed: unknown = {};
  try {
    parsed = JSON.parse(row.configJson);
  } catch {
    parsed = {};
  }
  const config = parseBookingWidgetConfig(parsed);
  const needsLocalePersist =
    !parsed || typeof parsed !== "object" || !(parsed as { locales?: unknown }).locales;

  // Replace legacy third-party demo branding with Restadigi showcase defaults.
  if (isLegacyThirdPartyShowcase(config) || isLegacyThirdPartyRaw(parsed)) {
    const next = structuredClone(DEFAULT_BOOKING_WIDGET_CONFIG);
    return persistConfig(db, next);
  }

  // Persist migrated multi-locale shape once so EN/ES copy is saved.
  if (needsLocalePersist) {
    return persistConfig(db, config);
  }

  return {
    config,
    updatedAt: row.updatedAt?.toISOString?.() ?? String(row.updatedAt),
  };
}

async function persistConfig(
  db: ReturnType<typeof getDb>,
  next: BookingWidgetConfig,
): Promise<{ config: BookingWidgetConfig; updatedAt: string }> {
  const json = JSON.stringify(next);
  const now = new Date();
  await db
    .insert(schema.bookingWidgetConfig)
    .values({
      id: "default",
      configJson: json,
      updatedAt: now,
    })
    .onConflictDoUpdate({
      target: schema.bookingWidgetConfig.id,
      set: {
        configJson: json,
        updatedAt: now,
      },
    });
  return { config: next, updatedAt: now.toISOString() };
}

function showcaseBlob(config: BookingWidgetConfig) {
  return LOCALES.map((locale) => {
    const c = config.locales[locale];
    return `${c.restaurantName} ${c.brandTitle} ${c.address}`;
  })
    .join(" ")
    .toLowerCase();
}

function isLegacyThirdPartyShowcase(config: BookingWidgetConfig) {
  return matchesLegacyRestaurant(showcaseBlob(config));
}

function isLegacyThirdPartyRaw(parsed: unknown) {
  if (!parsed || typeof parsed !== "object") return false;
  const o = parsed as Record<string, unknown>;
  const blob = `${o.restaurantName ?? ""} ${o.brandTitle ?? ""} ${o.address ?? ""}`.toLowerCase();
  return matchesLegacyRestaurant(blob);
}

function matchesLegacyRestaurant(blob: string) {
  return (
    blob.includes("ylläskota") ||
    blob.includes("yllaskota") ||
    blob.includes("ylläsjärvi") ||
    blob.includes("yllasjarvi") ||
    blob.includes("vaeltajantie")
  );
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
