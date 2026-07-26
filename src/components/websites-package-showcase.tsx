import { Link } from "@tanstack/react-router";
import { CirclePlus, Crown, Gem, Rocket, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const PACKAGE_ICONS: LucideIcon[] = [Rocket, CirclePlus, Crown, Gem];

const PACKAGE_ACCENTS = [
  "text-[#2f6b4f]", // Start — green
  "text-[#c46a32]", // Plus — orange
  "text-[#6b3d8f]", // Kulta — purple
  "text-[#2a5f8f]", // Timantti — blue
] as const;

const PACKAGE_ICON_BG = [
  "bg-[#2f6b4f]/12",
  "bg-[#c46a32]/12",
  "bg-[#6b3d8f]/12",
  "bg-[#2a5f8f]/12",
] as const;

const LAPTOP_TONES = [
  "from-[#d4c4a8] via-[#c4b090] to-[#a89070]", // warm gold
  "from-[#e8d5d0] via-[#d4b8b0] to-[#b89890]", // rose
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
          const iconBg = PACKAGE_ICON_BG[i % PACKAGE_ICON_BG.length];
          const tone = LAPTOP_TONES[i % LAPTOP_TONES.length];
          const Icon = PACKAGE_ICONS[i % PACKAGE_ICONS.length];

          const laptop = (
            <PackageLaptop
              name={pkg.name}
              summary={pkg.summary}
              price={pkg.price}
              tone={tone}
              accent={accent}
              iconBg={iconBg}
              Icon={Icon}
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
                to="/yhteys"
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
  iconBg,
  Icon,
}: {
  name: string;
  summary: string;
  price: string;
  tone: string;
  accent: string;
  iconBg: string;
  Icon: LucideIcon;
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
        <div className="relative aspect-[16/10] overflow-hidden rounded-[0.35rem] bg-[#f7f3ee]">
          <div className="flex size-full flex-col px-2.5 pb-2 pt-3.5 sm:px-3.5 sm:pb-2.5 sm:pt-4 lg:px-4 lg:pt-5">
            <div className="flex shrink-0 flex-col items-center gap-1 sm:gap-1.5">
              <div className="flex items-center justify-center gap-2.5 sm:gap-3">
                <span
                  className={cn(
                    "inline-flex size-11 shrink-0 items-center justify-center rounded-xl sm:size-12 lg:size-14",
                    iconBg,
                    accent,
                  )}
                >
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

export function WebsitesMountainHero({
  priceLabel,
  imageSrc,
  titleBefore,
  titleAccent,
  titleAfter,
  description,
}: {
  priceLabel: string;
  imageSrc: string;
  titleBefore: string;
  titleAccent: string;
  titleAfter: string;
  description: string;
}) {
  return (
    <section className="relative overflow-hidden bg-[#e8e4de]">
      <img
        src={imageSrc}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 size-full object-cover object-[center_42%]"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-white/70"
        aria-hidden
      />

      <div className="relative mx-auto flex min-h-[min(72vh,34rem)] max-w-6xl flex-col items-center justify-end px-4 pb-0 pt-2 sm:min-h-[min(78vh,40rem)] sm:pt-4 lg:min-h-[min(82vh,46rem)]">
        <p className="relative z-[2] mb-3 text-center text-xl font-bold tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] sm:mb-4 sm:text-2xl lg:text-3xl">
          {priceLabel}
        </p>

        <div className="relative z-[2] mb-[-1%] w-[min(88%,30rem)] origin-bottom sm:w-[min(70%,36rem)] lg:w-[min(58%,40rem)]">
          <div className="websites-hero-laptop relative overflow-hidden rounded-[0.7rem] bg-gradient-to-b from-[#e8dcc0] via-[#d4c4a0] to-[#b8a078] p-[0.5rem] shadow-[0_30px_70px_-20px_rgba(26,18,14,0.45)] ring-1 ring-black/20 sm:rounded-[0.9rem] sm:p-[0.6rem]">
            <span className="absolute left-1/2 top-[0.3rem] z-[2] h-[0.2rem] w-[0.2rem] -translate-x-1/2 rounded-full bg-black/40" />
            <div className="relative aspect-[16/10] overflow-hidden rounded-[0.3rem] bg-[#f7f3ee]">
              <div className="absolute inset-0 flex flex-col justify-center gap-2 px-4 py-3 text-left sm:gap-2.5 sm:px-6 sm:py-4 lg:px-7">
                <p className="max-w-[18ch] text-[0.95rem] font-bold leading-[1.05] tracking-tight text-[#1d1d1f] sm:text-xl lg:text-2xl">
                  {titleBefore}
                  <span className="font-serif italic text-[#c46a32]">{titleAccent}</span>
                  {titleAfter}
                </p>
                <p className="max-w-[36ch] text-[0.42rem] leading-snug text-[#1d1d1f]/75 sm:text-[0.55rem] sm:leading-snug lg:text-[0.62rem]">
                  {description}
                </p>
              </div>
            </div>
          </div>
          <div className="relative mx-[-2%] h-[0.5rem] rounded-b-[0.55rem] bg-gradient-to-b from-[#c4b090] to-[#8a7a60] sm:h-[0.6rem]">
            <span className="absolute left-1/2 top-[0.1rem] h-[0.25rem] w-[18%] -translate-x-1/2 rounded-sm bg-[#2a2018]/55" />
          </div>
        </div>
      </div>
    </section>
  );
}
