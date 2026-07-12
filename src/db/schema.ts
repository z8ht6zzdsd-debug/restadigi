import { relations } from "drizzle-orm";
import { boolean, integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const restaurantSettings = pgTable("restaurant_settings", {
  id: text("id").primaryKey().default("default"),
  restaurantName: text("restaurant_name").notNull().default("Demo Ravintola"),
  chatbotWelcomeMessage: text("chatbot_welcome_message")
    .notNull()
    .default(
      "Hei! Olen ravintolan chatbot. Voin auttaa pöytävarauksessa — kerro nimesi, henkilömäärän, päivän, kellonajan ja sähköpostisi.",
    ),
  chatbotInstructions: text("chatbot_instructions"),
  requireEmail: boolean("require_email").notNull().default(true),
  requirePhone: boolean("require_phone").notNull().default(false),
  minPartySize: integer("min_party_size").notNull().default(1),
  maxPartySize: integer("max_party_size").notNull().default(12),
  openTime: text("open_time").notNull().default("11:00"),
  closeTime: text("close_time").notNull().default("22:00"),
  slotMinutes: integer("slot_minutes").notNull().default(30),
  maxCoversPerSlot: integer("max_covers_per_slot").notNull().default(20),
  reservationsEnabled: boolean("reservations_enabled").notNull().default(true),
  accentColor: text("accent_color").notNull().default("#c46a32"),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const pageViews = pgTable("page_views", {
  id: uuid("id").defaultRandom().primaryKey(),
  visitorSessionId: text("visitor_session_id").notNull(),
  path: text("path").notNull(),
  referrer: text("referrer"),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const chatSessions = pgTable("chat_sessions", {
  id: uuid("id").defaultRandom().primaryKey(),
  visitorSessionId: text("visitor_session_id"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const chatMessages = pgTable("chat_messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  sessionId: uuid("session_id")
    .notNull()
    .references(() => chatSessions.id, { onDelete: "cascade" }),
  role: text("role").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const reservations = pgTable("reservations", {
  id: uuid("id").defaultRandom().primaryKey(),
  chatSessionId: uuid("chat_session_id").references(() => chatSessions.id, {
    onDelete: "set null",
  }),
  guestName: text("guest_name").notNull(),
  guestEmail: text("guest_email"),
  guestPhone: text("guest_phone"),
  partySize: integer("party_size").notNull(),
  reservationDate: text("reservation_date").notNull(),
  reservationTime: text("reservation_time").notNull(),
  status: text("status").notNull().default("pending"),
  notes: text("notes"),
  source: text("source").notNull().default("chatbot"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const chatSessionsRelations = relations(chatSessions, ({ many }) => ({
  messages: many(chatMessages),
}));

export const chatMessagesRelations = relations(chatMessages, ({ one }) => ({
  session: one(chatSessions, {
    fields: [chatMessages.sessionId],
    references: [chatSessions.id],
  }),
}));

export const reservationsRelations = relations(reservations, ({ one }) => ({
  chatSession: one(chatSessions, {
    fields: [reservations.chatSessionId],
    references: [chatSessions.id],
  }),
}));
