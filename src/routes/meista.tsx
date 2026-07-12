import { createFileRoute, Link } from "@tanstack/react-router";
import heroStudio from "@/assets/hero-studio.jpg";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/meista")({
  head: () => ({
    meta: [
      { title: "Meistä — Restadigi" },
      { name: "description", content: "Restadigi on pieni studio, joka rakentaa kotisivuja ja vahvistaa yritysten diginäkyvyyttä. Tutustu tapaamme tehdä työtä." },
      { property: "og:title", content: "Meistä — Restadigi" },
      { property: "og:description", content: "Pieni studio, iso vastuu. Kotisivuja ja diginäkyvyyttä suomalaisille yrityksille." },
      { property: "og:image", content: heroStudio },
    ],
  }),
  component: MeistaPage,
});

const values = [
  { t: "Käsityönä tehty", d: "Ei mallipohjia. Jokainen projekti suunnitellaan alusta asti tavoitteidesi mukaan." },
  { t: "Läpinäkyvä hinnoittelu", d: "Selkeät paketit ja lisäpalvelut — tiedät mistä maksat, alusta loppuun." },
  { t: "Pitkäjänteinen kumppanuus", d: "Autamme myös julkaisun jälkeen — päivityksissä, kehityksessä ja ylläpidossa." },
];

const process = [
  { n: "01", t: "Keskustelu", d: "Kartoitetaan tavoitteet, kohderyhmä ja aikataulu yhdessä." },
  { n: "02", t: "Suunnittelu", d: "Rakenne, visuaalinen ilme ja sisältö hiotaan iteratiivisesti." },
  { n: "03", t: "Toteutus", d: "Rakennamme sivuston hakukoneoptimoituna ja saavutettavana." },
  { n: "04", t: "Julkaisu & tuki", d: "Julkaisu, koulutus hallintapaneelin käyttöön ja jatkotuki." },
];

function MeistaPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased">
      <SiteHeader />

      {/* Intro */}
      <header className="pt-10 pb-16 sm:pt-16 sm:pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-xs uppercase tracking-[0.2em] text-accent mb-8">Meistä</div>
          <h1 className="text-4xl sm:text-6xl leading-[1.02] font-medium text-balance max-w-[22ch] mb-8 tracking-tight">
            Pieni studio, <span className="font-serif italic text-accent">iso</span> vastuu.
          </h1>
          <div className="grid md:grid-cols-12 gap-8">
            <p className="md:col-span-7 text-base sm:text-lg text-foreground/70 leading-relaxed">
              Restadigi on itsenäinen digistudio, joka rakentaa kotisivuja ja vahvistaa pienten
              ja keskisuurten yritysten diginäkyvyyttä. Käytämme uusinta teknologiaa, jotta sivut
              valmistuvat nopeasti, toimivat kaikilla laitteilla ja ovat helposti päivitettävissä.
            </p>
            <p className="md:col-span-5 text-base text-foreground/60 leading-relaxed">
              Työskentelemme mielellämme pitkäjänteisesti: samat kädet, jotka suunnittelevat sivustosi,
              auttavat myös sen näkyvyyden ja kehittämisen kanssa eteenpäin.
            </p>
          </div>
        </div>
      </header>

      {/* Kuva */}
      <section className="px-6">
        <div className="max-w-6xl mx-auto">
          <img
            src={heroStudio}
            alt="Studion työtila"
            className="w-full aspect-[16/9] object-cover rounded-sm"
          />
        </div>
      </section>

      {/* Arvot */}
      <section className="py-24 sm:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-16">
            (01) Miten työskentelemme
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {values.map((v) => (
              <div key={v.t}>
                <h3 className="text-xl font-medium mb-3">
                  <span className="font-serif italic text-accent">{v.t.split(" ")[0]}</span>{" "}
                  {v.t.split(" ").slice(1).join(" ")}
                </h3>
                <p className="text-sm text-foreground/60 leading-relaxed">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prosessi */}
      <section className="py-24 sm:py-32 bg-secondary/60">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4">
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">
                (02) Prosessi
              </div>
              <h2 className="text-3xl sm:text-4xl font-medium leading-[1.1] tracking-tight text-balance">
                Neljä <span className="font-serif italic">askelta</span> valmiiseen sivustoon.
              </h2>
            </div>
            <div className="md:col-span-7 md:col-start-6">
              <div className="space-y-6">
                {process.map((s) => (
                  <div key={s.n} className="flex gap-5 border-t border-border pt-6">
                    <span className="text-xs font-mono text-accent tabular-nums pt-1">{s.n}</span>
                    <div>
                      <h3 className="text-lg font-medium mb-1.5">{s.t}</h3>
                      <p className="text-sm text-foreground/60 leading-relaxed">{s.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 sm:py-32">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-5xl font-medium leading-[1.05] tracking-tight text-balance max-w-[20ch] mx-auto">
            Kuulostaako <span className="font-serif italic text-accent">yhteistyö</span> hyvältä?
          </h2>
          <Link
            to="/yhteys"
            className="inline-flex items-center gap-3 mt-10 bg-primary text-primary-foreground text-sm font-medium py-3 pr-4 pl-5 rounded-full hover:bg-accent transition-colors"
          >
            Ota yhteyttä
            <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
            </svg>
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
