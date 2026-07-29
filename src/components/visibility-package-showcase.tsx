import { Link } from "@tanstack/react-router";
import { Bot, Search, Trophy, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { PackageBrandLogoRow } from "@/components/package-brand-logos";
import { cn } from "@/lib/utils";

const PACKAGE_ICONS: LucideIcon[] = [Bot, Search, Trophy];
const PACKAGE_LOGO_KINDS = ["ai", "google", undefined] as const;

const PACKAGE_ACCENTS = [
  "text-[#2f6b4f]", // AI — green
  "text-[#c46a32]", // Google — orange
  "text-[#2a5f8f]", // Sports — blue
] as const;

const LAPTOP_TONES = [
  "from-[#d4c4a8] via-[#c4b090] to-[#a89070]",
  "from-[#c8c8c8] via-[#9a9a9a] to-[#707070]",
  "from-[#c8c4c0] via-[#a8a4a0] to-[#888480]",
] as const;

type VisibilityPackage = {
  name: string;
  summary: string;
  price: string;
  featured?: boolean;
  bullets: string[];
};

export function VisibilityPackageShowcase({
  packagesTitle,
  packages,
  requestQuote,
  footnote,
  sectionId = "nakyvyys-paketit",
}: {
  packagesTitle: string;
  packages: VisibilityPackage[];
  requestQuote: string;
  popular?: string;
  footnote?: ReactNode;
  sectionId?: string;
}) {
  return (
    <section id={sectionId} className="bg-white text-[#1d1d1f]">
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
          const logoKind = PACKAGE_LOGO_KINDS[i];

          const laptop = (
            <VisibilityPackageLaptop
              name={pkg.name}
              summary={pkg.summary}
              price={pkg.price}
              tone={tone}
              accent={accent}
              Icon={Icon}
              logoKind={logoKind}
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
              <div className={cn(!imageLeft && "lg:order-2")}>{laptop}</div>
              <div className={cn(!imageLeft && "lg:order-1")}>{copy}</div>
            </article>
          );
        })}
      </div>

      {footnote ? (
        <div className="mx-auto max-w-3xl px-6 pb-16 text-center text-sm leading-relaxed text-[#1d1d1f]/55">
          {footnote}
        </div>
      ) : null}
    </section>
  );
}

function VisibilityPackageLaptop({
  name,
  summary,
  price,
  tone,
  accent,
  Icon,
  logoKind,
}: {
  name: string;
  summary: string;
  price: string;
  tone: string;
  accent: string;
  Icon: LucideIcon;
  logoKind?: "ai" | "google";
}) {
  const twoLineTitle = name.includes(" ")
    ? (() => {
        const i = name.lastIndexOf(" ");
        return [name.slice(0, i), name.slice(i + 1)] as const;
      })()
    : null;
  const useTwoLines = Boolean(twoLineTitle && name.length > 20);

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
              <div className="relative flex w-full items-center justify-center px-10 sm:px-12">
                <span
                  className={cn(
                    "absolute left-0 top-1/2 inline-flex shrink-0 -translate-y-1/2",
                    accent,
                  )}
                >
                  <Icon className="size-5 sm:size-5 lg:size-6" strokeWidth={1.75} />
                </span>
                {useTwoLines && twoLineTitle ? (
                  <p
                    className={cn(
                      "text-center text-lg font-bold leading-[1.05] tracking-tight sm:text-xl lg:text-2xl",
                      accent,
                    )}
                  >
                    <span className="block">{twoLineTitle[0]}</span>
                    <span className="block">{twoLineTitle[1]}</span>
                  </p>
                ) : (
                  <p
                    className={cn(
                      "whitespace-nowrap text-center text-lg font-bold tracking-tight sm:text-2xl lg:text-3xl",
                      accent,
                    )}
                  >
                    {name}
                  </p>
                )}
              </div>
              <p className="mt-1 text-base font-bold tracking-tight text-[#1d1d1f] sm:mt-1.5 sm:text-lg lg:text-xl">
                {price}
              </p>
              {logoKind ? (
                <PackageBrandLogoRow
                  kind={logoKind}
                  className="mt-1 sm:mt-1.5"
                  sizeClassName="size-5 sm:size-6 lg:size-7"
                />
              ) : null}
            </div>
            <p className="mt-2 flex flex-1 items-center justify-center text-center text-[0.85rem] font-semibold leading-[1.15] tracking-tight text-[#2a2018] sm:mt-2.5 sm:text-[1.05rem] sm:leading-[1.12] lg:text-[1.2rem] lg:leading-[1.1]">
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
