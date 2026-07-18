import { createFileRoute, Link } from "@tanstack/react-router";
import heroWebDevices from "@/assets/hero-web-devices.jpg";
import freddosCoffee from "@/assets/freddos-coffee.jpg";
import { ProductPackageCards } from "@/components/product-package-cards";
import {
  MarketingBand,
  MarketingBox,
} from "@/components/marketing-band";
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

      <MarketingBand>
        <MarketingBox
          tone="photo"
          image={freddosCoffee}
          justify="end"
          className="mb-5 min-h-[20rem] sm:min-h-[22rem]"
        >
          <h2 className="max-w-[18ch] text-3xl font-bold tracking-tight sm:text-4xl">
            {w.midBanner.title}
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/88 sm:text-base">
            {w.midBanner.description}
          </p>
        </MarketingBox>

        <ProductPackageCards
          embedded
          sectionId="verkkosivu-paketit"
          title={w.packagesTitle}
          explore={w.explore}
          popular={w.popular}
          requestQuote={w.requestQuote}
          closeLabel={t.widget.sales.closeLabel}
          packages={w.packages.map((pkg) => ({
            name: pkg.name,
            price: pkg.price,
            featured: pkg.featured,
            description: pkg.tagline,
            bullets: pkg.bullets,
          }))}
          footnote={
            <>
              {w.footnoteBefore}
              <Link to="/yllapito" className="underline underline-offset-2 hover:text-foreground">
                {w.footnoteLink}
              </Link>
              {w.footnoteAfter}
            </>
          }
        />
      </MarketingBand>

      <section className="bg-background">
        <SiteFooter />
      </section>
    </div>
  );
}
