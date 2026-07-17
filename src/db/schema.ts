import { relations } from "drizzle-orm";
import { boolean, integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const restaurantSettings = pgTable("restaurant_settings", {
  id: text("id").primaryKey().default("default"),
  restaurantName: text("restaurant_name").notNull().default("Demo Ravintola"),
  restaurantAddress: text("restaurant_address"),
  restaurantPhone: text("restaurant_phone"),
  restaurantEmail: text("restaurant_email"),
  cuisineType: text("cuisine_type"),
  restaurantDescription: text("restaurant_description"),
  chatbotWelcomeMessage: text("chatbot_welcome_message")
    .notNull()
    .default(
      "Hei! Tervetuloa Demo Ravintolaan. Autan mielelläni pöytävarauksessa — kerro nimesi, henkilömäärän, toivomasi päivän ja kellonajan sekä sähköpostisi ja puhelinnumerosi.",
    ),
  chatbotInstructions: text("chatbot_instructions"),
  requireEmail: boolean("require_email").notNull().default(true),
  requirePhone: boolean("require_phone").notNull().default(true),
  minPartySize: integer("min_party_size").notNull().default(1),
  maxPartySize: integer("max_party_size").notNull().default(10),
  openTime: text("open_time").notNull().default("11:00"),
  closeTime: text("close_time").notNull().default("22:00"),
  lunchEnabled: boolean("lunch_enabled").notNull().default(true),
  lunchOpenTime: text("lunch_open_time").notNull().default("11:00"),
  lunchCloseTime: text("lunch_close_time").notNull().default("14:30"),
  dinnerEnabled: boolean("dinner_enabled").notNull().default(true),
  dinnerOpenTime: text("dinner_open_time").notNull().default("17:00"),
  dinnerCloseTime: text("dinner_close_time").notNull().default("22:00"),
  slotMinutes: integer("slot_minutes").notNull().default(30),
  maxCoversPerSlot: integer("max_covers_per_slot").notNull().default(16),
  maxCoversPerEvening: integer("max_covers_per_evening").notNull().default(80),
  closedWeekdays: text("closed_weekdays").notNull().default("1"),
  advanceBookingDays: integer("advance_booking_days").notNull().default(60),
  minNoticeHours: integer("min_notice_hours").notNull().default(2),
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

export const salesLeads = pgTable("sales_leads", {
  id: uuid("id").defaultRandom().primaryKey(),
  chatSessionId: uuid("chat_session_id").references(() => chatSessions.id, {
    onDelete: "set null",
  }),
  name: text("name"),
  company: text("company"),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  interest: text("interest"),
  notes: text("notes"),
  adminNotes: text("admin_notes"),
  status: text("status").notNull().default("new"),
  source: text("source").notNull().default("sales_chat"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const chatSessionsRelations = relations(chatSessions, ({ many }) => ({
  messages: many(chatMessages),
  salesLeads: many(salesLeads),
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

export const salesLeadsRelations = relations(salesLeads, ({ one }) => ({
  chatSession: one(chatSessions, {
    fields: [salesLeads.chatSessionId],
    references: [chatSessions.id],
  }),
}));
