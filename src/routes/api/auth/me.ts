import { createFileRoute } from "@tanstack/react-router";

import { requireAdmin, unauthorizedResponse } from "@/lib/auth";

export const Route = createFileRoute("/api/auth/me")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const session = requireAdmin(request);
        if (!session) return unauthorizedResponse();
        return Response.json({ email: session.email });
      },
    },
  },
});
