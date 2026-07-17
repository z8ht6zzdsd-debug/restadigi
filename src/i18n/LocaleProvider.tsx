import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { detectLocale, localeDomainUrl, shouldNavigateToLocaleDomain, storeLocale } from "./detect";
import { getMessages, type Messages } from "./messages";
import { LOCALE_META, type Locale } from "./types";

type LocaleContextValue = {
  locale: Locale;
  messages: Messages;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => detectLocale());

  useEffect(() => {
    setLocaleState(detectLocale());
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = LOCALE_META[locale].htmlLang;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    if (typeof window !== "undefined") {
      const host = window.location.hostname;
      if (shouldNavigateToLocaleDomain(host) && next !== detectLocale(host)) {
        window.location.assign(localeDomainUrl(next, window.location.pathname));
        return;
      }
      storeLocale(next);
    }
    setLocaleState(next);
  }, []);

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      messages: getMessages(locale),
      setLocale,
    }),
    [locale, setLocale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return ctx;
}

export function useMessages(): Messages {
  return useLocale().messages;
}
