/** First-party cookie / localStorage consent (ePrivacy + GDPR). */

export const CONSENT_STORAGE_KEY = "restadigi_cookie_consent_v1";

export type CookieCategories = {
  necessary: true;
  preferences: boolean;
  statistics: boolean;
  marketing: boolean;
};

export type CookieConsentState = CookieCategories & {
  consentId: string;
  acceptedAt: string;
};

export const DEFAULT_CATEGORIES: CookieCategories = {
  necessary: true,
  preferences: false,
  statistics: false,
  marketing: false,
};

export function createConsentId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `rdg-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

export function readStoredConsent(): CookieConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<CookieConsentState>;
    if (!parsed.consentId || !parsed.acceptedAt) return null;
    return {
      necessary: true,
      preferences: Boolean(parsed.preferences),
      statistics: Boolean(parsed.statistics),
      marketing: Boolean(parsed.marketing),
      consentId: String(parsed.consentId),
      acceptedAt: String(parsed.acceptedAt),
    };
  } catch {
    return null;
  }
}

export function writeStoredConsent(categories: CookieCategories): CookieConsentState {
  const existing = readStoredConsent();
  const next: CookieConsentState = {
    necessary: true,
    preferences: categories.preferences,
    statistics: categories.statistics,
    marketing: categories.marketing,
    consentId: existing?.consentId ?? createConsentId(),
    acceptedAt: new Date().toISOString(),
  };
  localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(next));
  return next;
}

export function clearStoredConsent() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CONSENT_STORAGE_KEY);
}
