import { createFileRoute, Link } from "@tanstack/react-router";
import heroStudio from "@/assets/hero-studio.jpg";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";

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
  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased">
      <SiteHeader />

      <PageHero
        image={heroStudio}
        title={
          <>
            <span className="font-serif italic text-accent">Pöytävaraukset</span> suoraan sivustolta.
          </>
        }
        description="Integroimme ravintolasi verkkosivuille modernin pöytävarauspalvelun, joka toimii ympäri vuorokauden. Asiakas valitsee ajan ja seurueen koon, saa vahvistuksen sähköpostiin ja henkilökuntasi näkee varaukset selkeästä hallintapaneelista."
      />

      <section className="pb-24 sm:pb-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-10">
            (01) Keskeiset hyödyt
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Varaukset 24/7",
                body: "Asiakkaat voivat varata pöydän silloin kun heille sopii — ilman puhelinsoittoja.",
              },
              {
                title: "Vähemmän no-showta",
                body: "Automaattiset vahvistukset ja muistutukset vähentävät saapumatta jäämisiä.",
              },
              {
                title: "Selkeä hallinta",
                body: "Näet päivän varaukset yhdellä silmäyksellä ja voit muokata saatavuutta helposti.",
              },
              {
                title: "Integroitu sivustoon",
                body: "Palvelu istuu saumattomasti ravintolasi verkkosivujen ilmeeseen.",
              },
            ].map((b) => (
              <div key={b.title} className="border border-border bg-card rounded-sm p-8">
                <h3 className="text-xl font-medium mb-3">{b.title}</h3>
                <p className="text-sm text-foreground/70 leading-relaxed">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32 bg-secondary/60">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-12 items-end">
            <div className="md:col-span-8">
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">
                (02) Aloitetaan
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl leading-[1.05] font-medium tracking-tight text-balance mb-8">
                Ota <span className="font-serif italic">pöytävaraukset</span> haltuun.
              </h2>
            </div>
            <div className="md:col-span-4">
              <Link
                to="/yhteys"
                className="inline-flex items-center gap-3 bg-primary text-primary-foreground text-sm font-medium py-3 pr-4 pl-5 rounded-full hover:bg-accent transition-colors"
              >
                Kysy lisää
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
