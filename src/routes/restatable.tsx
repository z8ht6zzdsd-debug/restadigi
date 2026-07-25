import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BellRing,
  Check,
  Clock3,
  LayoutGrid,
  Link2,
  MessageCircle,
  Pencil,
  X,
} from "lucide-react";
import { BookingChatbotButton } from "@/components/chatbot-widget";
import { BookingFloorPlanPanel } from "@/components/booking-floor-plan-panel";
import { BookingGoogleProfileMock } from "@/components/booking-google-profile-mock";
import { BookingManagementPanel } from "@/components/booking-management-panel";
import { TableBookingWidget } from "@/components/table-booking-widget";
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

const LOGO_TONES = [
  "bg-[#4285F4] text-white",
  "bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af] text-white",
  "bg-[#1877F2] text-white",
  "bg-[#FFE01B] text-[#241c15]",
  "bg-[#432f24] text-white",
  "bg-[#c46a32] text-white",
] as const;

export const Route = createFileRoute("/restatable")({
  head: () => ({
    meta: [
      { title: "Restatable — Restadigi" },
      {
        name: "description",
        content:
          "Restatable — moderni pöytävarausjärjestelmä ravintoloille. Varaukset kanavilta, hallinta ja pöytäkartta.",
      },
      { property: "og:title", content: "Restatable — Restadigi" },
      {
        property: "og:description",
        content: "Pöytävaraukset kanavilta ja saliin — Restatable.",
      },
    ],
  }),
  component: RestatablePage,
});

function CheckList({ items, icons }: { items: string[]; icons?: ("check" | "edit" | "x")[] }) {
  return (
    <ul className="mt-5 flex flex-wrap gap-2 sm:gap-3">
      {items.map((item, i) => {
        const kind = icons?.[i] ?? "check";
        const Icon = kind === "edit" ? Pencil : kind === "x" ? X : Check;
        return (
          <li
            key={item}
            className="inline-flex items-center gap-2 rounded-full border border-[#e8dfd4] bg-white px-3.5 py-2 text-sm text-[#2a2018]"
          >
            <span className="inline-flex size-6 items-center justify-center rounded-full bg-[#0d9488] text-white">
              <Icon className="size-3.5" strokeWidth={2.25} />
            </span>
            {item}
          </li>
        );
      })}
    </ul>
  );
}

function RestatablePage() {
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

      {/* Full-width Restatable hero */}
      <section className="w-full border-b border-[#e8dfd4] bg-gradient-to-b from-[#f7f3ee] via-[#f3eee8] to-[#ebe8e2]">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-10 sm:gap-10 sm:px-6 sm:py-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12 lg:py-16">
          <div className="min-w-0">
            <BookingManagementPanel />
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {b.dashboard.eyebrow}
            </p>
            <h1 className="max-w-[16ch] font-serif text-3xl tracking-tight text-[#2a2018] sm:text-4xl lg:text-[2.85rem] lg:leading-[1.05]">
              {b.dashboard.titleBefore}
              <span className="italic text-accent">{b.dashboard.titleAccent}</span>
              {b.dashboard.titleAfter}
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-foreground/70 sm:text-base">
              {b.dashboard.body}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                to="/yhteys"
                className="inline-flex items-center rounded-full bg-[#432f24] px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                {b.dashboard.ctaPrimary}
              </Link>
              <Link
                to="/yhteys"
                className="inline-flex items-center rounded-full border border-[#432f24]/20 bg-white px-5 py-2.5 text-sm font-semibold text-[#432f24] transition-colors hover:border-[#432f24]/40"
              >
                {b.dashboard.ctaSecondary}
              </Link>
            </div>
            <p className="mt-3 text-xs text-[#8a7f74]">{b.dashboard.ctaNote}</p>
          </div>
        </div>
      </section>

      <MarketingBand className="pt-10 sm:pt-12">
        {/* Restatable — Kaj demo */}
        <div id="restatable" className="scroll-mt-24">
          <MarketingBox tone="white" justify="start" className="mb-4 sm:mb-5">
            <TableBookingWidget />
          </MarketingBox>
        </div>

        {/* Restachat — white + brown boxes */}
        <div id="varausbotti" className="mb-10 scroll-mt-24 sm:mb-14">
          <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
            <MarketingBox tone="white" justify="center" className="min-h-[14rem]">
              <div className="flex items-center gap-4">
                <h2 className="font-serif text-3xl tracking-tight text-[#2a2018] sm:text-4xl">
                  {b.restachat.shopHeadline}
                </h2>
                <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-[#432f24] text-accent">
                  <MessageCircle className="size-5" strokeWidth={1.75} />
                </span>
              </div>
            </MarketingBox>

            <MarketingBox
              tone="dark"
              justify="center"
              align="center"
              className="min-h-[14rem]"
            >
              <p className="mb-6 max-w-sm font-serif text-xl leading-snug text-[#f7f3ee] sm:text-2xl">
                {b.restachat.tryLabel}
              </p>
              <BookingChatbotButton />
            </MarketingBox>
          </div>
        </div>

        {/* Rest of Restatable / Restabooking content */}
        <MarketingHeading>
          {b.channels.titleBefore}
          <span className="font-serif italic text-accent">{b.channels.titleAccent}</span>
          {b.channels.titleAfter}
        </MarketingHeading>

        <div className="mb-4 grid gap-4 sm:mb-5 lg:grid-cols-[1.05fr_0.95fr] lg:gap-5">
          <MarketingBox tone="white" justify="start">
            <p className="mb-2 text-xs uppercase tracking-[0.2em] text-accent">{b.channels.eyebrow}</p>
            <p className="max-w-xl text-sm leading-relaxed text-foreground/70 sm:text-base">
              {b.channels.body}
            </p>
            <CheckList items={b.channels.items} />

            <div className="mt-8 border-t border-[#e8dfd4] pt-6">
              <p className="mb-2 text-xs uppercase tracking-[0.2em] text-accent">
                {b.guestManage.eyebrow}
              </p>
              <h3 className="font-serif text-2xl tracking-tight text-[#2a2018]">
                {b.guestManage.titleBefore}
                <span className="italic text-accent">{b.guestManage.titleAccent}</span>
                {b.guestManage.titleAfter}
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-foreground/70">
                {b.guestManage.body}
              </p>
              <CheckList items={b.guestManage.items} icons={["x", "edit"]} />
            </div>
          </MarketingBox>

          <MarketingBox
            tone="white"
            justify="center"
            className="overflow-visible bg-gradient-to-br from-[#eef2ff] via-white to-[#f0fdfa] py-8"
          >
            <BookingGoogleProfileMock {...b.channels.mock} />
          </MarketingBox>
        </div>

        <MarketingHeading className="mt-10 sm:mt-12">
          {b.experience.titleBefore}
          <span className="font-serif italic text-accent">{b.experience.titleAccent}</span>
          {b.experience.titleAfter}
        </MarketingHeading>

        <div className="mb-4 grid gap-4 sm:mb-5 lg:grid-cols-[0.95fr_1.05fr] lg:gap-5">
          <MarketingBox tone="white" justify="start">
            <p className="mb-2 text-xs uppercase tracking-[0.2em] text-accent">
              {b.experience.eyebrow}
            </p>
            <p className="max-w-xl text-sm leading-relaxed text-foreground/70 sm:text-base">
              {b.experience.body}
            </p>
            <CheckList items={b.experience.views} />
          </MarketingBox>

          <div className="min-w-0">
            <BookingFloorPlanPanel
              activeViewLabel={b.experience.views[0]}
              views={b.experience.views}
            />
          </div>
        </div>

        <div className="mb-4 mt-10 grid gap-4 sm:mb-5 sm:mt-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-5">
          <MarketingBox tone="white" justify="center" className="min-h-[16rem]">
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              {b.integration.logos.map((label, i) => (
                <span
                  key={label}
                  className={
                    "inline-flex size-14 items-center justify-center rounded-full text-center text-[9px] font-bold uppercase leading-tight tracking-wide shadow-sm sm:size-16 sm:text-[10px] " +
                    LOGO_TONES[i % LOGO_TONES.length]
                  }
                >
                  {label}
                </span>
              ))}
            </div>
          </MarketingBox>

          <MarketingBox tone="white" justify="start">
            <p className="mb-2 text-xs uppercase tracking-[0.2em] text-accent">
              {b.integration.eyebrow}
            </p>
            <h3 className="font-serif text-2xl tracking-tight text-[#2a2018] sm:text-3xl">
              {b.integration.titleBefore}
              <span className="italic text-accent">{b.integration.titleAccent}</span>
              {b.integration.titleAfter}
            </h3>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-foreground/70 sm:text-base">
              {b.integration.body}
            </p>
          </MarketingBox>
        </div>

        <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
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
              <span className="font-serif italic text-accent">{b.cta.titleAccent}</span>
              {b.cta.titleAfter}
            </>
          }
        >
          <p className="mb-1 text-3xl font-extrabold tracking-tight text-accent sm:text-4xl">
            {b.cta.price}
          </p>
          <p className="mx-auto mb-5 max-w-xl text-sm leading-relaxed text-white/55">
            {b.cta.priceNote}
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
