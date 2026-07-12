import { eq } from "drizzle-orm";

import { getDb, schema } from "@/db";
import { DEFAULT_SETTINGS, type RestaurantSettings } from "@/lib/restaurant-settings-types";
import { getDatabaseUrl } from "@/lib/database-url";

export async function getRestaurantSettings(): Promise<RestaurantSettings> {
  if (!getDatabaseUrl()) {
    return { ...DEFAULT_SETTINGS, updatedAt: new Date() };
  }

  try {
    const db = getDb();
    const row = await db.query.restaurantSettings.findFirst({
      where: eq(schema.restaurantSettings.id, "default"),
    });
    if (row) return row;
  } catch (error) {
    console.error("getRestaurantSettings error:", error);
  }

  return { ...DEFAULT_SETTINGS, updatedAt: new Date() };
}

export async function upsertRestaurantSettings(
  input: Omit<RestaurantSettings, "id" | "updatedAt">,
): Promise<RestaurantSettings> {
  const db = getDb();
  const [row] = await db
    .insert(schema.restaurantSettings)
    .values({ id: "default", ...input })
    .onConflictDoUpdate({
      target: schema.restaurantSettings.id,
      set: { ...input, updatedAt: new Date() },
    })
    .returning();

  return row;
}

export function buildChatbotSystemPrompt(settings: RestaurantSettings) {
  const contactRules = [
    settings.requireEmail ? "sähköposti (pakollinen)" : null,
    settings.requirePhone ? "puhelinnumero (pakollinen)" : null,
    !settings.requireEmail && !settings.requirePhone ? "puhelin tai sähköposti" : null,
  ]
    .filter(Boolean)
    .join(" ja ");

  const reservationBlock = settings.reservationsEnabled
    ? `
Voit auttaa asiakasta tekemään pöytävarauksen ravintolaan ${settings.restaurantName}.
Kerää varaukselle:
1. Nimi
2. Henkilömäärä (${settings.minPartySize}–${settings.maxPartySize} hlö)
3. Päivämäärä (YYYY-MM-DD)
4. Kellonaika (HH:MM, ravintola auki ${settings.openTime}–${settings.closeTime})
5. ${contactRules}

Kun kaikki tiedot on kerätty, kutsu create_restaurant_reservation -työkalua.
Vahvista varaus ystävällisesti suomeksi.`
    : `
Pöytävaraukset eivät ole tällä hetkellä käytössä. Ohjaa asiakas ottamaan yhteyttä /yhteys-sivun kautta.`;

  const extra = settings.chatbotInstructions?.trim()
    ? `\n\nRavintolan lisäohjeet:\n${settings.chatbotInstructions.trim()}`
    : "";

  return `Olet ${settings.restaurantName} -ravintolan älykäs chatbot-avustaja Restadigin demo-sivustolla.
${reservationBlock}

Vastaa aina suomeksi, ammattimaisesti ja tiiviisti (2–4 lausetta).
Jos kysytään Restadigin digipalveluista, ohjaa tarvittaessa /yhteys-sivulle.${extra}`;
}

export function buildReservationTool(settings: RestaurantSettings) {
  const required = ["guest_name", "party_size", "date", "time"] as string[];
  if (settings.requireEmail) required.push("guest_email");
  if (settings.requirePhone) required.push("guest_phone");

  return {
    type: "function" as const,
    function: {
      name: "create_restaurant_reservation",
      description: `Luo pöytävaraus ravintolaan ${settings.restaurantName}.`,
      parameters: {
        type: "object",
        properties: {
          guest_name: { type: "string", description: "Asiakkaan nimi" },
          party_size: {
            type: "number",
            description: `Henkilömäärä (${settings.minPartySize}-${settings.maxPartySize})`,
          },
          date: { type: "string", description: "Päivämäärä YYYY-MM-DD" },
          time: {
            type: "string",
            description: `Kellonaika HH:MM (${settings.openTime}-${settings.closeTime})`,
          },
          guest_email: { type: "string", description: "Sähköposti" },
          guest_phone: { type: "string", description: "Puhelinnumero" },
          notes: { type: "string", description: "Erityistoiveet" },
        },
        required,
      },
    },
  };
}

export function validateReservationInput(
  input: {
    guestName: string;
    partySize: number;
    date: string;
    time: string;
    guestEmail?: string;
    guestPhone?: string;
  },
  settings: RestaurantSettings,
) {
  if (!settings.reservationsEnabled) {
    throw new Error("Varaukset eivät ole käytössä");
  }
  if (input.partySize < settings.minPartySize || input.partySize > settings.maxPartySize) {
    throw new Error(`Henkilömäärän tulee olla ${settings.minPartySize}–${settings.maxPartySize}`);
  }
  if (settings.requireEmail && !input.guestEmail?.trim()) {
    throw new Error("Sähköposti on pakollinen");
  }
  if (settings.requirePhone && !input.guestPhone?.trim()) {
    throw new Error("Puhelinnumero on pakollinen");
  }
  if (input.guestEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.guestEmail)) {
    throw new Error("Virheellinen sähköposti");
  }
}
