import { Link } from "@tanstack/react-router";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import restadigiLogo from "@/assets/restadigi-logo.png";

const palvelut = [
  { to: "/kotisivut-yrityksille", label: "Verkkosivut" },
  { to: "/diginakyvyys", label: "Näkyvyys ja suunnittelu" },
  { to: "/chatbot", label: "AI-asiakaspalvelu" },
  { to: "/potyvarauspalvelu", label: "Pöytävarauspalvelu" },
] as const;

const toimialat = [
  {
    title: "Areenat, Tapahtumat ja Esiintyjät",
    body: "verkkosivut ja näkyvyys, varaus- ja myyntiratkaisut",
  },
  {
    title: "Hotellit ja Hostellit",
    body: "korkeatasoiset varaustenhallinta- ja myyntiratkaisut, digitaalinen check-in ja viranomaistiedotus, AI-asiakaspalvelu",
  },
  {
    title: "Matkailu ja aktiviteetit",
    body: "varaustenhallinta, näkyvyys- ja myyntiratkaisut, AI-asiakaspalvelu",
  },
  {
    title: "Ravintolat",
    body: "fine diningista fast foodiin — verkkosivut, mobiiliapplikaatiot, pöytävarauspalvelu, AI-asiakaspalvelu",
  },
  {
    title: "Kahvilat ja Kioskit",
    body: "verkkosivut, mobiiliapplikaatio kanta-asiakasohjelmalla",
  },
  {
    title: "Kuntosalit ja Personal trainerit",
    body: "treeniaikataulujen hallintapaneeli kustomoituna sinulle",
  },
  {
    title: "Parturit, Kampaamot ja Hoitolapalvelut",
    body: "modernit verkkosivut ja ajanvaraus",
  },
] as const;

const kielet = [
  { code: "fi", label: "Suomi" },
  { code: "en", label: "Englanti" },
  { code: "es", label: "Espanja" },
] as const;

type MenuKey = "palvelut" | "toimialat" | "kielet" | null;

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopMenu, setDesktopMenu] = useState<MenuKey>(null);
  const [mobileSection, setMobileSection] = useState<MenuKey>(null);
  const [language, setLanguage] = useState<(typeof kielet)[number]["code"]>("fi");
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

  const triggerClass =
    "inline-flex items-center gap-1.5 whitespace-nowrap text-xs tracking-[0.12em] uppercase text-foreground/70 transition-colors hover:text-foreground xl:text-sm";

  return (
    <nav ref={navRef} className="relative z-30 pt-4 pb-3 sm:pt-6 sm:pb-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 pl-2 pr-6 sm:pl-3 lg:pl-1">
        <Link
          to="/"
          className="site-header__brand shrink-0"
          onClick={() => {
            setMobileOpen(false);
            setDesktopMenu(null);
          }}
          aria-label="Restadigi — etusivu"
        >
          <img
            src={restadigiLogo}
            alt="Restadigi — AI ja web"
            width={640}
            height={172}
            className="site-header__logo"
          />
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-5 lg:flex xl:gap-7">
          {/* Palvelut */}
          <div className="relative">
            <button
              type="button"
              className={triggerClass}
              aria-expanded={desktopMenu === "palvelut"}
              aria-controls={`${baseId}-palvelut`}
              onClick={() => toggleDesktop("palvelut")}
            >
              Palvelut
              <Chevron open={desktopMenu === "palvelut"} />
            </button>
            {desktopMenu === "palvelut" && (
              <div
                id={`${baseId}-palvelut`}
                className="absolute left-0 top-full z-40 mt-3 min-w-[16rem] rounded-xl border border-border bg-background p-2 shadow-lg"
              >
                {palvelut.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setDesktopMenu(null)}
                    className="block rounded-lg px-3 py-2.5 text-sm text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
                    activeProps={{ className: "bg-muted text-foreground" }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Toimialat */}
          <div className="relative">
            <button
              type="button"
              className={triggerClass}
              aria-expanded={desktopMenu === "toimialat"}
              aria-controls={`${baseId}-toimialat`}
              onClick={() => toggleDesktop("toimialat")}
            >
              Toimialat
              <Chevron open={desktopMenu === "toimialat"} />
            </button>
            {desktopMenu === "toimialat" && (
              <div
                id={`${baseId}-toimialat`}
                className="absolute right-0 top-full z-40 mt-3 w-[min(36rem,calc(100vw-3rem))] rounded-xl border border-border bg-background p-6 shadow-lg xl:w-[40rem]"
              >
                <div className="mb-4 text-xs uppercase tracking-[0.2em] text-accent">Toimialat</div>
                <ul className="space-y-4">
                  {toimialat.map((item) => (
                    <li key={item.title} className="border-b border-border/70 pb-4 last:border-0 last:pb-0">
                      <div className="text-sm font-medium text-foreground">{item.title}</div>
                      <p className="mt-1 text-sm leading-relaxed text-foreground/60">{item.body}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Kielet */}
          <div className="relative">
            <button
              type="button"
              className={triggerClass}
              aria-expanded={desktopMenu === "kielet"}
              aria-controls={`${baseId}-kielet`}
              onClick={() => toggleDesktop("kielet")}
            >
              Kielet
              <Chevron open={desktopMenu === "kielet"} />
            </button>
            {desktopMenu === "kielet" && (
              <div
                id={`${baseId}-kielet`}
                className="absolute right-0 top-full z-40 mt-3 min-w-[10rem] rounded-xl border border-border bg-background p-2 shadow-lg"
              >
                {kielet.map((item) => (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => {
                      setLanguage(item.code);
                      setDesktopMenu(null);
                    }}
                    className={
                      language === item.code
                        ? "block w-full rounded-lg bg-muted px-3 py-2.5 text-left text-sm text-foreground"
                        : "block w-full rounded-lg px-3 py-2.5 text-left text-sm text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
                    }
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label="Valikko"
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

      {/* Mobile panel */}
      {mobileOpen && (
        <div className="lg:hidden absolute inset-x-0 top-full z-40 border-t border-border bg-background shadow-md">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 py-4 pl-2 pr-6 sm:pl-3">
            <MobileSection
              label="Palvelut"
              open={mobileSection === "palvelut"}
              onToggle={() => toggleMobileSection("palvelut")}
            >
              {palvelut.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => {
                    setMobileOpen(false);
                    setMobileSection(null);
                  }}
                  className="block py-2 text-base text-foreground/80 hover:text-foreground"
                  activeProps={{ className: "text-accent" }}
                >
                  {item.label}
                </Link>
              ))}
            </MobileSection>

            <MobileSection
              label="Toimialat"
              open={mobileSection === "toimialat"}
              onToggle={() => toggleMobileSection("toimialat")}
            >
              <div className="rounded-xl border border-border bg-muted/40 p-4">
                <div className="mb-3 text-[10px] uppercase tracking-[0.2em] text-accent">Toimialat</div>
                <ul className="space-y-3">
                  {toimialat.map((item) => (
                    <li key={item.title}>
                      <div className="text-sm font-medium text-foreground">{item.title}</div>
                      <p className="mt-0.5 text-sm leading-relaxed text-foreground/60">{item.body}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </MobileSection>

            <MobileSection
              label="Kielet"
              open={mobileSection === "kielet"}
              onToggle={() => toggleMobileSection("kielet")}
            >
              {kielet.map((item) => (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => setLanguage(item.code)}
                  className={
                    language === item.code
                      ? "block w-full py-2 text-left text-base text-accent"
                      : "block w-full py-2 text-left text-base text-foreground/80 hover:text-foreground"
                  }
                >
                  {item.label}
                </button>
              ))}
            </MobileSection>
          </div>
        </div>
      )}
    </nav>
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
    <div className="border-b border-border/60 py-2 last:border-0">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-2 text-left text-lg text-foreground"
      >
        {label}
        <Chevron open={open} />
      </button>
      {open && <div className="pb-3 pl-1">{children}</div>}
    </div>
  );
}
