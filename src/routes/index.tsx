import { createFileRoute, Link } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import {
  Bot,
  BriefcaseBusiness,
  CalendarDays,
  CircleDollarSign,
  PanelsTopLeft,
} from "lucide-react";
import delfinIcon from "@/assets/delfin-checkin-icon.jpg";
import delfinScreen from "@/assets/delfin-checkin-screen.jpg";
import delfinScreen2 from "@/assets/delfin-checkin-screen-2.jpg";
import rafaHero from "@/assets/rafa-romera-hero.jpg";
import rafaLogo from "@/assets/rafa-romera-logo.png";
import heroHome from "@/assets/hero-home.jpg";
import whyUsDining from "@/assets/restaurant-dining.jpg";
import introHotel from "@/assets/hero-hotel-web.jpg";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageMeta } from "@/components/page-meta";
import { useMessages } from "@/i18n";

const WHY_US_PATHS = [
  "/yhteys",
  "/kotisivut-yrityksille",
  "/chatbot",
  "/potyvarauspalvelu",
] as const;
type WhyUsPath = (typeof WHY_US_PATHS)[number];

function isWhyUsPath(to: string): to is WhyUsPath {
  return (WHY_US_PATHS as readonly string[]).includes(to);
}

const WHY_US_ICONS: LucideIcon[] = [
  BriefcaseBusiness,
  CircleDollarSign,
  Bot,
  PanelsTopLeft,
];

const SERVICE_ICONS: LucideIcon[] = [Bot, CalendarDays];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Restadigi — Älykkäät verkkosivut ja digitaaliset ratkaisut palvelualan yrityksille",
      },
      {
        name: "description",
        content:
          "Rakennamme verkkosivuja, mobiiliapplikaatioita ja muita älykkäitä digitaalisia ratkaisuja palvelualan yrityksille — sisältäen varausjärjestelmät, asiakaspalvelun ja myynnin.",
      },
      {
        property: "og:title",
        content: "Restadigi — Älykäs verkkosivusto, joka palvelee asiakkaitasi",
      },
      {
        property: "og:description",
        content:
          "Verkkosivut, mobiiliapplikaatiot ja älykkäät digitaaliset ratkaisut palvelualan yrityksille.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const t = useMessages();
  const h = t.home;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased selection:bg-accent/20">
      <PageMeta
        title={h.meta.title}
        description={h.meta.description}
        ogTitle={h.meta.ogTitle}
        ogDescription={h.meta.ogDescription}
      />
      <SiteHeader />

      {/* Hero: valkoinen pohja, etukuva tablettikehyksessä vasemmalla, teksti oikealla */}
      <section className="bg-background">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-12 sm:py-16 lg:grid-cols-12 lg:gap-14 lg:py-20">
          <div className="flex justify-center lg:col-span-5 lg:justify-start">
            <div className="w-full max-w-[19rem] -rotate-2 sm:max-w-[21rem] lg:max-w-none">
              <div className="rounded-[1.5rem] border-[11px] border-[#2a1f18] bg-[#2a1f18] shadow-[0_28px_60px_-20px_rgba(26,18,14,0.4)] sm:rounded-[1.75rem] sm:border-[13px]">
                <div className="relative aspect-[3/4] overflow-hidden rounded-[0.7rem] bg-[#432f24] sm:rounded-[0.9rem]">
                  <img
                    src={heroHome}
                    alt=""
                    aria-hidden
                    width={900}
                    height={1200}
                    className="size-full object-cover object-[center_40%]"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <h1 className="max-w-[16ch] text-[2.35rem] font-extrabold leading-[0.98] tracking-tight text-balance sm:text-5xl lg:text-[3.35rem]">
              {h.hero.titleBefore}
              <span className="font-serif italic text-accent">{h.hero.titleAccent}</span>
              {h.hero.titleAfter}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-foreground/70 sm:text-lg">
              {h.hero.description}
            </p>
            <Link
              to="/yhteys"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-accent px-7 py-3.5 text-sm font-bold uppercase tracking-[0.08em] text-accent-foreground transition-opacity hover:opacity-90"
            >
              {h.hero.cta}
            </Link>
          </div>
        </div>
      </section>

      {/* McD-tyylinen vaaleanruskea kaista: miksi meidät → referenssit → CTA */}
      <section className="bg-[#ebe8e2] text-foreground pt-10 sm:pt-14 pb-14 sm:pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="max-w-[14ch] text-[2.35rem] sm:text-5xl lg:text-[3.75rem] font-extrabold leading-[0.98] tracking-tight mb-8 sm:mb-10">
            {h.whyUs.titleBefore}
            {h.whyUs.titleAccent}
            {h.whyUs.titleAfter}
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 gap-4 sm:gap-5">
            {/* Vasemman yläreunan boksi: 4 syytä, valkoinen + symbolit */}
            <article className="relative isolate overflow-hidden rounded-[1.75rem] sm:rounded-[2rem] min-h-[26rem] sm:min-h-[28rem] flex flex-col justify-center bg-white p-6 sm:p-8 text-foreground lg:col-start-1 lg:row-start-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-7">
                {h.whyUs.items.map((item, i) => {
                  const Icon = WHY_US_ICONS[i] ?? BriefcaseBusiness;
                  return (
                    <div key={item.title} className="min-w-0">
                      <span className="mb-3 inline-flex size-11 items-center justify-center rounded-full bg-[#432f24] text-white">
                        <Icon className="size-5" strokeWidth={1.75} aria-hidden />
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold tracking-tight leading-tight mb-1.5">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm leading-relaxed text-foreground/65 line-clamp-4">
                        {item.body}
                      </p>
                      {isWhyUsPath(item.href) ? (
                        <Link
                          to={item.href}
                          className="mt-2.5 inline-flex text-xs font-bold uppercase tracking-[0.06em] text-accent underline-offset-2 hover:underline"
                        >
                          {item.linkLabel} →
                        </Link>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </article>

            {/* Oikea korkea boksi: dining → varauspromo → sänky+intro */}
            <article className="relative isolate overflow-hidden rounded-[1.75rem] sm:rounded-[2rem] min-h-[26rem] lg:min-h-0 lg:col-start-2 lg:row-start-1 lg:row-span-2 flex flex-col bg-white text-foreground order-first lg:order-none">
              <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden sm:aspect-[5/3]">
                <img
                  src={whyUsDining}
                  alt=""
                  aria-hidden
                  className="absolute inset-0 size-full object-cover object-center"
                />
              </div>

              {/* ~5 cm kaista seinän tilalle: pöytävarauspromo */}
              <Link
                to="/potyvarauspalvelu"
                className="relative z-[2] flex min-h-[5rem] shrink-0 items-center justify-between gap-4 bg-[#432f24] px-5 py-4 text-white transition-colors hover:bg-[#3a291f] sm:min-h-[5.25rem] sm:px-7 sm:py-5"
              >
                <div className="min-w-0">
                  <p className="text-base font-bold tracking-tight sm:text-lg">
                    {h.bookingPromo.title}
                  </p>
                  <p className="mt-0.5 text-sm text-white/75">{h.bookingPromo.body}</p>
                </div>
                <span className="inline-flex shrink-0 items-center rounded-full bg-accent px-4 py-2 text-xs font-bold uppercase tracking-[0.06em] text-accent-foreground sm:px-5 sm:text-sm">
                  {h.bookingPromo.linkLabel}
                </span>
              </Link>

              <div className="relative flex flex-1 flex-col justify-end gap-5 overflow-hidden p-6 pt-5 text-white sm:p-8 sm:pt-6 lg:p-10 lg:pt-7">
                <img
                  src={introHotel}
                  alt=""
                  aria-hidden
                  className="absolute inset-0 size-full object-cover object-[center_70%]"
                />
                <div className="absolute inset-0 bg-[#432f24]/88" aria-hidden />
                <h3 className="relative z-[1] max-w-xl text-3xl font-bold tracking-tight leading-[1.05] sm:text-4xl lg:text-[2.75rem]">
                  <span className="block">{h.intro.titleLine1}</span>
                  <span className="block">{h.intro.titleLine2}</span>
                </h3>
                <p className="relative z-[1] max-w-xl text-sm leading-relaxed text-white/90 sm:text-base">
                  {h.intro.body}
                </p>
                <div className="relative z-[1] flex flex-col flex-wrap gap-2.5 pt-1 sm:flex-row">
                  <a
                    href={`tel:${h.intro.phoneTel}`}
                    className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-bold uppercase tracking-[0.06em] text-accent-foreground transition-opacity hover:opacity-90"
                  >
                    {h.intro.callCta}
                  </a>
                  <a
                    href={`https://wa.me/${h.intro.phoneTel.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-bold uppercase tracking-[0.06em] text-black transition-opacity hover:opacity-90"
                  >
                    {h.intro.whatsappCta}
                  </a>
                  <Link
                    to="/yhteys"
                    className="inline-flex items-center justify-center rounded-full border-2 border-white/80 bg-transparent px-6 py-3 text-sm font-bold uppercase tracking-[0.06em] text-white transition-colors hover:bg-white hover:text-black"
                  >
                    {h.intro.bookCta.replace(/\s*→\s*$/, "")}
                  </Link>
                </div>
              </div>
            </article>

            {/* Vasen alaboksi: AI + pöytävaraus, valkoinen + symbolit */}
            <article className="relative isolate overflow-hidden rounded-[1.75rem] sm:rounded-[2rem] min-h-[22rem] sm:min-h-[24rem] flex flex-col justify-center bg-white p-6 sm:p-8 text-foreground lg:col-start-1 lg:row-start-2">
              <h3 className="mb-6 text-2xl font-bold tracking-tight leading-tight sm:text-3xl">
                {h.serviceTeasers.title}
              </h3>
              <div className="flex flex-col gap-7">
                {h.serviceTeasers.items.map((item, i) => {
                  const Icon = SERVICE_ICONS[i] ?? Bot;
                  return (
                    <div key={item.title} className="max-w-md">
                      <span className="mb-3 inline-flex size-11 items-center justify-center rounded-full bg-[#432f24] text-white">
                        <Icon className="size-5" strokeWidth={1.75} aria-hidden />
                      </span>
                      <h4 className="mb-1.5 text-lg font-bold tracking-tight leading-tight sm:text-xl">
                        {item.title}
                      </h4>
                      <p className="text-sm leading-relaxed text-foreground/65">{item.body}</p>
                      {isWhyUsPath(item.href) ? (
                        <Link
                          to={item.href}
                          className={
                            "mt-3 inline-flex items-center rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-[0.06em] transition-opacity hover:opacity-90 sm:text-sm " +
                            (i === 0
                              ? "bg-accent text-accent-foreground"
                              : "bg-[#432f24] text-white")
                          }
                        >
                          {item.linkLabel}
                        </Link>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </article>
          </div>

          {/* Uusimmat referenssit */}
          <h2 className="mt-14 sm:mt-16 max-w-[14ch] text-[2.35rem] sm:text-5xl lg:text-[3.75rem] font-extrabold leading-[0.98] tracking-tight mb-8 sm:mb-10">
            {h.projects.titleBefore}
            {h.projects.titleAccent}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            <article className="relative isolate overflow-hidden rounded-[1.75rem] sm:rounded-[2rem] min-h-[22rem] sm:min-h-[26rem] text-white flex flex-col items-center justify-center text-center px-8 py-12 sm:px-10">
              <div className="absolute inset-0 grid grid-cols-2" aria-hidden>
                <img
                  src={delfinScreen}
                  alt=""
                  className="size-full object-cover object-top"
                />
                <img
                  src={delfinScreen2}
                  alt=""
                  className="size-full object-cover object-top"
                />
              </div>
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#1a120e]/92 via-[#432f24]/72 to-[#432f24]/45"
                aria-hidden
              />
              <img
                src={delfinIcon}
                alt={h.projects.delfin.logoAlt}
                width={88}
                height={88}
                className="relative z-[1] size-16 sm:size-20 rounded-[1.25rem] shadow-md mb-6 ring-1 ring-white/20"
              />
              <h3 className="relative z-[1] text-2xl sm:text-3xl lg:text-[2.15rem] font-extrabold leading-[1.05] tracking-tight max-w-[12ch]">
                {h.projects.delfin.title}
              </h3>
              <p className="relative z-[1] mt-2 text-sm font-medium text-white/70">
                {h.projects.delfin.platforms}
              </p>
              <p className="relative z-[1] mt-4 text-sm sm:text-[0.95rem] leading-relaxed text-white/85 max-w-sm">
                {h.projects.delfin.body}
              </p>
              <a
                href="https://apps.apple.com/au/app/delfin-check-in/id6755120600"
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-[1] mt-7 inline-flex items-center rounded-full bg-accent px-6 py-3 text-sm font-bold uppercase tracking-[0.06em] text-accent-foreground transition-opacity hover:opacity-90"
              >
                {h.projects.delfin.link.replace(/\s*→\s*$/, "")}
              </a>
            </article>

            <article className="relative isolate overflow-hidden rounded-[1.75rem] sm:rounded-[2rem] min-h-[22rem] sm:min-h-[26rem] text-white flex flex-col items-center justify-center text-center px-8 py-12 sm:px-10">
              <img
                src={rafaHero}
                alt=""
                aria-hidden
                className="absolute inset-0 size-full object-cover object-[center_18%]"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/55 to-black/30"
                aria-hidden
              />
              <img
                src={rafaLogo}
                alt={h.projects.rafa.logoAlt}
                width={220}
                height={64}
                className="relative z-[1] w-40 sm:w-48 h-auto mb-6 drop-shadow-md"
              />
              <h3 className="relative z-[1] text-2xl sm:text-3xl lg:text-[2.15rem] font-extrabold leading-[1.05] tracking-tight max-w-[14ch]">
                {h.projects.rafa.title}
              </h3>
              <p className="relative z-[1] mt-2 text-sm font-medium text-white/70">
                {h.projects.rafa.tag}
              </p>
              <p className="relative z-[1] mt-4 text-sm sm:text-[0.95rem] leading-relaxed text-white/85 max-w-sm">
                {h.projects.rafa.body}
              </p>
              <a
                href="https://rafaromera.info/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-[1] mt-7 inline-flex items-center rounded-full bg-accent px-6 py-3 text-sm font-bold uppercase tracking-[0.06em] text-accent-foreground transition-opacity hover:opacity-90"
              >
                {h.projects.rafa.link.replace(/\s*→\s*$/, "")}
              </a>
            </article>
          </div>

          {/* Seuraava askel */}
          <article className="mt-4 sm:mt-5 relative isolate overflow-hidden rounded-[1.75rem] sm:rounded-[2rem] min-h-[18rem] sm:min-h-[20rem] bg-[#432f24] text-white flex flex-col items-center justify-center text-center px-8 py-14 sm:px-12">
            <div
              className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
              aria-hidden
            >
              <span className="font-script w-[110%] select-none whitespace-nowrap text-center text-[clamp(4.5rem,18vw,14rem)] leading-none tracking-wide text-[#4a3528]/30">
                Restadigi
              </span>
            </div>
            <h2 className="relative z-[1] text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.05] tracking-tight text-balance max-w-[18ch]">
              {h.cta.titleBefore}
              {h.cta.titleAccent}
              {h.cta.titleAfter}
            </h2>
            <div className="relative z-[1] mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/yhteys"
                className="inline-flex items-center rounded-full bg-accent px-7 py-3.5 text-sm font-bold uppercase tracking-[0.06em] text-accent-foreground transition-opacity hover:opacity-90"
              >
                {h.cta.quoteCta}
              </Link>
              <a
                href={`tel:${h.intro.phoneTel}`}
                className="inline-flex items-center rounded-full bg-white px-7 py-3.5 text-sm font-bold uppercase tracking-[0.06em] text-black transition-opacity hover:opacity-90"
              >
                {h.cta.callCta.replace(/\s*→\s*$/, "")}
              </a>
              <a
                href={`https://wa.me/${h.intro.phoneTel.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border-2 border-white/80 bg-transparent px-7 py-3.5 text-sm font-bold uppercase tracking-[0.06em] text-white transition-colors hover:bg-white hover:text-black"
              >
                {h.cta.whatsappCta.replace(/\s*→\s*$/, "")}
              </a>
            </div>
          </article>
        </div>
      </section>

      <section className="bg-background text-foreground">
        <SiteFooter />
      </section>
    </div>
  );
}

