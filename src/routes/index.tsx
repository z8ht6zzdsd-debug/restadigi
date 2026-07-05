import { createFileRoute } from "@tanstack/react-router";
import heroStudio from "@/assets/hero-studio.jpg";
import workWebsite from "@/assets/work-website.jpg";
import workBrand from "@/assets/work-brand.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased selection:bg-accent/20">
      {/* Nav */}
      <nav className="py-8 sm:py-10">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <a href="#" className="text-sm font-semibold tracking-tight uppercase">
            Aukio<span className="text-accent">.</span>
          </a>
          <div className="hidden sm:flex gap-8 text-sm text-foreground/70">
            <a href="#palvelut" className="hover:text-foreground transition-colors">Palvelut</a>
            <a href="#tyot" className="hover:text-foreground transition-colors">Työt</a>
            <a href="#paivitys" className="hover:text-foreground transition-colors">Päivitys</a>
            <a href="#yhteys" className="hover:text-foreground transition-colors">Yhteys</a>
          </div>
          <a href="#yhteys" className="text-sm border-b border-foreground/30 pb-0.5 hover:border-foreground transition-colors">
            Ota yhteyttä
          </a>
        </div>
      </nav>

      {/* Hero */}
      <header className="pt-16 pb-24 sm:pt-24 sm:pb-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-8">
            Helsinki — Muotoilustudio
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl leading-[1.02] font-medium text-balance max-w-[22ch] mb-10 tracking-tight">
            Kotisivut ja <span className="font-serif italic text-accent">graafinen</span> suunnittelu, huolella veistettynä.
          </h1>
          <div className="grid md:grid-cols-12 gap-8 items-end">
            <p className="md:col-span-6 text-base sm:text-lg text-pretty text-foreground/70 leading-relaxed">
              Rakennamme hakukoneoptimoituja, helposti päivitettäviä ja hallinnoitavia verkkosivustoja
              integroiduilla hallintapaneeleilla. Yhdistämme teknisen suorituskyvyn ja hiotun estetiikan.
            </p>
            <div className="md:col-span-6 md:col-start-8 flex items-center gap-4">
              <a
                href="#yhteys"
                className="inline-flex items-center gap-3 bg-primary text-primary-foreground text-sm font-medium py-3 pr-4 pl-5 rounded-full hover:bg-accent transition-colors"
              >
                Aloita projekti
                <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                </svg>
              </a>
              <a href="#tyot" className="text-sm text-foreground/70 hover:text-foreground">Katso työmme →</a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero image */}
      <section className="px-6">
        <div className="max-w-6xl mx-auto">
          <img
            src={heroStudio}
            alt="Muotoilustudion työtila luonnonvalossa"
            width={1600}
            height={1200}
            className="w-full aspect-[16/9] object-cover rounded-sm"
          />
        </div>
      </section>

      {/* Palvelut */}
      <section id="palvelut" className="py-24 sm:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-16">
            (01) Palvelut
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            <div>
              <h2 className="text-2xl font-medium mb-6">
                <span className="font-serif italic">Verkkosivut</span> & kotisivut
              </h2>
              <p className="text-base text-pretty text-foreground/70 mb-8 leading-relaxed">
                Suunnittelemme ja toteutamme räätälöidyt kotisivut, jotka yhdistävät teknisen
                suorituskyvyn ja hiotun estetiikan. Nopeat, saavutettavat ja hakukoneille rakennetut.
              </p>
              <ul className="space-y-3 text-sm">
                {["Käyttöliittymäsuunnittelu (UI/UX)", "Responsiivinen kehitys", "Hakukoneoptimointi (SEO)", "Integroidut hallintapaneelit"].map((s) => (
                  <li key={s} className="flex items-center gap-3 border-b border-border/60 pb-3">
                    <span className="size-1 bg-accent rounded-full" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-medium mb-6">
                <span className="font-serif italic">Graafinen</span> suunnittelu
              </h2>
              <p className="text-base text-pretty text-foreground/70 mb-8 leading-relaxed">
                Luomme tunnistettavia visuaalisia ilmeitä, jotka kertovat yrityksesi tarinaa.
                Logot, typografia ja väripaletti muodostavat kokonaisuuden joka erottuu edukseen.
              </p>
              <ul className="space-y-3 text-sm">
                {["Brändi-identiteetit", "Logosuunnittelu", "Painotuotteet", "Digitaaliset materiaalit"].map((s) => (
                  <li key={s} className="flex items-center gap-3 border-b border-border/60 pb-3">
                    <span className="size-1 bg-accent rounded-full" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Päivitys / CMS */}
      <section id="paivitys" className="py-24 sm:py-32 bg-secondary/60">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-5">
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">
                (02) Ylläpito
              </div>
              <h2 className="text-3xl sm:text-5xl font-medium leading-[1.05] tracking-tight text-balance">
                Päivitä sivustosi <span className="font-serif italic">ilman</span> koodausta.
              </h2>
            </div>
            <div className="md:col-span-6 md:col-start-7">
              <p className="text-base sm:text-lg text-foreground/70 leading-relaxed mb-10">
                Moni projektimme sisältää yksinkertaisen paneelin tekstien, kuvien ja sisällön
                muokkaamiseen — tarvittaessa, ilman turhaa monimutkaisuutta.
              </p>
              <div className="space-y-6">
                {[
                  { t: "Muokkaa tekstejä ja kuvia selaimesta", d: "Kirjaudu sisään ja päivitä sisältö reaaliajassa. Muutokset näkyvät heti." },
                  { t: "Ei teknistä osaamista tarvita", d: "Selkeä käyttöliittymä joka on suunniteltu ihmisille, ei kehittäjille." },
                  { t: "Valinnainen paketin ja tarpeidesi mukaan", d: "Otetaan käyttöön vain jos sivustosi sitä oikeasti hyötyy." },
                ].map((item, i) => (
                  <div key={item.t} className="flex gap-5 border-t border-border pt-6">
                    <span className="text-xs font-mono text-accent tabular-nums pt-1">
                      0{i + 1}
                    </span>
                    <div>
                      <h3 className="text-lg font-medium mb-1.5">{item.t}</h3>
                      <p className="text-sm text-foreground/60 leading-relaxed">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Työt */}
      <section id="tyot" className="py-24 sm:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
                (03) Valikoidut projektit
              </div>
              <h2 className="text-2xl font-medium">Viimeaikaista työtä</h2>
            </div>
            <a href="#yhteys" className="text-sm border-b border-foreground/30 pb-0.5 hover:border-foreground transition-colors hidden sm:inline-block">
              Katso kaikki
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-8 group cursor-pointer">
              <div className="overflow-hidden rounded-sm mb-6">
                <img
                  src={workWebsite}
                  alt="Nordic Living — verkkosivusto"
                  width={1200}
                  height={900}
                  loading="lazy"
                  className="w-full aspect-[3/2] object-cover group-hover:scale-[1.02] transition-transform duration-700"
                />
              </div>
              <div className="flex justify-between items-baseline">
                <h3 className="text-lg font-medium">
                  Nordic Living <span className="font-serif italic text-foreground/50">— verkkosivusto</span>
                </h3>
                <span className="text-sm text-muted-foreground tabular-nums">2024</span>
              </div>
            </div>
            <div className="md:col-span-4 md:mt-24 group cursor-pointer">
              <div className="overflow-hidden rounded-sm mb-6">
                <img
                  src={workBrand}
                  alt="Kahiwa Roastery — brändi-identiteetti"
                  width={1000}
                  height={1250}
                  loading="lazy"
                  className="w-full aspect-[4/5] object-cover group-hover:scale-[1.02] transition-transform duration-700"
                />
              </div>
              <div className="flex justify-between items-baseline">
                <h3 className="text-lg font-medium">
                  Kahiwa <span className="font-serif italic text-foreground/50">— brändi</span>
                </h3>
                <span className="text-sm text-muted-foreground tabular-nums">2024</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="yhteys" className="py-24 sm:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-primary text-primary-foreground rounded-sm p-12 sm:p-20 lg:p-28 flex flex-col items-start">
            <div className="text-xs uppercase tracking-[0.2em] text-primary-foreground/50 mb-8">
              (04) Yhteys
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl leading-[1.05] font-medium mb-12 text-balance max-w-[18ch] tracking-tight">
              Onko sinulla <span className="font-serif italic">projekti</span> mielessä?
            </h2>
            <a
              href="mailto:moi@aukio.fi"
              className="inline-flex items-center gap-3 bg-background text-foreground text-sm font-medium py-3 pr-4 pl-5 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              moi@aukio.fi
              <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Aukio Design — Helsinki
          </div>
          <div className="flex gap-8 text-xs uppercase tracking-[0.15em] text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Instagram</a>
            <a href="#" className="hover:text-foreground transition-colors">Behance</a>
            <a href="#" className="hover:text-foreground transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
