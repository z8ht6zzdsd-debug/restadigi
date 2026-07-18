import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import heroHome from "@/assets/hero-home.jpg";
import delfinIcon from "@/assets/delfin-checkin-icon.jpg";
import delfinScreen from "@/assets/delfin-checkin-screen.jpg";
import delfinScreen2 from "@/assets/delfin-checkin-screen-2.jpg";
import rafaHero from "@/assets/rafa-romera-hero.jpg";
import rafaLogo from "@/assets/rafa-romera-logo.png";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";
import { PageMeta } from "@/components/page-meta";
import { useMessages } from "@/i18n";

const WHY_US_PATHS = ["/yhteys", "/kotisivut-yrityksille", "/chatbot"] as const;
type WhyUsPath = (typeof WHY_US_PATHS)[number];

function isWhyUsPath(to: string): to is WhyUsPath {
  return (WHY_US_PATHS as readonly string[]).includes(to);
}

const whyUsIcons: ReactNode[] = [
  <svg
    key="bulb"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    className="size-7"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
    />
  </svg>,
  <svg
    key="price"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    className="size-7"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A59.377 59.377 0 0115.75 6.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm8.25 2.25a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0z"
    />
  </svg>,
  <svg
    key="chat"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    className="size-7"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
    />
  </svg>,
  <svg
    key="edit"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    className="size-7"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
    />
  </svg>,
];

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

  const whyUs = h.whyUs.items.map((item, i) => ({
    ...item,
    icon: whyUsIcons[i],
  }));

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased selection:bg-accent/20">
      <PageMeta
        title={h.meta.title}
        description={h.meta.description}
        ogTitle={h.meta.ogTitle}
        ogDescription={h.meta.ogDescription}
      />
      <SiteHeader />

      <PageHero
        tall
        lifestyle
        image={heroHome}
        title={
          <>
            {h.hero.titleBefore}
            {h.hero.titleAccent}
            {h.hero.titleAfter}
          </>
        }
        description={h.hero.description}
        actions={
          <Link
            to="/yhteys"
            className="inline-flex items-center gap-3 rounded-full bg-accent px-7 py-3.5 text-sm font-bold uppercase tracking-[0.08em] text-accent-foreground transition-opacity hover:opacity-90"
          >
            {h.hero.cta}
          </Link>
        }
      />

      {/* Tutustuminen */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="text-2xl sm:text-[1.85rem] lg:text-[2rem] font-medium tracking-tight leading-[1.3] mb-5">
            <span className="block">{h.intro.titleLine1}</span>
            <span className="block">{h.intro.titleLine2}</span>
          </h2>
          <p className="mx-auto text-base sm:text-lg text-foreground/65 leading-relaxed text-pretty mb-8 max-w-5xl">
            {h.intro.body}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={`tel:${h.intro.phoneTel}`}
              className="inline-flex items-center gap-3 rounded-full bg-primary py-3 pr-4 pl-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-accent"
            >
              {h.intro.callCta}
              <span className="text-primary-foreground/70 tabular-nums text-xs hidden sm:inline">
                {h.intro.phoneDisplay}
              </span>
            </a>
            <a
              href={`https://wa.me/${h.intro.phoneTel.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full border border-foreground/20 bg-background py-3 pr-4 pl-5 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              {h.intro.whatsappCta}
              <span className="text-foreground/55 tabular-nums text-xs hidden sm:inline">
                {h.intro.phoneDisplay}
              </span>
            </a>
            <Link
              to="/yhteys"
              className="inline-flex items-center gap-2 border-b border-foreground/30 pb-0.5 text-sm transition-colors hover:border-foreground"
            >
              {h.intro.bookCta}
            </Link>
          </div>
        </div>
      </section>

      {/* Miksi valita meidät */}
      <section className="relative overflow-hidden py-20 sm:py-28 bg-[#ebe8e2] text-foreground">
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-medium tracking-tight mb-5 text-balance">
              {h.whyUs.titleBefore}
              <span className="font-serif italic text-accent">{h.whyUs.titleAccent}</span>
              {h.whyUs.titleAfter}
            </h2>
            <p className="text-base sm:text-lg text-foreground/60 leading-relaxed">
              {h.whyUs.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
            {whyUs.map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-border/70 bg-background text-foreground p-7 sm:p-8 flex flex-col items-center text-center gap-4 min-h-[16rem] shadow-[0_10px_36px_-20px_rgba(50,30,20,0.28)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_16px_44px_-18px_rgba(50,30,20,0.35)]"
              >
                <div className="text-accent" aria-hidden>
                  {item.icon}
                </div>
                <h3 className="text-xl font-medium tracking-tight">{item.title}</h3>
                <p className="text-sm leading-relaxed flex-1 text-foreground/60">{item.body}</p>
                {isWhyUsPath(item.href) ? (
                  <Link
                    to={item.href}
                    className="text-sm border-b border-foreground/25 pb-0.5 w-fit text-foreground/80 transition-colors hover:border-accent hover:text-accent"
                  >
                    {item.linkLabel} →
                  </Link>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Referenssit */}
      <section className="pt-24 sm:pt-32 pb-10 sm:pb-12 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-16 text-center">
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight">
              {h.projects.titleBefore}
              <span className="font-serif italic text-accent">{h.projects.titleAccent}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <article className="group">
              <div className="relative overflow-hidden rounded-sm bg-background border border-border mb-6 p-8 sm:p-10 flex items-end justify-center gap-4 min-h-[22rem] sm:min-h-[26rem]">
                <img
                  src={delfinIcon}
                  alt={h.projects.delfin.logoAlt}
                  width={96}
                  height={96}
                  className="absolute top-6 left-6 size-14 sm:size-16 rounded-[1.15rem] shadow-md"
                />
                <img
                  src={delfinScreen}
                  alt={h.projects.delfin.screenAlt}
                  width={230}
                  height={498}
                  loading="lazy"
                  className="relative z-[1] w-[42%] max-w-[11rem] rounded-2xl shadow-lg group-hover:-translate-y-1 transition-transform duration-700"
                />
                <img
                  src={delfinScreen2}
                  alt={h.projects.delfin.calendarAlt}
                  width={230}
                  height={498}
                  loading="lazy"
                  className="relative z-[2] w-[48%] max-w-[12.5rem] rounded-2xl shadow-xl -mb-4 group-hover:-translate-y-2 transition-transform duration-700"
                />
              </div>
              <div className="flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1 mb-3 text-center">
                <h3 className="text-lg font-medium">
                  {h.projects.delfin.title}{" "}
                  <span className="font-serif italic text-foreground/50">
                    {h.projects.delfin.titleAccent}
                  </span>
                </h3>
                <span className="text-sm text-muted-foreground">{h.projects.delfin.platforms}</span>
              </div>
              <p className="text-sm text-foreground/60 leading-relaxed mb-4 mx-auto max-w-prose text-center">
                {h.projects.delfin.body}
              </p>
              <a
                href="https://apps.apple.com/au/app/delfin-check-in/id6755120600"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-fit mx-auto text-sm border-b border-foreground/30 pb-0.5 transition-colors hover:border-accent hover:text-accent"
              >
                {h.projects.delfin.link}
              </a>
            </article>

            <article className="group lg:mt-16">
              <div className="relative overflow-hidden rounded-sm mb-6 min-h-[22rem] sm:min-h-[26rem]">
                <img
                  src={rafaHero}
                  alt={h.projects.rafa.heroAlt}
                  width={1200}
                  height={800}
                  loading="lazy"
                  className="absolute inset-0 size-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent"
                  aria-hidden
                />
                <img
                  src={rafaLogo}
                  alt={h.projects.rafa.logoAlt}
                  width={280}
                  height={80}
                  loading="lazy"
                  className="absolute bottom-6 left-6 w-44 sm:w-56 h-auto drop-shadow-lg"
                />
              </div>
              <div className="flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1 mb-3 text-center">
                <h3 className="text-lg font-medium">
                  {h.projects.rafa.title}{" "}
                  <span className="font-serif italic text-foreground/50">
                    {h.projects.rafa.titleAccent}
                  </span>
                </h3>
                <span className="text-sm text-muted-foreground">{h.projects.rafa.tag}</span>
              </div>
              <p className="text-sm text-foreground/60 leading-relaxed mb-4 mx-auto max-w-prose text-center">
                {h.projects.rafa.body}
              </p>
              <a
                href="https://rafaromera.info/"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-fit mx-auto text-sm border-b border-foreground/30 pb-0.5 transition-colors hover:border-accent hover:text-accent"
              >
                {h.projects.rafa.link}
              </a>
            </article>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-background text-foreground">
        <div className="max-w-6xl mx-auto px-6 pt-8 sm:pt-10 pb-24 sm:pb-32 flex flex-col items-center text-center">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl leading-[1.05] font-medium mb-12 text-balance max-w-[20ch] tracking-tight">
            {h.cta.titleBefore}
            <span className="font-serif italic text-accent">{h.cta.titleAccent}</span>
            {h.cta.titleAfter}
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/yhteys"
              className="inline-flex items-center gap-3 bg-primary text-primary-foreground text-sm font-medium py-3 pr-4 pl-5 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              {h.cta.quoteCta}
              <svg
                className="size-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                />
              </svg>
            </Link>
            <a
              href={`tel:${h.intro.phoneTel}`}
              className="text-sm border-b border-foreground/30 pb-0.5 text-foreground/80 transition-colors hover:border-foreground hover:text-foreground"
            >
              {h.cta.callCta}
            </a>
            <a
              href={`https://wa.me/${h.intro.phoneTel.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm border-b border-foreground/30 pb-0.5 text-foreground/80 transition-colors hover:border-foreground hover:text-foreground"
            >
              {h.cta.whatsappCta}
            </a>
          </div>
        </div>

        <SiteFooter />
      </section>
    </div>
  );
}
