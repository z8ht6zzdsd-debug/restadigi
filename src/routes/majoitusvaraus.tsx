import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BedDouble,
  Building2,
  ShoppingBag,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";
import heroHotel from "@/assets/hero-hotel-lobby.jpg";
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

const PILLAR_ICONS: LucideIcon[] = [Building2, Sparkles, ShoppingBag, Users];

export const Route = createFileRoute("/majoitusvaraus")({
  head: () => ({
    meta: [
      { title: "Restabooking — majoitusvarauspalvelu — Restadigi" },
      {
        name: "description",
        content:
          "Restabooking: majoitusvaraukset, aktiviteetit, elämykset, tapahtumat ja ryhmävaraukset yhdessä järjestelmässä.",
      },
      { property: "og:title", content: "Restabooking — majoitusvaraus — Restadigi" },
      {
        property: "og:description",
        content: "Kaikki varaukset yhdessä järjestelmässä — hotelleille, majataloille, mökeille ja lomakeskuksille.",
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

      <section className="w-full border-b border-[#e8dfd4] bg-gradient-to-b from-[#f7f3ee] via-[#f3eee8] to-[#ebe8e2]">
        <div className="mx-auto grid max-w-7xl items-start gap-8 px-4 py-10 sm:gap-10 sm:px-6 sm:py-14 lg:grid-cols-12 lg:gap-12 lg:py-16">
          <div className="order-2 lg:order-1 lg:col-span-5">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] sm:aspect-[4/3] sm:rounded-[2rem] lg:aspect-[5/6] lg:min-h-[28rem]">
              <img
                src={heroHotel}
                alt=""
                aria-hidden
                className="absolute inset-0 size-full object-cover object-[center_40%]"
              />
              <div className="absolute inset-0 bg-[#432f24]/20" aria-hidden />
              <div className="absolute left-4 top-4 sm:left-5 sm:top-5">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#432f24]/90 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#f7f3ee]">
                  <BedDouble className="size-3.5 text-accent" strokeWidth={2} aria-hidden />
                  {b.hero.eyebrow}
                </span>
              </div>
            </div>
          </div>

          <div className="order-1 min-w-0 lg:order-2 lg:col-span-7">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {b.hero.eyebrow}
            </p>
            <h1 className="max-w-[18ch] font-serif text-3xl tracking-tight text-[#2a2018] sm:text-4xl lg:text-[2.85rem] lg:leading-[1.08]">
              {b.hero.title}
            </h1>
            <div className="mt-5 space-y-4 sm:mt-6">
              {b.hero.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 48)}
                  className="max-w-2xl text-sm leading-relaxed text-[#5c534c] sm:text-base"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <Link
              to="/yhteys"
              className="mt-8 inline-flex items-center rounded-full bg-accent px-6 py-3 text-sm font-bold uppercase tracking-[0.06em] text-accent-foreground transition-opacity hover:opacity-90"
            >
              {b.hero.cta}
            </Link>
          </div>
        </div>
      </section>

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
          {b.pillarsHeading.titleBefore}
          <span className="italic text-accent">{b.pillarsHeading.titleAccent}</span>
          {b.pillarsHeading.titleAfter}
        </MarketingHeading>

        <div className="mb-10 grid gap-4 sm:mb-14 sm:grid-cols-2 sm:gap-5">
          {b.pillars.map((pillar, i) => {
            const Icon = PILLAR_ICONS[i] ?? Building2;
            return (
              <MarketingBox
                key={pillar.title}
                tone={i % 2 === 0 ? "white" : "dark"}
                justify="start"
                className="min-h-[16rem]"
              >
                <span
                  className={
                    "mb-4 inline-flex size-11 items-center justify-center rounded-full " +
                    (i % 2 === 0 ? "bg-[#432f24] text-white" : "bg-accent/20 text-accent")
                  }
                >
                  <Icon className="size-5" strokeWidth={1.75} aria-hidden />
                </span>
                <h3
                  className={
                    "text-xl font-bold tracking-tight sm:text-2xl " +
                    (i % 2 === 0 ? "text-[#2a2018]" : "text-[#f7f3ee]")
                  }
                >
                  {pillar.title}
                </h3>
                <p
                  className={
                    "mt-2 text-sm font-semibold leading-snug sm:text-base " +
                    (i % 2 === 0 ? "text-accent" : "text-accent")
                  }
                >
                  {pillar.tagline}
                </p>
                <p
                  className={
                    "mt-3 text-sm leading-relaxed sm:text-[0.95rem] " +
                    (i % 2 === 0 ? "text-foreground/70" : "text-white/80")
                  }
                >
                  {pillar.body}
                </p>
              </MarketingBox>
            );
          })}
        </div>

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
