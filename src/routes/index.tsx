import { createFileRoute, Link } from "@tanstack/react-router";
import heroStudio from "@/assets/hero-studio.jpg";
import workWebsite from "@/assets/work-website.jpg";
import workBrand from "@/assets/work-brand.jpg";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HolaDigi — Näyttävät ja tehokkaat verkkosivut yritykselle" },
      { name: "description", content: "Rakennamme yrityksille näyttäviä, moderneja ja tehokkaita verkkosivuja sekä vahvaa verkkonäkyvyyttä. Uuden teknologian avulla sivut valmistuvat nopeasti ja niitä on helppo päivittää." },
      { property: "og:title", content: "HolaDigi — Näyttävät ja tehokkaat verkkosivut yritykselle" },
      { property: "og:description", content: "Modernit, responsiiviset verkkosivut ja laaja asiakastuki yrityksesi kasvun tueksi." },
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
            ¡Hola! — Digistudio
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl leading-[1.02] font-medium text-balance max-w-[22ch] mb-10 tracking-tight">
            Näyttävät, modernit ja <span className="font-serif italic text-accent">tehokkaat</span> verkkosivut yrityksellesi.
          </h1>
          <div className="grid md:grid-cols-12 gap-8 items-end">
            <p className="md:col-span-6 text-base sm:text-lg text-pretty text-foreground/70 leading-relaxed">
              Rakennamme yrityksille näyttäviä, moderneja ja tehokkaita verkkosivuja sekä vahvaa
              verkkonäkyvyyttä hyödyntäen muun muassa Lovable-tekoälyä. Uuden teknologian avulla
              sivut valmistuvat nopeasti, ovat responsiivisia ja niitä voidaan kehittää joustavasti
              yrityksesi tarpeiden mukaan. Tavoitteeni on luoda verkkoratkaisuja, jotka eivät
              ainoastaan näytä hyvältä, vaan myös tukevat yrityksesi kasvua, löydettävyyttä ja
              asiakkaiden hankintaa.
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

      {/* Miksi valita meidät */}
      <section className="py-24 sm:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-16">
            (01) Miksi valita meidät?
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {[
              {
                t: "Helppo ja nopea aloitus",
                d: "Pääset liikkeelle vaivattomasti ilman monimutkaisia prosesseja.",
              },
              {
                t: "Vaivaton sisällönhallinta",
                d: "Verkkosivujesi sisältöä on helppo päivittää ja ylläpitää myös jatkossa.",
              },
              {
                t: "Ammattimainen toteutus",
                d: "Suunnittelemme, toteutamme ja julkaisemme modernit, responsiiviset verkkosivut yrityksesi tarpeisiin.",
              },
              {
                t: "Laaja asiakastuki",
                d: "Saat apua niin käyttöönotossa, ylläpidossa kuin sivuston kehittämisessäkin – et jää yksin projektin valmistumisen jälkeen.",
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
            <Link to="/palvelut" className="text-sm border-b border-foreground/30 pb-0.5 hover:border-foreground transition-colors">
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
