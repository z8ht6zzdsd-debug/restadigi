import { createFileRoute, Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import sportFootball from "@/assets/sport-football.jpg";
import sportFootball2 from "@/assets/sport-football-2.jpg";
import sportHockey from "@/assets/sport-hockey.jpg";
import sportHockey2 from "@/assets/sport-hockey-2.jpg";
import { VisibilityBrandLogoStrip } from "@/components/package-brand-logos";
import { ProductPackageCards } from "@/components/product-package-cards";
import type { PackageDeviceMode } from "@/components/package-device-header";
import { MarketingBand } from "@/components/marketing-band";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageMeta } from "@/components/page-meta";
import { useMessages } from "@/i18n";

const VISIBILITY_DEVICE_MODES: PackageDeviceMode[] = ["ai-logos", "google-logos", "sports"];

const SPORTS_HEADER_IMAGES = [sportFootball, sportFootball2, sportHockey, sportHockey2] as const;

export const Route = createFileRoute("/nakyvyys")({
  head: () => ({
    meta: [
      { title: "Näkyvyys — Restadigi" },
      {
        name: "description",
        content:
          "Diginäkyvyytesi kerralla kuntoon: AI-optimointi, Google-optimointi ja huippu-urheilun näkyvyyspaketti.",
      },
      { property: "og:title", content: "Näkyvyys — Restadigi" },
      {
        property: "og:description",
        content:
          "Kolme tapaa kasvattaa näkyvyyttä: AI-optimointi, Google-optimointi ja huippu-urheilun näkyvyyspaketti.",
      },
    ],
  }),
  component: NakyvyysPage,
});

function NakyvyysPage() {
  const t = useMessages();
  const v = t.visibility;
  const packages = v.packages.slice(0, 3);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased">
      <PageMeta
        title={v.meta.title}
        description={v.meta.description}
        ogTitle={v.meta.ogTitle}
        ogDescription={v.meta.ogDescription}
      />
      <SiteHeader />

      <section className="relative w-full overflow-hidden bg-[#432f24] px-6 py-16 sm:py-24">
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
          aria-hidden
        >
          <span className="font-script w-[96vw] select-none whitespace-nowrap text-center text-[clamp(6rem,28vw,22rem)] leading-none tracking-wide text-[#4a3528]/55">
            {v.hero.brand}
          </span>
        </div>

        <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
          <h1 className="max-w-2xl text-3xl font-bold leading-[1.1] tracking-tight text-[#f7f3ee] sm:text-5xl lg:text-6xl">
            <span className="block">{v.hero.headlineLine1}</span>
            <span className="block">{v.hero.headlineLine2}</span>
          </h1>

          <form
            className="mt-8 w-full max-w-xl"
            onSubmit={(e) => {
              e.preventDefault();
              document.getElementById("nakyvyys-paketit")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
          >
            <label className="sr-only" htmlFor="nakyvyys-haku">
              {v.hero.searchAriaLabel}
            </label>
            <div className="flex items-center rounded-full bg-white px-5 py-3.5 shadow-sm ring-1 ring-black/10">
              <input
                id="nakyvyys-haku"
                type="search"
                name="q"
                placeholder={v.hero.searchPlaceholder}
                className="min-w-0 flex-1 bg-transparent text-base text-[#432f24] outline-none placeholder:text-[#432f24]/40"
              />
              <button
                type="submit"
                className="ml-3 shrink-0 text-[#432f24]/45 transition-colors hover:text-[#432f24]/75"
                aria-label={v.hero.searchAriaLabel}
              >
                <Search className="size-5" strokeWidth={1.75} />
              </button>
            </div>
          </form>

          <VisibilityBrandLogoStrip onDark className="mt-10 sm:mt-12" />
        </div>
      </section>

      <MarketingBand className="!bg-white">
        <ProductPackageCards
          embedded
          sectionId="nakyvyys-paketit"
          title={v.packagesTitle}
          explore={v.explore}
          popular={v.popular}
          requestQuote={v.contactCta}
          closeLabel={t.widget.sales.closeLabel}
          packages={packages.map((pkg, i) => {
            const deviceMode = VISIBILITY_DEVICE_MODES[i] ?? "image";
            return {
              name: pkg.name,
              price: pkg.price,
              featured: pkg.featured,
              description: `${pkg.tagline}. ${pkg.description}`,
              summary: pkg.summary,
              bullets: [...pkg.bullets, `${v.resultPrefix} ${pkg.result}`],
              deviceLayout: true,
              deviceMode,
              headerImages: deviceMode === "sports" ? [...SPORTS_HEADER_IMAGES] : undefined,
            };
          })}
          footnote={v.footnote}
        />

        <p className="mt-10 text-center text-sm text-foreground/60">
          <Link
            to="/graafinen-suunnittelu"
            className="font-semibold text-accent underline-offset-2 hover:underline"
          >
            Graafinen suunnittelu →
          </Link>
        </p>
      </MarketingBand>

      <section className="bg-background">
        <SiteFooter />
      </section>
    </div>
  );
}
