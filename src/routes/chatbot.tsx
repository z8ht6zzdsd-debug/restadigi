import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/chatbot")({
  head: () => ({
    meta: [
      { title: "Chatbot — Restadigi" },
      { name: "description", content: "Älykäs chatbot verkkosivustollesi: palvelee asiakkaita 24/7, kerää liidejä ja kasvattaa konversiota. Kuukausimaksullinen avaimet käteen -palvelu." },
      { property: "og:title", content: "Chatbot — Restadigi" },
      { property: "og:description", content: "Ympärivuorokautinen myyjä ja asiakaspalvelija yrityksesi verkkosivuille." },
    ],
  }),
  component: ChatbotPage,
});

const benefits = [
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

const monthly = [
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

function ChatbotPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased">
      <SiteHeader />

      {/* Hero */}
      <header className="pt-10 pb-16 sm:pt-16 sm:pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-xs uppercase tracking-[0.2em] text-accent mb-8">Chatbot</div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl leading-[1.02] font-medium text-balance max-w-[22ch] mb-8 tracking-tight">
            Älykäs <span className="font-serif italic text-accent">chatbot</span> — ympärivuorokautinen myyjä ja asiakaspalvelija.
          </h1>
          <p className="max-w-2xl text-base sm:text-lg text-foreground/70 leading-relaxed">
            Chatbot on verkkosivuille asennettava älykäs virtuaaliavustaja, joka palvelee asiakkaita
            24/7 — vastaa yleisiin kysymyksiin, opastaa oikeiden palveluiden pariin ja kerää liidejä.
            Se ei korvaa ihmistä, vaan toimii luotettavana apukätenä silloinkin, kun oma henkilökuntasi on vapaalla.
          </p>
        </div>
      </header>

      {/* Hyödyt */}
      <section className="pb-24 sm:pb-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-10">
            (01) Palvelun keskeiset hyödyt
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="border border-border bg-card rounded-sm p-8">
                <h3 className="text-xl font-medium mb-3">{b.title}</h3>
                <p className="text-sm text-foreground/70 leading-relaxed">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kuukausimaksu */}
      <section className="pb-24 sm:pb-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-10">
            (02) Miksi kuukausimaksulla?
          </div>
          <div className="grid md:grid-cols-12 gap-12 mb-16">
            <div className="md:col-span-5">
              <h2 className="text-3xl sm:text-4xl leading-[1.1] font-medium tracking-tight text-balance">
                Turvallinen ja <span className="font-serif italic">vaivaton</span> ratkaisu.
              </h2>
            </div>
            <div className="md:col-span-7">
              <p className="text-base text-foreground/70 leading-relaxed">
                Jotta chatbot tuottaa tulosta vuodesta toiseen, se vaatii jatkuvaa huolenpitoa.
                Kuukausimaksullinen palvelumalli varmistaa, että botti kehittyy ja toimii saumattomasti
                yrityksen muuttuvan datan ja teknologian mukana.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {monthly.map((m) => (
              <div key={m.title} className="border border-border bg-card rounded-sm p-8">
                <h3 className="text-xl font-medium mb-3">{m.title}</h3>
                <p className="text-sm text-foreground/70 leading-relaxed">{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 sm:py-32 bg-secondary/60">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-12 items-end">
            <div className="md:col-span-8">
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">
                (03) Suunnitellaan yhdessä
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl leading-[1.05] font-medium tracking-tight text-balance mb-8">
                Kerro, mihin <span className="font-serif italic">tarpeeseen</span> botti rakennetaan.
              </h2>
              <ul className="space-y-3 text-base text-foreground/75 max-w-2xl">
                <li className="flex gap-3">
                  <span className="size-1.5 rounded-full mt-2.5 shrink-0 bg-accent" />
                  Mitkä ovat yleisimmät kysymykset, joita asiakkaanne esittävät?
                </li>
                <li className="flex gap-3">
                  <span className="size-1.5 rounded-full mt-2.5 shrink-0 bg-accent" />
                  Haluatteko botin keskittyvän enemmän asiakaspalveluun vai myyntiin ja liidien keruuseen?
                </li>
              </ul>
            </div>
            <div className="md:col-span-4">
              <Link
                to="/yhteys"
                className="inline-flex items-center gap-3 bg-primary text-primary-foreground text-sm font-medium py-3 pr-4 pl-5 rounded-full hover:bg-accent transition-colors"
              >
                Kysy chatbotista
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
