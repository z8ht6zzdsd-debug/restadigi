import { createFileRoute, Link } from "@tanstack/react-router";
import heroStudio from "@/assets/hero-studio.jpg";
import { BookingChatbotButton } from "@/components/chatbot-widget";
import { ReservationsDevicePreviews } from "@/components/reservations-device-previews";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";
import { PageMeta } from "@/components/page-meta";
import { useMessages } from "@/i18n";

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
            <h2 className="mb-4 text-3xl font-medium tracking-tight text-balance sm:text-4xl">
              {b.dashboard.titleBefore}
              <span className="font-serif italic text-accent">{b.dashboard.titleAccent}</span>
              {b.dashboard.titleAfter}
            </h2>
            <p className="text-base leading-relaxed text-foreground/70 text-pretty">
              {b.dashboard.body}
            </p>
          </div>
          <ReservationsDevicePreviews />
        </div>
      </section>

      <section className="pb-24 pt-8 sm:pb-32 sm:pt-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {b.features.map((feature) => (
              <div key={feature.title} className="rounded-sm border border-border bg-card p-8">
                <h3 className="mb-3 text-xl font-medium">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-foreground/70">{feature.body}</p>
              </div>
            ))}
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
