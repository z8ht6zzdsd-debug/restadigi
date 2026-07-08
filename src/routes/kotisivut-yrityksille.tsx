import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/kotisivut-yrityksille")({
  head: () => ({
    meta: [
      { title: "Kotisivut yrityksille — YritysDIGI" },
      { name: "description", content: "Selkeät ja vaikuttavat kotisivupaketit, hosting ja graafiset lisäpalvelut yrityksille ja yhdistyksille." },
      { property: "og:title", content: "Kotisivut yrityksille — YritysDIGI" },
      { property: "og:description", content: "Kotisivupaketit, hosting ja graafiset lisäpalvelut yrityksesi tarpeisiin." },
    ],
  }),
  component: KotisivutPage,
});

const packages = [
  {
    name: "Start",
    tagline: "Yksinkertainen mutta vaikuttava sivusto pienyritykselle",
    price: "399 € + alv",
    bullets: [
      "Selkeät ja houkuttelevat perustekstit etusivulle, palveluille ja yhteystiedoille – valmiina pienyrityksen tarpeisiin",
      "Ammattimainen 1–3-sivuinen verkkosivusto yrityksesi tarpeisiin",
      "Helppokäyttöinen hallintapaneeli, jolla voit päivittää sisältöjä itse",
      "Responsiivinen toteutus, joka toimii erinomaisesti niin mobiilissa, tabletissa kuin tietokoneellakin",
      "Integroitu yhteydenottolomake, jonka avulla asiakkaasi tavoittavat sinut helposti",
      "Perus-SEO-optimointi, joka sisältää meta-tiedot, sivukartan ja sivuston suorituskyvyn optimoinnin",
      "Nopea toimitus – verkkosivusto valmiina jopa 5 arkipäivässä",
      "30 päivän asiakastuki julkaisun jälkeen mahdollisia kysymyksiä ja pieniä muutoksia varten",
    ],
  },
  {
    name: "Plus",
    tagline: "Tyylikäs kokonaisuus, joka esittelee palvelusi selkeästi",
    price: "549 € + alv",
    featured: true,
    bullets: [
      "Selkeät ja houkuttelevat perustekstit etusivulle, palveluille ja yhteystiedoille – valmiina pienyrityksen tarpeisiin",
      "Ammattimainen jopa 8-sivuinen verkkosivusto yrityksesi tarpeisiin",
      "Helppokäyttöinen hallintapaneeli, jolla voit päivittää sisältöjä itse",
      "Responsiivinen toteutus, joka toimii erinomaisesti niin mobiilissa, tabletissa kuin tietokoneellakin",
      "Integroitu yhteydenottolomake, jonka avulla asiakkaasi tavoittavat sinut helposti",
      "Perus-SEO-optimointi, joka sisältää meta-tiedot, sivukartan ja sivuston suorituskyvyn optimoinnin",
      "Nopea toimitus – verkkosivusto valmiina jopa 5 arkipäivässä",
      "30 päivän asiakastuki julkaisun jälkeen mahdollisia kysymyksiä ja pieniä muutoksia varten",
    ],
  },
];

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

const extras = [
  { name: "Logon suunnittelu", price: "149 €" },
  { name: "Käyntikorttien suunnittelu", price: "89 €" },
  { name: "GoodStart - somepaketti", price: "119 €" },
];

function KotisivutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased">
      <SiteHeader />

      {/* Intro */}
      <header className="pt-10 pb-16 sm:pt-16 sm:pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-xs uppercase tracking-[0.2em] text-accent mb-8">Kotisivut</div>
          <h1 className="text-4xl sm:text-6xl leading-[1.02] font-medium text-balance max-w-[22ch] mb-8 tracking-tight">
            Kotisivut <span className="font-serif italic text-accent">yrityksille</span> ja yhdistyksille.
          </h1>
          <p className="max-w-2xl text-base sm:text-lg text-foreground/70 leading-relaxed">
            Hyvin suunnitellut verkkosivut ja verkkosisällöt ovat yrityksesi tärkeimmät digitaaliset työkalut.
            Ne vahvistavat brändisi näkyvyyttä, helpottavat asiakkaiden yhteydenottoa ja jättävät vahvan ensivaikutelman.
          </p>
        </div>
      </header>

      {/* Paketit */}
      <section className="pb-24 sm:pb-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-10">
            (01) Verkkosivupaketit
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {packages.map((p) => (
              <div
                key={p.name}
                className={
                  "rounded-sm p-8 flex flex-col " +
                  (p.featured
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-card")
                }
              >
                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="text-xl font-medium">{p.name}</h3>
                  {p.featured && (
                    <span className="text-[10px] uppercase tracking-[0.2em] bg-accent text-accent-foreground px-2 py-1 rounded-full">
                      Suosittu
                    </span>
                  )}
                </div>
                <p className={"text-sm mb-6 " + (p.featured ? "text-primary-foreground/70" : "text-foreground/60")}>
                  {p.tagline}
                </p>
                <div className="text-4xl font-serif mb-8">{p.price}</div>
                <ul className="space-y-3 text-sm mb-8 flex-1">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex gap-3">
                      <span className="size-1 rounded-full mt-2 shrink-0 bg-accent" />
                      <span className={p.featured ? "text-primary-foreground/85" : "text-foreground/75"}>{b}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/yhteys"
                  className={
                    "inline-flex items-center justify-center gap-2 text-sm font-medium py-3 px-5 rounded-full transition-colors " +
                    (p.featured
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
            Pakettihinnat ovat kiinteitä. Verkkotunnus ja hosting valitaan erikseen alla olevista vaihtoehdoista.
          </p>
        </div>
      </section>

      {/* Hosting */}
      <section className="py-24 sm:py-32 bg-secondary/60">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-10">
            (02) Hosting-palvelut
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
                      <span className={h.featured ? "text-primary-foreground/85" : "text-foreground/75"}>{b}</span>
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
            Hosting- ja ylläpitohinnat laskutetaan kuukausittain. Domain ja SSL-sertifikaatti sisältyvät hintaan.
          </p>
        </div>
      </section>

      {/* Lisäpalvelut */}
      <section className="py-24 sm:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-5">
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">
                (03) Lisäpalvelut
              </div>
              <h2 className="text-3xl sm:text-4xl font-medium leading-[1.1] tracking-tight text-balance">
                Lisäpalvelut <span className="font-serif italic">kotisivupaketin</span> oston yhteydessä.
              </h2>
              <p className="mt-6 text-foreground/70 leading-relaxed">
                Täydennä sivustopaketti yritysilmeen osilla — tarjolla vain kotisivupaketin oston yhteydessä.
              </p>
            </div>
            <div className="md:col-span-6 md:col-start-7">
              <ul>
                {extras.map((e) => (
                  <li key={e.name} className="flex justify-between items-baseline py-5 border-t border-border last:border-b">
                    <span className="text-base font-medium">{e.name}</span>
                    <span className="text-sm text-foreground/60 tabular-nums">{e.price}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/yhteys"
                className="inline-flex items-center gap-3 mt-10 bg-primary text-primary-foreground text-sm font-medium py-3 pr-4 pl-5 rounded-full hover:bg-accent transition-colors"
              >
                Kysy räätälöity tarjous
                <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
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
