import { Link } from "@tanstack/react-router";
import {
  Bookmark,
  CalendarDays,
  Coffee,
  Dumbbell,
  Eye,
  Globe,
  Hotel,
  Mail,
  MessageCircle,
  Mic2,
  Palette,
  Plane,
  Scissors,
  Server,
  Tags,
  Users,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import restadigiLogo from "@/assets/restadigi-logo.png";
import { LocaleFlag, useLocale, useMessages, type Locale } from "@/i18n";
import { cn } from "@/lib/utils";

type MenuKey = "palvelut" | "toimialat" | "kielet" | "yhteys" | null;

const SERVICE_PATHS = [
  "/verkkosivut",
  "/restatable",
  "/majoitusvaraus",
  "/restachat",
  "/nakyvyys",
  "/graafinen-suunnittelu",
  "/yllapito",
] as const;

type ServicePath = (typeof SERVICE_PATHS)[number];

const SERVICE_ICONS: Record<ServicePath, LucideIcon> = {
  "/verkkosivut": Globe,
  "/restatable": CalendarDays,
  "/majoitusvaraus": Bookmark,
  "/restachat": MessageCircle,
  "/nakyvyys": Eye,
  "/graafinen-suunnittelu": Palette,
  "/yllapito": Server,
};

const INDUSTRY_ICONS: LucideIcon[] = [
  Mic2,
  Hotel,
  Plane,
  UtensilsCrossed,
  Coffee,
  Dumbbell,
  Scissors,
];

const CONTACT_ICONS: LucideIcon[] = [Mail, Users, Tags];

function isServicePath(to: string): to is ServicePath {
  return (SERVICE_PATHS as readonly string[]).includes(to);
}

export function SiteHeader() {
  const t = useMessages();
  const { locale, setLocale } = useLocale();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopMenu, setDesktopMenu] = useState<MenuKey>(null);
  const [mobileSection, setMobileSection] = useState<MenuKey>(null);
  const navRef = useRef<HTMLElement>(null);
  const baseId = useId();

  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      if (!navRef.current?.contains(e.target as Node)) {
        setDesktopMenu(null);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setDesktopMenu(null);
        setMobileOpen(false);
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  function toggleDesktop(key: Exclude<MenuKey, null>) {
    setDesktopMenu((cur) => (cur === key ? null : key));
  }

  function toggleMobileSection(key: Exclude<MenuKey, null>) {
    setMobileSection((cur) => (cur === key ? null : key));
  }

  function pickLanguage(code: Locale) {
    setLocale(code);
    setDesktopMenu(null);
    setMobileOpen(false);
    setMobileSection(null);
  }

  function closeAll() {
    setDesktopMenu(null);
    setMobileOpen(false);
    setMobileSection(null);
  }

  const triggerClass =
    "inline-flex items-center gap-1.5 whitespace-nowrap text-xs tracking-[0.12em] uppercase text-foreground/70 transition-colors hover:text-foreground xl:text-sm";
  const triggerOpenClass = "text-[#c46a32]";

  return (
    <nav ref={navRef} className="relative z-30 pt-4 pb-3 sm:pt-6 sm:pb-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 pl-2 pr-6 sm:pl-3 lg:pl-1">
        <Link
          to="/"
          className="site-header__brand shrink-0"
          onClick={closeAll}
          aria-label={t.header.homeAria}
        >
          <img
            src={restadigiLogo}
            alt={t.header.logoAlt}
            width={640}
            height={172}
            className="site-header__logo"
          />
        </Link>

        <div className="hidden items-center gap-5 lg:flex xl:gap-7">
          <button
            type="button"
            className={cn(triggerClass, desktopMenu === "palvelut" && triggerOpenClass)}
            aria-expanded={desktopMenu === "palvelut"}
            aria-controls={`${baseId}-palvelut`}
            onClick={() => toggleDesktop("palvelut")}
          >
            {t.header.services}
            <Chevron open={desktopMenu === "palvelut"} />
          </button>

          <button
            type="button"
            className={cn(triggerClass, desktopMenu === "toimialat" && triggerOpenClass)}
            aria-expanded={desktopMenu === "toimialat"}
            aria-controls={`${baseId}-toimialat`}
            onClick={() => toggleDesktop("toimialat")}
          >
            {t.header.industries}
            <Chevron open={desktopMenu === "toimialat"} />
          </button>

          <Link
            to="/hinnasto"
            className={triggerClass}
            onClick={() => setDesktopMenu(null)}
            activeProps={{ className: "text-foreground" }}
          >
            {t.header.pricing}
          </Link>

          <div className="relative">
            <button
              type="button"
              className={cn(triggerClass, "gap-2", desktopMenu === "kielet" && triggerOpenClass)}
              aria-expanded={desktopMenu === "kielet"}
              aria-controls={`${baseId}-kielet`}
              onClick={() => toggleDesktop("kielet")}
              aria-label={t.header.languages}
            >
              <LocaleFlag locale={locale} className="size-4 rounded-[2px] ring-1 ring-border/60" />
              <span className="uppercase tracking-[0.12em]">{locale}</span>
              <Chevron open={desktopMenu === "kielet"} />
            </button>
            {desktopMenu === "kielet" && (
              <div
                id={`${baseId}-kielet`}
                className="absolute right-0 top-full z-40 mt-3 min-w-[11rem] overflow-hidden rounded-2xl border border-[#e8dfd4] bg-white p-2 shadow-[0_18px_50px_rgba(42,32,24,0.14)]"
              >
                {t.header.languagesList.map((item) => (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => pickLanguage(item.code)}
                    className={cn(
                      "flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm transition-colors",
                      locale === item.code
                        ? "bg-[#f3eee8] text-[#2a2018]"
                        : "text-[#5c534c] hover:bg-[#f7f3ee] hover:text-[#2a2018]",
                    )}
                  >
                    <LocaleFlag
                      locale={item.code}
                      className="size-5 rounded-[2px] ring-1 ring-border/50"
                    />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            className={cn(triggerClass, desktopMenu === "yhteys" && triggerOpenClass)}
            aria-expanded={desktopMenu === "yhteys"}
            aria-controls={`${baseId}-yhteys`}
            onClick={() => toggleDesktop("yhteys")}
          >
            {t.header.contact}
            <Chevron open={desktopMenu === "yhteys"} />
          </button>
        </div>

        <button
          type="button"
          aria-label={t.header.menu}
          aria-expanded={mobileOpen}
          onClick={() => {
            setMobileOpen((o) => !o);
            setDesktopMenu(null);
          }}
          className="lg:hidden inline-flex items-center justify-center size-9 -mr-2"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="size-6"
          >
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {desktopMenu === "palvelut" && (
        <MegaPanel id={`${baseId}-palvelut`}>
          <MegaIntro title={t.header.services} body={t.header.servicesIntro} />
          <div className="grid gap-1 p-3 sm:grid-cols-2 sm:p-4">
            {t.header.servicesList.map((item) => {
              if (!isServicePath(item.to)) return null;
              const Icon = SERVICE_ICONS[item.to];
              return (
                <MegaLink
                  key={item.to}
                  to={item.to}
                  title={item.label}
                  body={item.body}
                  Icon={Icon}
                  onNavigate={closeAll}
                />
              );
            })}
          </div>
        </MegaPanel>
      )}

      {desktopMenu === "toimialat" && (
        <MegaPanel id={`${baseId}-toimialat`}>
          <MegaIntro title={t.header.industries} body={t.header.industriesIntro} />
          <div className="max-h-[min(70vh,28rem)] space-y-0.5 overflow-y-auto p-3 sm:p-4">
            {t.header.industriesList.map((item, i) => {
              const Icon = INDUSTRY_ICONS[i % INDUSTRY_ICONS.length] ?? UtensilsCrossed;
              return (
                <div
                  key={item.title}
                  className="flex gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-[#f7f3ee]"
                >
                  <MegaIcon Icon={Icon} />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold tracking-tight text-[#2a2018]">
                      {item.title}
                    </p>
                    <p className="mt-0.5 text-sm leading-relaxed text-[#5c534c]">{item.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </MegaPanel>
      )}

      {desktopMenu === "yhteys" && (
        <MegaPanel id={`${baseId}-yhteys`}>
          <MegaIntro
            title={t.header.contact}
            body={t.header.contactIntro}
            accent
            cta={
              <Link
                to="/yhteys"
                onClick={closeAll}
                className="mt-6 inline-flex items-center rounded-full bg-[#c46a32] px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                {t.header.contactCta}
              </Link>
            }
          />
          <div className="space-y-1 p-3 sm:p-4">
            {t.header.contactLinks.map((item, i) => {
              const Icon = CONTACT_ICONS[i % CONTACT_ICONS.length] ?? Mail;
              return (
                <MegaLink
                  key={item.to}
                  to={item.to as "/yhteys" | "/meista" | "/hinnasto"}
                  title={item.title}
                  body={item.body}
                  Icon={Icon}
                  onNavigate={closeAll}
                />
              );
            })}
            <div className="mt-3 rounded-xl border border-[#e8dfd4] bg-[#fbf8f4] px-3 py-3">
              <p className="text-sm font-semibold text-[#2a2018]">{t.header.contactPanel.person}</p>
              <a
                href={`mailto:${t.header.contactPanel.email}`}
                className="mt-1 block text-sm text-[#c46a32] hover:underline"
              >
                {t.header.contactPanel.email}
              </a>
              <a
                href={`tel:${t.header.contactPanel.phoneTel}`}
                className="mt-0.5 block text-sm text-[#5c534c] hover:text-[#2a2018]"
              >
                {t.header.contactPanel.phoneDisplay}
              </a>
            </div>
          </div>
        </MegaPanel>
      )}

      {mobileOpen && (
        <div className="lg:hidden absolute inset-x-0 top-full z-40 border-t border-[#e8dfd4] bg-white shadow-md">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 py-4 pl-2 pr-6 sm:pl-3">
            <MobileSection
              label={t.header.services}
              open={mobileSection === "palvelut"}
              onToggle={() => toggleMobileSection("palvelut")}
            >
              <p className="mb-3 text-sm leading-relaxed text-[#5c534c]">
                {t.header.servicesIntro}
              </p>
              {t.header.servicesList.map((item) =>
                isServicePath(item.to) ? (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={closeAll}
                    className="block border-b border-[#eee8e0] py-3 last:border-0"
                    activeProps={{ className: "text-accent" }}
                  >
                    <span className="block text-base font-semibold text-[#2a2018]">
                      {item.label}
                    </span>
                    <span className="mt-0.5 block text-sm text-[#5c534c]">{item.body}</span>
                  </Link>
                ) : null,
              )}
            </MobileSection>

            <MobileSection
              label={t.header.industries}
              open={mobileSection === "toimialat"}
              onToggle={() => toggleMobileSection("toimialat")}
            >
              <div className="rounded-2xl bg-[#f3eee8] p-4">
                <p className="mb-4 text-sm leading-relaxed text-[#5c534c]">
                  {t.header.industriesIntro}
                </p>
                <ul className="space-y-3">
                  {t.header.industriesList.map((item) => (
                    <li key={item.title}>
                      <div className="text-sm font-semibold text-[#2a2018]">{item.title}</div>
                      <p className="mt-1 text-sm leading-relaxed text-[#5c534c]">{item.body}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </MobileSection>

            <Link
              to="/hinnasto"
              onClick={closeAll}
              className="border-b border-[#eee8e0] py-4 text-lg text-[#2a2018]"
              activeProps={{ className: "text-accent" }}
            >
              {t.header.pricing}
            </Link>

            <MobileSection
              label={t.header.languages}
              open={mobileSection === "kielet"}
              onToggle={() => toggleMobileSection("kielet")}
            >
              {t.header.languagesList.map((item) => (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => pickLanguage(item.code)}
                  className={cn(
                    "flex w-full items-center gap-2.5 py-2 text-left text-base",
                    locale === item.code ? "text-accent" : "text-[#5c534c] hover:text-[#2a2018]",
                  )}
                >
                  <LocaleFlag
                    locale={item.code}
                    className="size-5 rounded-[2px] ring-1 ring-border/50"
                  />
                  <span>{item.label}</span>
                </button>
              ))}
            </MobileSection>

            <MobileSection
              label={t.header.contact}
              open={mobileSection === "yhteys"}
              onToggle={() => toggleMobileSection("yhteys")}
            >
              <div className="rounded-2xl bg-[#f3eee8] p-4">
                <p className="mb-4 text-sm leading-relaxed text-[#5c534c]">
                  {t.header.contactIntro}
                </p>
                {t.header.contactLinks.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to as "/yhteys" | "/meista" | "/hinnasto"}
                    onClick={closeAll}
                    className="mb-3 block last:mb-0"
                  >
                    <span className="block text-sm font-semibold text-[#2a2018]">{item.title}</span>
                    <span className="mt-0.5 block text-sm text-[#5c534c]">{item.body}</span>
                  </Link>
                ))}
                <Link
                  to="/yhteys"
                  onClick={closeAll}
                  className="mt-4 inline-flex rounded-full bg-[#c46a32] px-5 py-2.5 text-sm font-semibold text-white"
                >
                  {t.header.contactCta}
                </Link>
              </div>
            </MobileSection>
          </div>
        </div>
      )}
    </nav>
  );
}

function MegaPanel({ id, children }: { id: string; children: ReactNode }) {
  return (
    <div
      id={id}
      className="absolute left-1/2 top-[calc(100%-2.25cm)] z-40 hidden w-[min(52rem,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden rounded-2xl border border-[#e8dfd4] bg-white shadow-[0_22px_60px_rgba(42,32,24,0.16)] lg:block"
    >
      <div className="grid lg:grid-cols-[0.95fr_1.15fr]">{children}</div>
    </div>
  );
}

function MegaIntro({
  title,
  body,
  cta,
  accent,
}: {
  title: string;
  body: string;
  cta?: ReactNode;
  accent?: boolean;
}) {
  return (
    <aside className="relative overflow-hidden bg-[#f3eee8] p-6 sm:p-8">
      <div
        className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-[#c46a32]/15"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-10 -left-6 size-40 rounded-full bg-[#432f24]/10"
        aria-hidden
      />
      <div className="relative">
        <h2
          className={cn(
            "font-serif text-3xl tracking-tight sm:text-4xl",
            accent ? "text-[#c46a32]" : "text-[#432f24]",
          )}
        >
          {title}
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-[#5c534c] sm:text-[0.95rem]">{body}</p>
        {cta}
      </div>
    </aside>
  );
}

function MegaIcon({ Icon }: { Icon: LucideIcon }) {
  return (
    <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-[#432f24] text-[#c46a32] ring-1 ring-[#c46a32]/25">
      <Icon className="size-4" strokeWidth={1.75} />
    </span>
  );
}

function MegaLink({
  to,
  title,
  body,
  Icon,
  onNavigate,
}: {
  to: ServicePath | "/yhteys" | "/meista" | "/hinnasto";
  title: string;
  body: string;
  Icon: LucideIcon;
  onNavigate: () => void;
}) {
  return (
    <Link
      to={to}
      onClick={onNavigate}
      className="flex gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-[#f7f3ee]"
    >
      <MegaIcon Icon={Icon} />
      <span className="min-w-0">
        <span className="block text-sm font-semibold tracking-tight text-[#2a2018]">{title}</span>
        <span className="mt-0.5 block text-sm leading-relaxed text-[#5c534c]">{body}</span>
      </span>
    </Link>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={`size-3.5 transition-transform ${open ? "rotate-180" : ""}`}
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
    </svg>
  );
}

function MobileSection({
  label,
  open,
  onToggle,
  children,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  return (
    <div className="border-b border-[#eee8e0] py-2 last:border-0">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-2 text-left text-lg text-[#2a2018]"
      >
        {label}
        <Chevron open={open} />
      </button>
      {open && <div className="pb-3 pl-1">{children}</div>}
    </div>
  );
}
