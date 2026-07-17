import { DEFAULT_LOCALE, isLocale, LOCALE_DOMAINS, type Locale } from "./types";

const STORAGE_KEY = "restadigi-locale";

/** Map hostname TLD / host to locale for .fi / .com / .es. */
export function localeFromHostname(hostname: string): Locale | null {
  const host = hostname.toLowerCase().replace(/^www\./, "");

  if (host.endsWith(".fi") || host === "restadigi.fi") return "fi";
  if (host.endsWith(".es") || host === "restadigi.es") return "es";
  if (host.endsWith(".com") || host === "restadigi.com") return "en";

  return null;
}

export function readStoredLocale(): Locale | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return isLocale(stored) ? stored : null;
  } catch {
    return null;
  }
}

export function storeLocale(locale: Locale) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    /* ignore */
  }
}

/**
 * Resolve active locale:
 * 1) Domain (.fi / .es / .com) when on a production host
 * 2) Manual choice in localStorage (preview / single-host)
 * 3) Default Finnish
 */
export function detectLocale(hostname?: string): Locale {
  const host = hostname ?? (typeof window !== "undefined" ? window.location.hostname : "");
  const fromHost = host ? localeFromHostname(host) : null;
  if (fromHost) return fromHost;

  const stored = readStoredLocale();
  if (stored) return stored;

  return DEFAULT_LOCALE;
}

/** True when language switch should navigate to another domain. */
export function shouldNavigateToLocaleDomain(hostname: string): boolean {
  return localeFromHostname(hostname) !== null;
}

export function localeDomainUrl(locale: Locale, pathname: string): string {
  const base = LOCALE_DOMAINS[locale].replace(/\/$/, "");
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${base}${path}`;
}
