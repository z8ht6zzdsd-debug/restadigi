import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, ShoppingBag, Sparkles, Users, type LucideIcon } from "lucide-react";
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

function CompactPanelFeatures({
  eyebrow,
  body,
  coreTitle,
  coreItems,
  activitiesTitle,
  activitiesItems,
}: {
  eyebrow: string;
  body: string;
  coreTitle: string;
  coreItems: string[];
  activitiesTitle: string;
  activitiesItems: string[];
}) {
  return (
    <div className="mx-auto w-full max-w-[34rem] rounded-2xl border-2 border-[#1a1512] bg-white p-4 sm:p-5">
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">{eyebrow}</p>
      <p className="mt-2 text-xs leading-relaxed text-[#5c534c] sm:text-[0.8125rem]">{body}</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 sm:gap-5">
        <div>
          <h3 className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#1a1512]">
            {coreTitle}
          </h3>
          <ul className="mt-2 space-y-1.5">
            {coreItems.map((item) => (
              <li key={item} className="text-[11px] leading-snug text-[#2a2018] sm:text-xs">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#1a1512]">
            {activitiesTitle}
          </h3>
          <ul className="mt-2 space-y-1.5">
            {activitiesItems.map((item) => (
              <li key={item} className="text-[11px] leading-snug text-[#2a2018] sm:text-xs">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
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

      {/* Hero — devices + compact panel box left, copy right */}
      <section className="relative overflow-hidden bg-background">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <span className="absolute -left-16 top-8 size-56 rounded-full border border-[#432f24]/8 sm:size-72" />
          <span className="absolute -left-6 top-20 size-40 rounded-full border border-[#c9a882]/25 sm:size-52" />
          <span className="absolute bottom-10 right-[38%] hidden size-3 rounded-full bg-[#c9a882]/40 lg:block" />
          <span className="absolute right-10 top-1/3 hidden h-24 w-px bg-gradient-to-b from-transparent via-[#432f24]/15 to-transparent lg:block" />
        </div>

        <div className="relative mx-auto grid max-w-6xl items-start gap-8 px-6 py-8 sm:gap-10 sm:py-10 lg:grid-cols-12 lg:gap-12 lg:py-12">
          <div className="relative flex flex-col gap-5 overflow-visible lg:col-span-6 lg:pt-1">
            <StayBookingHeroDevices
              navItems={p.coreItems}
              activeNav={p.activeNav}
              calendarTitle={p.calendarTitle}
              phoneTitle={p.phoneTitle}
              phoneItems={p.activitiesItems}
            />
            <CompactPanelFeatures
              eyebrow={p.eyebrow}
              body={p.body}
              coreTitle={p.coreTitle}
              coreItems={p.coreItems}
              activitiesTitle={p.activitiesTitle}
              activitiesItems={p.activitiesItems}
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

      <section className="w-full border-t border-[#d6d6d6] bg-[#f0f0f0] px-6 py-10 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            {b.demo.sectionEyebrow}
          </p>
          <h2 className="max-w-3xl font-serif text-3xl tracking-tight text-[#2a2018] sm:text-4xl">
            {b.demo.sectionTitleBefore}
            <span className="italic text-inherit">{b.demo.sectionTitleAccent}</span>
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
          <span className="italic text-inherit">{b.pillarsHeading.titleAccent}</span>
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
                  className={"mb-4 inline-flex " + (i % 2 === 0 ? "text-[#432f24]" : "text-accent")}
                >
                  <Icon className="size-6" strokeWidth={1.75} aria-hidden />
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

        <MarketingHeading className="!max-w-none whitespace-nowrap text-[1.85rem] sm:!text-4xl lg:!text-[2.75rem]">
          {b.dashboard.titleBefore}
          <span className="italic text-inherit">{b.dashboard.titleAccent}</span>
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

        <MarketingHeading className="mt-10 sm:mt-12 !max-w-none max-w-4xl text-[1.85rem] sm:!text-4xl lg:!text-[2.75rem]">
          {b.rooms.titleBefore}
          <span className="italic text-inherit">{b.rooms.titleAccent}</span>
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
              <span className="italic text-inherit">{b.cta.titleAccent}</span>
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
