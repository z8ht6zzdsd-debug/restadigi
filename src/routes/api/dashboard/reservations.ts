import { createFileRoute } from "@tanstack/react-router";
import { desc } from "drizzle-orm";

import { getDb, schema } from "@/db";
import { requireAdmin, unauthorizedResponse } from "@/lib/auth";
import { getDatabaseUrl } from "@/lib/database-url";

export const Route = createFileRoute("/api/dashboard/reservations")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!requireAdmin(request)) return unauthorizedResponse();
        if (!getDatabaseUrl()) {
          return Response.json({ error: "Database not configured" }, { status: 503 });
        }

        try {
          const db = getDb();
          const items = await db.query.reservations.findMany({
            orderBy: [
              desc(schema.reservations.reservationDate),
              desc(schema.reservations.createdAt),
            ],
          });

          return Response.json({ reservations: items });
        } catch (error) {
          console.error("Dashboard reservations error:", error);
          return Response.json({ error: "Reservations load failed" }, { status: 500 });
        }
      },
    },
  },
});
