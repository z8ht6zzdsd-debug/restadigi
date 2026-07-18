import { createFileRoute, Link } from "@tanstack/react-router";
import restaurantKitchen from "@/assets/restaurant-kitchen.jpg";
import {
  MarketingBand,
  MarketingBox,
  MarketingCtaBox,
  MarketingHeading,
} from "@/components/marketing-band";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";
import { PageMeta } from "@/components/page-meta";
import { useMessages } from "@/i18n";

export const Route = createFileRoute("/meista")({
  head: () => ({
    meta: [
      { title: "Meistä — Restadigi" },
      {
        name: "description",
        content:
          "Restadigi on pieni studio, joka rakentaa kotisivuja ja vahvistaa yritysten diginäkyvyyttä. Tutustu tapaamme tehdä työtä.",
      },
      { property: "og:title", content: "Meistä — Restadigi" },
      {
        property: "og:description",
        content:
          "Pieni studio, iso vastuu. Kotisivuja ja diginäkyvyyttä suomalaisille yrityksille.",
      },
      { property: "og:image", content: restaurantKitchen },
    ],
  }),
  component: MeistaPage,
});

function MeistaPage() {
  const t = useMessages();
  const a = t.about;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased">
      <PageMeta
        title={a.meta.title}
        description={a.meta.description}
        ogTitle={a.meta.ogTitle}
        ogDescription={a.meta.ogDescription}
      />
      <SiteHeader />

      <PageHero
        lifestyle
        image={restaurantKitchen}
        title={
          <>
            {a.titleBefore}
            {a.titleAccent}
            {a.titleAfter}
          </>
        }
        description={a.lead}
        actions={
          <Link
            to="/yhteys"
            className="inline-flex items-center gap-3 rounded-full bg-accent px-7 py-3.5 text-sm font-bold uppercase tracking-[0.08em] text-accent-foreground transition-opacity hover:opacity-90"
          >
            {a.cta.button}
          </Link>
        }
      />

      <MarketingBand>
        <MarketingBox tone="dark" justify="start" className="mb-4 sm:mb-5 min-h-[14rem]">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-accent">{a.eyebrow}</p>
          <p className="max-w-3xl text-sm leading-relaxed text-white/85 sm:text-base">
            {a.secondary}
          </p>
        </MarketingBox>

        <MarketingHeading>
          {a.process.titleBefore}
          {a.process.titleAccent}
          {a.process.titleAfter}
        </MarketingHeading>

        <div className="mb-4 grid gap-4 sm:mb-5 sm:grid-cols-3 sm:gap-5">
          {a.values.map((v) => (
            <MarketingBox key={v.titleAccent + v.titleRest} tone="white" justify="start">
              <h3 className="mb-3 text-xl font-bold tracking-tight">
                {v.titleAccent} {v.titleRest}
              </h3>
              <p className="text-sm leading-relaxed text-foreground/65">{v.body}</p>
            </MarketingBox>
          ))}
        </div>

        <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
          {a.process.steps.map((s) => (
            <MarketingBox key={s.n} tone="dark" justify="start">
              <span className="mb-3 block text-xs font-bold uppercase tracking-[0.2em] text-accent">
                {s.n}
              </span>
              <h3 className="mb-2 text-xl font-bold tracking-tight">{s.title}</h3>
              <p className="text-sm leading-relaxed text-white/80">{s.body}</p>
            </MarketingBox>
          ))}
        </div>

        <MarketingCtaBox
          className="mt-4 sm:mt-5"
          title={
            <>
              {a.cta.titleBefore}
              {a.cta.titleAccent}
              {a.cta.titleAfter}
            </>
          }
        >
          <Link
            to="/yhteys"
            className="inline-flex items-center rounded-full bg-accent px-7 py-3.5 text-sm font-bold uppercase tracking-[0.06em] text-accent-foreground transition-opacity hover:opacity-90"
          >
            {a.cta.button}
          </Link>
        </MarketingCtaBox>
      </MarketingBand>

      <section className="bg-background">
        <SiteFooter />
      </section>
    </div>
  );
}
