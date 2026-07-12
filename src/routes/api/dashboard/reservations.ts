import { createFileRoute } from "@tanstack/react-router";
import { desc } from "drizzle-orm";

import { getDb, schema } from "@/db";
import { requireAdmin, unauthorizedResponse } from "@/lib/auth";

export const Route = createFileRoute("/api/dashboard/reservations")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!requireAdmin(request)) return unauthorizedResponse();
        if (!process.env.DATABASE_URL) {
          return Response.json({ error: "Database not configured" }, { status: 503 });
        }

        const db = getDb();
        const items = await db.query.reservations.findMany({
          orderBy: [desc(schema.reservations.reservationDate), desc(schema.reservations.createdAt)],
        });

        return Response.json({ reservations: items });
      },
    },
  },
});
