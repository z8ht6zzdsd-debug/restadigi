import { Link } from "@tanstack/react-router";
import {
  Bot,
  CalendarDays,
  CirclePlus,
  Crown,
  Gem,
  Globe,
  Mail,
  Rocket,
  Search,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const PACKAGE_ICONS: LucideIcon[] = [Rocket, CirclePlus, Crown, Gem];

/** Feature marks under price — icons only, no labels/background. */
const PACKAGE_FEATURE_ICONS: LucideIcon[][] = [
  [Globe, Smartphone, Search, Mail], // Start
  [Globe, Smartphone, Search, Mail], // Plus
  [Globe, Bot, Search, Mail], // Kulta
  [Globe, Bot, CalendarDays, Mail], // Timantti
];

const PACKAGE_ACCENTS = [
  "text-[#2f6b4f]", // Start — green
  "text-[#c46a32]", // Plus — orange
  "text-[#6b3d8f]", // Kulta — purple
  "text-[#2a5f8f]", // Timantti — blue
] as const;

const LAPTOP_TONES = [
  "from-[#d4c4a8] via-[#c4b090] to-[#a89070]", // warm gold
  "from-[#c8c8c8] via-[#9a9a9a] to-[#707070]", // slate blue
  "from-[#c8c4c0] via-[#a8a4a0] to-[#888480]", // silver
  "from-[#3a3530] via-[#2a2622] to-[#1a1714]", // dark
] as const;

type WebsitePackage = {
  name: string;
  tagline: string;
  summary: string;
  price: string;
  featured?: boolean;
  bullets: string[];
};

export function WebsitesPackageShowcase({
  packagesTitle,
  packages,
  requestQuote,
  footnote,
}: {
  packagesTitle: string;
  packages: WebsitePackage[];
  requestQuote: string;
  popular: string;
  footnote: ReactNode;
}) {
  return (
    <section id="verkkosivu-paketit" className="bg-white text-[#1d1d1f]">
      <div className="mx-auto max-w-5xl px-6 pt-12 pb-6 sm:pt-16 sm:pb-8">
        <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          {packagesTitle}
        </h2>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-16 px-6 pb-16 sm:gap-24 sm:pb-24 lg:gap-28">
        {packages.map((pkg, i) => {
          const imageLeft = i % 2 === 0;
          const accent = PACKAGE_ACCENTS[i % PACKAGE_ACCENTS.length];
          const tone = LAPTOP_TONES[i % LAPTOP_TONES.length];
          const Icon = PACKAGE_ICONS[i % PACKAGE_ICONS.length];
          const featureIcons = PACKAGE_FEATURE_ICONS[i % PACKAGE_FEATURE_ICONS.length];

          const laptop = (
            <PackageLaptop
              name={pkg.name}
              summary={pkg.summary}
              price={pkg.price}
              tone={tone}
              accent={accent}
              Icon={Icon}
              featureIcons={featureIcons}
            />
          );
          const copy = (
            <div className="max-w-md">
              <h3 className="sr-only">{pkg.name}</h3>
              <ul className="space-y-2.5">
                {pkg.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex gap-2.5 text-sm leading-relaxed text-[#1d1d1f]/75"
                  >
                    <span
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-[#c46a32]"
                      aria-hidden
                    />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/form"
                className="mt-7 inline-flex items-center justify-center rounded-full bg-[#432f24] px-6 py-3 text-sm font-bold uppercase tracking-[0.06em] text-[#f7f3ee] transition-opacity hover:opacity-90"
              >
                {requestQuote}
              </Link>
            </div>
          );

          return (
            <article key={pkg.name} className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
              {/* Mobile: laptop always first. Desktop: alternate sides via order. */}
              <div className={cn(!imageLeft && "lg:order-2")}>{laptop}</div>
              <div className={cn(!imageLeft && "lg:order-1")}>{copy}</div>
            </article>
          );
        })}
      </div>

      <div className="mx-auto max-w-3xl px-6 pb-16 text-center text-sm leading-relaxed text-[#1d1d1f]/55">
        {footnote}
      </div>
    </section>
  );
}

function PackageLaptop({
  name,
  summary,
  price,
  tone,
  accent,
  Icon,
  featureIcons,
}: {
  name: string;
  summary: string;
  price: string;
  tone: string;
  accent: string;
  Icon: LucideIcon;
  featureIcons: LucideIcon[];
}) {
  return (
    <div className="relative mx-auto w-full max-w-lg" aria-hidden>
      <div
        className={cn(
          "relative overflow-hidden rounded-[0.75rem] bg-gradient-to-b p-[0.55rem] shadow-[0_28px_60px_-18px_rgba(26,18,14,0.35)] ring-1 ring-black/15 sm:rounded-[0.9rem] sm:p-[0.65rem]",
          tone,
        )}
      >
        <span className="absolute left-1/2 top-[0.35rem] z-[2] h-[0.22rem] w-[0.22rem] -translate-x-1/2 rounded-full bg-black/50 ring-1 ring-white/20" />
        <div className="relative aspect-[16/10] overflow-hidden rounded-[0.35rem] bg-[#f0f0f0]">
          <div className="flex size-full flex-col px-2.5 pb-2 pt-3.5 sm:px-3.5 sm:pb-2.5 sm:pt-4 lg:px-4 lg:pt-5">
            <div className="flex shrink-0 flex-col items-center gap-1 sm:gap-1.5">
              <div className="flex items-center justify-center gap-2.5 sm:gap-3">
                <span className={cn("inline-flex shrink-0", accent)}>
                  <Icon className="size-6 sm:size-7 lg:size-8" strokeWidth={1.75} />
                </span>
                <p
                  className={cn(
                    "text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl",
                    accent,
                  )}
                >
                  {name}
                </p>
              </div>
              <p className="mt-1 text-base font-bold tracking-tight text-[#1d1d1f] sm:mt-1.5 sm:text-lg lg:text-xl">
                {price}
              </p>
              <div className="mt-1 flex items-center justify-center gap-3 sm:mt-1.5 sm:gap-3.5">
                {featureIcons.map((FeatureIcon, fi) => (
                  <FeatureIcon
                    key={fi}
                    className="size-5 text-[#2a2018]/75 sm:size-6 lg:size-7"
                    strokeWidth={1.75}
                  />
                ))}
              </div>
            </div>
            <p className="mt-2 flex flex-1 items-center justify-center text-center text-[0.95rem] font-semibold leading-[1.15] tracking-tight text-[#2a2018] sm:mt-2.5 sm:text-[1.2rem] sm:leading-[1.12] lg:text-[1.35rem] lg:leading-[1.1]">
              {summary}
            </p>
          </div>
        </div>
      </div>
      <div className="relative mx-[-1.5%] h-[0.55rem] rounded-b-[0.6rem] bg-gradient-to-b from-[#9a9088] to-[#6a625c] sm:h-[0.65rem]">
        <span className="absolute inset-x-[30%] top-0 h-px bg-white/25" />
        <span className="absolute left-1/2 top-[0.12rem] h-[0.28rem] w-[16%] -translate-x-1/2 rounded-sm bg-[#2a2622]/70" />
      </div>
    </div>
  );
}

export function WebsitesDualLaptopHero({
  priceLabel,
  titleBefore,
  titleAccent,
  titleAfter,
  description,
  leftScreenSrc,
  rightScreenSrc,
}: {
  priceLabel: string;
  titleBefore: string;
  titleAccent: string;
  titleAfter: string;
  description: string;
  leftScreenSrc: string;
  rightScreenSrc: string;
}) {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 sm:pt-8 lg:pt-10">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-[#1d1d1f] sm:text-4xl lg:text-5xl">
            {titleBefore}
            <span className="font-serif italic text-inherit">{titleAccent}</span>
            {titleAfter}
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[#1d1d1f]/70 sm:mt-4 sm:text-base">
            {description}
          </p>
          <p className="mt-3 text-base font-bold tracking-tight text-[#1d1d1f] sm:mt-4 sm:text-lg">
            {priceLabel}
          </p>
        </div>
      </div>

      <div className="websites-dual-hero relative mx-auto mt-3 w-full max-w-7xl px-2 pb-8 sm:mt-5 sm:px-4 sm:pb-12 lg:mt-6 lg:pb-16">
        <div className="websites-dual-hero__stage relative mx-auto flex min-h-[14rem] items-end justify-center sm:min-h-[20rem] lg:min-h-[26rem]">
          <div className="websites-dual-hero__left absolute bottom-0 left-[2%] w-[52%] sm:left-[4%] sm:w-[48%] lg:left-[6%] lg:w-[46%]">
            <HeroLaptop tone="silver" screenSrc={leftScreenSrc} screenAlt="Rafa Romera" />
          </div>
          <div className="websites-dual-hero__right absolute bottom-0 right-[2%] z-[1] w-[52%] sm:right-[4%] sm:w-[48%] lg:right-[6%] lg:w-[46%]">
            <HeroLaptop tone="midnight" screenSrc={rightScreenSrc} screenAlt="Freddo's" />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroLaptop({
  tone,
  screenSrc,
  screenAlt,
}: {
  tone: "silver" | "midnight";
  screenSrc: string;
  screenAlt: string;
}) {
  const chassis =
    tone === "silver"
      ? "from-[#e8e4de] via-[#d4cfc8] to-[#b8b2a8]"
      : "from-[#3a3f48] via-[#1e222a] to-[#0e1014]";
  const base = tone === "silver" ? "from-[#c8c2b8] to-[#8a847a]" : "from-[#2a2e36] to-[#12141a]";
  const hinge = tone === "silver" ? "bg-[#2a2622]/55" : "bg-black/70";
  const camera = tone === "silver" ? "bg-black/45" : "bg-black/80 ring-1 ring-white/10";

  return (
    <div className="relative w-full origin-bottom">
      <div
        className={cn(
          "relative overflow-hidden rounded-[0.55rem] bg-gradient-to-b p-[0.4rem] shadow-[0_28px_60px_-16px_rgba(26,18,14,0.35)] ring-1 ring-black/20 sm:rounded-[0.75rem] sm:p-[0.5rem] lg:rounded-[0.9rem] lg:p-[0.55rem]",
          chassis,
        )}
      >
        <span
          className={cn(
            "absolute left-1/2 top-[0.28rem] z-[2] h-[0.18rem] w-[0.18rem] -translate-x-1/2 rounded-full sm:top-[0.32rem] sm:h-[0.2rem] sm:w-[0.2rem]",
            camera,
          )}
        />
        <div className="relative aspect-[16/10] overflow-hidden rounded-[0.25rem] bg-[#111] sm:rounded-[0.3rem]">
          <img
            src={screenSrc}
            alt={screenAlt}
            className="absolute inset-0 size-full object-cover object-[center_12%]"
            draggable={false}
          />
        </div>
      </div>
      <div
        className={cn(
          "relative mx-[-1.5%] h-[0.45rem] rounded-b-[0.5rem] bg-gradient-to-b sm:h-[0.55rem] sm:rounded-b-[0.6rem]",
          base,
        )}
      >
        <span className="absolute inset-x-[28%] top-0 h-px bg-white/20" />
        <span
          className={cn(
            "absolute left-1/2 top-[0.1rem] h-[0.22rem] w-[16%] -translate-x-1/2 rounded-sm sm:h-[0.28rem]",
            hinge,
          )}
        />
      </div>
    </div>
  );
}
