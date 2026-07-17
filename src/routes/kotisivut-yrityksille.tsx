import { createFileRoute, Link } from "@tanstack/react-router";
import heroWebDevices from "@/assets/hero-web-devices.jpg";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";
import { PageMeta } from "@/components/page-meta";
import { useMessages } from "@/i18n";

export const Route = createFileRoute("/kotisivut-yrityksille")({
  head: () => ({
    meta: [
      { title: "Kotisivut yrityksille — Restadigi" },
      {
        name: "description",
        content:
          "Selkeät ja vaikuttavat kotisivupaketit ja graafiset lisäpalvelut yrityksille ja yhdistyksille.",
      },
      { property: "og:title", content: "Kotisivut yrityksille — Restadigi" },
      {
        property: "og:description",
        content: "Kotisivupaketit ja graafiset lisäpalvelut yrityksesi tarpeisiin.",
      },
    ],
  }),
  component: KotisivutPage,
});

function KotisivutPage() {
  const t = useMessages();
  const w = t.websites;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased">
      <PageMeta
        title={w.meta.title}
        description={w.meta.description}
        ogTitle={w.meta.ogTitle}
        ogDescription={w.meta.ogDescription}
      />
      <SiteHeader />

      <PageHero
        devices
        image={heroWebDevices}
        title={
          <>
            {w.hero.titleBefore}
            <span className="font-serif italic text-accent">{w.hero.titleAccent}</span>
            {w.hero.titleAfter}
          </>
        }
        description={w.hero.description}
      />

      {/* Paketit */}
      <section className="pb-24 sm:pb-32">
        <div>
          {w.packages.map((p, i) => {
            const dark = Boolean(p.featured);
            const alt = !dark && i % 2 === 1;
            return (
              <div
                key={p.name}
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
                      <h3 className="text-2xl font-medium">{p.name}</h3>
                      {p.featured && (
                        <span className="text-[10px] uppercase tracking-[0.2em] bg-accent text-accent-foreground px-2 py-1 rounded-full">
                          {w.popular}
                        </span>
                      )}
                    </div>
                    <p
                      className={
                        "text-sm mb-4 " +
                        (dark ? "text-primary-foreground/70" : "text-foreground/60")
                      }
                    >
                      {p.tagline}
                    </p>
                    <div className="text-4xl font-serif mb-6">{p.price}</div>
                    <Link
                      to="/yhteys"
                      className={
                        "inline-flex items-center justify-center gap-2 text-sm font-medium py-3 px-5 rounded-full transition-colors " +
                        (dark
                          ? "bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
                          : "bg-primary text-primary-foreground hover:bg-accent")
                      }
                    >
                      {w.requestQuote}
                    </Link>
                  </div>
                  <ul className="space-y-3 text-sm flex-1">
                    {p.bullets.map((b) => (
                      <li key={b} className="flex gap-3">
                        <span className="size-1 rounded-full mt-2 shrink-0 bg-accent" />
                        <span
                          className={dark ? "text-primary-foreground/85" : "text-foreground/75"}
                        >
                          {b}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
          <p className="mt-8 text-xs text-muted-foreground max-w-6xl mx-auto px-6">
            {w.footnoteBefore}
            <Link to="/yllapito" className="underline underline-offset-2 hover:text-foreground">
              {w.footnoteLink}
            </Link>
            {w.footnoteAfter}
          </p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
