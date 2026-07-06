import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/palvelut")({
  head: () => ({
    meta: [
      { title: "Palvelut — HolaDigi" },
      { name: "description", content: "Kolme verkkosivupakettia ja graafisen suunnittelun palvelut — kotisivuista brändi-ilmeisiin." },
      { property: "og:title", content: "Palvelut — HolaDigi" },
      { property: "og:description", content: "Verkkosivupaketit ja graafisen suunnittelun palvelut." },
    ],
  }),
  component: PalvelutPage,
});

const packages = [
  {
    name: "Esittely",
    tagline: "Kevyt yhden sivun verkkosivusto",
    price: "890 €",
    bullets: [
      "1–3 sivua",
      "Responsiivinen suunnittelu",
      "Perus-SEO ja analytiikka",
      "Yhteydenottolomake",
      "Toimitus 1–2 viikossa",
    ],
  },
  {
    name: "Yritys",
    tagline: "Kattava sivusto kasvavalle brändille",
    price: "1 890 €",
    featured: true,
    bullets: [
      "Jopa 8 sivua",
      "Integroitu hallintapaneeli (CMS)",
      "Laajempi SEO-optimointi",
      "Blogi tai referenssit",
      "Toimitus 2–4 viikossa",
    ],
  },
  {
    name: "Premium",
    tagline: "Räätälöity ratkaisu vaativiin tarpeisiin",
    price: "3 490 €",
    bullets: [
      "Räätälöity rakenne ja animaatiot",
      "Kehittynyt CMS ja käyttäjäroolit",
      "Kauppa- tai varausintegraatiot",
      "Hakukoneoptimointi + suorituskyky",
      "Toimitus sovitusti",
    ],
  },
];

const design = [
  { name: "Logosuunnittelu", price: "alk. 490 €" },
  { name: "Brändi-identiteetti", price: "alk. 1 200 €" },
  { name: "Käyntikortit & painotuotteet", price: "alk. 190 €" },
  { name: "Somemateriaalit / -pohjat", price: "alk. 290 €" },
  { name: "Kuvitukset ja ikonit", price: "sopimuksen mukaan" },
  { name: "Esitys- ja PDF-materiaalit", price: "alk. 390 €" },
];

function PalvelutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased">
      <SiteHeader />

      {/* Intro */}
      <header className="pt-10 pb-16 sm:pt-16 sm:pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-xs uppercase tracking-[0.2em] text-accent mb-8">Palvelut</div>
          <h1 className="text-4xl sm:text-6xl leading-[1.02] font-medium text-balance max-w-[22ch] mb-8 tracking-tight">
            Selkeät paketit ja <span className="font-serif italic text-accent">graafisen</span> suunnittelun palvelut.
          </h1>
          <p className="max-w-2xl text-base sm:text-lg text-foreground/70 leading-relaxed">
            Kolme verkkosivupakettia kattavat suurimman osan tarpeista. Räätälöimme sisällön ja
            visuaalisen ilmeen aina projektikohtaisesti — ja lisäämme mukaan graafisia palveluita tarpeesi mukaan.
          </p>
        </div>
      </header>

      {/* Paketit */}
      <section className="pb-24 sm:pb-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-10">
            (01) Verkkosivupaketit
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                      <span className={"size-1 rounded-full mt-2 shrink-0 " + (p.featured ? "bg-accent" : "bg-accent")} />
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
            Hinnat alkaen, sis. suunnittelun ja toteutuksen. Domain ja palvelin laskutetaan erikseen.
          </p>
        </div>
      </section>

      {/* Graafinen suunnittelu */}
      <section className="py-24 sm:py-32 bg-secondary/60">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-5">
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">
                (02) Graafinen suunnittelu
              </div>
              <h2 className="text-3xl sm:text-4xl font-medium leading-[1.1] tracking-tight text-balance">
                Lisäpalveluita <span className="font-serif italic">brändisi</span> ilmeen viimeistelyyn.
              </h2>
              <p className="mt-6 text-foreground/70 leading-relaxed">
                Yhdistä helposti mihin tahansa verkkosivupakettiin — tai tilaa erikseen.
              </p>
            </div>
            <div className="md:col-span-6 md:col-start-7">
              <ul>
                {design.map((d) => (
                  <li key={d.name} className="flex justify-between items-baseline py-5 border-t border-border last:border-b">
                    <span className="text-base font-medium">{d.name}</span>
                    <span className="text-sm text-foreground/60 tabular-nums">{d.price}</span>
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
