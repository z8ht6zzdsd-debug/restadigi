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
import freddosCoffee from "@/assets/freddos-coffee-open.jpg";
import whyUsDining from "@/assets/restaurant-dining.jpg";
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

      {/* BK-tyylinen hero: meidän ruskea ylös → valkoinen alas */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(to bottom, #432f24 0%, #432f24 54%, #ffffff 54%, #ffffff 100%)",
        }}
      >
        <div className="relative mx-auto grid max-w-6xl items-end gap-10 px-6 pb-12 pt-12 sm:pb-16 sm:pt-16 lg:grid-cols-12 lg:gap-12 lg:pb-20 lg:pt-20">
          {/* Vasen: kuvaus + CTA */}
          <div className="relative z-[1] flex flex-col lg:col-span-5">
            <p className="max-w-md text-base leading-relaxed text-white/90 sm:text-lg">
              {h.hero.description}
            </p>
            <div className="mt-10 sm:mt-14 lg:mt-16">
              <Link
                to="/yhteys"
                className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-3.5 text-sm font-bold uppercase tracking-[0.08em] text-accent-foreground shadow-sm transition-opacity hover:opacity-90"
              >
                {h.hero.cta}
              </Link>
            </div>
          </div>

          {/* Oikea: iso otsikko + laitteet rajalla */}
          <div className="relative z-[1] lg:col-span-7">
            <h1 className="max-w-[14ch] text-[2.35rem] font-extrabold leading-[0.98] tracking-tight text-[#f3e6d4] sm:text-5xl lg:text-[3.35rem]">
              {h.hero.titleBefore}
              {h.hero.titleAccent}
              {h.hero.titleAfter}
            </h1>

            <div className="mt-8 flex items-end justify-center gap-4 sm:mt-10 sm:gap-6 lg:justify-start">
              {/* Tabletti (pysty) — Rafa, object-top jotta pää näkyy */}
              <div className="relative w-[42%] max-w-[14.5rem] shrink-0 -rotate-2">
                <div className="rounded-[1.35rem] border-[10px] border-[#2a1f18] bg-[#2a1f18] shadow-[0_24px_50px_-18px_rgba(26,18,14,0.45)] sm:rounded-[1.6rem] sm:border-[12px]">
                  <div className="aspect-[3/4] overflow-hidden rounded-[0.65rem] bg-[#432f24] sm:rounded-[0.85rem]">
                    <img
                      src={rafaHero}
                      alt=""
                      width={600}
                      height={800}
                      className="size-full object-cover object-[center_12%]"
                    />
                  </div>
                </div>
              </div>

              {/* Puhelin — Freddos ilman kantta */}
              <div className="relative w-[28%] max-w-[9.5rem] shrink-0 translate-y-3 rotate-3 sm:max-w-[10.5rem]">
                <div className="rounded-[1.6rem] border-[8px] border-[#2a1f18] bg-[#2a1f18] shadow-[0_24px_50px_-18px_rgba(26,18,14,0.45)] sm:rounded-[1.85rem] sm:border-[10px]">
                  <div className="relative aspect-[9/19] overflow-hidden rounded-[1.05rem] bg-[#432f24] sm:rounded-[1.2rem]">
                    <div
                      className="absolute top-2 left-1/2 z-[1] h-4 w-16 -translate-x-1/2 rounded-full bg-[#2a1f18]"
                      aria-hidden
                    />
                    <img
                      src={freddosCoffee}
                      alt=""
                      width={400}
                      height={800}
                      className="size-full object-cover object-center"
                    />
                  </div>
                </div>
              </div>
            </div>
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

            {/* Oikea korkea boksi: dining-kuva otsikon yllä */}
            <article className="relative isolate overflow-hidden rounded-[1.75rem] sm:rounded-[2rem] min-h-[26rem] lg:min-h-0 lg:col-start-2 lg:row-start-1 lg:row-span-2 flex flex-col bg-white text-foreground order-first lg:order-none">
              <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden sm:aspect-[5/3]">
                <img
                  src={whyUsDining}
                  alt=""
                  aria-hidden
                  className="absolute inset-0 size-full object-cover object-center"
                />
              </div>
              <div className="flex flex-1 flex-col justify-end gap-5 bg-[#432f24] p-6 text-white sm:p-8 lg:p-10">
                <h3 className="max-w-xl text-3xl font-bold tracking-tight leading-[1.05] sm:text-4xl lg:text-[2.75rem]">
                  <span className="block">{h.intro.titleLine1}</span>
                  <span className="block">{h.intro.titleLine2}</span>
                </h3>
                <p className="max-w-xl text-sm leading-relaxed text-white/90 sm:text-base">
                  {h.intro.body}
                </p>
                <div className="flex flex-col flex-wrap gap-2.5 pt-1 sm:flex-row">
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
            <article className="relative isolate overflow-hidden rounded-[1.75rem] sm:rounded-[2rem] min-h-[22rem] sm:min-h-[26rem] bg-[#432f24] text-white flex flex-col items-center justify-center text-center px-8 py-12 sm:px-10">
              <img
                src={delfinScreen}
                alt=""
                aria-hidden
                className="absolute top-4 left-4 w-16 sm:w-20 rounded-2xl shadow-lg rotate-[-8deg] opacity-90"
              />
              <img
                src={delfinScreen2}
                alt=""
                aria-hidden
                className="absolute top-4 right-4 w-16 sm:w-20 rounded-2xl shadow-lg rotate-[8deg] opacity-90"
              />
              <img
                src={delfinIcon}
                alt={h.projects.delfin.logoAlt}
                width={88}
                height={88}
                className="relative z-[1] size-16 sm:size-20 rounded-[1.25rem] shadow-md mb-6"
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

            <article className="relative isolate overflow-hidden rounded-[1.75rem] sm:rounded-[2rem] min-h-[22rem] sm:min-h-[26rem] bg-white text-foreground flex flex-col items-center justify-center text-center px-8 py-12 sm:px-10">
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.12]"
                style={{
                  backgroundImage:
                    "linear-gradient(#432f24 1px, transparent 1px), linear-gradient(90deg, #432f24 1px, transparent 1px)",
                  backgroundSize: "48px 48px",
                }}
                aria-hidden
              />
              <img
                src={rafaHero}
                alt=""
                aria-hidden
                className="absolute top-4 left-4 size-16 sm:size-20 object-cover rounded-2xl shadow-md rotate-[-6deg]"
              />
              <img
                src={rafaLogo}
                alt={h.projects.rafa.logoAlt}
                width={220}
                height={64}
                className="relative z-[1] w-40 sm:w-48 h-auto mb-6"
              />
              <h3 className="relative z-[1] text-2xl sm:text-3xl lg:text-[2.15rem] font-extrabold leading-[1.05] tracking-tight max-w-[14ch]">
                {h.projects.rafa.title}
              </h3>
              <p className="relative z-[1] mt-2 text-sm font-medium text-foreground/55">
                {h.projects.rafa.tag}
              </p>
              <p className="relative z-[1] mt-4 text-sm sm:text-[0.95rem] leading-relaxed text-foreground/70 max-w-sm">
                {h.projects.rafa.body}
              </p>
              <a
                href="https://rafaromera.info/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-[1] mt-7 inline-flex items-center rounded-full bg-[#432f24] px-6 py-3 text-sm font-bold uppercase tracking-[0.06em] text-white transition-opacity hover:opacity-90"
              >
                {h.projects.rafa.link.replace(/\s*→\s*$/, "")}
              </a>
            </article>
          </div>

          {/* Seuraava askel */}
          <article className="mt-4 sm:mt-5 relative isolate overflow-hidden rounded-[1.75rem] sm:rounded-[2rem] min-h-[18rem] sm:min-h-[20rem] bg-[#432f24] text-white flex flex-col items-center justify-center text-center px-8 py-14 sm:px-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.05] tracking-tight text-balance max-w-[18ch]">
              {h.cta.titleBefore}
              {h.cta.titleAccent}
              {h.cta.titleAfter}
            </h2>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
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

