/** Local calendar date as YYYY-MM-DD (avoids UTC shift from toISOString). */
export function formatLocalDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/** Parse YYYY-MM-DD as local noon (stable for calendar widgets). */
export function parseLocalDateKey(dateKey: string): Date {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(year, month - 1, day, 12, 0, 0, 0);
}

export function isSameLocalDate(a: Date, b: Date): boolean {
  return formatLocalDateKey(a) === formatLocalDateKey(b);
}

const HELSINKI_TZ = "Europe/Helsinki";

function helsinkiParts(date: Date) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: HELSINKI_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    weekday: "long",
    hour12: false,
  }).formatToParts(date);
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? "";
  return {
    year: get("year"),
    month: get("month"),
    day: get("day"),
    hour: get("hour") === "24" ? "00" : get("hour"),
    minute: get("minute"),
    weekday: get("weekday"),
  };
}

/** Calendar date YYYY-MM-DD in Europe/Helsinki. */
export function formatHelsinkiDateKey(date: Date = new Date()): string {
  const p = helsinkiParts(date);
  return `${p.year}-${p.month}-${p.day}`;
}

/** Add calendar days in Europe/Helsinki and return YYYY-MM-DD. */
export function addHelsinkiDays(date: Date, days: number): string {
  const p = helsinkiParts(date);
  // Noon UTC on that calendar day, then shift by days (safe across DST for date-only)
  const base = Date.UTC(Number(p.year), Number(p.month) - 1, Number(p.day) + days, 12, 0, 0);
  return formatHelsinkiDateKey(new Date(base));
}

const WEEKDAY_FI: Record<string, string> = {
  Monday: "maanantai",
  Tuesday: "tiistai",
  Wednesday: "keskiviikko",
  Thursday: "torstai",
  Friday: "perjantai",
  Saturday: "lauantai",
  Sunday: "sunnuntai",
};

/** Human-readable “now” block for chatbot system prompts (Helsinki time). */
export function formatHelsinkiNowForPrompt(date: Date = new Date()): {
  nowLabel: string;
  today: string;
  tomorrow: string;
  time: string;
  weekdayFi: string;
} {
  const p = helsinkiParts(date);
  const today = `${p.year}-${p.month}-${p.day}`;
  const tomorrow = addHelsinkiDays(date, 1);
  const time = `${p.hour.padStart(2, "0")}:${p.minute.padStart(2, "0")}`;
  const weekdayFi = WEEKDAY_FI[p.weekday] ?? p.weekday;
  const nowLabel = `${weekdayFi} ${Number(p.day)}.${Number(p.month)}.${p.year} klo ${time}`;
  return { nowLabel, today, tomorrow, time, weekdayFi };
}
