import { createFileRoute, Link } from "@tanstack/react-router";
import heroHome from "@/assets/hero-home.jpg";
import delfinIcon from "@/assets/delfin-checkin-icon.jpg";
import delfinScreen from "@/assets/delfin-checkin-screen.jpg";
import delfinScreen2 from "@/assets/delfin-checkin-screen-2.jpg";
import rafaHero from "@/assets/rafa-romera-hero.jpg";
import rafaLogo from "@/assets/rafa-romera-logo.png";
import whyUsDining from "@/assets/restaurant-dining.jpg";
import whyUsKitchen from "@/assets/restaurant-kitchen.jpg";
import introHotel from "@/assets/hero-hotel-web.jpg";
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

  const whyUsPairs = [
    { image: whyUsDining, items: h.whyUs.items.slice(0, 2) },
    { image: whyUsKitchen, items: h.whyUs.items.slice(2, 4) },
  ] as const;

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

      {/* McD-tyylinen keltainen kaista: miksi meidät + toimialaratkaisut */}
      <section className="bg-[#ebe8e2] text-foreground pt-10 sm:pt-14 pb-12 sm:pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="max-w-[14ch] text-[2.35rem] sm:text-5xl lg:text-[3.75rem] font-extrabold leading-[0.98] tracking-tight mb-8 sm:mb-10">
            {h.whyUs.titleBefore}
            {h.whyUs.titleAccent}
            {h.whyUs.titleAfter}
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 gap-4 sm:gap-5">
            <article className="relative isolate overflow-hidden rounded-[1.75rem] sm:rounded-[2rem] min-h-[22rem] sm:min-h-[24rem] flex flex-col justify-end p-6 sm:p-8 text-white lg:col-start-1 lg:row-start-1">
              <img
                src={whyUsPairs[0].image}
                alt=""
                aria-hidden
                className="absolute inset-0 size-full object-cover"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/20"
                aria-hidden
              />
              <div className="relative z-[1] flex flex-col gap-6">
                {whyUsPairs[0].items.map((item) => (
                  <div key={item.title} className="max-w-md">
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight leading-tight mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-[0.95rem] leading-relaxed text-white/88">
                      {item.body}
                    </p>
                  </div>
                ))}
                <div className="flex flex-wrap gap-2.5 pt-1">
                  {whyUsPairs[0].items.map((item, i) =>
                    isWhyUsPath(item.href) ? (
                      <Link
                        key={item.title}
                        to={item.href}
                        className={
                          i === 0
                            ? "inline-flex items-center rounded-full bg-accent px-5 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-[0.06em] text-accent-foreground transition-opacity hover:opacity-90"
                            : "inline-flex items-center rounded-full bg-white px-5 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-[0.06em] text-black transition-opacity hover:opacity-90"
                        }
                      >
                        {item.linkLabel}
                      </Link>
                    ) : null,
                  )}
                </div>
              </div>
            </article>

            <article className="relative isolate overflow-hidden rounded-[1.75rem] sm:rounded-[2rem] min-h-[26rem] lg:min-h-0 lg:col-start-2 lg:row-start-1 lg:row-span-2 flex flex-col justify-end p-6 sm:p-8 lg:p-10 text-white order-first lg:order-none">
              <img
                src={introHotel}
                alt=""
                aria-hidden
                className="absolute inset-0 size-full object-cover"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/25"
                aria-hidden
              />
              <div className="relative z-[1] flex flex-col gap-5 max-w-xl">
                <h3 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight leading-[1.05]">
                  <span className="block">{h.intro.titleLine1}</span>
                  <span className="block">{h.intro.titleLine2}</span>
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-white/90">
                  {h.intro.body}
                </p>
                <div className="flex flex-col sm:flex-row flex-wrap gap-2.5 pt-2">
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

            <article className="relative isolate overflow-hidden rounded-[1.75rem] sm:rounded-[2rem] min-h-[22rem] sm:min-h-[24rem] flex flex-col justify-end p-6 sm:p-8 text-white lg:col-start-1 lg:row-start-2">
              <img
                src={whyUsPairs[1].image}
                alt=""
                aria-hidden
                className="absolute inset-0 size-full object-cover"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/20"
                aria-hidden
              />
              <div className="relative z-[1] flex flex-col gap-6">
                {whyUsPairs[1].items.map((item) => (
                  <div key={item.title} className="max-w-md">
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight leading-tight mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-[0.95rem] leading-relaxed text-white/88">
                      {item.body}
                    </p>
                  </div>
                ))}
                <div className="flex flex-wrap gap-2.5 pt-1">
                  {whyUsPairs[1].items.map((item, i) =>
                    isWhyUsPath(item.href) ? (
                      <Link
                        key={item.title}
                        to={item.href}
                        className={
                          i === 0
                            ? "inline-flex items-center rounded-full bg-accent px-5 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-[0.06em] text-accent-foreground transition-opacity hover:opacity-90"
                            : "inline-flex items-center rounded-full bg-white px-5 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-[0.06em] text-black transition-opacity hover:opacity-90"
                        }
                      >
                        {item.linkLabel}
                      </Link>
                    ) : null,
                  )}
                </div>
              </div>
            </article>
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

