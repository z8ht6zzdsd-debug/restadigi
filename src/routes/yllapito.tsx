import { createFileRoute, Link } from "@tanstack/react-router";
import heroYllapito from "@/assets/hero-yllapito.jpg";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";
import { PageMeta } from "@/components/page-meta";
import { useMessages } from "@/i18n";

export const Route = createFileRoute("/yllapito")({
  head: () => ({
    meta: [
      { title: "Ylläpito — Restadigi" },
      {
        name: "description",
        content:
          "Hosting- ja ylläpitopaketit yrityksille — nopea hosting Suomessa, domain, SSL ja jatkuva tuki.",
      },
      { property: "og:title", content: "Ylläpito — Restadigi" },
      {
        property: "og:description",
        content: "Hosting- ja ylläpitopaketit: Basic ja Pro Business.",
      },
    ],
  }),
  component: YllapitoPage,
});

function YllapitoPage() {
  const t = useMessages();
  const h = t.hosting;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased">
      <PageMeta
        title={h.meta.title}
        description={h.meta.description}
        ogTitle={h.meta.ogTitle}
        ogDescription={h.meta.ogDescription}
      />
      <SiteHeader />

      <PageHero
        image={heroYllapito}
        title={
          <>
            {h.hero.titleBefore}
            <span className="font-serif italic text-accent">{h.hero.titleAccent}</span>
            {h.hero.titleAfter}
          </>
        }
        description={h.hero.description}
      />

      <section className="pb-24 sm:pb-32">
        <div>
          {h.packages.map((pkg, i) => {
            const dark = Boolean(pkg.featured);
            const alt = !dark && i % 2 === 1;
            return (
              <div
                key={pkg.name}
                className={
                  "w-full px-6 py-12 sm:py-16 " +
                  (dark
                    ? "bg-primary text-primary-foreground"
                    : alt
                      ? "bg-secondary/50"
                      : "bg-background")
                }
              >
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-start md:gap-16">
                  <div className="md:w-72 shrink-0 mb-8 md:mb-0">
                    <div className="flex items-baseline gap-3 mb-2">
                      <h3 className="text-2xl font-medium">{pkg.name}</h3>
                      {pkg.featured && (
                        <span className="text-[10px] uppercase tracking-[0.2em] bg-accent text-accent-foreground px-2 py-1 rounded-full">
                          {h.popular}
                        </span>
                      )}
                    </div>
                    <div className="text-4xl font-serif mb-6">{pkg.price}</div>
                    <Link
                      to="/yhteys"
                      className={
                        "inline-flex items-center justify-center gap-2 text-sm font-medium py-3 px-5 rounded-full transition-colors " +
                        (dark
                          ? "bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
                          : "bg-primary text-primary-foreground hover:bg-accent")
                      }
                    >
                      {h.requestQuote}
                    </Link>
                  </div>
                  <ul className="space-y-3 text-sm flex-1">
                    {pkg.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3">
                        <span className="size-1 rounded-full mt-2 shrink-0 bg-accent" />
                        <span
                          className={dark ? "text-primary-foreground/85" : "text-foreground/75"}
                        >
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
          <p className="mt-8 text-xs text-muted-foreground max-w-6xl mx-auto px-6">{h.footnote}</p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
