import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Building2,
  ShoppingBag,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";
import { StayBookingHeroDevices } from "@/components/stay-booking-hero-devices";
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
        content:
          "Kaikki varaukset yhdessä järjestelmässä — hotelleille, majataloille, mökeille ja lomakeskuksille.",
      },
    ],
  }),
  component: MajoitusvarausPage,
});

function FeatureListCard({ title, items }: { title: string; items: string[] }) {
  return (
    <MarketingBox tone="white" justify="start" className="min-h-0 py-6 sm:py-7">
      <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-[#2a2018]">{title}</h3>
      <ul className="mt-4 divide-y divide-[#d6d6d6]">
        {items.map((item) => (
          <li key={item} className="py-2.5 text-sm leading-snug text-[#2a2018] sm:text-[0.95rem]">
            {item}
          </li>
        ))}
      </ul>
    </MarketingBox>
  );
}

function MajoitusvarausPage() {
  const t = useMessages();
  const b = t.stayBooking;
  const p = b.panelFeatures;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased">
      <PageMeta
        title={b.meta.title}
        description={b.meta.description}
        ogTitle={b.meta.ogTitle}
        ogDescription={b.meta.ogDescription}
      />
      <SiteHeader />

      {/* Hero — same proportions as homepage Freddos stage */}
      <section className="relative overflow-hidden bg-background">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <span className="absolute -left-16 top-8 size-56 rounded-full border border-[#432f24]/8 sm:size-72" />
          <span className="absolute -left-6 top-20 size-40 rounded-full border border-[#c9a882]/25 sm:size-52" />
          <span className="absolute bottom-10 right-[38%] hidden size-3 rounded-full bg-[#c9a882]/40 lg:block" />
          <span className="absolute right-10 top-1/3 hidden h-24 w-px bg-gradient-to-b from-transparent via-[#432f24]/15 to-transparent lg:block" />
        </div>

        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 py-12 sm:py-16 lg:grid-cols-12 lg:gap-12 lg:py-20">
          <div className="relative overflow-visible pb-4 lg:col-span-6 lg:pb-2">
            <StayBookingHeroDevices
              navItems={p.coreItems}
              activeNav={p.activeNav}
              calendarTitle={p.calendarTitle}
              phoneTitle={p.phoneTitle}
              phoneItems={p.activitiesItems}
            />
          </div>

          <div className="relative min-w-0 lg:col-span-6">
            <h1 className="max-w-[16ch] text-[2.35rem] font-extrabold leading-[0.98] tracking-tight text-balance sm:text-5xl lg:text-[3.35rem]">
              {b.hero.title}
            </h1>
            <div className="mt-5 space-y-3.5 sm:mt-6">
              {b.hero.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 48)}
                  className="max-w-xl text-base leading-relaxed text-foreground/70 sm:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <Link
              to="/yhteys"
              className="mt-8 inline-flex items-center justify-center rounded-full !bg-[#432f24] px-7 py-3.5 text-sm font-bold uppercase tracking-[0.08em] !text-[#f0f0f0] transition-opacity hover:opacity-90"
            >
              {b.hero.cta}
            </Link>
          </div>
        </div>
      </section>

      <MarketingBand className="!pt-8 sm:!pt-10">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          {p.eyebrow}
        </p>
        <MarketingHeading>
          {p.titleBefore}
          <span className="italic text-accent">{p.titleAccent}</span>
          {p.titleAfter}
        </MarketingHeading>
        <p className="mb-8 max-w-2xl text-sm leading-relaxed text-foreground/70 sm:mb-10 sm:text-base">
          {p.body}
        </p>
        <div className="mb-10 grid gap-4 sm:mb-14 sm:grid-cols-2 sm:gap-5">
          <FeatureListCard title={p.coreTitle} items={p.coreItems} />
          <FeatureListCard title={p.activitiesTitle} items={p.activitiesItems} />
        </div>
      </MarketingBand>

      <section className="w-full bg-[#f0f0f0] px-6 py-10 sm:py-14 lg:py-16">
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
                    (i % 2 === 0 ? "text-[#2a2018]" : "text-[#f0f0f0]")
                  }
                >
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm font-semibold leading-snug text-accent sm:text-base">
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
