import { and, eq, ne } from "drizzle-orm";

import { getDb, schema } from "@/db";
import {
  DEFAULT_SETTINGS,
  parseClosedWeekdays,
  type RestaurantSettings,
  WEEKDAY_OPTIONS,
} from "@/lib/restaurant-settings-types";
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

function timeToMinutes(value: string) {
  const [hours, minutes] = value.split(":").map(Number);
  return hours * 60 + minutes;
}

function normalizeToSlot(time: string, slotMinutes: number) {
  const total = timeToMinutes(time);
  const slotStart = Math.floor(total / slotMinutes) * slotMinutes;
  const hours = Math.floor(slotStart / 60);
  const mins = slotStart % 60;
  return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
}

export function isInLunchService(time: string, settings: RestaurantSettings) {
  if (!settings.lunchEnabled) return false;
  const minutes = timeToMinutes(time);
  return (
    minutes >= timeToMinutes(settings.lunchOpenTime) &&
    minutes <= timeToMinutes(settings.lunchCloseTime)
  );
}

export function isInDinnerService(time: string, settings: RestaurantSettings) {
  if (!settings.dinnerEnabled) return false;
  const minutes = timeToMinutes(time);
  return (
    minutes >= timeToMinutes(settings.dinnerOpenTime) &&
    minutes <= timeToMinutes(settings.dinnerCloseTime)
  );
}

function formatServiceWindows(settings: RestaurantSettings) {
  const parts: string[] = [];
  if (settings.lunchEnabled) {
    parts.push(`Lounas ${settings.lunchOpenTime}–${settings.lunchCloseTime}`);
  }
  if (settings.dinnerEnabled) {
    parts.push(`Illallinen ${settings.dinnerOpenTime}–${settings.dinnerCloseTime}`);
  }
  return parts.length > 0 ? parts.join(", ") : "Ei palveluaikoja";
}

function formatClosedDays(settings: RestaurantSettings) {
  const closed = parseClosedWeekdays(settings.closedWeekdays);
  if (closed.length === 0) return "Ei kiinni olevia viikkopäiviä";
  const labels = closed
    .map((day) => WEEKDAY_OPTIONS.find((option) => Number(option.value) === day)?.label)
    .filter(Boolean);
  return labels.join(", ");
}

export function buildChatbotSystemPrompt(
  settings: RestaurantSettings,
  locale: "fi" | "en" | "es" = "fi",
) {
  const contactRules = [
    settings.requireEmail ? "sähköposti (pakollinen)" : null,
    settings.requirePhone ? "puhelinnumero (pakollinen)" : null,
    !settings.requireEmail && !settings.requirePhone
      ? "puhelin tai sähköposti (vähintään toinen)"
      : null,
  ]
    .filter(Boolean)
    .join(" ja ");

  const identityLines = [
    `- Nimi: ${settings.restaurantName}`,
    settings.restaurantAddress ? `- Osoite: ${settings.restaurantAddress}` : null,
    settings.cuisineType ? `- Keittiö: ${settings.cuisineType}` : null,
    settings.restaurantPhone ? `- Puhelin: ${settings.restaurantPhone}` : null,
    settings.restaurantEmail ? `- Sähköposti: ${settings.restaurantEmail}` : null,
    settings.restaurantDescription ? `- Kuvaus: ${settings.restaurantDescription}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const languageRule =
    locale === "en"
      ? "Always reply in English, professionally and concisely (2–4 sentences)."
      : locale === "es"
        ? "Responde siempre en español, de forma profesional y concisa (2–4 frases)."
        : "Vastaa aina suomeksi, ammattimaisesti ja tiiviisti (2–4 lausetta).";

  const confirmRule =
    locale === "en"
      ? "Confirm the reservation warmly in English and repeat the key details."
      : locale === "es"
        ? "Confirma la reserva con calidez en español y repite los datos principales."
        : "Vahvista varaus lämpimästi suomeksi ja toista keskeiset tiedot.";

  const reservationBlock = settings.reservationsEnabled
    ? `
Olet ${settings.restaurantName} -ravintolan varausavustaja. Toimit kuin ravintolan henkilökunta — älä mainitse, että olet demo tai ulkopuolinen palvelu.

RAVINTOLA:
${identityLines}

PALVELUAJAT:
- ${formatServiceWindows(settings)}
- Suljettu: ${formatClosedDays(settings)}

VARAUSSÄÄNNÖT:
- Pöytävaraus ${settings.minPartySize}–${settings.maxPartySize} hengelle
- Enintään ${settings.maxCoversPerSlot} hlö per ${settings.slotMinutes} min aika
- Illan palveluun yhteensä enintään ${settings.maxCoversPerEvening} hlö
- Varaus enintään ${settings.advanceBookingDays} päivää etukäteen
- Vähintään ${settings.minNoticeHours} tuntia ennen varattua aikaa

Kerää varaukselle:
1. Nimi
2. Henkilömäärä
3. Päivämäärä (YYYY-MM-DD)
4. Kellonaika (HH:MM, vain palveluaikojen sisällä)
5. ${contactRules}
6. Erityistoiveet (valinnainen)

Kysy puuttuvat tiedot yksi kerrallaan. Kun kaikki on kunnossa, kutsu create_restaurant_reservation -työkalua.
${confirmRule}`
    : `
Pöytävaraukset eivät ole tällä hetkellä käytössä. Ohjaa asiakas soittamaan ravintolaan${
        settings.restaurantPhone ? ` (${settings.restaurantPhone})` : ""
      } tai ottamaan yhteyttä sähköpostitse${
        settings.restaurantEmail ? ` (${settings.restaurantEmail})` : ""
      }.`;

  const extra = settings.chatbotInstructions?.trim()
    ? `\n\nLisäohjeet ravintolasta:\n${settings.chatbotInstructions.trim()}`
    : "";

  return `${reservationBlock}

${languageRule}${extra}`;
}

export function buildReservationTool(settings: RestaurantSettings) {
  const required = ["guest_name", "party_size", "date", "time"] as string[];
  if (settings.requireEmail) required.push("guest_email");
  if (settings.requirePhone) required.push("guest_phone");

  const serviceHint = formatServiceWindows(settings);

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
            description: `Kellonaika HH:MM. Palveluajat: ${serviceHint}`,
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

export async function validateReservationInput(
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
  if (
    !settings.requireEmail &&
    !settings.requirePhone &&
    !input.guestEmail?.trim() &&
    !input.guestPhone?.trim()
  ) {
    throw new Error("Anna puhelinnumero tai sähköposti");
  }
  if (input.guestEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.guestEmail)) {
    throw new Error("Virheellinen sähköposti");
  }
  if (input.guestPhone && input.guestPhone.replace(/\D/g, "").length < 6) {
    throw new Error("Virheellinen puhelinnumero");
  }

  const reservationDate = new Date(`${input.date}T12:00:00`);
  const weekday = reservationDate.getDay();
  if (parseClosedWeekdays(settings.closedWeekdays).includes(weekday)) {
    throw new Error("Ravintola on suljettu valittuna päivänä");
  }

  const reservationDateTime = new Date(`${input.date}T${input.time}:00`);
  const now = new Date();
  const hoursUntil = (reservationDateTime.getTime() - now.getTime()) / (1000 * 60 * 60);
  if (hoursUntil < settings.minNoticeHours) {
    throw new Error(`Varaus vaatii vähintään ${settings.minNoticeHours} tuntia ennakkoilmoitusta`);
  }

  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + settings.advanceBookingDays);
  if (reservationDateTime > maxDate) {
    throw new Error(
      `Varaus voidaan tehdä enintään ${settings.advanceBookingDays} päivää etukäteen`,
    );
  }

  if (!isInLunchService(input.time, settings) && !isInDinnerService(input.time, settings)) {
    throw new Error(
      `Aika ${input.time} on palveluaikojen ulkopuolella (${formatServiceWindows(settings)})`,
    );
  }

  if (!getDatabaseUrl()) return;

  const db = getDb();
  const existing = await db.query.reservations.findMany({
    where: and(
      eq(schema.reservations.reservationDate, input.date),
      ne(schema.reservations.status, "cancelled"),
    ),
  });

  const slot = normalizeToSlot(input.time, settings.slotMinutes);
  const slotCovers = existing
    .filter((row) => normalizeToSlot(row.reservationTime, settings.slotMinutes) === slot)
    .reduce((sum, row) => sum + row.partySize, 0);

  if (slotCovers + input.partySize > settings.maxCoversPerSlot) {
    throw new Error(`Kello ${slot} ei ole enää tilaa (${settings.maxCoversPerSlot} hlö max)`);
  }

  if (isInDinnerService(input.time, settings)) {
    const eveningCovers = existing
      .filter((row) => isInDinnerService(row.reservationTime, settings))
      .reduce((sum, row) => sum + row.partySize, 0);

    if (eveningCovers + input.partySize > settings.maxCoversPerEvening) {
      throw new Error(
        `Illan palvelu on täynnä (max ${settings.maxCoversPerEvening} hlö). Kokeile lounasaikaa tai toista päivää.`,
      );
    }
  }
}
