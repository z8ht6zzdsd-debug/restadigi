import { createFileRoute } from "@tanstack/react-router";

import { requireAdmin, unauthorizedResponse } from "@/lib/auth";
import { getDatabaseUrl } from "@/lib/database-url";
import {
  DEFAULT_MAIL_BODY_FI,
  DEFAULT_MAIL_SUBJECT,
  getMailStats,
  listMailAttachments,
  listOutboundEmails,
  sendClientMail,
} from "@/lib/mail-service";
import { enforceRateLimit } from "@/lib/rate-limit";

export const Route = createFileRoute("/api/dashboard/mail")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const limited = enforceRateLimit(request, "dashboard");
        if (limited) return limited;
        if (!requireAdmin(request)) return unauthorizedResponse();
        if (!getDatabaseUrl()) {
          return Response.json({ error: "Database not configured" }, { status: 503 });
        }

        try {
          const [emails, attachments, stats] = await Promise.all([
            listOutboundEmails(80),
            listMailAttachments(),
            getMailStats(),
          ]);

          return Response.json({
            emails,
            attachments,
            stats,
            template: {
              subject: DEFAULT_MAIL_SUBJECT,
              body: DEFAULT_MAIL_BODY_FI,
            },
          });
        } catch (error) {
          console.error("Dashboard mail list error:", error);
          return Response.json({ error: "Viestien lataus epäonnistui" }, { status: 500 });
        }
      },

      POST: async ({ request }) => {
        const limited = enforceRateLimit(request, "dashboard");
        if (limited) return limited;
        if (!requireAdmin(request)) return unauthorizedResponse();
        if (!getDatabaseUrl()) {
          return Response.json({ error: "Database not configured" }, { status: 503 });
        }

        try {
          const body = (await request.json()) as {
            toEmail?: string;
            toName?: string;
            subject?: string;
            body?: string;
          };

          const toEmail = body.toEmail?.trim().toLowerCase() ?? "";
          if (!toEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(toEmail)) {
            return Response.json({ error: "Anna kelvollinen sähköpostiosoite" }, { status: 400 });
          }

          const origin = new URL(request.url).origin;
          const email = await sendClientMail({
            toEmail,
            toName: body.toName,
            subject: body.subject,
            body: body.body,
            origin,
          });

          return Response.json({ ok: true, email });
        } catch (error) {
          console.error("Dashboard mail send error:", error);
          const message = error instanceof Error ? error.message : "Lähetys epäonnistui";
          return Response.json({ error: message }, { status: 500 });
        }
      },
    },
  },
});
