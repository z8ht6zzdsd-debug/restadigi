import { createFileRoute, Link } from "@tanstack/react-router";
import { BellRing, CalendarDays, Clock3, LayoutGrid, Link2 } from "lucide-react";
import heroStudio from "@/assets/hero-studio.jpg";
import { BookingChatbotButton } from "@/components/chatbot-widget";
import { FloorPlanDevicePreviews } from "@/components/floor-plan-device-previews";
import { ReservationsDevicePreviews } from "@/components/reservations-device-previews";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
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

      <section className="w-full bg-background px-6 py-10 sm:py-14 lg:py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <div className="relative aspect-[16/11] overflow-hidden rounded-[2rem] sm:aspect-[5/3] sm:rounded-[2.5rem]">
              <img
                src={heroStudio}
                alt=""
                aria-hidden
                className="absolute inset-0 size-full object-cover"
              />
              <div className="absolute inset-0 bg-[#432f24]/25" aria-hidden />
              <div className="absolute inset-0 flex items-center justify-center p-5 sm:p-8">
                <div className="w-[92%] max-w-2xl rounded-3xl bg-[#432f24]/92 px-6 py-8 text-center shadow-lg sm:px-10 sm:py-10">
                  <div className="flex items-center justify-center gap-3 sm:gap-4">
                    <span
                      className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent ring-1 ring-accent/35 sm:size-12"
                      aria-hidden
                    >
                      <CalendarDays className="size-5 sm:size-6" strokeWidth={1.75} />
                    </span>
                    <h2 className="text-left text-2xl font-medium leading-[1.1] tracking-tight text-[#f7f3ee] sm:text-4xl lg:text-[2.75rem]">
                      <span className="font-serif italic text-accent">{b.hero.titleAccent}</span>
                      {b.hero.titleAfter}
                    </h2>
                  </div>
                  <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-[#f7f3ee]/85 sm:text-base">
                    {b.hero.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 lg:pl-2">
            <h1 className="text-3xl font-bold leading-[1.08] tracking-tight text-balance sm:text-4xl lg:text-5xl">
              <span className="block">{b.hero.headlineLine1}</span>
              <span className="block">{b.hero.headlineLine2}</span>
            </h1>
            <p className="mt-5 text-base leading-relaxed text-foreground/75 sm:text-lg">
              {b.hero.subtitle}
            </p>
            <div className="mt-8">
              <BookingChatbotButton />
            </div>
          </div>
        </div>
      </section>

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
              <h2 className="mb-6 text-balance text-3xl font-medium leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                {b.cta.titleBefore}
                <span className="font-serif italic">{b.cta.titleAccent}</span>
                {b.cta.titleAfter}
              </h2>
              <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <span className="font-serif text-4xl italic tracking-tight text-accent sm:text-5xl">
                  {b.cta.price}
                </span>
                <span className="text-base text-foreground/55">{b.cta.priceNote}</span>
              </p>
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
