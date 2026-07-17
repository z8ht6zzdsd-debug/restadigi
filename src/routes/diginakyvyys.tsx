import { createFileRoute, Link } from "@tanstack/react-router";
import heroDiginakyvyys from "@/assets/hero-diginakyvyys.jpg";
import { PackageBrandLogos, packageLogoKind } from "@/components/package-brand-logos";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";
import { PageMeta } from "@/components/page-meta";
import { useMessages } from "@/i18n";

export const Route = createFileRoute("/diginakyvyys")({
  head: () => ({
    meta: [
      { title: "Diginäkyvyys — Restadigi" },
      {
        name: "description",
        content:
          "Diginäkyvyytesi kerralla kuntoon: AI-optimointi, Google-optimointi ja huippu-urheilun näkyvyyspaketti.",
      },
      { property: "og:title", content: "Diginäkyvyys — Restadigi" },
      {
        property: "og:description",
        content:
          "Kolme tapaa kasvattaa näkyvyyttä: AI-optimointi, Google-optimointi ja huippu-urheilun näkyvyyspaketti.",
      },
    ],
  }),
  component: DiginakyvyysPage,
});

function DiginakyvyysPage() {
  const t = useMessages();
  const v = t.visibility;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased">
      <PageMeta
        title={v.meta.title}
        description={v.meta.description}
        ogTitle={v.meta.ogTitle}
        ogDescription={v.meta.ogDescription}
      />
      <SiteHeader />

      <PageHero
        image={heroDiginakyvyys}
        title={
          <>
            {v.hero.titleBefore}
            <span className="font-serif italic text-accent">{v.hero.titleAccent}</span>
            {v.hero.titleAfter}
          </>
        }
        description={v.hero.description}
      />

      {/* Paketit */}
      <section className="pb-16 sm:pb-20">
        <div>
          {v.packages.map((p, i) => {
            const dark = Boolean(p.featured);
            const alt = !dark && i % 2 === 1;
            const logoKind = packageLogoKind(p.name);
            return (
              <div
                key={p.name}
                className={
                  "w-full px-6 py-8 sm:py-10 " +
                  (dark
                    ? "bg-primary text-primary-foreground"
                    : alt
                      ? "bg-secondary/50"
                      : "bg-background")
                }
              >
                <div className="mx-auto max-w-6xl">
                  <div className="mb-5 flex items-baseline gap-3">
                    <h3 className="text-xl font-medium sm:text-2xl">{p.name}</h3>
                    {p.featured && (
                      <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-accent-foreground">
                        {v.popular}
                      </span>
                    )}
                  </div>
                  <div
                    className={
                      "grid gap-8 md:items-start md:gap-10 " +
                      (logoKind ? "md:grid-cols-3" : "md:grid-cols-2")
                    }
                  >
                    <div>
                      <p
                        className={
                          "mb-1.5 text-sm " +
                          (dark ? "text-primary-foreground/70" : "text-foreground/60")
                        }
                      >
                        {p.tagline}
                      </p>
                      <p
                        className={
                          "mb-3 text-sm leading-snug " +
                          (dark ? "text-primary-foreground/80" : "text-foreground/70")
                        }
                      >
                        {p.description}
                      </p>
                      <p
                        className={
                          "text-sm italic " +
                          (dark ? "text-primary-foreground/75" : "text-foreground/65")
                        }
                      >
                        {v.resultPrefix} {p.result}
                      </p>
                    </div>
                    <div className="flex flex-col gap-5">
                      <ul className="space-y-2 text-sm">
                        {p.bullets.map((b) => (
                          <li key={b} className="flex gap-3">
                            <span className="mt-1.5 size-1 shrink-0 rounded-full bg-accent" />
                            <span
                              className={
                                "leading-snug " +
                                (dark ? "text-primary-foreground/85" : "text-foreground/75")
                              }
                            >
                              {b}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <div>
                        <div className="mb-3 font-serif text-3xl sm:text-4xl">{p.price}</div>
                        <Link
                          to="/yhteys"
                          className={
                            "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors " +
                            (dark
                              ? "bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
                              : "bg-primary text-primary-foreground hover:bg-accent")
                          }
                        >
                          {v.contactCta}
                        </Link>
                      </div>
                    </div>
                    {logoKind && (
                      <div className="md:flex md:justify-center">
                        <PackageBrandLogos kind={logoKind} dark={dark} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          <p className="mx-auto mt-6 max-w-6xl px-6 text-xs text-muted-foreground">{v.footnote}</p>
        </div>
      </section>

      {/* Yritysilme */}
      <section className="w-full px-6 py-16 sm:py-24 bg-secondary/50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-start md:gap-16">
          <div className="md:w-80 shrink-0 mb-8 md:mb-0">
            <h2 className="text-3xl sm:text-4xl font-medium leading-[1.1] tracking-tight text-balance">
              {v.branding.titleBefore}
              <span className="font-serif italic">{v.branding.titleAccent}</span>
              {v.branding.titleAfter}
            </h2>
            <p className="mt-6 text-foreground/70 leading-relaxed">{v.branding.description}</p>
            <Link
              to="/yhteys"
              className="inline-flex items-center gap-3 mt-8 bg-primary text-primary-foreground text-sm font-medium py-3 pr-4 pl-5 rounded-full hover:bg-accent transition-colors"
            >
              {v.branding.customQuote}
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
          </div>
          <ul className="flex-1 space-y-6">
            {v.branding.extras.map((e) => (
              <li key={e.name} className="flex justify-between items-baseline gap-6">
                <span className="text-base font-medium">{e.name}</span>
                <span className="text-sm text-foreground/60 tabular-nums shrink-0">{e.price}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 sm:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-12 items-end">
            <div className="md:col-span-8">
              <h2 className="text-3xl sm:text-5xl lg:text-6xl leading-[1.05] font-medium tracking-tight text-balance">
                {v.cta.titleBefore}
                <span className="font-serif italic">{v.cta.titleAccent}</span>
                {v.cta.titleAfter}
              </h2>
            </div>
            <div className="md:col-span-4">
              <Link
                to="/yhteys"
                className="inline-flex items-center gap-3 bg-primary text-primary-foreground text-sm font-medium py-3 pr-4 pl-5 rounded-full hover:bg-accent transition-colors"
              >
                {v.cta.button}
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
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
