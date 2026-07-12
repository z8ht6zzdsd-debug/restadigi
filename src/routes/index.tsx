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

      {/* Hero */}
      <header className="pt-10 pb-24 sm:pt-16 sm:pb-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-xs uppercase tracking-[0.2em] text-accent mb-8">
            Digistudio ravintoloille
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl leading-[1.02] font-medium text-balance max-w-[22ch] mb-10 tracking-tight">
            Näyttävät verkkosivut ja älykkäät palvelut{" "}
            <span className="font-serif italic text-accent">ravintolallesi</span>.
          </h1>
          <div className="grid md:grid-cols-12 gap-8 items-end">
            <p className="md:col-span-6 text-base sm:text-lg text-pretty text-foreground/70 leading-relaxed">
              Rakennamme ravintoloille moderneja, houkuttelevia verkkosivuja sekä tarjoamme älykkään
              AI-asiakaspalvelun ja sujuvan pöytävarausjärjestelmän. Tavoitteemme on luoda
              kokonaisuus, joka näyttää yhtä hyvältä kuin ravintolasi ruoka — ja tuo lisää
              asiakkaita ovista sisään.
            </p>
            <div className="md:col-span-6 md:col-start-8 flex items-center gap-4">
              <Link
                to="/yhteys"
                className="inline-flex items-center gap-3 bg-primary text-primary-foreground text-sm font-medium py-3 pr-4 pl-5 rounded-full hover:bg-accent transition-colors"
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
                className="text-sm text-foreground/70 hover:text-foreground"
              >
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
            alt="Tunnelmallinen ravintolasali auringonlaskun aikaan"
            width={1600}
            height={912}
            className="w-full aspect-[16/9] object-cover rounded-sm"
          />
        </div>
      </section>

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
