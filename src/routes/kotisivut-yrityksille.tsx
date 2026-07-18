import { createFileRoute, Link } from "@tanstack/react-router";
import { Crown, Gem, LayoutTemplate, Sparkles } from "lucide-react";
import heroWebDevices from "@/assets/hero-web-devices.jpg";
import successBusyTerrace from "@/assets/success-busy-terrace.jpg";
import successTouristGroup from "@/assets/success-tourist-group.jpg";
import successGuestsArriving from "@/assets/success-guests-arriving.jpg";
import pkgWebStart from "@/assets/pkg-web-start.jpg";
import pkgWebPlus from "@/assets/pkg-web-plus.jpg";
import pkgWebKulta from "@/assets/pkg-web-kulta.jpg";
import pkgWebTimantti from "@/assets/pkg-web-timantti.jpg";
import { ProductPackageCards } from "@/components/product-package-cards";
import { MarketingBand } from "@/components/marketing-band";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";
import { PageMeta } from "@/components/page-meta";
import { useMessages } from "@/i18n";

const WEBSITE_ICONS = [LayoutTemplate, Sparkles, Crown, Gem] as const;
const WEBSITE_HEADER_IMAGES = [
  pkgWebStart,
  pkgWebPlus,
  pkgWebKulta,
  pkgWebTimantti,
] as const;

/** Näkyvyys → kävijät → varaukset */
const SUCCESS_SCENES = [
  { src: successTouristGroup, alt: "Turisteja retkellä" },
  { src: successBusyTerrace, alt: "Täysi terassi" },
  { src: successGuestsArriving, alt: "Asiakkaita saapumassa" },
] as const;

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
        <article className="mb-5 overflow-hidden rounded-[1.75rem] sm:rounded-[2rem] bg-[#432f24] text-white shadow-[0_16px_48px_-20px_rgba(50,30,20,0.28)]">
          <div className="grid items-stretch lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1.4fr)]">
            <div className="flex flex-col justify-center px-6 py-8 sm:px-8 sm:py-10 lg:py-8">
              <h2 className="max-w-[16ch] text-3xl font-bold tracking-tight sm:text-4xl">
                {w.midBanner.title}
              </h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-white/88 sm:text-base">
                {w.midBanner.description}
              </p>
            </div>
            <div className="grid min-h-0 grid-cols-3 gap-0.5 bg-[#432f24]">
              {SUCCESS_SCENES.map((scene) => (
                <div
                  key={scene.alt}
                  className="relative aspect-[3/4] overflow-hidden bg-[#ebe8e2] lg:aspect-auto lg:min-h-[16rem]"
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
          packages={w.packages.map((pkg, i) => ({
            name: pkg.name,
            price: pkg.price,
            featured: pkg.featured,
            description: pkg.tagline,
            bullets: pkg.bullets,
            icon: WEBSITE_ICONS[i],
            headerImage: WEBSITE_HEADER_IMAGES[i],
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
