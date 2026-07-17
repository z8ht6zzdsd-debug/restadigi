import { eq, sql } from "drizzle-orm";

import { getDb, schema } from "@/db";
import type { RestaurantSettings } from "@/lib/restaurant-settings-types";
import { validateReservationInput } from "@/lib/settings-service";

export async function ensureSalesLeadsTable() {
  const db = getDb();
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS sales_leads (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      chat_session_id UUID REFERENCES chat_sessions(id) ON DELETE SET NULL,
      name TEXT,
      company TEXT,
      phone TEXT NOT NULL,
      email TEXT NOT NULL,
      interest TEXT,
      notes TEXT,
      admin_notes TEXT,
      status TEXT NOT NULL DEFAULT 'new',
      source TEXT NOT NULL DEFAULT 'sales_chat',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
}

type ReservationInput = {
  guestName: string;
  partySize: number;
  date: string;
  time: string;
  guestPhone?: string;
  guestEmail?: string;
  notes?: string;
  chatSessionId?: string;
};

export async function ensureChatSession(sessionId: string | undefined, visitorSessionId?: string) {
  const db = getDb();

  if (sessionId) {
    const existing = await db.query.chatSessions.findFirst({
      where: eq(schema.chatSessions.id, sessionId),
    });
    if (existing) return existing.id;
  }

  const [created] = await db
    .insert(schema.chatSessions)
    .values({ visitorSessionId: visitorSessionId ?? null })
    .returning({ id: schema.chatSessions.id });

  return created.id;
}

export async function saveChatMessage(sessionId: string, role: string, content: string) {
  const db = getDb();
  await db.insert(schema.chatMessages).values({ sessionId, role, content });
  await db
    .update(schema.chatSessions)
    .set({ updatedAt: sql`NOW()` })
    .where(eq(schema.chatSessions.id, sessionId));
}

export async function createReservation(input: ReservationInput, settings?: RestaurantSettings) {
  if (settings) {
    await validateReservationInput(input, settings);
  }

  const db = getDb();
  const [reservation] = await db
    .insert(schema.reservations)
    .values({
      chatSessionId: input.chatSessionId ?? null,
      guestName: input.guestName,
      guestEmail: input.guestEmail ?? null,
      guestPhone: input.guestPhone ?? null,
      partySize: input.partySize,
      reservationDate: input.date,
      reservationTime: input.time,
      notes: input.notes ?? null,
      source: "chatbot",
      status: "pending",
    })
    .returning();

  return reservation;
}

export function parseReservationArgs(args: string) {
  const parsed = JSON.parse(args) as {
    guest_name?: string;
    party_size?: number;
    date?: string;
    time?: string;
    guest_phone?: string;
    guest_email?: string;
    notes?: string;
  };

  if (!parsed.guest_name || !parsed.party_size || !parsed.date || !parsed.time) {
    throw new Error("Missing reservation fields");
  }

  return {
    guestName: parsed.guest_name,
    partySize: parsed.party_size,
    date: parsed.date,
    time: parsed.time,
    guestPhone: parsed.guest_phone,
    guestEmail: parsed.guest_email,
    notes: parsed.notes,
  };
}

type SalesLeadInput = {
  name?: string;
  company?: string;
  phone: string;
  email: string;
  interest?: string;
  notes?: string;
  chatSessionId?: string;
};

export async function createSalesLead(input: SalesLeadInput) {
  await ensureSalesLeadsTable();
  const db = getDb();
  const [lead] = await db
    .insert(schema.salesLeads)
    .values({
      chatSessionId: input.chatSessionId ?? null,
      name: input.name ?? null,
      company: input.company ?? null,
      phone: input.phone,
      email: input.email,
      interest: input.interest ?? null,
      notes: input.notes ?? null,
      status: "new",
      source: "sales_chat",
    })
    .returning();

  return lead;
}
