import { createFileRoute, Link } from "@tanstack/react-router";
import heroStudio from "@/assets/hero-studio.jpg";
import workWebsite from "@/assets/work-website.jpg";
import workBrand from "@/assets/work-brand.jpg";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HolaDigi — Kotisivut ja graafinen suunnittelu" },
      { name: "description", content: "Suomalais-espanjalaishenkinen studio. Rakennamme hakukoneoptimoituja, helposti päivitettäviä verkkosivustoja ja lämpimiä visuaalisia identiteettejä." },
      { property: "og:title", content: "HolaDigi — Kotisivut ja graafinen suunnittelu" },
      { property: "og:description", content: "Hakukoneoptimoidut kotisivut ja huolella veistetyt brändi-ilmeet." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased selection:bg-accent/20">
      <SiteHeader />

      {/* Hero */}
      <header className="pt-10 pb-24 sm:pt-16 sm:pb-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-xs uppercase tracking-[0.2em] text-accent mb-8">
            ¡Hola! — Estudio digital
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl leading-[1.02] font-medium text-balance max-w-[22ch] mb-10 tracking-tight">
            Kotisivut ja <span className="font-serif italic text-accent">graafinen</span> suunnittelu, lämmöllä tehtynä.
          </h1>
          <div className="grid md:grid-cols-12 gap-8 items-end">
            <p className="md:col-span-6 text-base sm:text-lg text-pretty text-foreground/70 leading-relaxed">
              Rakennamme hakukoneoptimoituja, helposti päivitettäviä ja hallinnoitavia verkkosivustoja
              integroiduilla hallintapaneeleilla. Yhdistämme teknisen suorituskyvyn ja hiotun estetiikan.
            </p>
            <div className="md:col-span-6 md:col-start-8 flex items-center gap-4">
              <Link
                to="/yhteys"
                className="inline-flex items-center gap-3 bg-primary text-primary-foreground text-sm font-medium py-3 pr-4 pl-5 rounded-full hover:bg-accent transition-colors"
              >
                Aloita projekti
                <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                </svg>
              </Link>
              <Link to="/palvelut" className="text-sm text-foreground/70 hover:text-foreground">
                Katso palvelut →
              </Link>
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

      {/* Nostot */}
      <section className="py-24 sm:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-16">
            (01) Mitä teemme
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { t: "Kotisivut", d: "Nopeat, saavutettavat ja hakukoneille rakennetut verkkosivustot." },
              { t: "Graafinen suunnittelu", d: "Logot, brändi-ilmeet ja materiaalit joilla erotut edukseen." },
              { t: "Ylläpito & CMS", d: "Selkeä paneeli sisällön päivittämiseen ilman koodausta." },
            ].map((item, i) => (
              <div key={item.t}>
                <div className="text-xs font-mono text-accent tabular-nums mb-3">0{i + 1}</div>
                <h3 className="text-xl font-medium mb-3">{item.t}</h3>
                <p className="text-sm text-foreground/60 leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <Link to="/palvelut" className="text-sm border-b border-foreground/30 pb-0.5 hover:border-foreground transition-colors">
              Kaikki palvelut ja hinnat →
            </Link>
          </div>
        </div>
      </section>

      {/* Työt */}
      <section className="py-24 sm:py-32 bg-secondary/60">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
                (02) Valikoidut projektit
              </div>
              <h2 className="text-2xl font-medium">Viimeaikaista työtä</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-8 group">
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
            <div className="md:col-span-4 md:mt-24 group">
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
      <section className="py-24 sm:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-primary text-primary-foreground rounded-sm p-12 sm:p-20 lg:p-28 flex flex-col items-start">
            <div className="text-xs uppercase tracking-[0.2em] text-primary-foreground/50 mb-8">
              (03) Yhteys
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl leading-[1.05] font-medium mb-12 text-balance max-w-[18ch] tracking-tight">
              Onko sinulla <span className="font-serif italic">projekti</span> mielessä?
            </h2>
            <Link
              to="/yhteys"
              className="inline-flex items-center gap-3 bg-background text-foreground text-sm font-medium py-3 pr-4 pl-5 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Ota yhteyttä
              <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
