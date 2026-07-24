import { createFileRoute } from "@tanstack/react-router";

import { requireAdmin, unauthorizedResponse } from "@/lib/auth";
import { getBookingWidgetConfig, saveBookingWidgetConfig } from "@/lib/booking-widget-service";
import { getDatabaseUrl } from "@/lib/database-url";
import { DEFAULT_BOOKING_WIDGET_CONFIG } from "@/lib/booking-widget-config";
import { enforceRateLimit } from "@/lib/rate-limit";

export const Route = createFileRoute("/api/booking-widget-config")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const limited = enforceRateLimit(request, "public");
        if (limited) return limited;

        if (!getDatabaseUrl()) {
          return Response.json({
            config: DEFAULT_BOOKING_WIDGET_CONFIG,
            updatedAt: null,
            source: "defaults",
          });
        }

        try {
          const data = await getBookingWidgetConfig();
          return Response.json({ ...data, source: "db" });
        } catch (error) {
          console.error("Booking widget config GET error:", error);
          return Response.json({
            config: DEFAULT_BOOKING_WIDGET_CONFIG,
            updatedAt: null,
            source: "defaults",
          });
        }
      },

      PUT: async ({ request }) => {
        const limited = enforceRateLimit(request, "dashboard", ":write");
        if (limited) return limited;
        if (!requireAdmin(request)) return unauthorizedResponse();
        if (!getDatabaseUrl()) {
          return Response.json({ error: "Database not configured" }, { status: 503 });
        }

        try {
          const body = (await request.json()) as { config?: unknown };
          const data = await saveBookingWidgetConfig(body.config ?? body);
          return Response.json({ ok: true, ...data });
        } catch (error) {
          console.error("Booking widget config PUT error:", error);
          const message = error instanceof Error ? error.message : "Save failed";
          return Response.json({ error: message }, { status: 400 });
        }
      },
    },
  },
});
