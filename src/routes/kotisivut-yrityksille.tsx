import { createFileRoute, Link } from "@tanstack/react-router";
import heroWebDevices from "@/assets/hero-web-devices.jpg";
import freddosCoffee from "@/assets/freddos-coffee.jpg";
import { ProductPackageCards } from "@/components/product-package-cards";
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

      <section className="w-full bg-[#f7f3ee] px-6 py-10 sm:py-12">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <img
            src={freddosCoffee}
            alt={w.midBanner.imageAlt}
            width={160}
            height={160}
            className="mb-5 size-28 sm:size-32 object-cover object-center rounded-full ring-1 ring-black/5 shadow-sm"
          />
          <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-balance leading-[1.15] text-foreground">
            {w.midBanner.title}
          </h2>
          <p className="mt-3 max-w-xl text-sm sm:text-base text-foreground/70 leading-relaxed text-balance">
            {w.midBanner.description}
          </p>
        </div>
      </section>

      <ProductPackageCards
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

      <SiteFooter />
    </div>
  );
}
