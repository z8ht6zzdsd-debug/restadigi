import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ProductPackageCards,
  RestadigiBrownPanel,
} from "@/components/product-package-cards";
import { MarketingBand } from "@/components/marketing-band";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
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

      <section className="w-full bg-background px-6 py-8 sm:py-10">
        <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <h1 className="text-3xl font-bold leading-[1.05] tracking-tight text-balance sm:text-4xl lg:text-5xl">
              {h.hero.titleBefore}
              <span className="font-serif italic text-accent">{h.hero.titleAccent}</span>
              {h.hero.titleAfter}
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-foreground/75 sm:text-base">
              {h.hero.description}
            </p>
            <Link
              to="/yhteys"
              className="mt-6 inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-accent"
            >
              {h.requestQuote}
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

          <div className="lg:col-span-7">
            <RestadigiBrownPanel className="aspect-[2/1] max-h-56 sm:max-h-64" />
          </div>
        </div>
      </section>

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
