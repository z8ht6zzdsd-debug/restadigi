import { createFileRoute } from "@tanstack/react-router";
import { eq } from "drizzle-orm";

import { getDb, schema } from "@/db";
import { requireAdmin, unauthorizedResponse } from "@/lib/auth";

export const Route = createFileRoute("/api/dashboard/conversations/$sessionId")({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        if (!requireAdmin(request)) return unauthorizedResponse();
        if (!process.env.DATABASE_URL) {
          return Response.json({ error: "Database not configured" }, { status: 503 });
        }

        const db = getDb();
        const messages = await db.query.chatMessages.findMany({
          where: eq(schema.chatMessages.sessionId, params.sessionId),
          orderBy: [schema.chatMessages.createdAt],
        });

        const reservation = await db.query.reservations.findFirst({
          where: eq(schema.reservations.chatSessionId, params.sessionId),
        });

        return Response.json({ messages, reservation });
      },
    },
  },
});
