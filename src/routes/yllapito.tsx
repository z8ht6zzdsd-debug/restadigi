import { createFileRoute, Link } from "@tanstack/react-router";
import heroYllapito from "@/assets/hero-yllapito.jpg";
import { ProductPackageCards } from "@/components/product-package-cards";
import { MarketingBand } from "@/components/marketing-band";
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
        lifestyle
        image={heroYllapito}
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
            {h.requestQuote}
          </Link>
        }
      />

      <MarketingBand>
        <ProductPackageCards
          embedded
          sectionId="hosting-paketit"
          title={h.packagesTitle}
          explore={h.explore}
          popular={h.popular}
          requestQuote={h.requestQuote}
          closeLabel={t.widget.sales.closeLabel}
          packages={h.packages}
          footnote={h.footnote}
        />
      </MarketingBand>

      <section className="bg-background">
        <SiteFooter />
      </section>
    </div>
  );
}
