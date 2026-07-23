import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  clearStoredConsent,
  DEFAULT_CATEGORIES,
  readStoredConsent,
  writeStoredConsent,
  type CookieCategories,
  type CookieConsentState,
} from "@/lib/cookie-consent";

type CookieConsentContextValue = {
  ready: boolean;
  consent: CookieConsentState | null;
  hasResponded: boolean;
  panelOpen: boolean;
  openPanel: () => void;
  closePanel: () => void;
  acceptAll: () => void;
  acceptNecessaryOnly: () => void;
  saveCategories: (categories: CookieCategories) => void;
  withdrawConsent: () => void;
};

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [consent, setConsent] = useState<CookieConsentState | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);

  useEffect(() => {
    setConsent(readStoredConsent());
    setReady(true);
  }, []);

  const acceptAll = useCallback(() => {
    setConsent(
      writeStoredConsent({
        necessary: true,
        preferences: true,
        statistics: true,
        marketing: true,
      }),
    );
    setPanelOpen(false);
  }, []);

  const acceptNecessaryOnly = useCallback(() => {
    setConsent(writeStoredConsent({ ...DEFAULT_CATEGORIES }));
    setPanelOpen(false);
  }, []);

  const saveCategories = useCallback((categories: CookieCategories) => {
    setConsent(
      writeStoredConsent({
        necessary: true,
        preferences: categories.preferences,
        statistics: categories.statistics,
        marketing: categories.marketing,
      }),
    );
    setPanelOpen(false);
  }, []);

  const withdrawConsent = useCallback(() => {
    clearStoredConsent();
    setConsent(null);
    setPanelOpen(true);
  }, []);

  const value = useMemo<CookieConsentContextValue>(
    () => ({
      ready,
      consent,
      hasResponded: consent !== null,
      panelOpen,
      openPanel: () => setPanelOpen(true),
      closePanel: () => setPanelOpen(false),
      acceptAll,
      acceptNecessaryOnly,
      saveCategories,
      withdrawConsent,
    }),
    [ready, consent, panelOpen, acceptAll, acceptNecessaryOnly, saveCategories, withdrawConsent],
  );

  return <CookieConsentContext.Provider value={value}>{children}</CookieConsentContext.Provider>;
}

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) {
    throw new Error("useCookieConsent must be used within CookieConsentProvider");
  }
  return ctx;
}
