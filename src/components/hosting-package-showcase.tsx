import { Link } from "@tanstack/react-router";
import {
  Bot,
  Globe,
  Headphones,
  Lock,
  Mail,
  MapPin,
  Server,
  ShieldCheck,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Basic + Pro Business — same bare icons as elsewhere on the site. */
const PACKAGE_ICONS: LucideIcon[] = [Server, ShieldCheck];

const PACKAGE_FEATURE_ICONS: LucideIcon[][] = [
  [Server, MapPin, Lock, Globe], // Basic
  [Server, Mail, Wrench, Headphones, ShieldCheck, Bot], // Pro Business
];

const PACKAGE_ACCENTS = [
  "text-[#2f6b4f]", // Basic — green
  "text-[#2a5f8f]", // Pro — blue
] as const;

const LAPTOP_TONES = [
  "from-[#c8c8c8] via-[#9a9a9a] to-[#707070]",
  "from-[#3a3530] via-[#2a2622] to-[#1a1714]",
] as const;

type HostingPackage = {
  name: string;
  summary: string;
  price: string;
  featured?: boolean;
  bullets: string[];
};

export function HostingPackageShowcase({
  packagesTitle,
  packages,
  requestQuote,
  footnote,
}: {
  packagesTitle: string;
  packages: HostingPackage[];
  requestQuote: string;
  popular?: string;
  footnote?: ReactNode;
}) {
  return (
    <section id="hosting-paketit" className="bg-white text-[#1d1d1f]">
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
            <HostingPackageLaptop
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

function HostingPackageLaptop({
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
              <p className="mt-1 max-w-[22ch] text-center text-sm font-bold leading-snug tracking-tight text-[#1d1d1f] sm:mt-1.5 sm:max-w-none sm:text-base lg:text-lg">
                {price}
              </p>
              <div className="mt-1 flex flex-wrap items-center justify-center gap-2.5 sm:mt-1.5 sm:gap-3">
                {featureIcons.map((FeatureIcon, fi) => (
                  <FeatureIcon
                    key={fi}
                    className="size-5 text-[#2a2018]/75 sm:size-6 lg:size-7"
                    strokeWidth={1.75}
                  />
                ))}
              </div>
            </div>
            <p className="mt-2 flex flex-1 items-center justify-center px-1 text-center text-[0.85rem] font-semibold leading-[1.2] tracking-tight text-[#2a2018] sm:mt-2.5 sm:text-[1.05rem] sm:leading-[1.15] lg:text-[1.15rem] lg:leading-[1.12]">
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
