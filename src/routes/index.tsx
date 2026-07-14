import { createFileRoute, Link } from "@tanstack/react-router";
import heroStudio from "@/assets/hero-studio.jpg";
import workWebsite from "@/assets/work-website.jpg";
import workBrand from "@/assets/work-brand.jpg";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Restadigi — Verkkosivut, AI-asiakaspalvelu ja pöytävaraukset ravintoloille" },
      {
        name: "description",
        content:
          "Rakennamme ravintoloille näyttäviä verkkosivuja, älykkään AI-asiakaspalvelun ja modernin pöytävarausjärjestelmän — kaikki yhdestä paikasta.",
      },
      { property: "og:title", content: "Restadigi — Digitaaliset ratkaisut ravintoloille" },
      {
        property: "og:description",
        content: "Verkkosivut, AI-asiakaspalvelu ja pöytävaraukset ravintoloille.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased selection:bg-accent/20">
      <SiteHeader />

      {/* Hero — teksti kuvan päällä */}
      <header className="px-6 pb-8 sm:pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="relative isolate flex min-h-[min(88vh,44rem)] flex-col justify-end overflow-hidden rounded-sm sm:min-h-[min(82vh,40rem)]">
            <img
              src={heroStudio}
              alt=""
              aria-hidden
              width={1600}
              height={912}
              className="absolute inset-0 size-full object-cover"
            />

            {/* Gradientit — tekstin luettavuus */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-foreground/92 via-foreground/65 to-foreground/15"
              aria-hidden
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/25 to-transparent"
              aria-hidden
            />
            <div
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,oklch(0.6_0.17_40/0.18),transparent_55%)]"
              aria-hidden
            />

            {/* Koristeelliset viivat */}
            <div
              className="pointer-events-none absolute right-8 top-8 hidden h-24 w-px bg-gradient-to-b from-white/40 to-transparent lg:block"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute right-8 top-8 hidden h-px w-24 bg-gradient-to-r from-white/40 to-transparent lg:block"
              aria-hidden
            />

            <div className="relative z-10 px-8 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 backdrop-blur-sm">
                <span className="size-1.5 rounded-full bg-accent" aria-hidden />
                <span className="text-xs uppercase tracking-[0.2em] text-white/80">
                  Digistudio ravintoloille
                </span>
              </div>

              <h1 className="mb-6 max-w-[16ch] text-4xl font-medium leading-[1.02] tracking-tight text-balance text-white sm:text-6xl lg:text-7xl">
                Verkkosivut ja älykkäät palvelut{" "}
                <span className="font-serif italic text-accent">ravintolallesi</span>.
              </h1>

              <p className="mb-10 max-w-xl text-base leading-relaxed text-pretty text-white/75 sm:text-lg">
                Rakennamme ravintoloille moderneja, houkuttelevia verkkosivuja sekä tarjoamme
                älykkään AI-asiakaspalvelun ja sujuvan pöytävarausjärjestelmän. Tavoitteemme on
                luoda kokonaisuus, joka näyttää yhtä hyvältä kuin ravintolasi ruoka — ja tuo lisää
                asiakkaita ovista sisään.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to="/yhteys"
                  className="inline-flex items-center gap-3 rounded-full bg-white py-3 pr-4 pl-5 text-sm font-medium text-primary transition-colors hover:bg-accent hover:text-white"
                >
                  Aloita projekti
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
                <Link
                  to="/kotisivut-yrityksille"
                  className="border-b border-white/35 pb-0.5 text-sm text-white/80 transition-colors hover:border-white hover:text-white"
                >
                  Katso palvelut →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Miksi valita meidät */}
      <section className="py-24 sm:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-16">
            (01) Miksi ravintoloitsijat valitsevat meidät?
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {[
              {
                t: "Ravintola-alan ymmärrys",
                d: "Tunnemme ravintolan arjen — sivustot, varaukset ja asiakaspalvelu on suunniteltu juuri sinun toimialaasi varten.",
              },
              {
                t: "Vaivaton sisällönhallinta",
                d: "Menun, aukioloaikojen ja kuvien päivittäminen sujuu itsenäisesti muutamalla klikkauksella.",
              },
              {
                t: "AI-asiakaspalvelu 24/7",
                d: "Chatbot vastaa yleisiin kysymyksiin, ohjaa varauksiin ja palvelee asiakkaitasi silloinkin, kun keittiö on kiinni.",
              },
              {
                t: "Sujuvat pöytävaraukset",
                d: "Integroitu pöytävarausjärjestelmä vähentää puheluita ja no-showta — ja tuo varaukset suoraan sivustoltasi.",
              },
            ].map((item, i) => (
              <div key={item.t}>
                <div className="text-xs font-mono text-accent tabular-nums mb-3">0{i + 1}</div>
                <h3 className="text-xl font-medium mb-3">{item.t}</h3>
                <p className="text-sm text-foreground/60 leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <Link
              to="/kotisivut-yrityksille"
              className="text-sm border-b border-foreground/30 pb-0.5 hover:border-foreground transition-colors"
            >
              Katso palvelut ja hinnat →
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
                (02) Valikoidut ravintolaprojektit
              </div>
              <h2 className="text-2xl font-medium">Viimeaikaista työtä ravintoloille</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-8 group">
              <div className="overflow-hidden rounded-sm mb-6">
                <img
                  src={workWebsite}
                  alt="Foresta — ravintolan verkkosivusto"
                  width={1200}
                  height={912}
                  loading="lazy"
                  className="w-full aspect-[3/2] object-cover group-hover:scale-[1.02] transition-transform duration-700"
                />
              </div>
              <div className="flex justify-between items-baseline">
                <h3 className="text-lg font-medium">
                  Foresta{" "}
                  <span className="font-serif italic text-foreground/50">
                    — verkkosivusto & pöytävaraus
                  </span>
                </h3>
                <span className="text-sm text-muted-foreground tabular-nums">2025</span>
              </div>
            </div>
            <div className="md:col-span-4 md:mt-24 group">
              <div className="overflow-hidden rounded-sm mb-6">
                <img
                  src={workBrand}
                  alt="Lumière — ravintolan brändi ja menu"
                  width={1008}
                  height={1264}
                  loading="lazy"
                  className="w-full aspect-[4/5] object-cover group-hover:scale-[1.02] transition-transform duration-700"
                />
              </div>
              <div className="flex justify-between items-baseline">
                <h3 className="text-lg font-medium">
                  Lumière{" "}
                  <span className="font-serif italic text-foreground/50">— brändi & menu</span>
                </h3>
                <span className="text-sm text-muted-foreground tabular-nums">2025</span>
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
              Viedäänkö <span className="font-serif italic">ravintolasi</span> verkkoon?
            </h2>
            <Link
              to="/yhteys"
              className="inline-flex items-center gap-3 bg-background text-foreground text-sm font-medium py-3 pr-4 pl-5 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Ota yhteyttä
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
      </section>

      <SiteFooter />
    </div>
  );
}
