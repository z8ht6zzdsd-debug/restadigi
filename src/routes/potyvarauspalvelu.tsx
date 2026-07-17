import { createFileRoute, Link } from "@tanstack/react-router";
import heroStudio from "@/assets/hero-studio.jpg";
import { BookingChatbotButton } from "@/components/chatbot-widget";
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

      <section className="pb-24 sm:pb-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {b.features.map((feature) => (
              <div key={feature.title} className="border border-border bg-card rounded-sm p-8">
                <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
                <p className="text-sm text-foreground/70 leading-relaxed">{feature.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32 bg-secondary/60">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-12 items-end">
            <div className="md:col-span-8">
              <h2 className="text-3xl sm:text-5xl lg:text-6xl leading-[1.05] font-medium tracking-tight text-balance mb-8">
                {b.cta.titleBefore}
                <span className="font-serif italic">{b.cta.titleAccent}</span>
                {b.cta.titleAfter}
              </h2>
            </div>
            <div className="md:col-span-4">
              <Link
                to="/yhteys"
                className="inline-flex items-center gap-3 bg-primary text-primary-foreground text-sm font-medium py-3 pr-4 pl-5 rounded-full hover:bg-accent transition-colors"
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
