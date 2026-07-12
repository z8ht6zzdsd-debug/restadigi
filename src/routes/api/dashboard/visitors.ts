import { createFileRoute } from "@tanstack/react-router";
import { desc, gte } from "drizzle-orm";

import { getDb, schema } from "@/db";
import { requireAdmin, unauthorizedResponse } from "@/lib/auth";
import { getDatabaseUrl } from "@/lib/database-url";

export const Route = createFileRoute("/api/dashboard/visitors")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!requireAdmin(request)) return unauthorizedResponse();
        if (!getDatabaseUrl()) {
          return Response.json({ error: "Database not configured" }, { status: 503 });
        }

        try {
          const db = getDb();
          const since = new Date();
          since.setDate(since.getDate() - 7);

          const recent = await db.query.pageViews.findMany({
            where: gte(schema.pageViews.createdAt, since),
            orderBy: [desc(schema.pageViews.createdAt)],
            limit: 100,
          });

          return Response.json({ visits: recent });
        } catch (error) {
          console.error("Dashboard visitors error:", error);
          return Response.json({ error: "Visitors load failed" }, { status: 500 });
        }
      },
    },
  },
});
