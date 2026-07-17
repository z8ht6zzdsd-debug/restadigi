import { createFileRoute, Link } from "@tanstack/react-router";
import heroHotelWeb from "@/assets/hero-hotel-web.jpg";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";

export const Route = createFileRoute("/yllapito")({
  head: () => ({
    meta: [
      { title: "Ylläpito — Restadigi" },
      {
        name: "description",
        content:
          "Hosting- ja ylläpitopaketit yrityksille — nopea hosting Suomessa, domain, SSL ja jatkuva tuki.",
      },
      { property: "og:title", content: "Ylläpito — Restadigi" },
      {
        property: "og:description",
        content: "Hosting- ja ylläpitopaketit: Basic ja Pro Business.",
      },
    ],
  }),
  component: YllapitoPage,
});

const hosting = [
  {
    name: "Basic",
    price: "9,99 € / kk + alv",
    bullets: [
      "Hosting ja verkkotunnus sisältyvät hintaan",
      "Nopea ja luotettava hosting Suomessa",
      "SSL-sertifikaatti (HTTPS) sisältyy",
      "Domain (.fi tai muu) sisältyy hintaan",
    ],
  },
  {
    name: "Pro Business",
    price: "29,99 € / kk + alv",
    featured: true,
    bullets: [
      "Hosting ja verkkotunnus sisältyvät hintaan",
      "Nopea ja luotettava hosting Suomessa",
      "SSL-sertifikaatti (HTTPS) sisältyy",
      "Domain (.fi tai muu) sisältyy hintaan",
      "Sähköpostiosoitteet sisältyvät",
      "Jatkuva ylläpito ja päivitykset",
      "Pienet sisältömuutokset sisältyvät",
      "Tietoturvapäivitykset",
      "Henkilökohtainen tuki puhelimitse",
    ],
  },
];

function YllapitoPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased">
      <SiteHeader />

      <PageHero
        image={heroHotelWeb}
        title={
          <>
            Hosting ja <span className="font-serif italic text-accent">ylläpito</span>.
          </>
        }
        description="Pidämme sivustosi nopeana, turvallisena ja ajan tasalla. Valitse sopiva hosting- ja ylläpitopaketti — domain ja SSL sisältyvät hintaan."
      />

      <section className="pb-24 sm:pb-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-10">
            Hosting-palvelut
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hosting.map((h) => (
              <div
                key={h.name}
                className={
                  "rounded-sm p-8 flex flex-col " +
                  (h.featured
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-card")
                }
              >
                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="text-xl font-medium">{h.name}</h3>
                  {h.featured && (
                    <span className="text-[10px] uppercase tracking-[0.2em] bg-accent text-accent-foreground px-2 py-1 rounded-full">
                      Suosittu
                    </span>
                  )}
                </div>
                <div className="text-4xl font-serif mb-8">{h.price}</div>
                <ul className="space-y-3 text-sm mb-8 flex-1">
                  {h.bullets.map((b) => (
                    <li key={b} className="flex gap-3">
                      <span className="size-1 rounded-full mt-2 shrink-0 bg-accent" />
                      <span
                        className={h.featured ? "text-primary-foreground/85" : "text-foreground/75"}
                      >
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/yhteys"
                  className={
                    "inline-flex items-center justify-center gap-2 text-sm font-medium py-3 px-5 rounded-full transition-colors " +
                    (h.featured
                      ? "bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
                      : "bg-primary text-primary-foreground hover:bg-accent")
                  }
                >
                  Pyydä tarjous
                </Link>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            Hosting- ja ylläpitohinnat laskutetaan kuukausittain. Domain ja SSL-sertifikaatti
            sisältyvät hintaan.
          </p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
