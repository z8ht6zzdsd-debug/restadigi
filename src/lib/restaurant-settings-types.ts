import type { restaurantSettings } from "@/db/schema";

export type RestaurantSettings = typeof restaurantSettings.$inferSelect;

export const DEFAULT_SETTINGS: Omit<RestaurantSettings, "updatedAt"> = {
  id: "default",
  restaurantName: "Demo Ravintola",
  chatbotWelcomeMessage:
    "Hei! Olen ravintolan chatbot. Voin auttaa pöytävarauksessa — kerro nimesi, henkilömäärän, päivän, kellonajan ja sähköpostisi.",
  chatbotInstructions: null,
  requireEmail: true,
  requirePhone: false,
  minPartySize: 1,
  maxPartySize: 12,
  openTime: "11:00",
  closeTime: "22:00",
  slotMinutes: 30,
  maxCoversPerSlot: 20,
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
  };
}
