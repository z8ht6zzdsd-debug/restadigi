import { createFileRoute, Link } from "@tanstack/react-router";
import { BellRing, CalendarDays, Clock3, LayoutGrid, Link2 } from "lucide-react";
import heroStudio from "@/assets/hero-studio.jpg";
import { BookingChatbotButton } from "@/components/chatbot-widget";
import { FloorPlanDevicePreviews } from "@/components/floor-plan-device-previews";
import { ReservationsDevicePreviews } from "@/components/reservations-device-previews";
import {
  MarketingBand,
  MarketingBox,
  MarketingCtaBox,
  MarketingHeading,
} from "@/components/marketing-band";
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

      <MarketingBand>
        <MarketingHeading>
          {b.dashboard.titleBefore}
          {b.dashboard.titleAccent}
          {b.dashboard.titleAfter}
        </MarketingHeading>

        <MarketingBox tone="white" justify="start" className="mb-4 sm:mb-5">
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-accent">
            {b.dashboard.eyebrow}
          </p>
          <p className="max-w-3xl text-sm leading-relaxed text-foreground/70 sm:text-base">
            {b.dashboard.body}
          </p>
          <div className="mt-8">
            <ReservationsDevicePreviews />
          </div>
        </MarketingBox>

        <MarketingHeading className="mt-10 sm:mt-12">
          {b.floorPlan.titleBefore}
          {b.floorPlan.titleAccent}
          {b.floorPlan.titleAfter}
        </MarketingHeading>

        <MarketingBox tone="dark" justify="start" className="mb-4 sm:mb-5">
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-accent">
            {b.floorPlan.eyebrow}
          </p>
          <p className="max-w-3xl text-sm leading-relaxed text-white/85 sm:text-base">
            {b.floorPlan.body}
          </p>
          <div className="mt-8">
            <FloorPlanDevicePreviews />
          </div>
        </MarketingBox>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {b.features.map((feature, i) => {
            const Icon = FEATURE_ICONS[i] ?? Clock3;
            return (
              <MarketingBox key={feature.title} tone="white" justify="start" className="min-h-[14rem]">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="inline-flex size-10 items-center justify-center rounded-full bg-[#432f24] text-white">
                    <Icon className="size-4" strokeWidth={1.75} />
                  </span>
                  <span className="text-sm font-bold tabular-nums text-foreground/35">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mb-2 text-lg font-bold tracking-tight">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-foreground/65">{feature.body}</p>
              </MarketingBox>
            );
          })}
        </div>

        <MarketingCtaBox
          className="mt-4 sm:mt-5"
          title={
            <>
              {b.cta.titleBefore}
              {b.cta.titleAccent}
              {b.cta.titleAfter}
            </>
          }
        >
          <p className="mb-2 flex flex-wrap items-baseline justify-center gap-x-2 gap-y-1">
            <span className="text-3xl font-extrabold tracking-tight text-accent sm:text-4xl">
              {b.cta.price}
            </span>
            <span className="text-sm text-white/55">{b.cta.priceNote}</span>
          </p>
          <Link
            to="/yhteys"
            className="inline-flex items-center rounded-full bg-accent px-7 py-3.5 text-sm font-bold uppercase tracking-[0.06em] text-accent-foreground transition-opacity hover:opacity-90"
          >
            {b.cta.button}
          </Link>
        </MarketingCtaBox>
      </MarketingBand>

      <section className="bg-background">
        <SiteFooter />
      </section>
    </div>
  );
}
