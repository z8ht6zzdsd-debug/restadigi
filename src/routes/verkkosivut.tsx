import { createFileRoute, Link } from "@tanstack/react-router";
import { Crown, Gem, Plus, Sparkles, type LucideIcon } from "lucide-react";
import successBusyTerrace from "@/assets/success-busy-terrace.jpg";
import successTouristGroup from "@/assets/success-tourist-group.jpg";
import successGuestsArriving from "@/assets/success-guests-arriving.jpg";
import { ProductPackageCards } from "@/components/product-package-cards";
import { MarketingBand } from "@/components/marketing-band";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";
import { PageMeta } from "@/components/page-meta";
import { useMessages } from "@/i18n";

const PACKAGE_ICONS: Record<string, LucideIcon> = {
  Start: Sparkles,
  Plus: Plus,
  Kulta: Crown,
  Gold: Crown,
  Oro: Crown,
  Timantti: Gem,
  Diamond: Gem,
  Diamante: Gem,
};

/** Näkyvyys → kävijät → varaukset */
const SUCCESS_SCENES = [
  { src: successTouristGroup, alt: "Turisteja retkellä" },
  { src: successBusyTerrace, alt: "Täysi terassi" },
  { src: successGuestsArriving, alt: "Asiakkaita saapumassa" },
] as const;

export const Route = createFileRoute("/verkkosivut")({
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
        title={
          <>
            {w.hero.titleBefore}
            <span className="font-serif italic text-accent">{w.hero.titleAccent}</span>
            {w.hero.titleAfter}
          </>
        }
        description={w.hero.description}
      />

      <MarketingBand className="!bg-white">
        <article className="mb-5 overflow-hidden rounded-[1.75rem] sm:rounded-[2rem] bg-[#432f24] text-white shadow-[0_16px_48px_-20px_rgba(50,30,20,0.28)]">
          <div className="grid items-stretch lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1.35fr)]">
            <div className="flex items-center gap-5 px-6 py-8 sm:gap-7 sm:px-8 sm:py-10 lg:gap-8 lg:py-8 lg:pl-8 lg:pr-4">
              <div className="min-w-0 flex-1">
                <h2 className="max-w-[16ch] text-3xl font-bold tracking-tight sm:text-4xl">
                  {w.midBanner.title}
                </h2>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-white/88 sm:text-base">
                  {w.midBanner.description}
                </p>
              </div>
              <a
                href="#verkkosivu-paketit"
                className="page-hero__devices-promo-chip shrink-0"
                aria-label={w.hero.promo}
              >
                <span className="page-hero__devices-promo-line">{w.hero.promoLine1}</span>
                <span className="page-hero__devices-promo-price">{w.hero.promoLine2}</span>
              </a>
            </div>
            <div className="grid min-h-0 grid-cols-3 gap-0.5 bg-[#432f24]">
              {SUCCESS_SCENES.map((scene) => (
                <div
                  key={scene.alt}
                  className="relative aspect-[3/4] overflow-hidden bg-white lg:aspect-auto lg:min-h-[16rem]"
                >
                  <img
                    src={scene.src}
                    alt=""
                    aria-hidden
                    className="size-full object-cover object-center"
                  />
                </div>
              ))}
            </div>
          </div>
        </article>

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
            summary: pkg.summary,
            bullets: pkg.bullets,
            deviceLayout: true,
            deviceMode: "site-layouts" as const,
            icon: PACKAGE_ICONS[pkg.name],
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
