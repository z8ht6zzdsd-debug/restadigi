import type { restaurantSettings } from "@/db/schema";

export type RestaurantSettings = typeof restaurantSettings.$inferSelect;

export const WEEKDAY_OPTIONS = [
  { value: "1", label: "Ma" },
  { value: "2", label: "Ti" },
  { value: "3", label: "Ke" },
  { value: "4", label: "To" },
  { value: "5", label: "Pe" },
  { value: "6", label: "La" },
  { value: "0", label: "Su" },
] as const;

export const DEFAULT_SETTINGS: Omit<RestaurantSettings, "updatedAt"> = {
  id: "default",
  restaurantName: "Demo Ravintola",
  restaurantAddress: "Mannerheimintie 1, 00100 Helsinki",
  restaurantPhone: "+358 40 123 4567",
  restaurantEmail: "varaukset@demoravintola.fi",
  cuisineType: "Suomalainen, pohjoismainen",
  restaurantDescription:
    "Viihtyisä naapuristoravintola, joka tarjoaa tuoreita sesongin makuja ja lämpimän palvelun.",
  chatbotWelcomeMessage:
    "Hei! Tervetuloa Demo Ravintolaan. Autan mielelläni pöytävarauksessa — kerro nimesi, henkilömäärän, toivomasi päivän ja kellonajan sekä sähköpostisi ja puhelinnumerosi.",
  chatbotInstructions: null,
  requireEmail: true,
  requirePhone: true,
  minPartySize: 1,
  maxPartySize: 10,
  openTime: "11:00",
  closeTime: "22:00",
  lunchEnabled: true,
  lunchOpenTime: "11:00",
  lunchCloseTime: "14:30",
  dinnerEnabled: true,
  dinnerOpenTime: "17:00",
  dinnerCloseTime: "22:00",
  slotMinutes: 30,
  maxCoversPerSlot: 16,
  maxCoversPerEvening: 80,
  closedWeekdays: "1",
  advanceBookingDays: 60,
  minNoticeHours: 2,
  reservationsEnabled: true,
  accentColor: "#c46a32",
};

export type PublicRestaurantSettings = Pick<
  RestaurantSettings,
  | "restaurantName"
  | "chatbotWelcomeMessage"
  | "requireEmail"
  | "requirePhone"
  | "minPartySize"
  | "maxPartySize"
  | "reservationsEnabled"
  | "accentColor"
  | "lunchEnabled"
  | "dinnerEnabled"
>;

export function toPublicSettings(settings: RestaurantSettings): PublicRestaurantSettings {
  return {
    restaurantName: settings.restaurantName,
    chatbotWelcomeMessage: settings.chatbotWelcomeMessage,
    requireEmail: settings.requireEmail,
    requirePhone: settings.requirePhone,
    minPartySize: settings.minPartySize,
    maxPartySize: settings.maxPartySize,
    reservationsEnabled: settings.reservationsEnabled,
    accentColor: settings.accentColor,
    lunchEnabled: settings.lunchEnabled,
    dinnerEnabled: settings.dinnerEnabled,
  };
}

export function parseClosedWeekdays(value: string | null | undefined): number[] {
  if (!value?.trim()) return [];
  return value
    .split(",")
    .map((part) => Number(part.trim()))
    .filter((day) => Number.isInteger(day) && day >= 0 && day <= 6);
}

export function formatClosedWeekdays(days: number[]): string {
  return [...new Set(days)].sort((a, b) => a - b).join(",");
}
