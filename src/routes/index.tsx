import { createFileRoute, Link } from "@tanstack/react-router";
import heroStudio from "@/assets/hero-studio.jpg";
import delfinIcon from "@/assets/delfin-checkin-icon.jpg";
import delfinScreen from "@/assets/delfin-checkin-screen.jpg";
import delfinScreen2 from "@/assets/delfin-checkin-screen-2.jpg";
import rafaHero from "@/assets/rafa-romera-hero.jpg";
import rafaLogo from "@/assets/rafa-romera-logo.png";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";

const PHONE_TEL = "+358401234567";
const PHONE_DISPLAY = "+358 40 123 4567";

const whyUs = [
  {
    t: "Liiketoiminta ymmärrys",
    d: "Pitkä yrittäjätaustamme majoitus-, matkailu- ja ravintola-alalla auttaa meitä ymmärtämään yrityksesi liiketoimintaa kokonaisvaltaisesti. Haluamme kasvattaa myyntiäsi heti ja jatkaa kasvamista kanssanne pitkäaikaisena digiliiketoiminta partnerina.",
  },
  {
    t: "Edullisuus",
    d: "Kulut ovat suuret kaikilla palveluliiketoiminnan aloilla tällä hetkellä ja uusien asiakkaiden löytäminen tai hintojen nostaminen voi olla haastavaa. Pystymme tekoälyn ansioista tuottamaan palveluita järkevään hintaan laadusta ja tehokkuudesta tinkimättä. Tavoitteemme on tarjota palveluitamme markkinoiden parhaalla hinta-laatu suhteella.",
  },
  {
    t: "Automatisoitua liiketoimintaa",
    d: "AI-asiakaspalvelubotti hoitaa puolestasi asiakaspalvelua, varausten vastaanottoa chatissa, puhelimessa ja sähköpostitse 24/7. Kiinteään kuukausihintaan alk. 29 € / kk.",
  },
  {
    t: "Vaivatonta sisällönhallintaa",
    d: "Pääset päivittämään sisältöjä helposti omasta hallintapaneelistasi. Esimerkiksi menun, hinnaston tai muiden tekstisisältöjen, aukioloaikojen ja kuvien päivittäminen sujuu itsenäisesti muutamalla klikkauksella.",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "Restadigi — Älykkäät verkkosivut ja digitaaliset ratkaisut palvelualan yrityksille",
      },
      {
        name: "description",
        content:
          "Rakennamme verkkosivuja, mobiiliapplikaatioita ja muita älykkäitä digitaalisia ratkaisuja palvelualan yrityksille — sisältäen varausjärjestelmät, asiakaspalvelun ja myynnin.",
      },
      {
        property: "og:title",
        content: "Restadigi — Älykäs verkkosivusto, joka palvelee asiakkaitasi",
      },
      {
        property: "og:description",
        content:
          "Verkkosivut, mobiiliapplikaatiot ja älykkäät digitaaliset ratkaisut palvelualan yrityksille.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased selection:bg-accent/20">
      <SiteHeader />

      <PageHero
        tall
        image={heroStudio}
        title={
          <>
            Älykäs verkkosivusto, joka{" "}
            <span className="font-serif italic text-accent">palvelee asiakkaitasi</span>.
          </>
        }
        description="Rakennamme verkkosivuja, mobiiliapplikaatioita ja muita älykkäitä digitaalisia ratkaisuja palvelualan yrityksille nopeasti ja kustannustehokkaasti. Kokonaisuus sisältäen verkkosivut, varausjärjestelmät, asiakaspalvelun ja myynnin."
        actions={
          <Link
            to="/yhteys"
            className="inline-flex items-center gap-3 rounded-full bg-white py-3 pr-4 pl-5 text-sm font-medium text-primary transition-colors hover:bg-accent hover:text-white"
          >
            Pyydä tarjous
            <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
            </svg>
          </Link>
        }
      />

      {/* Toimialakohtaiset ratkaisut */}
      <section className="py-24 sm:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">
              (01) Tutustuminen
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.1] text-balance mb-8">
              Toimialakohtaiset ratkaisut palvelualan sisälle ja{" "}
              <span className="font-serif italic text-accent">boksin ulkopuolelle</span>.
            </h2>
            <p className="text-base sm:text-lg text-foreground/65 leading-relaxed text-pretty mb-10 max-w-2xl">
              Haluamme tutustua yrityksesi toimintaan mahdollisimman tarkasti ymmärtääksemme miten
              voimme palvella teitä parhaiten. Aloitamme kaikki projektit vähintään 30 minuutin
              pituisella tutustumispuhelulla. Varaa alta aika puhelulle tai soittele meille vaikka
              ihan suoraan itse, niin katsotaan teille optimaalinen palveluratkaisu yhdessä.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={`tel:${PHONE_TEL}`}
                className="inline-flex items-center gap-3 rounded-full bg-primary py-3 pr-4 pl-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-accent"
              >
                Soita meille
                <span className="text-primary-foreground/70 tabular-nums text-xs hidden sm:inline">
                  {PHONE_DISPLAY}
                </span>
              </a>
              <Link
                to="/yhteys"
                className="inline-flex items-center gap-2 border-b border-foreground/30 pb-0.5 text-sm transition-colors hover:border-foreground"
              >
                Varaa aika →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Miksi valita meidät */}
      <section className="py-24 sm:py-32 bg-secondary/60">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">
            (02) Vahvuudet
          </div>
          <h2 className="text-3xl sm:text-4xl font-medium tracking-tight mb-14">
            Miksi valita <span className="font-serif italic text-accent">meidät</span>?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
            {whyUs.map((item, i) => (
              <div
                key={item.t}
                className="rounded-sm border border-border/80 bg-background p-7 sm:p-8 flex flex-col gap-3"
              >
                <div className="text-xs font-mono text-accent tabular-nums">0{i + 1}</div>
                <h3 className="text-xl font-medium">{item.t}</h3>
                <p className="text-sm text-foreground/60 leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Referenssit */}
      <section className="py-24 sm:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-16">
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
              (03) Referenssit
            </div>
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight">
              Valikoidut <span className="font-serif italic text-accent">projektit</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Delfin Check-In */}
            <article className="group">
              <div className="relative overflow-hidden rounded-sm bg-[#5fbaca]/15 mb-6 p-8 sm:p-10 flex items-end justify-center gap-4 min-h-[22rem] sm:min-h-[26rem]">
                <img
                  src={delfinIcon}
                  alt="Delfin Check-In -sovelluksen logo"
                  width={96}
                  height={96}
                  className="absolute top-6 left-6 size-14 sm:size-16 rounded-[1.15rem] shadow-md"
                />
                <img
                  src={delfinScreen}
                  alt="Delfin Check-In -sovelluksen näkymä"
                  width={230}
                  height={498}
                  loading="lazy"
                  className="relative z-[1] w-[42%] max-w-[11rem] rounded-2xl shadow-lg group-hover:-translate-y-1 transition-transform duration-700"
                />
                <img
                  src={delfinScreen2}
                  alt="Delfin Check-In -sovelluksen kalenterinäkymä"
                  width={230}
                  height={498}
                  loading="lazy"
                  className="relative z-[2] w-[48%] max-w-[12.5rem] rounded-2xl shadow-xl -mb-4 group-hover:-translate-y-2 transition-transform duration-700"
                />
              </div>
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                <h3 className="text-lg font-medium">
                  Delfin Check-In{" "}
                  <span className="font-serif italic text-foreground/50">
                    — palvelu & mobiiliapplikaatio
                  </span>
                </h3>
                <span className="text-sm text-muted-foreground">App Store & Google Play</span>
              </div>
              <p className="text-sm text-foreground/60 leading-relaxed mb-4 max-w-prose">
                Majoituspalveluiden check-in- ja matkustajarekisteröintisovellus vuokranantajille ja
                majoitusyrityksille. Sovellus synkronoi varaukset, hallinnoi vieraita ja hoitaa
                viranomaisraportoinnin — saatavilla Applen ja Googlen sovelluskaupoissa.
              </p>
              <a
                href="https://apps.apple.com/au/app/delfin-check-in/id6755120600"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm border-b border-foreground/30 pb-0.5 transition-colors hover:border-foreground"
              >
                Katso App Storessa →
              </a>
            </article>

            {/* Rafa Romera */}
            <article className="group lg:mt-16">
              <div className="relative overflow-hidden rounded-sm mb-6 min-h-[22rem] sm:min-h-[26rem]">
                <img
                  src={rafaHero}
                  alt="Rafa Romera -muusikon sivusto"
                  width={1200}
                  height={800}
                  loading="lazy"
                  className="absolute inset-0 size-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent"
                  aria-hidden
                />
                <img
                  src={rafaLogo}
                  alt="Rafa Romera -logo"
                  width={280}
                  height={80}
                  loading="lazy"
                  className="absolute bottom-6 left-6 w-44 sm:w-56 h-auto drop-shadow-lg"
                />
              </div>
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                <h3 className="text-lg font-medium">
                  Rafa Romera{" "}
                  <span className="font-serif italic text-foreground/50">
                    — sivusto & Spotify-integraatio
                  </span>
                </h3>
                <span className="text-sm text-muted-foreground">Artistisivusto</span>
              </div>
              <p className="text-sm text-foreground/60 leading-relaxed mb-4 max-w-prose">
                Andalusialaisen muusikon Rafa Romeran verkkosivusto Spotify-integraatiolla —
                biografia, discografia, galleria ja tulevat konsertit yhdessä kokonaisuudessa, joka
                ohjaa kuulijat suoraan kuuntelemaan.
              </p>
              <a
                href="https://rafaromera.info/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm border-b border-foreground/30 pb-0.5 transition-colors hover:border-foreground"
              >
                Avaa sivusto →
              </a>
            </article>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 sm:py-32 bg-secondary/40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-primary text-primary-foreground rounded-sm p-12 sm:p-20 lg:p-28 flex flex-col items-start">
            <div className="text-xs uppercase tracking-[0.2em] text-primary-foreground/50 mb-8">
              (04) Yhteys
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl leading-[1.05] font-medium mb-12 text-balance max-w-[20ch] tracking-tight">
              Valmis ottamaan <span className="font-serif italic">seuraavan askeleen</span>?
            </h2>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/yhteys"
                className="inline-flex items-center gap-3 bg-background text-foreground text-sm font-medium py-3 pr-4 pl-5 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Pyydä tarjous
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
              <a
                href={`tel:${PHONE_TEL}`}
                className="text-sm border-b border-primary-foreground/40 pb-0.5 text-primary-foreground/90 transition-colors hover:border-primary-foreground"
              >
                Soita meille →
              </a>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
