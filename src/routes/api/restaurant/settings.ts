import { createFileRoute } from "@tanstack/react-router";

import { getRestaurantSettings } from "@/lib/settings-service";
import { toPublicSettings } from "@/lib/restaurant-settings-types";

export const Route = createFileRoute("/api/restaurant/settings")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const settings = await getRestaurantSettings();
          return Response.json({ settings: toPublicSettings(settings) });
        } catch (error) {
          console.error("Public settings error:", error);
          return Response.json({ error: "Asetusten lataus epäonnistui" }, { status: 500 });
        }
      },
    },
  },
});
