import { createFileRoute, Link } from "@tanstack/react-router";
import rafaHeroScreen from "@/assets/websites-hero-rafa-hd.jpg";
import freddosHeroScreen from "@/assets/websites-hero-freddos-hd.jpg";
import { WebsiteAdminPanelPair } from "@/components/dashboard-monitor-preview";
import { MarketingBand } from "@/components/marketing-band";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageMeta } from "@/components/page-meta";
import {
  WebsitesDualLaptopHero,
  WebsitesPackageShowcase,
} from "@/components/websites-package-showcase";
import { useMessages } from "@/i18n";

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
  const demo = w.dashboardPromo;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased">
      <PageMeta
        title={w.meta.title}
        description={w.meta.description}
        ogTitle={w.meta.ogTitle}
        ogDescription={w.meta.ogDescription}
      />
      <SiteHeader />

      <WebsitesDualLaptopHero
        priceLabel={w.hero.priceLabel}
        titleBefore={w.hero.titleBefore}
        titleAccent={w.hero.titleAccent}
        titleAfter={w.hero.titleAfter}
        description={w.hero.description}
        leftScreenSrc={rafaHeroScreen}
        rightScreenSrc={freddosHeroScreen}
      />

      <section className="bg-white px-3 pb-10 sm:px-5 sm:pb-14 lg:px-6">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 rounded-2xl border-2 border-[#1a1512] bg-white p-4 sm:gap-6 sm:rounded-[1.25rem] sm:p-6 lg:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
            <h2 className="max-w-[28ch] text-xl font-bold tracking-tight text-[#1a1512] sm:text-2xl lg:text-3xl">
              {demo.title}
            </h2>
            <div className="flex shrink-0 flex-wrap items-center gap-3 sm:gap-4">
              <a
                href={demo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-[#c46a32] underline-offset-4 hover:underline sm:text-base"
              >
                {demo.body}
              </a>
              <a
                href={demo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full bg-[#432f24] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.06em] text-[#f7f3ee] transition-opacity hover:opacity-90 sm:text-sm"
              >
                {demo.linkLabel}
              </a>
            </div>
          </div>
          <WebsiteAdminPanelPair />
        </div>
      </section>

      <WebsitesPackageShowcase
        packagesTitle={w.packagesTitle}
        packages={w.packages}
        requestQuote={w.requestQuote}
        popular={w.popular}
        footnote={
          <>
            {w.footnoteBefore}
            <Link to="/yllapito" className="underline underline-offset-2 hover:text-[#1d1d1f]">
              {w.footnoteLink}
            </Link>
            {w.footnoteAfter}
          </>
        }
      />

      <MarketingBand className="!bg-white">
        <article className="overflow-hidden rounded-[1.75rem] bg-[#432f24] text-white shadow-[0_16px_48px_-20px_rgba(50,30,20,0.28)] sm:rounded-[2rem]">
          <div className="px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
            <h2 className="max-w-[22ch] text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
              {w.process.title}
            </h2>
            <ol className="mt-8 divide-y divide-white/15 sm:mt-10">
              {w.process.steps.map((step, index) => (
                <li
                  key={step.title}
                  className="grid gap-3 py-5 first:pt-0 last:pb-0 sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:gap-6 sm:py-6"
                >
                  <span className="font-serif text-3xl italic leading-none text-accent sm:text-4xl">
                    {index + 1}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold tracking-tight sm:text-xl">
                      {step.title}
                    </h3>
                    <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/80 sm:text-base">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </article>
      </MarketingBand>

      <section className="bg-background">
        <SiteFooter />
      </section>
    </div>
  );
}
