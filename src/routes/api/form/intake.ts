import { createFileRoute } from "@tanstack/react-router";

import { formIntakeSchema, submitFormIntake } from "@/lib/form-intake-service";
import { enforceRateLimit } from "@/lib/rate-limit";

export const Route = createFileRoute("/api/form/intake")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const limited = enforceRateLimit(request, "public");
        if (limited) return limited;

        try {
          const body = await request.json();
          const parsed = formIntakeSchema.safeParse(body);
          if (!parsed.success) {
            return Response.json(
              { error: "Tarkista lomakkeen pakolliset kentät.", details: parsed.error.flatten() },
              { status: 400 },
            );
          }

          const result = await submitFormIntake(parsed.data);
          return Response.json({ ok: true, id: result.id });
        } catch (error) {
          console.error("Form intake error:", error);
          return Response.json(
            { error: "Lähettäminen epäonnistui. Yritä hetken kuluttua." },
            { status: 500 },
          );
        }
      },
    },
  },
});
