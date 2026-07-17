import { createFileRoute, Link } from "@tanstack/react-router";
import heroYllapito from "@/assets/hero-yllapito.jpg";
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
        image={heroYllapito}
        title={
          <>
            Hosting ja <span className="font-serif italic text-accent">ylläpito</span>.
          </>
        }
        description="Pidämme sivustosi nopeana, turvallisena ja ajan tasalla. Valitse sopiva hosting- ja ylläpitopaketti — domain ja SSL sisältyvät hintaan."
      />

      <section className="pb-24 sm:pb-32">
        <div>
          {hosting.map((h, i) => {
            const dark = Boolean(h.featured);
            const alt = !dark && i % 2 === 1;
            return (
              <div
                key={h.name}
                className={
                  "w-full px-6 py-12 sm:py-16 " +
                  (dark
                    ? "bg-primary text-primary-foreground"
                    : alt
                      ? "bg-secondary/50"
                      : "bg-background")
                }
              >
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-start md:gap-16">
                  <div className="md:w-72 shrink-0 mb-8 md:mb-0">
                    <div className="flex items-baseline gap-3 mb-2">
                      <h3 className="text-2xl font-medium">{h.name}</h3>
                      {h.featured && (
                        <span className="text-[10px] uppercase tracking-[0.2em] bg-accent text-accent-foreground px-2 py-1 rounded-full">
                          Suosittu
                        </span>
                      )}
                    </div>
                    <div className="text-4xl font-serif mb-6">{h.price}</div>
                    <Link
                      to="/yhteys"
                      className={
                        "inline-flex items-center justify-center gap-2 text-sm font-medium py-3 px-5 rounded-full transition-colors " +
                        (dark
                          ? "bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
                          : "bg-primary text-primary-foreground hover:bg-accent")
                      }
                    >
                      Pyydä tarjous
                    </Link>
                  </div>
                  <ul className="space-y-3 text-sm flex-1">
                    {h.bullets.map((b) => (
                      <li key={b} className="flex gap-3">
                        <span className="size-1 rounded-full mt-2 shrink-0 bg-accent" />
                        <span className={dark ? "text-primary-foreground/85" : "text-foreground/75"}>
                          {b}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
          <p className="mt-8 text-xs text-muted-foreground max-w-6xl mx-auto px-6">
            Hosting- ja ylläpitohinnat laskutetaan kuukausittain. Domain ja SSL-sertifikaatti
            sisältyvät hintaan.
          </p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
