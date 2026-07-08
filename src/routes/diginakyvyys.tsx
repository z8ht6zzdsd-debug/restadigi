import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/diginakyvyys")({
  head: () => ({
    meta: [
      { title: "Diginäkyvyys — YritysDIGI" },
      { name: "description", content: "Diginäkyvyytesi kerralla kuntoon: SEO-perusoptimointi, Google Business, analytiikka ja somekanavien optimointi." },
      { property: "og:title", content: "Diginäkyvyys — YritysDIGI" },
      { property: "og:description", content: "Aloituspaketit diginäkyvyyden parantamiseen: SEO, Google Business, analytiikka ja somekanavat." },
    ],
  }),
  component: DiginakyvyysPage,
});

const packages = [
  {
    name: "START",
    tagline: "Perusasiat kuntoon",
    description: "Sopii uudelle yritykselle tai yritykselle, joka haluaa parantaa näkyvyyttään.",
    price: "199 €",
    featured: false,
    bullets: [
      "Verkkosivujen SEO-perusoptimointi",
      "Google Business -profiilin optimointi",
      "Google Analytics & Search Console",
      "Sivuston tekninen tarkistus",
      "Perustason metatiedot",
      "Yksi pieni sisältöpäivitys",
    ],
    result: "Paremmat lähtökohdat löytyä Googlesta.",
  },
  {
    name: "PLUS",
    tagline: "Näkyvyyttä useassa kanavassa",
    description: "Sisältää kaiken START-paketista sekä laajemmat toimenpiteet Googlen ja somekanavien näkyvyyteen.",
    price: "299 €",
    featured: true,
    bullets: [
      "Laajempi SEO-optimointi",
      "Kahden palvelusivun optimointi",
      "Kuvien optimointi",
      "Yksi SEO-optimoitu teksti",
      "Google Business -profiilin täydellinen optimointi",
      "Facebook- ja Instagram-sivujen tarkistus ja optimointi",
      "Profiilikuvien ja kansikuvien päivityssuositukset",
      "Some-esittelytekstien optimointi",
      "30 minuutin etäkonsultointi",
    ],
    result: "Yrityksesi näyttää ammattimaiselta sekä Googlessa että sosiaalisessa mediassa.",
  },
];

function DiginakyvyysPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased">
      <SiteHeader />

      {/* Hero */}
      <header className="pt-10 pb-16 sm:pt-16 sm:pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-xs uppercase tracking-[0.2em] text-accent mb-8">Diginäkyvyys</div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl leading-[1.02] font-medium text-balance max-w-[22ch] mb-8 tracking-tight">
            Diginäkyvyytesi <span className="font-serif italic text-accent">kerralla</span> kuntoon.
          </h1>
          <p className="max-w-2xl text-base sm:text-lg text-foreground/70 leading-relaxed">
            Aloituspaketit, joilla saat perustason SEO:n, Google Business -profiilin, analytiikan ja
            somekanavat toimimaan yrityksesi puolesta.
          </p>
        </div>
      </header>

      {/* Paketit */}
      <section className="pb-24 sm:pb-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-10">
            (01) Aloituspaketit
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
                <p className={"text-sm mb-2 " + (p.featured ? "text-primary-foreground/70" : "text-foreground/60")}>
                  {p.tagline}
                </p>
                <p className={"text-sm mb-6 " + (p.featured ? "text-primary-foreground/80" : "text-foreground/70")}>
                  {p.description}
                </p>
                <div className="text-4xl font-serif mb-8">{p.price} <span className="text-lg font-sans text-foreground/50">kertamaksu</span></div>
                <ul className="space-y-3 text-sm mb-8 flex-1">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex gap-3">
                      <span className="size-1 rounded-full mt-2 shrink-0 bg-accent" />
                      <span className={p.featured ? "text-primary-foreground/85" : "text-foreground/75"}>{b}</span>
                    </li>
                  ))}
                </ul>
                <div className={"pt-6 border-t " + (p.featured ? "border-primary-foreground/20" : "border-border")}>
                  <p className="text-sm italic mb-8">Saat: {p.result}</p>
                  <Link
                    to="/yhteys"
                    className={
                      "inline-flex items-center justify-center gap-2 w-full text-sm font-medium py-3 px-5 rounded-full transition-colors " +
                      (p.featured
                        ? "bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
                        : "bg-primary text-primary-foreground hover:bg-accent")
                    }
                  >
                    Ota yhteyttä
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            Hinnat ovat kertamaksuja. Maksat vain siitä, mitä tarvitset — ei piilokustannuksia.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 sm:py-32 bg-secondary/60">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-12 items-end">
            <div className="md:col-span-8">
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">
                (02) Yhteys
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl leading-[1.05] font-medium tracking-tight text-balance">
                Haluatko paremman <span className="font-serif italic">näkyvyyden</span>?
              </h2>
            </div>
            <div className="md:col-span-4">
              <Link
                to="/yhteys"
                className="inline-flex items-center gap-3 bg-primary text-primary-foreground text-sm font-medium py-3 pr-4 pl-5 rounded-full hover:bg-accent transition-colors"
              >
                Kysy aloituspaketista
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
