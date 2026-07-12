import { createFileRoute } from "@tanstack/react-router";
import { count, desc, gte, sql } from "drizzle-orm";

import { getDb, schema } from "@/db";
import { requireAdmin, unauthorizedResponse } from "@/lib/auth";

export const Route = createFileRoute("/api/dashboard/stats")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!requireAdmin(request)) return unauthorizedResponse();
        if (!process.env.DATABASE_URL) {
          return Response.json({ error: "Database not configured" }, { status: 503 });
        }

        const db = getDb();
        const since = new Date();
        since.setDate(since.getDate() - 30);

        const [pageViewCount] = await db
          .select({ count: count() })
          .from(schema.pageViews)
          .where(gte(schema.pageViews.createdAt, since));

        const [uniqueVisitors] = await db
          .select({ count: sql<number>`count(distinct ${schema.pageViews.visitorSessionId})` })
          .from(schema.pageViews)
          .where(gte(schema.pageViews.createdAt, since));

        const [chatCount] = await db
          .select({ count: count() })
          .from(schema.chatSessions)
          .where(gte(schema.chatSessions.createdAt, since));

        const [reservationCount] = await db
          .select({ count: count() })
          .from(schema.reservations)
          .where(gte(schema.reservations.createdAt, since));

        const viewsByDay = await db
          .select({
            day: sql<string>`to_char(${schema.pageViews.createdAt}, 'YYYY-MM-DD')`,
            views: count(),
          })
          .from(schema.pageViews)
          .where(gte(schema.pageViews.createdAt, since))
          .groupBy(sql`to_char(${schema.pageViews.createdAt}, 'YYYY-MM-DD')`)
          .orderBy(sql`to_char(${schema.pageViews.createdAt}, 'YYYY-MM-DD')`);

        const topPages = await db
          .select({ path: schema.pageViews.path, views: count() })
          .from(schema.pageViews)
          .where(gte(schema.pageViews.createdAt, since))
          .groupBy(schema.pageViews.path)
          .orderBy(desc(count()))
          .limit(8);

        return Response.json({
          pageViews: pageViewCount.count,
          uniqueVisitors: Number(uniqueVisitors.count),
          chatSessions: chatCount.count,
          reservations: reservationCount.count,
          viewsByDay,
          topPages,
        });
      },
    },
  },
});
