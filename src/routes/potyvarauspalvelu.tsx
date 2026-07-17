import { createFileRoute, Link } from "@tanstack/react-router";
import { BellRing, Clock3, LayoutGrid, Link2 } from "lucide-react";
import heroStudio from "@/assets/hero-studio.jpg";
import { BookingChatbotButton } from "@/components/chatbot-widget";
import { FloorPlanDevicePreviews } from "@/components/floor-plan-device-previews";
import { ReservationsDevicePreviews } from "@/components/reservations-device-previews";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";
import { PageMeta } from "@/components/page-meta";
import { useMessages } from "@/i18n";

const FEATURE_ICONS = [Clock3, BellRing, LayoutGrid, Link2] as const;

export const Route = createFileRoute("/potyvarauspalvelu")({
  head: () => ({
    meta: [
      { title: "Pöytävarauspalvelu — Restadigi" },
      {
        name: "description",
        content:
          "Moderni pöytävarauspalvelu ravintoloille — asiakkaat varaavat pöydän suoraan verkkosivuiltasi ympäri vuorokauden.",
      },
      { property: "og:title", content: "Pöytävarauspalvelu — Restadigi" },
      {
        property: "og:description",
        content: "Sujuvat pöytävaraukset suoraan ravintolasi verkkosivuilta.",
      },
    ],
  }),
  component: PotyvarausPage,
});

function PotyvarausPage() {
  const t = useMessages();
  const b = t.booking;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased">
      <PageMeta
        title={b.meta.title}
        description={b.meta.description}
        ogTitle={b.meta.ogTitle}
        ogDescription={b.meta.ogDescription}
      />
      <SiteHeader />

      <PageHero
        image={heroStudio}
        title={
          <>
            <span className="font-serif italic text-accent">{b.hero.titleAccent}</span>
            {b.hero.titleAfter}
          </>
        }
        description={b.hero.description}
        actions={<BookingChatbotButton />}
      />

      <section className="border-t border-border bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-accent">
              {b.dashboard.eyebrow}
            </p>
            <h2 className="mb-4 text-balance text-3xl font-medium tracking-tight sm:text-4xl">
              {b.dashboard.titleBefore}
              <span className="font-serif italic text-accent">{b.dashboard.titleAccent}</span>
              {b.dashboard.titleAfter}
            </h2>
            <p className="text-pretty text-base leading-relaxed text-foreground/70">
              {b.dashboard.body}
            </p>
          </div>
          <ReservationsDevicePreviews />
        </div>
      </section>

      <section className="border-t border-border bg-white pt-16 pb-8 sm:pt-24 sm:pb-12">
        <div className="mx-auto mb-14 w-full max-w-7xl px-6 sm:mb-20">
          <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-accent">
              {b.floorPlan.eyebrow}
            </p>
            <h2 className="mb-4 text-balance text-3xl font-medium tracking-tight sm:text-4xl">
              {b.floorPlan.titleBefore}
              <span className="font-serif italic text-accent">{b.floorPlan.titleAccent}</span>
              {b.floorPlan.titleAfter}
            </h2>
            <p className="text-pretty text-base leading-relaxed text-foreground/70">
              {b.floorPlan.body}
            </p>
          </div>
          <FloorPlanDevicePreviews />
        </div>

        <div className="mx-auto max-w-7xl px-6 pb-16 sm:pb-24">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {b.features.map((feature, i) => {
              const Icon = FEATURE_ICONS[i] ?? Clock3;
              return (
                <article
                  key={feature.title}
                  className="group relative overflow-hidden rounded-sm border border-border/80 bg-[#f7f5f2] p-6 transition-colors hover:border-accent/40"
                >
                  <div
                    className="pointer-events-none absolute -top-6 -right-6 size-24 rounded-full bg-accent/10 transition-transform group-hover:scale-110"
                    aria-hidden
                  />
                  <div className="relative">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <span className="inline-flex size-10 items-center justify-center rounded-sm bg-primary text-primary-foreground">
                        <Icon className="size-4" strokeWidth={1.75} />
                      </span>
                      <span className="font-serif text-2xl italic tabular-nums text-accent/50">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mb-2 text-balance text-lg font-medium tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-foreground/65">{feature.body}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-secondary/60 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-end gap-12 md:grid-cols-12">
            <div className="md:col-span-8">
              <h2 className="mb-8 text-balance text-3xl font-medium leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                {b.cta.titleBefore}
                <span className="font-serif italic">{b.cta.titleAccent}</span>
                {b.cta.titleAfter}
              </h2>
            </div>
            <div className="md:col-span-4">
              <Link
                to="/yhteys"
                className="inline-flex items-center gap-3 rounded-full bg-primary py-3 pr-4 pl-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-accent"
              >
                {b.cta.button}
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
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
