/** Online table-booking widget config (EasyTable-style demo on marketing + dashboard). */

export type BookingWidgetType = {
  id: string;
  name: string;
  description: string;
  active: boolean;
};

export type BookingWidgetConfig = {
  restaurantName: string;
  address: string;
  brandTitle: string;
  brandSubtitle: string;
  /** Public image URL or site path (e.g. /restadigi-logo.png). */
  brandImageUrl: string;
  bookingTypes: BookingWidgetType[];
  minGuests: number;
  maxGuests: number;
  /** Reservation length in minutes (e.g. 150 = 2h30). */
  durationMinutes: number;
  /** Slot grid interval in minutes. */
  slotIntervalMinutes: number;
  /** Opening time "HH:mm" */
  openTime: string;
  /** Last start time "HH:mm" */
  lastStartTime: string;
  /** 0=Sun … 6=Sat — closed days */
  closedWeekdays: number[];
  minNoticeHours: number;
  advanceBookingDays: number;
  slotAccentColor: string;
  termsText: string;
  showEndTime: boolean;
};

export const BOOKING_WIDGET_STORAGE_KEY = "restadigi-booking-widget-config-v1";

export const DEFAULT_BOOKING_WIDGET_CONFIG: BookingWidgetConfig = {
  restaurantName: "Restaurant Ylläskota",
  address: "Vaeltajantie 2, 95980 Ylläsjärvi",
  brandTitle: "YLLÄSKOTA",
  brandSubtitle: "GASTRONOMIC",
  brandImageUrl: "/booking-widget-brand.jpg",
  bookingTypes: [
    {
      id: "normal",
      name: "Normaali varaus",
      description: "Pöytä pääruokasalissa. Kesto asetusten mukaan.",
      active: true,
    },
    {
      id: "terrace",
      name: "Terassi",
      description: "Pöytä terassilla (säästä riippuen).",
      active: true,
    },
  ],
  minGuests: 1,
  maxGuests: 12,
  durationMinutes: 150,
  slotIntervalMinutes: 15,
  openTime: "17:00",
  lastStartTime: "21:00",
  closedWeekdays: [],
  minNoticeHours: 2,
  advanceBookingDays: 60,
  slotAccentColor: "#c5d5b8",
  termsText:
    "Hyväksyn, että voin peruuttaa varauksen viimeistään 24 tuntia ennen. Tämä on demoesimerkki: tietoja ei tallenneta.",
  showEndTime: true,
};

export function parseBookingWidgetConfig(raw: unknown): BookingWidgetConfig {
  if (!raw || typeof raw !== "object") return { ...DEFAULT_BOOKING_WIDGET_CONFIG };
  const o = raw as Partial<BookingWidgetConfig>;
  const types = Array.isArray(o.bookingTypes)
    ? o.bookingTypes
        .filter((t) => t && typeof t === "object")
        .map((t, i) => ({
          id: String((t as BookingWidgetType).id || `type-${i}`),
          name: String((t as BookingWidgetType).name || "Tipo"),
          description: String((t as BookingWidgetType).description || ""),
          active: Boolean((t as BookingWidgetType).active),
        }))
    : DEFAULT_BOOKING_WIDGET_CONFIG.bookingTypes;

  return {
    restaurantName: String(o.restaurantName || DEFAULT_BOOKING_WIDGET_CONFIG.restaurantName),
    address: String(o.address || DEFAULT_BOOKING_WIDGET_CONFIG.address),
    brandTitle: String(o.brandTitle || DEFAULT_BOOKING_WIDGET_CONFIG.brandTitle),
    brandSubtitle: String(o.brandSubtitle || DEFAULT_BOOKING_WIDGET_CONFIG.brandSubtitle),
    brandImageUrl: String(o.brandImageUrl || DEFAULT_BOOKING_WIDGET_CONFIG.brandImageUrl),
    bookingTypes: types.length ? types : DEFAULT_BOOKING_WIDGET_CONFIG.bookingTypes,
    minGuests: clampInt(o.minGuests, 1, 50, DEFAULT_BOOKING_WIDGET_CONFIG.minGuests),
    maxGuests: clampInt(o.maxGuests, 1, 100, DEFAULT_BOOKING_WIDGET_CONFIG.maxGuests),
    durationMinutes: clampInt(
      o.durationMinutes,
      30,
      480,
      DEFAULT_BOOKING_WIDGET_CONFIG.durationMinutes,
    ),
    slotIntervalMinutes: clampInt(
      o.slotIntervalMinutes,
      5,
      60,
      DEFAULT_BOOKING_WIDGET_CONFIG.slotIntervalMinutes,
    ),
    openTime: normalizeTime(o.openTime, DEFAULT_BOOKING_WIDGET_CONFIG.openTime),
    lastStartTime: normalizeTime(o.lastStartTime, DEFAULT_BOOKING_WIDGET_CONFIG.lastStartTime),
    closedWeekdays: Array.isArray(o.closedWeekdays)
      ? o.closedWeekdays.map(Number).filter((d) => d >= 0 && d <= 6)
      : DEFAULT_BOOKING_WIDGET_CONFIG.closedWeekdays,
    minNoticeHours: clampInt(
      o.minNoticeHours,
      0,
      168,
      DEFAULT_BOOKING_WIDGET_CONFIG.minNoticeHours,
    ),
    advanceBookingDays: clampInt(
      o.advanceBookingDays,
      1,
      365,
      DEFAULT_BOOKING_WIDGET_CONFIG.advanceBookingDays,
    ),
    slotAccentColor: String(o.slotAccentColor || DEFAULT_BOOKING_WIDGET_CONFIG.slotAccentColor),
    termsText: String(o.termsText || DEFAULT_BOOKING_WIDGET_CONFIG.termsText),
    showEndTime: o.showEndTime !== false,
  };
}

function clampInt(value: unknown, min: number, max: number, fallback: number) {
  const n = Number(value);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, Math.round(n)));
}

function normalizeTime(value: unknown, fallback: string) {
  const s = String(value || "");
  return /^\d{1,2}:\d{2}$/.test(s) ? s.padStart(5, "0") : fallback;
}

export function timeToMinutes(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

export function minutesToTime(total: number) {
  const h = Math.floor(total / 60);
  const m = total % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export function addMinutesToTime(hhmm: string, minutes: number) {
  return minutesToTime(timeToMinutes(hhmm) + minutes);
}

export function generateTimeSlots(config: BookingWidgetConfig, date: Date): string[] {
  const day = date.getDay();
  if (config.closedWeekdays.includes(day)) return [];

  const now = new Date();
  const minStart = new Date(now.getTime() + config.minNoticeHours * 60 * 60 * 1000);
  const start = timeToMinutes(config.openTime);
  const end = timeToMinutes(config.lastStartTime);
  const step = config.slotIntervalMinutes;
  const slots: string[] = [];

  for (let t = start; t <= end; t += step) {
    const label = minutesToTime(t);
    const candidate = new Date(date);
    candidate.setHours(Math.floor(t / 60), t % 60, 0, 0);
    if (candidate < minStart) continue;
    slots.push(label);
  }
  return slots;
}

export function isDateBookable(config: BookingWidgetConfig, date: Date, today = new Date()) {
  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const todayStart = new Date(today);
  todayStart.setHours(0, 0, 0, 0);
  if (dayStart < todayStart) return false;

  const max = new Date(todayStart);
  max.setDate(max.getDate() + config.advanceBookingDays);
  if (dayStart > max) return false;

  if (config.closedWeekdays.includes(dayStart.getDay())) return false;
  return generateTimeSlots(config, dayStart).length > 0;
}

export function readBookingWidgetConfigFromStorage(): BookingWidgetConfig | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(BOOKING_WIDGET_STORAGE_KEY);
    if (!raw) return null;
    return parseBookingWidgetConfig(JSON.parse(raw));
  } catch {
    return null;
  }
}

export function writeBookingWidgetConfigToStorage(config: BookingWidgetConfig) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(BOOKING_WIDGET_STORAGE_KEY, JSON.stringify(config));
  } catch {
    /* ignore */
  }
}
