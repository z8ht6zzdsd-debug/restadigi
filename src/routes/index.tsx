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

      {/* McD-tyylinen vaaleanruskea kaista: miksi meidät → referenssit → CTA */}
      <section className="bg-[#ebe8e2] text-foreground pt-10 sm:pt-14 pb-14 sm:pb-20">
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

