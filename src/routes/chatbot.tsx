import { createFileRoute, Link } from "@tanstack/react-router";
import heroAiHospitality from "@/assets/hero-ai-hospitality.jpg";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";

export const Route = createFileRoute("/chatbot")({
  head: () => ({
    meta: [
      { title: "AI-asiakaspalvelu — Restadigi" },
      {
        name: "description",
        content:
          "Älykäs chatbot verkkosivustollesi ja AI Concierge puhelinpalvelu ravintolalle — palvelee asiakkaita 24/7, vastaanottaa varauksia ja vapauttaa henkilökunnan.",
      },
      { property: "og:title", content: "AI-asiakaspalvelu — Restadigi" },
      {
        property: "og:description",
        content:
          "Chatbot verkkosivuille ja tekoälypohjainen puhelinpalvelu — ympärivuorokautinen asiakaspalvelu ravintolalle.",
      },
    ],
  }),
  component: ChatbotPage,
});

const chatbotBenefits = [
  {
    title: "Asiakaspalvelu 24/7",
    body: "Botti vastaa yleisimpiin kysymyksiin heti, jolloin asiakkaan ei tarvitse jonottaa tai etsiä tietoa.",
  },
  {
    title: "Tehokas liidien keräys",
    body: "Botti ohjaa vierailijan vaivattomasti eteenpäin ostopolulla ja kerää yhteystiedot talteen myös yöaikaan.",
  },
  {
    title: "Kasvanut konversio",
    body: "Yhteydenottokynnys on matala. Chatbotin avulla yhä suurempi osa kävijöistä muuttuu maksaviksi asiakkaiksi.",
  },
  {
    title: "Resurssien säästö",
    body: "Rutiininomaiset kysymykset siirtyvät botin hoidettavaksi ja vapauttavat aikaa vaativampiin työtehtäviin.",
  },
];

const chatbotMonthly = [
  {
    title: "Päivittyvä teknologia",
    body: "Verkkoympäristö ja tekoäly kehittyvät jatkuvasti. Kuukausimaksulla varmistamme, että bottisi toimii aina uusimmalla ja turvallisimmalla alustalla.",
  },
  {
    title: "Sopii yrityksen omaan dataan",
    body: "Bottia voidaan opettaa. Kuukausittainen ylläpito mahdollistaa botin kouluttamisen yrityksesi uusilla tuotetiedoilla, kampanjoilla ja vastauksilla.",
  },
  {
    title: "Proaktiivinen kehitys",
    body: "Analysoimme botin keskusteluhistoriaa ja optimoimme sen vastaamaan asiakkaidenne yleisimpiin tarpeisiin yhä paremmin.",
  },
  {
    title: "Avaimet käteen -palvelu",
    body: "Sinun ei tarvitse huolehtia teknisistä asennuksista tai koodauksesta. Asiantuntijamme vastaavat ylläpidosta.",
  },
];

const conciergeFeatures = [
  "Vastaa puheluihin 24/7",
  "Vastaanottaa ja hallitsee pöytävarauksia",
  "Vastaa yleisimpiin asiakaskysymyksiin (aukioloajat, menu, sijainti, pysäköinti jne.)",
  "Kirjaa erityistoiveet ja allergiat",
  "Ohjaa puhelut tarvittaessa henkilökunnalle",
  "Palvelee useilla kielillä",
  "Toimii ilman jonotusta tai vastaamattomia puheluita",
];

const conciergeBenefits = [
  "Yksikään asiakaspuhelu ei jää vastaamatta.",
  "Lisää varauksia ja vähentää menetettyjä myyntimahdollisuuksia.",
  "Vapauttaa henkilökunnan aikaa asiakaspalveluun.",
  "Tasalaatuinen palvelu vuoden jokaisena päivänä.",
  "Skaalautuu kahviloista ja pizzerioista aina fine dining -ravintoloihin ja ravintolaketjuihin.",
];

const conciergeAudience = [
  "À la carte -ravintoloille",
  "Lounasravintoloille",
  "Pizzerioille",
  "Kahviloille",
  "Hotelliravintoloille",
  "Fine Dining -ravintoloille",
  "Ravintolaketjuille",
];

const conciergePricingIncludes = [
  "AI-puhelinpalvelun käyttöönoton",
  "Ravintolan perustietojen määrittelyn",
  "Peruskonfiguroinnin",
  "Jatkuvat ohjelmistopäivitykset",
  "Teknisen ylläpidon",
];

function ChatbotPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased">
      <SiteHeader />

      <PageHero
        image={heroAiHospitality}
        title={
          <>
            Älykäs <span className="font-serif italic text-accent">asiakaspalvelu</span>{" "}
            ravintolalle.
          </>
        }
        description="Restadigi tarjoaa kaksi täydentävää ratkaisua ravintolan asiakaspalveluun: verkkosivuille asennettavan chatbotin ja tekoälypohjaisen AI Concierge -puhelinpalvelun. Molemmat palvelevat asiakkaita ympäri vuorokauden."
      />

      {/* Chatbot */}
      <section className="pb-24 sm:pb-32 border-t border-border pt-16 sm:pt-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-xs uppercase tracking-[0.2em] text-accent mb-8">Chatbot</div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl leading-[1.05] font-medium text-balance max-w-[22ch] mb-8 tracking-tight">
            Älykäs <span className="font-serif italic text-accent">chatbot</span> —
            ympärivuorokautinen myyjä ja asiakaspalvelija.
          </h2>
          <p className="max-w-2xl text-base sm:text-lg text-foreground/70 leading-relaxed mb-16">
            Chatbot on verkkosivuille asennettava älykäs virtuaaliavustaja, joka palvelee asiakkaita
            24/7 — vastaa yleisiin kysymyksiin, opastaa oikeiden palveluiden pariin ja kerää
            liidejä. Se ei korvaa ihmistä, vaan toimii luotettavana apukätenä silloinkin, kun oma
            henkilökuntasi on vapaalla.
          </p>

          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-10">
            (01) Chatbotin keskeiset hyödyt
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
            {chatbotBenefits.map((b) => (
              <div key={b.title} className="border border-border bg-card rounded-sm p-8">
                <h3 className="text-xl font-medium mb-3">{b.title}</h3>
                <p className="text-sm text-foreground/70 leading-relaxed">{b.body}</p>
              </div>
            ))}
          </div>

          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-10">
            (02) Miksi kuukausimaksulla?
          </div>
          <div className="grid md:grid-cols-12 gap-12 mb-16">
            <div className="md:col-span-5">
              <h3 className="text-3xl sm:text-4xl leading-[1.1] font-medium tracking-tight text-balance">
                Turvallinen ja <span className="font-serif italic">vaivaton</span> ratkaisu.
              </h3>
            </div>
            <div className="md:col-span-7">
              <p className="text-base text-foreground/70 leading-relaxed">
                Jotta chatbot tuottaa tulosta vuodesta toiseen, se vaatii jatkuvaa huolenpitoa.
                Kuukausimaksullinen palvelumalli varmistaa, että botti kehittyy ja toimii
                saumattomasti yrityksen muuttuvan datan ja teknologian mukana.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {chatbotMonthly.map((m) => (
              <div key={m.title} className="border border-border bg-card rounded-sm p-8">
                <h3 className="text-xl font-medium mb-3">{m.title}</h3>
                <p className="text-sm text-foreground/70 leading-relaxed">{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Concierge */}
      <section className="pb-24 sm:pb-32 bg-secondary/60 pt-16 sm:pt-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-xs uppercase tracking-[0.2em] text-accent mb-8">
            Restadigi AI Concierge
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl leading-[1.05] font-medium text-balance max-w-[24ch] mb-8 tracking-tight">
            Älykäs <span className="font-serif italic text-accent">puhelinpalvelu</span> — vastaa
            jokaiseen puheluun, 24/7.
          </h2>
          <p className="max-w-2xl text-base sm:text-lg text-foreground/70 leading-relaxed mb-16">
            Restadigi AI Concierge on tekoälypohjainen puhelinpalvelu, joka huolehtii ravintolasi
            asiakaspuheluista vuorokauden ympäri. Se vastaa asiakkaiden kysymyksiin, ottaa vastaan
            pöytävarauksia ja vapauttaa henkilökunnan keskittymään siihen tärkeimpään — asiakkaiden
            palvelemiseen.
          </p>

          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-10">
            (03) Mitä palvelu tekee?
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-24">
            {conciergeFeatures.map((feature) => (
              <li
                key={feature}
                className="flex gap-3 text-sm text-foreground/75 leading-relaxed border border-border bg-card rounded-sm p-6"
              >
                <span className="size-1.5 rounded-full mt-2 shrink-0 bg-accent" />
                {feature}
              </li>
            ))}
          </ul>

          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-10">
            (04) Hyödyt ravintolalle
          </div>
          <ul className="space-y-4 mb-24 max-w-3xl">
            {conciergeBenefits.map((benefit) => (
              <li key={benefit} className="flex gap-3 text-base text-foreground/75 leading-relaxed">
                <span className="text-accent shrink-0">✔</span>
                {benefit}
              </li>
            ))}
          </ul>

          <div className="grid md:grid-cols-12 gap-12 mb-24">
            <div className="md:col-span-5">
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">
                (05) Kenelle?
              </div>
              <h3 className="text-3xl sm:text-4xl leading-[1.1] font-medium tracking-tight text-balance mb-6">
                Sopii <span className="font-serif italic">kaikenlaisille</span> ravintoloille.
              </h3>
              <p className="text-base text-foreground/70 leading-relaxed">
                Restadigi AI Concierge sopii esimerkiksi à la carte -ravintoloille, lounaspaikoille,
                pizzerioille, kahviloille, hotelliravintoloille, fine dining -ravintoloille ja
                ravintolaketjuille.
              </p>
            </div>
            <div className="md:col-span-7">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {conciergeAudience.map((item) => (
                  <li
                    key={item}
                    className="text-sm text-foreground/75 border border-border bg-background rounded-sm px-5 py-4"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-12 gap-12 mb-24">
            <div className="md:col-span-6">
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">
                (06) Käyttöönotto
              </div>
              <p className="text-base text-foreground/70 leading-relaxed">
                Käyttöönotto on nopea ja helppo. Räätälöimme tekoälyavustajan ravintolasi tietojen,
                palveluiden ja toimintatapojen mukaisesti. Palvelu voidaan ottaa käyttöön muutamassa
                arkipäivässä.
              </p>
            </div>
            <div className="md:col-span-6">
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">
                (07) Hinta
              </div>
              <p className="text-3xl font-medium mb-4">Alkaen 499 € / vuosi</p>
              <p className="text-sm text-foreground/70 mb-4">Hinta sisältää:</p>
              <ul className="space-y-2">
                {conciergePricingIncludes.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-foreground/75">
                    <span className="size-1.5 rounded-full mt-2 shrink-0 bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-foreground/60 mt-6 leading-relaxed">
                Laajemmat integraatiot, räätälöinnit ja lisäominaisuudet hinnoitellaan ravintolan
                tarpeiden mukaan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 sm:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-12 items-end">
            <div className="md:col-span-8">
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">
                (08) Miksi Restadigi?
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl leading-[1.05] font-medium tracking-tight text-balance mb-8">
                Vastaa jokaiseen puheluun. Palvele paremmin.{" "}
                <span className="font-serif italic">Kasva tehokkaammin.</span>
              </h2>
              <p className="text-base text-foreground/70 leading-relaxed max-w-2xl mb-8">
                Restadigi kehittää digitaalisia ratkaisuja ravintola-alalle. Chatbot ja AI Concierge
                auttavat ravintoloita parantamaan asiakaskokemusta, tehostamaan toimintaa ja
                kasvattamaan myyntiä helposti käyttöönotettavilla tekoälyratkaisuilla.
              </p>
              <ul className="space-y-3 text-base text-foreground/75 max-w-2xl">
                <li className="flex gap-3">
                  <span className="size-1.5 rounded-full mt-2.5 shrink-0 bg-accent" />
                  Mitkä ovat yleisimmät kysymykset, joita asiakkaanne esittävät?
                </li>
                <li className="flex gap-3">
                  <span className="size-1.5 rounded-full mt-2.5 shrink-0 bg-accent" />
                  Haluatteko botin keskittyvän enemmän asiakaspalveluun vai myyntiin ja liidien
                  keruuseen?
                </li>
                <li className="flex gap-3">
                  <span className="size-1.5 rounded-full mt-2.5 shrink-0 bg-accent" />
                  Tarvitsetteko apua vastaamattomiin puheluihin ruuhka-aikoina?
                </li>
              </ul>
            </div>
            <div className="md:col-span-4">
              <Link
                to="/yhteys"
                className="inline-flex items-center gap-3 bg-primary text-primary-foreground text-sm font-medium py-3 pr-4 pl-5 rounded-full hover:bg-accent transition-colors"
              >
                Pyydä maksuton esittely
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
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
