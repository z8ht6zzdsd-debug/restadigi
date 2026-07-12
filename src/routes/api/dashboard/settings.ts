import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { requireAdmin, unauthorizedResponse } from "@/lib/auth";
import { getDatabaseUrl } from "@/lib/database-url";
import { getRestaurantSettings, upsertRestaurantSettings } from "@/lib/settings-service";

const settingsSchema = z.object({
  restaurantName: z.string().min(1).max(120),
  chatbotWelcomeMessage: z.string().min(1).max(500),
  chatbotInstructions: z.string().max(2000).nullable().optional(),
  requireEmail: z.boolean(),
  requirePhone: z.boolean(),
  minPartySize: z.number().int().min(1).max(50),
  maxPartySize: z.number().int().min(1).max(100),
  openTime: z.string().regex(/^\d{2}:\d{2}$/),
  closeTime: z.string().regex(/^\d{2}:\d{2}$/),
  slotMinutes: z.number().int().min(15).max(120),
  maxCoversPerSlot: z.number().int().min(1).max(200),
  reservationsEnabled: z.boolean(),
  accentColor: z.string().regex(/^#[0-9a-fA-F]{6}$/),
});

export const Route = createFileRoute("/api/dashboard/settings")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!requireAdmin(request)) return unauthorizedResponse();

        try {
          const settings = await getRestaurantSettings();
          return Response.json({ settings });
        } catch (error) {
          console.error("Dashboard settings GET error:", error);
          return Response.json({ error: "Asetusten lataus epäonnistui" }, { status: 500 });
        }
      },
      PUT: async ({ request }) => {
        if (!requireAdmin(request)) return unauthorizedResponse();
        if (!getDatabaseUrl()) {
          return Response.json({ error: "Tietokantaa ei ole konfiguroitu" }, { status: 503 });
        }

        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ error: "Virheellinen pyyntö" }, { status: 400 });
        }

        const parsed = settingsSchema.safeParse(body);
        if (!parsed.success) {
          return Response.json({ error: "Virheelliset asetukset" }, { status: 400 });
        }

        if (parsed.data.minPartySize > parsed.data.maxPartySize) {
          return Response.json(
            { error: "Minimi henkilömäärä ei voi olla suurempi kuin maksimi" },
            { status: 400 },
          );
        }

        try {
          const settings = await upsertRestaurantSettings({
            ...parsed.data,
            chatbotInstructions: parsed.data.chatbotInstructions ?? null,
          });
          return Response.json({ settings });
        } catch (error) {
          console.error("Dashboard settings PUT error:", error);
          return Response.json({ error: "Asetusten tallennus epäonnistui" }, { status: 500 });
        }
      },
    },
  },
});
