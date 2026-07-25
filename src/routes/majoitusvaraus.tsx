import { createFileRoute, Link } from "@tanstack/react-router";
import { BedDouble, CalendarRange, Clock3, Link2, MoonStar, Sparkles } from "lucide-react";
import heroHotel from "@/assets/hero-hotel-lobby.jpg";
import { ServiceSplitHero } from "@/components/service-split-hero";
import { StayBookingWidget } from "@/components/stay-booking-widget";
import { StayReservationsDevicePreviews } from "@/components/stay-reservations-device-previews";
import { StayRoomsDevicePreviews } from "@/components/stay-rooms-device-previews";
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

const FEATURE_ICONS = [Clock3, MoonStar, CalendarRange, Link2] as const;

export const Route = createFileRoute("/majoitusvaraus")({
  head: () => ({
    meta: [
      { title: "Restabooking — majoitusvarauspalvelu — Restadigi" },
      {
        name: "description",
        content:
          "Restabooking: moderni majoitusvaraus hotelleille, majataloille ja mökeille — asiakkaat varaavat suoraan sivuilta.",
      },
      { property: "og:title", content: "Restabooking — majoitusvaraus — Restadigi" },
      {
        property: "og:description",
        content: "Majoitusvaraukset suoraan verkkosivuiltasi — mukautuu asiakkaan tarpeisiin.",
      },
    ],
  }),
  component: MajoitusvarausPage,
});

function MajoitusvarausPage() {
  const t = useMessages();
  const b = t.stayBooking;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased">
      <PageMeta
        title={b.meta.title}
        description={b.meta.description}
        ogTitle={b.meta.ogTitle}
        ogDescription={b.meta.ogDescription}
      />
      <SiteHeader />

      <ServiceSplitHero
        image={heroHotel}
        imageClassName="object-[center_45%] sm:object-center"
        icon={BedDouble}
        overlayTitle={
          <>
            <span className="font-serif italic text-accent">{b.hero.titleAccent}</span>
            {b.hero.titleAfter}
          </>
        }
        overlayDescription={b.hero.description}
        headlineLine1={b.hero.headlineLine1}
        headlineLine2={b.hero.headlineLine2}
        subtitle={b.hero.subtitle}
        actions={
          <Link
            to="/yhteys"
            className="inline-flex items-center rounded-full bg-accent px-6 py-3 text-sm font-bold uppercase tracking-[0.06em] text-accent-foreground transition-opacity hover:opacity-90"
          >
            {b.hero.cta}
          </Link>
        }
      />

      <section className="w-full bg-[#f7f3ee] px-6 py-10 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            {b.demo.sectionEyebrow}
          </p>
          <h2 className="max-w-3xl font-serif text-3xl tracking-tight text-[#2a2018] sm:text-4xl">
            {b.demo.sectionTitleBefore}
            <span className="italic text-accent">{b.demo.sectionTitleAccent}</span>
            {b.demo.sectionTitleAfter}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#5c534c] sm:text-base">
            {b.demo.sectionBody}
          </p>
          <div className="mt-8">
            <StayBookingWidget />
          </div>
        </div>
      </section>

      <MarketingBand>
        <MarketingHeading>
          {b.dashboard.titleBefore}
          <span className="italic text-accent">{b.dashboard.titleAccent}</span>
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
            <StayReservationsDevicePreviews />
          </div>
        </MarketingBox>

        <MarketingHeading className="mt-10 sm:mt-12">
          {b.rooms.titleBefore}
          <span className="italic text-accent">{b.rooms.titleAccent}</span>
          {b.rooms.titleAfter}
        </MarketingHeading>

        <MarketingBox tone="dark" justify="start" className="mb-4 sm:mb-5">
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-accent">{b.rooms.eyebrow}</p>
          <p className="max-w-3xl text-sm leading-relaxed text-white/85 sm:text-base">
            {b.rooms.body}
          </p>
          <div className="mt-8">
            <StayRoomsDevicePreviews />
          </div>
        </MarketingBox>

        <div className="mb-2 flex items-center gap-2 text-accent">
          <Sparkles className="size-4" />
          <p className="text-xs font-semibold uppercase tracking-[0.18em]">{b.adaptEyebrow}</p>
        </div>
        <p className="mb-6 max-w-3xl text-sm leading-relaxed text-foreground/70 sm:text-base">
          {b.adaptBody}
        </p>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {b.features.map((feature, i) => {
            const Icon = FEATURE_ICONS[i] ?? Clock3;
            return (
              <MarketingBox
                key={feature.title}
                tone="white"
                justify="start"
                className="min-h-[14rem]"
              >
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
              <span className="italic text-accent">{b.cta.titleAccent}</span>
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
