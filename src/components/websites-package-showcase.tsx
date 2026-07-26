import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const PACKAGE_ACCENTS = [
  "text-[#2f6b4f]", // Start — green
  "text-[#c46a32]", // Plus — orange
  "text-[#6b3d8f]", // Kulta — purple
  "text-[#2a5f8f]", // Timantti — blue
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
  popular,
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

          const laptop = <PackageLaptop pkg={pkg} tone={tone} popularLabel={popular} />;
          const copy = (
            <div className="max-w-md">
              <p className={cn("text-2xl font-bold tracking-tight sm:text-3xl", accent)}>
                {pkg.name}
              </p>
              <p className="mt-2 text-lg font-semibold tracking-tight text-[#1d1d1f] sm:text-xl">
                {pkg.tagline}
              </p>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-[#1d1d1f]/80 sm:text-base">
                {pkg.summary}
              </p>
              <p className="mt-4 text-base font-bold text-[#1d1d1f]">{pkg.price}</p>
              <ul className="mt-5 space-y-2.5">
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
            <article key={pkg.name} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
              {imageLeft ? (
                <>
                  {laptop}
                  {copy}
                </>
              ) : (
                <>
                  {copy}
                  {laptop}
                </>
              )}
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
  pkg,
  tone,
  popularLabel,
}: {
  pkg: WebsitePackage;
  tone: string;
  popularLabel: string;
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
          <PackageScreenContent pkg={pkg} popularLabel={popularLabel} />
        </div>
      </div>
      <div className="relative mx-[-1.5%] h-[0.55rem] rounded-b-[0.6rem] bg-gradient-to-b from-[#9a9088] to-[#6a625c] sm:h-[0.65rem]">
        <span className="absolute inset-x-[30%] top-0 h-px bg-white/25" />
        <span className="absolute left-1/2 top-[0.12rem] h-[0.28rem] w-[16%] -translate-x-1/2 rounded-sm bg-[#2a2622]/70" />
      </div>
    </div>
  );
}

function PackageScreenContent({
  pkg,
  popularLabel,
}: {
  pkg: WebsitePackage;
  popularLabel: string;
}) {
  return (
    <div className="flex size-full flex-col overflow-hidden bg-[#f3eee8] p-3 sm:p-4">
      <div className="flex items-center justify-between gap-2 border-b border-[#432f24]/10 pb-2">
        <div className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-[#d4726a]" />
          <span className="size-1.5 rounded-full bg-[#e0b45c]" />
          <span className="size-1.5 rounded-full bg-[#6faf7a]" />
        </div>
        <span className="truncate text-[0.4rem] tracking-wide text-[#5c534c] sm:text-[0.45rem]">
          restadigi.fi · {pkg.name}
        </span>
      </div>

      <div className="mt-3 flex min-h-0 flex-1 flex-col rounded-xl bg-white p-3 shadow-sm ring-1 ring-[#432f24]/8 sm:p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-[0.55rem] font-bold uppercase tracking-[0.12em] text-[#c46a32] sm:text-[0.6rem]">
              Verkkosivupaketti
            </p>
            <p className="mt-1 font-serif text-lg italic tracking-tight text-[#432f24] sm:text-xl">
              {pkg.name}
            </p>
          </div>
          {pkg.featured ? (
            <span className="rounded-full bg-[#432f24] px-2 py-0.5 text-[0.4rem] font-bold uppercase tracking-wide text-white sm:text-[0.45rem]">
              {popularLabel}
            </span>
          ) : null}
        </div>
        <p className="mt-2 line-clamp-2 text-[0.55rem] leading-snug text-[#5c534c] sm:text-[0.62rem]">
          {pkg.tagline}
        </p>
        <p className="mt-auto pt-3 text-sm font-bold text-[#432f24] sm:text-base">{pkg.price}</p>
        <ul className="mt-2 space-y-1">
          {pkg.bullets.slice(0, 3).map((b) => (
            <li
              key={b}
              className="truncate text-[0.45rem] leading-tight text-[#5c534c] sm:text-[0.5rem]"
            >
              · {b}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function WebsitesMountainHero({
  priceLabel,
  imageSrc,
}: {
  priceLabel: string;
  imageSrc: string;
}) {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="relative mx-auto flex min-h-[28rem] max-w-6xl flex-col items-center justify-end px-4 pb-0 pt-10 sm:min-h-[34rem] sm:pt-14 lg:min-h-[40rem]">
        {/* Mountain */}
        <img
          src={imageSrc}
          alt=""
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] w-full object-cover object-[center_70%] sm:h-[58%]"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-white/20 via-transparent to-transparent sm:h-[58%]"
          aria-hidden
        />

        {/* Price overlay */}
        <p className="relative z-[2] mb-4 text-center text-xl font-bold tracking-tight text-[#1d1d1f] sm:mb-6 sm:text-2xl lg:text-3xl">
          {priceLabel}
        </p>

        {/* Laptop on peak */}
        <div className="relative z-[2] mb-[-2%] w-[min(72%,28rem)] origin-bottom sm:w-[min(58%,32rem)] lg:w-[min(48%,36rem)]">
          <div className="websites-hero-laptop relative overflow-hidden rounded-[0.7rem] bg-gradient-to-b from-[#e8dcc0] via-[#d4c4a0] to-[#b8a078] p-[0.5rem] shadow-[0_30px_70px_-20px_rgba(26,18,14,0.45)] ring-1 ring-black/20 sm:rounded-[0.9rem] sm:p-[0.6rem]">
            <span className="absolute left-1/2 top-[0.3rem] z-[2] h-[0.2rem] w-[0.2rem] -translate-x-1/2 rounded-full bg-black/40" />
            <div className="relative aspect-[16/10] overflow-hidden rounded-[0.3rem] bg-[#1a1512]">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, #c9a882 0%, #e8d5a8 35%, #7eb8a8 70%, #5a9aaa 100%)",
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                <p className="font-serif text-2xl italic text-[#2a2018]/90 sm:text-3xl">
                  Restadigi
                </p>
                <p className="mt-1 text-[0.55rem] font-semibold uppercase tracking-[0.16em] text-[#2a2018]/55 sm:text-[0.65rem]">
                  Verkkosivut
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
