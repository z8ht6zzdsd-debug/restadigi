import { useRouterState } from "@tanstack/react-router";
import { Check, Cookie, Lock, X } from "lucide-react";
import { useEffect, useState } from "react";

import { useCookieConsent } from "@/components/cookie-consent-provider";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useLocale, useMessages } from "@/i18n";
import { DEFAULT_CATEGORIES, type CookieCategories } from "@/lib/cookie-consent";
import { cn } from "@/lib/utils";

function formatConsentDate(iso: string, locale: string) {
  try {
    return new Date(iso).toLocaleString(
      locale === "es" ? "es-ES" : locale === "en" ? "en-GB" : "fi-FI",
    );
  } catch {
    return iso;
  }
}

export function CookieConsentUI() {
  const t = useMessages();
  const { locale } = useLocale();
  const c = t.cookies;
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const {
    ready,
    consent,
    hasResponded,
    panelOpen,
    openPanel,
    closePanel,
    acceptAll,
    acceptNecessaryOnly,
    saveCategories,
    withdrawConsent,
  } = useCookieConsent();

  const [draft, setDraft] = useState<CookieCategories>(DEFAULT_CATEGORIES);
  const [detailsOpen, setDetailsOpen] = useState(true);

  useEffect(() => {
    if (consent) {
      setDraft({
        necessary: true,
        preferences: consent.preferences,
        statistics: consent.statistics,
        marketing: consent.marketing,
      });
    } else {
      setDraft({ ...DEFAULT_CATEGORIES });
    }
  }, [consent, panelOpen]);

  if (!ready || pathname.startsWith("/dashboard")) return null;

  return (
    <>
      {/* Floating cookie button — bottom left */}
      <button
        type="button"
        onClick={openPanel}
        aria-label={c.openAria}
        className="fixed bottom-6 left-6 z-[60] flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <Cookie className="size-5" aria-hidden />
      </button>

      {/* First-visit banner */}
      {!hasResponded && !panelOpen ? (
        <div className="fixed inset-x-0 bottom-0 z-[70] border-t border-border bg-card/95 p-4 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] backdrop-blur-md sm:p-5">
          <div className="mx-auto flex max-w-5xl flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl space-y-2">
              <p className="text-sm font-medium text-foreground">{c.bannerTitle}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">{c.bannerBody}</p>
              <p className="text-xs text-muted-foreground">
                <a
                  href="/tietosuoja"
                  className="underline underline-offset-2 hover:text-foreground"
                >
                  {c.privacyLink}
                </a>
                {" · "}
                <a href="/evasteet" className="underline underline-offset-2 hover:text-foreground">
                  {c.cookiePolicyLink}
                </a>
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-end">
              <Button type="button" variant="outline" size="sm" onClick={acceptNecessaryOnly}>
                {c.necessaryOnly}
              </Button>
              <Button type="button" variant="outline" size="sm" onClick={openPanel}>
                {c.settings}
              </Button>
              <Button type="button" size="sm" onClick={acceptAll}>
                {c.acceptAll}
              </Button>
            </div>
          </div>
        </div>
      ) : null}

      {/* Settings panel — KalPa / Cookiebot style */}
      {panelOpen ? (
        <div className="fixed inset-0 z-[80]">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            aria-label={c.closeAria}
            onClick={closePanel}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-settings-title"
            className="absolute bottom-20 left-4 right-4 max-h-[min(80vh,560px)] overflow-y-auto rounded-xl border border-white/10 bg-[#1a1512] text-[#f7f3ee] shadow-2xl sm:left-6 sm:right-auto sm:w-[min(100%,380px)]"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-[#1a1512] px-4 py-3">
              <h2 id="cookie-settings-title" className="text-base font-semibold">
                {c.panelTitle}
              </h2>
              <button
                type="button"
                onClick={closePanel}
                className="rounded-md p-1 text-white/80 hover:bg-white/10 hover:text-white"
                aria-label={c.closeAria}
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="space-y-4 px-4 py-4">
              <p className="text-sm leading-relaxed text-white/75">{c.panelIntro}</p>

              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-white/50">
                  {c.currentStatus}
                </p>
                <ul className="space-y-2 text-sm">
                  <StatusRow
                    label={c.categories.necessary}
                    locked
                    enabled
                    onLabel={c.on}
                    offLabel={c.off}
                  />
                  <StatusRow
                    label={c.categories.preferences}
                    enabled={draft.preferences}
                    onLabel={c.on}
                    offLabel={c.off}
                  />
                  <StatusRow
                    label={c.categories.statistics}
                    enabled={draft.statistics}
                    onLabel={c.on}
                    offLabel={c.off}
                  />
                  <StatusRow
                    label={c.categories.marketing}
                    enabled={draft.marketing}
                    onLabel={c.on}
                    offLabel={c.off}
                  />
                </ul>
              </div>

              <div className="space-y-3 rounded-lg bg-white/5 p-3">
                <CategoryToggle
                  title={c.categories.necessary}
                  description={c.categoryHelp.necessary}
                  checked
                  locked
                  onLabel={c.alwaysOn}
                />
                <CategoryToggle
                  title={c.categories.preferences}
                  description={c.categoryHelp.preferences}
                  checked={draft.preferences}
                  onCheckedChange={(v) => setDraft((d) => ({ ...d, preferences: v }))}
                />
                <CategoryToggle
                  title={c.categories.statistics}
                  description={c.categoryHelp.statistics}
                  checked={draft.statistics}
                  onCheckedChange={(v) => setDraft((d) => ({ ...d, statistics: v }))}
                />
                <CategoryToggle
                  title={c.categories.marketing}
                  description={c.categoryHelp.marketing}
                  checked={draft.marketing}
                  onCheckedChange={(v) => setDraft((d) => ({ ...d, marketing: v }))}
                />
              </div>

              <button
                type="button"
                className="flex w-full items-center justify-between text-sm font-medium text-white/90"
                onClick={() => setDetailsOpen((v) => !v)}
              >
                {detailsOpen ? c.hideDetails : c.showDetails}
                <span className="text-xs text-white/50">{detailsOpen ? "▴" : "▾"}</span>
              </button>

              {detailsOpen ? (
                <div className="space-y-2 rounded-lg bg-[#2a2420] px-3 py-3 text-xs text-white/70">
                  <p>
                    <span className="text-white/45">{c.acceptedAt}: </span>
                    {consent ? formatConsentDate(consent.acceptedAt, locale) : "—"}
                  </p>
                  <p className="break-all">
                    <span className="text-white/45">{c.consentId}: </span>
                    {consent?.consentId ?? "—"}
                  </p>
                  <p>
                    <a href="/evasteet" className="underline underline-offset-2 hover:text-white">
                      {c.cookiePolicyLink}
                    </a>
                    {" · "}
                    <a href="/tietosuoja" className="underline underline-offset-2 hover:text-white">
                      {c.privacyLink}
                    </a>
                  </p>
                </div>
              ) : null}
            </div>

            <div className="sticky bottom-0 flex flex-col gap-2 border-t border-white/10 bg-[#1a1512] p-3 sm:flex-row">
              {hasResponded ? (
                <button
                  type="button"
                  onClick={withdrawConsent}
                  className="flex-1 rounded-md bg-[#c5bfb6] px-3 py-2.5 text-sm font-medium text-[#1a1512] hover:bg-[#d4cfc7]"
                >
                  {c.withdraw}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={acceptNecessaryOnly}
                  className="flex-1 rounded-md bg-[#c5bfb6] px-3 py-2.5 text-sm font-medium text-[#1a1512] hover:bg-[#d4cfc7]"
                >
                  {c.necessaryOnly}
                </button>
              )}
              <button
                type="button"
                onClick={() => saveCategories(draft)}
                className="flex-1 rounded-md bg-[#e8b923] px-3 py-2.5 text-sm font-semibold text-[#1a1512] hover:bg-[#f0c63a]"
              >
                {hasResponded ? c.saveChanges : c.saveChoices}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function StatusRow({
  label,
  enabled,
  locked,
  onLabel,
  offLabel,
}: {
  label: string;
  enabled: boolean;
  locked?: boolean;
  onLabel: string;
  offLabel: string;
}) {
  return (
    <li className="flex items-center justify-between gap-3">
      <span className="flex items-center gap-2">
        {locked ? (
          <Lock className="size-3.5 text-[#e8b923]" aria-hidden />
        ) : enabled ? (
          <Check className="size-3.5 text-[#e8b923]" aria-hidden />
        ) : (
          <X className="size-3.5 text-white/50" aria-hidden />
        )}
        {label}
      </span>
      <span className={cn("text-xs", enabled ? "text-[#e8b923]" : "text-white/45")}>
        {enabled ? onLabel : offLabel}
      </span>
    </li>
  );
}

function CategoryToggle({
  title,
  description,
  checked,
  locked,
  onCheckedChange,
  onLabel,
}: {
  title: string;
  description: string;
  checked: boolean;
  locked?: boolean;
  onCheckedChange?: (v: boolean) => void;
  onLabel?: string;
}) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-3 last:border-0 last:pb-0">
      <div className="min-w-0">
        <p className="text-sm font-medium text-white">{title}</p>
        <p className="mt-0.5 text-xs leading-snug text-white/55">{description}</p>
        {locked && onLabel ? <p className="mt-1 text-[11px] text-[#e8b923]">{onLabel}</p> : null}
      </div>
      {locked ? (
        <Lock className="mt-1 size-4 shrink-0 text-[#e8b923]" aria-hidden />
      ) : (
        <Switch
          checked={checked}
          onCheckedChange={onCheckedChange}
          className="mt-0.5 data-[state=checked]:bg-[#e8b923]"
        />
      )}
    </div>
  );
}
