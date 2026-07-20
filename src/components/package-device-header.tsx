import type { ReactNode } from "react";
import {
  ClaudeMark,
  CopilotMark,
  GeminiMark,
  GoogleAdsMark,
  GoogleAnalyticsMark,
  GoogleBusinessMark,
  GoogleMark,
  OpenaiMark,
} from "@/components/package-brand-logos";
import barberHero from "@/assets/barber-haircut-hero.jpg";
import hotelHero from "@/assets/hero-hotel-web.jpg";
import diningHero from "@/assets/restaurant-dining.jpg";
import coffeeHero from "@/assets/hero-coffee-panel.jpg";
import fineDiningHero from "@/assets/hero-fine-dining.jpg";
import domainhotelliLogo from "@/assets/domainhotelli-logo-white.svg";

export type PackageDeviceMode =
  | "image"
  | "ai-logos"
  | "google-logos"
  | "hosting-logos"
  | "layouts"
  | "site-layouts"
  | "sports";

type PackageDeviceHeaderProps = {
  /** Fallback / single image for all screens (websites, hosting) */
  image?: string;
  /** Up to 4 per-device images (sports, photo layouts) */
  images?: string[];
  mode?: PackageDeviceMode;
  /** Pieni vaihtelu asettelussa pakettien välillä */
  variant?: number;
};

const AI_SCREEN_LOGOS = [
  { name: "ChatGPT", Mark: OpenaiMark, tone: "text-[#412524]" },
  { name: "Claude", Mark: ClaudeMark, tone: "text-[#d97757]" },
  { name: "Gemini", Mark: GeminiMark, tone: "text-[#8E75B2]" },
  { name: "Copilot", Mark: CopilotMark, tone: "text-[#0078D4]" },
] as const;

const GOOGLE_SCREEN_LOGOS = [
  { name: "Google", Mark: GoogleMark },
  { name: "Google Ads", Mark: GoogleAdsMark },
  { name: "Analytics", Mark: GoogleAnalyticsMark },
  { name: "Business", Mark: GoogleBusinessMark },
] as const;

function SslMark({ className = "", title }: { className?: string; title: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} role="img" aria-label={title}>
      <title>{title}</title>
      <path
        fill="currentColor"
        d="M12 1a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V6a5 5 0 0 0-5-5zm0 2a3 3 0 0 1 3 3v3H9V6a3 3 0 0 1 3-3zm0 10a1.75 1.75 0 0 1 .75 3.33V18a.75.75 0 0 1-1.5 0v-1.67A1.75 1.75 0 0 1 12 13z"
      />
    </svg>
  );
}

function WebMark({ className = "", title }: { className?: string; title: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} role="img" aria-label={title}>
      <title>{title}</title>
      <path
        fill="currentColor"
        d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 2c.7 0 2.2 1.6 2.8 5H9.2C9.8 5.6 11.3 4 12 4zm-4.1 7a14 14 0 0 0 0 2h8.2a14 14 0 0 0 0-2H7.9zm1.3 4H14.8c-.6 3.4-2.1 5-2.8 5s-2.2-1.6-2.8-5zM4.7 11c.3-1.4.8-2.7 1.5-3.8A8 8 0 0 0 4.1 11h.6zm0 2h-.6a8 8 0 0 0 2.1 3.8A11 11 0 0 1 4.7 13zm14.6-2h.6a8 8 0 0 0-2.1-3.8c.7 1.1 1.2 2.4 1.5 3.8zm0 2c-.3 1.4-.8 2.7-1.5 3.8a8 8 0 0 0 2.1-3.8h-.6z"
      />
    </svg>
  );
}

function SecurityMark({ className = "", title }: { className?: string; title: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} role="img" aria-label={title}>
      <title>{title}</title>
      <path
        fill="currentColor"
        d="M12 2 4 5v6.5c0 5 3.4 9.4 8 10.5 4.6-1.1 8-5.5 8-10.5V5l-8-3zm0 4.2 4.5 1.7v3.6c0 3.3-2.1 6.3-4.5 7.3-2.4-1-4.5-4-4.5-7.3V7.9L12 6.2z"
      />
    </svg>
  );
}

function LogoScreen({
  name,
  Mark,
  tone = "text-[#432f24]",
  className = "",
}: {
  name: string;
  Mark: (props: { className?: string; title: string }) => ReactNode;
  tone?: string;
  className?: string;
}) {
  return (
    <div className={"pkg-device__screen pkg-device__screen--logo " + className}>
      <div className="pkg-device__logo-panel">
        <Mark title={name} className={"pkg-device__logo-mark " + tone} />
        <span className="pkg-device__logo-name">{name}</span>
      </div>
    </div>
  );
}

function DomainhotelliLogoScreen({ className = "" }: { className?: string }) {
  return (
    <div className={"pkg-device__screen pkg-device__screen--logo " + className}>
      <div className="pkg-device__logo-panel">
        <div className="pkg-device__logo-tile pkg-device__logo-tile--dark">
          <img src={domainhotelliLogo} alt="" aria-hidden className="pkg-device__logo-img" />
        </div>
        <span className="pkg-device__logo-name">Domainhotelli</span>
      </div>
    </div>
  );
}

function HostingLogoScreen({ index, className = "" }: { index: number; className?: string }) {
  if (index === 0) {
    return (
      <LogoScreen
        name="SSL"
        Mark={SslMark}
        tone="text-[#1a7f4b]"
        className={className}
      />
    );
  }
  if (index === 1) {
    return <LogoScreen name="Web" Mark={WebMark} tone="text-[#2563eb]" className={className} />;
  }
  if (index === 2) {
    return (
      <LogoScreen
        name="Suojaus"
        Mark={SecurityMark}
        tone="text-[#432f24]"
        className={className}
      />
    );
  }
  return <DomainhotelliLogoScreen className={className} />;
}

function LayoutScreen({
  variant,
  className = "",
}: {
  variant: 0 | 1 | 2 | 3;
  className?: string;
}) {
  /* 0 = iPhone: kahvimobiilinäkymä (täyttää ruudun kuten muut) */
  if (variant === 0) {
    return (
      <div className={"pkg-device__screen " + className}>
        <div className="pkg-mini pkg-mini--coffee">
          <div className="pkg-mini__nav">
            <span className="pkg-mini__brand">Restadigi</span>
            <span className="pkg-mini__menu" />
          </div>
          <div className="pkg-mini__hero-wrap">
            <img src={coffeeHero} alt="" className="pkg-mini__hero pkg-mini__hero--fill" />
            <div className="pkg-mini__hero-copy">
              <p className="pkg-mini__title">Graafinen suunnittelu</p>
              <p className="pkg-mini__text">Ilme, layout ja materiaalit</p>
            </div>
          </div>
          <div className="pkg-mini__cards-row pkg-mini__cards-row--mobile">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    );
  }

  /* 1 = iPad: diginäkyvyys-hero */
  if (variant === 1) {
    return (
      <div className={"pkg-device__screen " + className}>
        <div className="pkg-mini pkg-mini--dark">
          <div className="pkg-mini__nav pkg-mini__nav--dark">
            <span className="pkg-mini__brand">Restadigi</span>
            <span className="pkg-mini__links">
              <span>Palvelut</span>
              <span>Yhteys</span>
            </span>
          </div>
          <div className="pkg-mini__hero-wrap">
            <img src={diningHero} alt="" className="pkg-mini__hero pkg-mini__hero--fill" />
            <div className="pkg-mini__hero-copy">
              <p className="pkg-mini__title">Diginäkyvyys</p>
              <p className="pkg-mini__text">Löydy, kun asiakas etsii</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* 2 = läppäri: kotisivut */
  if (variant === 2) {
    return (
      <div className={"pkg-device__screen " + className}>
        <div className="pkg-mini pkg-mini--devices">
          <div className="pkg-mini__band">
            <img src={hotelHero} alt="" className="pkg-mini__hero pkg-mini__hero--fill" />
          </div>
          <div className="pkg-mini__copy-block">
            <p className="pkg-mini__kicker">Kotisivut</p>
            <p className="pkg-mini__title pkg-mini__title--lg">Verkkosivut yritykselle</p>
            <span className="pkg-mini__cta">Katso paketit</span>
          </div>
        </div>
      </div>
    );
  }

  /* 3 = ulkoinen näyttö: AI-split */
  return (
    <div className={"pkg-device__screen " + className}>
      <div className="pkg-mini pkg-mini--split">
        <div className="pkg-mini__split-media">
          <img src={barberHero} alt="" className="pkg-mini__hero pkg-mini__hero--fill" />
        </div>
        <div className="pkg-mini__split-panel">
          <p className="pkg-mini__kicker">AI-palvelu</p>
          <p className="pkg-mini__title">Chatbot 24/7</p>
          <p className="pkg-mini__text">Myynti ja asiakaspalvelu</p>
          <span className="pkg-mini__cta">Tutustu</span>
        </div>
      </div>
    </div>
  );
}

function SiteLayoutScreen({
  variant,
  theme = 0,
  className = "",
}: {
  variant: 0 | 1 | 2 | 3;
  theme?: number;
  className?: string;
}) {
  const heroes = [diningHero, fineDiningHero, hotelHero, coffeeHero] as const;
  const hero = heroes[(variant + theme) % heroes.length];
  const brands = ["Atelier", "Garden Table", "Lake House", "Nord Cut"] as const;
  const brand = brands[(variant + theme) % brands.length];

  /* iPhone — mobiilisivu */
  if (variant === 0) {
    return (
      <div className={"pkg-device__screen " + className}>
        <div className="pkg-mini pkg-mini--coffee">
          <div className="pkg-mini__nav">
            <span className="pkg-mini__brand">{brand}</span>
            <span className="pkg-mini__menu" />
          </div>
          <div className="pkg-mini__hero-wrap">
            <img src={hero} alt="" className="pkg-mini__hero pkg-mini__hero--fill" />
            <div className="pkg-mini__hero-copy">
              <p className="pkg-mini__title">Modern cuisine</p>
              <p className="pkg-mini__text">Seasonal · booking online</p>
            </div>
          </div>
          <div className="pkg-mini__cards-row pkg-mini__cards-row--mobile">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    );
  }

  /* iPad */
  if (variant === 1) {
    return (
      <div className={"pkg-device__screen " + className}>
        <div className="pkg-mini pkg-mini--dark">
          <div className="pkg-mini__nav pkg-mini__nav--dark">
            <span className="pkg-mini__brand">{brand}</span>
            <span className="pkg-mini__links">
              <span>Menu</span>
              <span>Book</span>
            </span>
          </div>
          <div className="pkg-mini__hero-wrap">
            <img src={hero} alt="" className="pkg-mini__hero pkg-mini__hero--fill" />
            <div className="pkg-mini__hero-copy">
              <p className="pkg-mini__title">Timeless flavors</p>
              <p className="pkg-mini__text">Reserve a table online</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* Läppäri */
  if (variant === 2) {
    return (
      <div className={"pkg-device__screen " + className}>
        <div className="pkg-mini pkg-mini--devices">
          <div className="pkg-mini__band">
            <img src={hero} alt="" className="pkg-mini__hero pkg-mini__hero--fill" />
          </div>
          <div className="pkg-mini__copy-block">
            <p className="pkg-mini__kicker">{brand}</p>
            <p className="pkg-mini__title pkg-mini__title--lg">Culinary excellence</p>
            <span className="pkg-mini__cta">Reserve</span>
          </div>
        </div>
      </div>
    );
  }

  /* Leveä ulkoinen näyttö */
  return (
    <div className={"pkg-device__screen " + className}>
      <div className="pkg-mini pkg-mini--split">
        <div className="pkg-mini__split-media">
          <img src={hero} alt="" className="pkg-mini__hero pkg-mini__hero--fill" />
        </div>
        <div className="pkg-mini__split-panel">
          <p className="pkg-mini__kicker">{brand}</p>
          <p className="pkg-mini__title">Private dining</p>
          <p className="pkg-mini__text">Events · tasting · wine</p>
          <span className="pkg-mini__cta">Enquire</span>
        </div>
      </div>
    </div>
  );
}

function PhotoScreen({
  image,
  className = "",
  position = "center",
}: {
  image: string;
  className?: string;
  position?: string;
}) {
  return (
    <div className={"pkg-device__screen " + className}>
      <img
        src={image}
        alt=""
        aria-hidden
        className="pkg-device__shot"
        style={{ objectPosition: position }}
      />
    </div>
  );
}

function renderScreen(
  mode: PackageDeviceMode,
  index: number,
  image?: string,
  images?: string[],
  theme = 0,
) {
  const screenClass = [
    "pkg-device__screen--phone",
    "pkg-device__screen--tablet",
    "pkg-device__screen--laptop",
    "pkg-device__screen--monitor",
  ][index];

  if (mode === "ai-logos") {
    const logo = AI_SCREEN_LOGOS[index];
    return (
      <LogoScreen
        name={logo.name}
        Mark={logo.Mark}
        tone={logo.tone}
        className={screenClass}
      />
    );
  }

  if (mode === "google-logos") {
    const logo = GOOGLE_SCREEN_LOGOS[index];
    return <LogoScreen name={logo.name} Mark={logo.Mark} className={screenClass} />;
  }

  if (mode === "hosting-logos") {
    return <HostingLogoScreen index={index} className={screenClass} />;
  }

  if (mode === "layouts") {
    return <LayoutScreen variant={index as 0 | 1 | 2 | 3} className={screenClass} />;
  }

  if (mode === "site-layouts") {
    return (
      <SiteLayoutScreen
        variant={index as 0 | 1 | 2 | 3}
        theme={theme}
        className={screenClass}
      />
    );
  }

  if (mode === "sports") {
    const src = images?.[index] ?? image ?? "";
    return <PhotoScreen image={src} className={screenClass} position="center" />;
  }

  const src = images?.[index] ?? image ?? "";
  return <PhotoScreen image={src} className={screenClass} />;
}

/** Neljä laitetta valkoisella taustalla pakettikorteille */
export function PackageDeviceHeader({
  image,
  images,
  mode = "image",
  variant = 0,
}: PackageDeviceHeaderProps) {
  const tilt = variant % 4;

  return (
    <div className="pkg-device-header">
      <div className="pkg-device-header__stage" aria-hidden>
        {/* iPhone */}
        <div className="pkg-device pkg-device--phone">
          <div className="pkg-device__bezel pkg-device__bezel--phone">
            <span className="pkg-device__island" />
            {renderScreen(mode, 0, image, images, tilt)}
            <span className="pkg-device__home-bar" />
          </div>
        </div>

        {/* iPad */}
        <div className="pkg-device pkg-device--tablet">
          <div className="pkg-device__bezel pkg-device__bezel--tablet">
            <span className="pkg-device__camera" />
            {renderScreen(mode, 1, image, images, tilt)}
          </div>
        </div>

        {/* Tietokone / läppäri */}
        <div className="pkg-device pkg-device--laptop">
          <div className="pkg-device__lid">
            <div className="pkg-device__bezel pkg-device__bezel--laptop">
              <span className="pkg-device__camera pkg-device__camera--laptop" />
              {renderScreen(mode, 2, image, images, tilt)}
            </div>
          </div>
          <div className="pkg-device__keyboard">
            <span className="pkg-device__trackpad" />
          </div>
        </div>

        {/* Leveä ulkoinen näyttö */}
        <div className="pkg-device pkg-device--monitor">
          <div className="pkg-device__bezel pkg-device__bezel--monitor">
            {renderScreen(mode, 3, image, images, tilt)}
          </div>
          <div className="pkg-device__neck" />
          <div className="pkg-device__foot" />
        </div>
      </div>
    </div>
  );
}
