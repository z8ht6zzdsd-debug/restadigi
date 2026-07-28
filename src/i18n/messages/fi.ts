import type { Messages } from "./types";
import {
  CONTACT_ADDRESS,
  CONTACT_COMPANY,
  CONTACT_EMAIL,
  CONTACT_PERSON,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_TEL,
  CONTACT_WHATSAPP_DISPLAY,
} from "@/lib/company-contact";

const siteIntroBullet =
  "Selkeät ja houkuttelevat perustekstit etusivulle, palveluille ja yhteystiedoille – avaimet käteen paketti ja kattava käyttökoulutus";

const siteSharedBullets = [
  "Helppokäyttöinen hallintapaneeli, jolla voit päivittää sisältöjä itse",
  "Responsiivinen toteutus, joka toimii erinomaisesti niin mobiilissa, tabletissa kuin tietokoneellakin",
  "Integroitu yhteydenottolomake, jonka avulla asiakkaasi tavoittavat sinut helposti",
  "Perus-SEO-optimointi, joka sisältää meta-tiedot, sivukartan ja sivuston suorituskyvyn optimoinnin",
  "Nopea toimitus – verkkosivusto valmiina jopa 5 arkipäivässä",
  "30 päivän asiakastuki julkaisun jälkeen mahdollisia kysymyksiä ja pieniä muutoksia varten",
];

const withSitePages = (pagesBullet: string, extras: string[] = []) => [
  siteIntroBullet,
  pagesBullet,
  ...siteSharedBullets,
  ...extras,
];

export const fi: Messages = {
  meta: {
    defaultTitle: "Restadigi — Kotisivut ja diginäkyvyys yrityksille",
    defaultDescription:
      "Restadigi rakentaa moderneja kotisivuja ja vahvistaa yritysten diginäkyvyyttä. Uuden teknologian avulla sivut valmistuvat nopeasti ja niitä on helppo päivittää.",
    ogTitle: "Restadigi — Kotisivut ja diginäkyvyys yrityksille",
    ogDescription: "Modernit kotisivut, SEO ja diginäkyvyyden palvelut yrityksesi kasvun tueksi.",
  },
  notFound: {
    code: "404",
    title: "Sivua ei löytynyt",
    description: "Etsimääsi sivua ei ole olemassa tai se on siirretty.",
    goHome: "Etusivulle",
  },
  error: {
    title: "Sivu ei latautunut",
    description:
      "Jokin meni pieleen meidän päässämme. Voit yrittää uudelleen tai palata etusivulle.",
    tryAgain: "Yritä uudelleen",
    goHome: "Etusivulle",
  },
  header: {
    services: "Palvelut",
    industries: "Toimialat",
    pricing: "Hinnasto",
    languages: "Kielet",
    contact: "Ota yhteyttä",
    menu: "Valikko",
    homeAria: "Restadigi — etusivu",
    logoAlt: "Restadigi Finland",
    servicesIntro:
      "Restadigilla on kattava valikoima digitaalisia palveluita, joilla ravintolat, majoitus ja palveluyritykset myyvät, varaavat ja palvelevat asiakkaita verkossa — selkeästi.\n\nTutustu palveluihimme ja löydä yrityksellesi sopiva kokonaisuus.",
    industriesIntro:
      "Restadigilla on kattava valikoima toimialakohtaisia digiratkaisuja, jotka on suunniteltu tukemaan liiketoimintaa erilaisissa ympäristöissä.\n\nTutustu eri toimialoille kehitettyihin palveluihin ja löydä omasi.",
    industriesList: [
      {
        title: "Areenat, tapahtumat ja esiintyjät",
        body: "Verkkosivut, diginäkyvyys sekä lippu- ja myyntiratkaisut, jotka tuovat fanit, liput ja esiintyjät yhteen — selkeästi ja brändin mukaisesti.",
      },
      {
        title: "Hotellit ja hostellit",
        body: "Varausten hallinta ja myynti, digitaalinen check-in sekä matkustajarekisteröinti, AI-asiakaspalvelu 24/7 — majoitustoiminnan digitaalinen selkäranka.",
      },
      {
        title: "Matkailu ja aktiviteetit",
        body: "Varausjärjestelmät, näkyvyys- ja myyntiratkaisut sekä AI-asiakaspalvelu, joilla aktiviteetit ja elämykset löytyvät ja varataan helposti.",
      },
      {
        title: "Ravintolat",
        body: "Fine diningista fast foodiin: verkkosivut, mobiiliapplikaatiot, pöytävaraukset ja AI-asiakaspalvelu — myynti ja palvelu ympäri vuorokauden.",
      },
      {
        title: "Baarit, pubit ja yökerhot",
        body: "Nopeaa palvelua ja selkeää myyntiä: verkkosivut, tapahtumat, pöytä- ja tilavaraukset sekä AI-asiakaspalvelu, jotka pitävät illan sujuvana.",
      },
      {
        title: "Kahvilat ja kioskit",
        body: "Tyylikkäät verkkosivut ja mobiiliapplikaatio kanta-asiakasohjelmalla — brändi, toistot ja asiakassuhde samassa kokonaisuudessa.",
      },
    ],
    servicesList: [
      {
        to: "/verkkosivut",
        label: "Verkkosivut",
        body: "Modernit sivut, joilla brändi, myynti ja sisältö pysyvät ajan tasalla.",
      },
      {
        to: "/restatable",
        label: "Restatable",
        body: "Pöytävaraukset kanavilta ja saliin — hallinta yhdessä näkymässä.",
      },
      {
        to: "/majoitusvaraus",
        label: "Restabooking",
        body: "Majoitusvaraukset sivuilta — hotellit, majatalot ja mökit.",
      },
      {
        to: "/restachat",
        label: "Restachat",
        body: "Älykäs chatbot myyntiin ja asiakaspalveluun 24/7.",
      },
      {
        to: "/nakyvyys",
        label: "Näkyvyys",
        body: "AI-, Google- ja urheilunäkyvyyspaketit kasvattamaan löydettävyyttä.",
      },
      {
        to: "/graafinen-suunnittelu",
        label: "Graafinen suunnittelu",
        body: "Logo, yritysilme ja markkinointimateriaalit yhdestä paikasta.",
      },
      {
        to: "/yllapito",
        label: "Ylläpitopalvelut",
        body: "Hosting, domain, SSL ja jatkuva tuki Suomessa.",
      },
    ],
    languagesList: [
      { code: "fi", label: "Suomi" },
      { code: "en", label: "English" },
      { code: "es", label: "Español" },
    ],
    contactIntro:
      "Täältä löydät yhteystiedot ja yritystiedot. Ota yhteyttä — vastaamme mielellämme.",
    contactCta: "Siirry yhteyssivulle",
    contactLinks: [
      {
        title: "Yhteystiedot",
        body: "Puhelin, sähköposti ja WhatsApp — ota yhteyttä suoraan.",
        to: "/yhteys",
      },
      {
        title: "Tietoa meistä",
        body: "Tutustu Restadigiin ja tapaamme tehdä digipalveluita.",
        to: "/meista",
      },
    ],
    contactPanel: {
      company: CONTACT_COMPANY,
      person: CONTACT_PERSON,
      address: CONTACT_ADDRESS,
      emailLabel: "Sähköposti",
      email: CONTACT_EMAIL,
      phoneLabel: "Puhelin",
      whatsappLabel: "WhatsApp",
      phoneDisplay: CONTACT_PHONE_DISPLAY,
      phoneTel: CONTACT_PHONE_TEL,
      whatsappDisplay: CONTACT_WHATSAPP_DISPLAY,
    },
  },
  footer: {
    copyright: "© {year} Restadigi",
    privacy: "Tietosuoja",
    cookies: "Evästeet",
    terms: "Käyttöehdot",
    legalNavLabel: "Oikeudelliset tiedot",
  },
  cookies: {
    openAria: "Avaa evästeasetukset",
    closeAria: "Sulje evästeasetukset",
    bannerTitle: "Käytämme evästeitä",
    bannerBody:
      "Käytämme välttämättömiä evästeitä sivuston toimintaan. Tilasto- ja markkinointievästeitä vain, jos hyväksyt ne. Voit muuttaa valintojasi milloin tahansa.",
    acceptAll: "Hyväksy kaikki",
    necessaryOnly: "Vain välttämättömät",
    settings: "Asetukset",
    panelTitle: "Evästeasetukset",
    panelIntro:
      "Valitse, mitä evästeitä sallit. Välttämättömät evästeet tarvitaan sivuston perustoimintaan, eikä niitä voi poistaa käytöstä.",
    currentStatus: "Nykyinen tila",
    on: "Käytössä",
    off: "Ei käytössä",
    alwaysOn: "Aina käytössä",
    hideDetails: "Piilota tiedot",
    showDetails: "Näytä tiedot",
    acceptedAt: "Hyväksymispäivämäärä",
    consentId: "Hyväksymistunnuksesi",
    withdraw: "Peruuta hyväksyntä",
    saveChanges: "Muuta hyväksyntääsi",
    saveChoices: "Tallenna valinnat",
    privacyLink: "Tietosuojaseloste",
    cookiePolicyLink: "Evästekäytäntö",
    categories: {
      necessary: "Välttämätön",
      preferences: "Mieltymykset",
      statistics: "Tilastot",
      marketing: "Markkinointi",
    },
    categoryHelp: {
      necessary: "Kirjautuminen, tietoturva ja sivuston perustoiminnot.",
      preferences: "Muistaa valintasi (esim. kieliasetukset), kun se on mahdollista.",
      statistics: "Anonyymi kävijätilasto sivuston parantamiseen. Ei myydä kolmansille.",
      marketing: "Mainonnan mittaus ja uudelleenmarkkinointi. Emme käytä näitä oletuksena.",
    },
  },
  legal: {
    privacy: {
      metaTitle: "Tietosuojaseloste — Restadigi",
      metaDescription:
        "Restadigin tietosuojaseloste: mitä henkilötietoja käsittelemme, miksi ja millä oikeudella.",
      title: "Tietosuojaseloste",
      updated: "Päivitetty 23.7.2026",
      sections: [
        {
          heading: "Rekisterinpitäjä",
          body: "Restadigi Finland / Ville Nieminen, Erkkiläntie 47, 04740 Mäntsälä, Suomi. Yhteystiedot: info@restadigi.fi, +358 403 738 332.",
        },
        {
          heading: "Mitä tietoja keräämme",
          body: "Yhteydenottolomakkeiden ja chat-palvelun kautta: nimi, yritys, sähköposti, puhelinnumero ja viestin sisältö. Lisäksi teknisiä lokitietoja (IP, selain) turvallisuuden vuoksi. Emme kerää tarpeetonta tietoa.",
        },
        {
          heading: "Käyttötarkoitus ja oikeusperuste",
          body: "Käsittelemme tietoja yhteydenottoihin vastaamiseen, tarjouksiin ja sopimuksen valmisteluun (sopimus / oikeutettu etu) sekä lakisääteisiin velvoitteisiin. Markkinointiviestejä lähetämme vain, jos olet antanut suostumuksen tai muu lain mukainen peruste on olemassa.",
        },
        {
          heading: "Säilytysaika",
          body: "Yhteydenottotietoja säilytetään niin kauan kuin asiakassuhde tai tarjousprosessi sitä edellyttää, tyypillisesti enintään 24 kuukautta viimeisestä yhteydenotosta, ellei pidempi säilytys ole tarpeen kirjanpito- tai oikeudellisista syistä.",
        },
        {
          heading: "Luovutukset ja siirrot",
          body: "Käytämme luotettavia palveluntarjoajia (esim. hosting, sähköposti, tietokanta). Tietoja ei myydä. Jos tietoja käsitellään EU/ETA-alueen ulkopuolella, käytämme asianmukaisia suojatoimia (esim. vakiosopimuslausekkeet).",
        },
        {
          heading: "Oikeutesi",
          body: "Sinulla on oikeus tarkastaa, oikaista ja poistaa tietojasi, rajoittaa käsittelyä sekä vastustaa käsittelyä. Voit myös tehdä valituksen tietosuojavaltuutetulle (www.tietosuoja.fi). Ota yhteyttä: info@restadigi.fi.",
        },
      ],
    },
    cookies: {
      metaTitle: "Evästekäytäntö — Restadigi",
      metaDescription: "Miten Restadigi käyttää evästeitä ja vastaavia tekniikoita sivustolla.",
      title: "Evästekäytäntö",
      updated: "Päivitetty 23.7.2026",
      sections: [
        {
          heading: "Mitä evästeet ovat",
          body: "Evästeet ovat pieniä tiedostoja tai vastaavaa paikallista tallennusta, jotka auttavat sivustoa toimimaan, muistamaan valintoja tai mittaamaan käyttöä.",
        },
        {
          heading: "Välttämättömät",
          body: "Tarvitaan sivuston turvalliseen toimintaan (esim. admin-istunto, evästeasetusten tallennus). Näitä ei voi kieltää, koska sivusto ei muuten toimi luotettavasti.",
        },
        {
          heading: "Mieltymykset, tilastot ja markkinointi",
          body: "Näitä käytetään vain, jos hyväksyt ne evästeasetuksissa. Tilastot auttavat meitä ymmärtämään sivuston käyttöä sisäisesti. Markkinointievästeitä emme käytä oletuksena; ne pysyvät pois päältä, kunnes annat suostumuksen.",
        },
        {
          heading: "Suostumuksen hallinta",
          body: "Voit avata evästeasetukset milloin tahansa sivun vasemmasta alakulmasta. Voit myös peruuttaa suostumuksen. Lisätietoja henkilötiedoista: tietosuojaseloste.",
        },
      ],
    },
    terms: {
      metaTitle: "Käyttöehdot — Restadigi",
      metaDescription: "Restadigi.fi-sivuston ja palveluiden yleiset käyttöehdot.",
      title: "Käyttöehdot",
      updated: "Päivitetty 23.7.2026",
      sections: [
        {
          heading: "Sivuston käyttö",
          body: "Restadigi.fi tarjoaa tietoa digitaalisista palveluista. Sisältö on yleisluontoista; sitovat ehdot sovitaan aina kirjallisesti tarjouksessa tai sopimuksessa.",
        },
        {
          heading: "Palvelut ja hinnat",
          body: "Sivustolla esitetyt hinnat ja paketit voivat muuttua. Lopullinen hinta vahvistetaan tarjouksessa. Maksuehdot (esim. ennakko) sovitaan projektikohtaisesti.",
        },
        {
          heading: "Immateriaalioikeudet",
          body: "Sivuston tekstit, kuvat ja brändielementit kuuluvat Restadigille tai lisenssinantajille. Älä kopioi materiaalia ilman lupaa.",
        },
        {
          heading: "Vastuunrajoitus",
          body: "Pyrimme pitämään tiedot ajan tasalla, mutta emme takaa sivuston keskeytyksetöntä toimintaa. Emme vastaa epäsuorista vahingoista siltä osin kuin laki sen sallii.",
        },
        {
          heading: "Yhteystiedot",
          body: "Restadigi Finland, Erkkiläntie 47, 04740 Mäntsälä. info@restadigi.fi · +358 403 738 332.",
        },
      ],
    },
  },
  home: {
    meta: {
      title: "Restadigi — Älykkäät verkkosivut ja digitaaliset ratkaisut palvelualan yrityksille",
      description:
        "Rakennamme verkkosivuja, mobiiliapplikaatioita ja muita älykkäitä digitaalisia ratkaisuja palvelualan yrityksille — sisältäen varausjärjestelmät, asiakaspalvelun ja myynnin.",
      ogTitle: "Restadigi — Älykäs verkkosivusto, joka palvelee asiakkaitasi",
      ogDescription:
        "Verkkosivut, mobiiliapplikaatiot ja älykkäät digitaaliset ratkaisut palvelualan yrityksille.",
    },
    hero: {
      titleBefore: "Älykäs verkkosivusto, joka ",
      titleAccent: "palvelee asiakkaitasi 24/7",
      titleAfter: ".",
      description:
        "Yrityksen digitaalinen kokonaisuus rakentuu kolmesta kulmakivestä: verkkosivut, varauspalvelut ja AI-pohjainen asiakaspalvelu. Suunnittelemme ja toteutamme verkkosivuja, mobiilisovelluksia, varaus- ja tilausjärjestelmiä sekä muita älykkäitä digitaalisia ratkaisuja palvelualan yrityksille. Tarjoamme laadukkaan ja kustannustehokkaan palvelukokonaisuuden, joka yhdistää verkkonäkyvyyden, ajanvarauksen, asiakaspalvelun ja myynnin saumattomaksi kokonaisuudeksi.",
      cta: "Pyydä tarjous",
    },
    sitePreview: {
      navMenu: "Menu",
      navHours: "Aukiolo",
      navContact: "Yhteys",
      tagline: "Helsinki · Kahvila",
      openBadge: "Auki tänään 8–18",
      bookTable: "Tilaa noutona",
      customerService: "Asiakaspalvelu",
      tileSpecialMenus: "Espresso",
      tileEvents: "Latte",
      tileGroups: "Brunch",
    },
    barberPreview: {
      brand: "Freddos",
      menu: "Valikko",
      tagline: "Kahvila · Take away",
      headline: "Tuoreena kuppiin.",
      bookCta: "Tilaa",
      bookShort: "Tilaa",
      services: ["Espresso", "Ice latte", "Brunch"],
    },
    intro: {
      titleLine1: "Toimialakohtaiset ratkaisut.",
      titleLine2: "Ota yhteyttä, jutellaan lisää.",
      body: "Haluamme tutustua yrityksesi toimintaan mahdollisimman tarkasti ymmärtääksemme miten voimme palvella teitä parhaiten. Aloitamme kaikki projektit vähintään 30 minuutin pituisella tutustumispuhelulla. Varaa alta aika puhelulle tai soittele meille vaikka ihan suoraan itse, niin katsotaan teille optimaalinen palveluratkaisu yhdessä.",
      callCta: "Soita meille",
      phoneDisplay: CONTACT_PHONE_DISPLAY,
      phoneTel: CONTACT_PHONE_TEL,
      whatsappCta: "WhatsApp-puhelu",
      bookCta: "Varaa aika →",
    },
    whyUs: {
      titleBefore: "Miksi valita ",
      titleAccent: "meidät",
      titleAfter: "?",
      description:
        "Asiakkaamme arvostavat toimialaymmärrystä, järkevää hinnoittelua ja digiratkaisuja, jotka kasvavat liiketoiminnan mukana.",
      items: [
        {
          title: "Liiketoimintaymmärrys",
          body: "Pitkä yrittäjätaustamme majoitus-, matkailu- ja ravintola-alalla auttaa meitä ymmärtämään yrityksesi liiketoimintaa kokonaisvaltaisesti. Haluamme kasvattaa myyntiäsi heti ja jatkaa kasvamista kanssanne digiliiketoimintakumppanina.",
          href: "/yhteys",
          linkLabel: "Varaa tutustumispuhelu",
        },
        {
          title: "Edullisuus",
          body: "Palvelualan kulurakenne on nousussa ja uusien asiakkaiden löytäminen voi olla haastavaa ja kallista. Tekoälyn ansioista tuotamme palveluita järkevään hintaan laadusta tinkimättä — markkinoiden parhaalla hinta–laatusuhteella.",
          href: "/verkkosivut",
          linkLabel: "Katso paketit",
        },
        {
          title: "Automatisoitua liiketoimintaa",
          body: "Restachat-botti hoitaa puolestasi asiakaspalvelua, varausten vastaanottoa chatissa, puhelimessa ja sähköpostitse 24/7. Kiinteään kuukausihintaan 29 € / kk.",
          href: "/restachat",
          linkLabel: "Tutustu Restachatiin",
        },
        {
          title: "Vaivatonta sisällönhallintaa",
          body: "Päivitä menu, hinnasto, aukioloajat ja kuvat omasta hallintapaneelistasi. Sisältöjen ylläpito sujuu itsenäisesti muutamalla klikkauksella — ilman teknistä osaamista.",
          href: "/verkkosivut",
          linkLabel: "Lue lisää",
        },
      ],
    },
    serviceTeasers: {
      title: "Älykkäät palvelut 24/7",
      items: [
        {
          title: "Restachat",
          body: "Chatbot palvelee asiakkaitasi — vastaa kysymyksiin, kerää liidejä ja vapauttaa henkilökunnan.",
          href: "/restachat",
          linkLabel: "Tutustu Restachatiin",
        },
        {
          title: "Restatable & Restabooking",
          body: "Pöytä- ja majoitusvaraukset digitaalisesti — Restatable ravintoloille, Restabooking hotelleille, majataloille ja mökeille.",
          href: "/restatable",
          linkLabel: "Restatable",
          href2: "/majoitusvaraus",
          linkLabel2: "Restabooking",
        },
        {
          title: "Verkkosivut",
          body: "Modernit, toimialakohtaiset verkkosivut — selkeät paketit, hallintapaneeli ja tuki kasvulle.",
          href: "/verkkosivut",
          linkLabel: "Tutustu verkkosivuihin",
        },
      ],
    },
    bookingPromo: {
      title: "Restatable — pöytävaraus",
      body: "Kiinteä kuukausihinta — 39 € / kk.",
      linkLabel: "Lue lisää",
    },
    stayBookingPromo: {
      title: "Restabooking — majoitusvaraus",
      body: "Kiinteä kuukausihinta — 45 € / kk.",
      linkLabel: "Lue lisää",
    },
    dashboardDemoPromo: {
      title: "Tutustu yksilöitävään hallintapaneeliin",
      body: "demo.restadigi.fi",
      linkLabel: "Tutustu",
      href: "https://demo.restadigi.fi",
    },
    projects: {
      titleBefore: "Uusimmat ",
      titleAccent: "referenssit",
      delfin: {
        logoAlt: "Delfin Check-In -sovelluksen logo",
        screenAlt: "Delfin Check-In -sovelluksen näkymä",
        calendarAlt: "Delfin Check-In -sovelluksen kalenterinäkymä",
        title: "Delfin Check-In",
        titleAccent: "— palvelu & mobiiliapplikaatio",
        platforms: "App Store & Google Play",
        body: "Majoituspalveluiden check-in- ja matkustajarekisteröintisovellus vuokranantajille ja majoitusyrityksille. Sovellus synkronoi varaukset, hallinnoi vieraita ja hoitaa viranomaisraportoinnin — saatavilla Applen ja Googlen sovelluskaupoissa.",
        link: "Katso App Storessa →",
      },
      rafa: {
        heroAlt: "Rafa Romera -muusikon sivusto",
        logoAlt: "Rafa Romera -logo",
        title: "Rafa Romera",
        titleAccent: "— sivusto & Spotify-integraatio",
        tag: "Artistisivusto",
        body: "Andalusialaisen muusikon Rafa Romeran verkkosivusto Spotify-integraatiolla — biografia, discografia, galleria ja tulevat konsertit yhdessä kokonaisuudessa, joka ohjaa kuulijat suoraan kuuntelemaan.",
        link: "Avaa sivusto →",
      },
    },
    cta: {
      titleBefore: "Valmis ottamaan ",
      titleAccent: "seuraavan askeleen",
      titleAfter: "?",
      quoteCta: "Pyydä tarjous",
      callCta: "Soita meille →",
      whatsappCta: "WhatsApp →",
    },
  },
  contact: {
    meta: {
      title: "Ota yhteyttä — Restadigi",
      description: `Kerro projektistasi, palaamme asiaan yhden arkipäivän kuluessa. ${CONTACT_EMAIL}`,
      ogTitle: "Ota yhteyttä — Restadigi",
      ogDescription: "Kerro projektistasi — palaamme asiaan yhden arkipäivän kuluessa.",
    },
    hero: {
      titleBefore: "Kerro ",
      titleAccent: "projektistasi",
      titleAfter: ".",
      description:
        "Vastaamme yleensä yhden arkipäivän sisällä. Voit myös laittaa suoraan sähköpostia tai varata lyhyen puhelun.",
    },
    labels: {
      email: "Sähköposti",
      phone: "Puhelin",
      whatsapp: "WhatsApp",
      studio: "Osoite",
      person: "Yhteyshenkilö",
    },
    email: CONTACT_EMAIL,
    phoneDisplay: CONTACT_PHONE_DISPLAY,
    phoneTel: CONTACT_PHONE_TEL,
    whatsappDisplay: CONTACT_WHATSAPP_DISPLAY,
    studioLine1: CONTACT_ADDRESS,
    studioLine2: CONTACT_COMPANY,
    person: CONTACT_PERSON,
    form: {
      name: "Nimi",
      company: "Yritys",
      email: "Sähköposti",
      budget: "Budjetti",
      message: "Viesti",
      messagePlaceholder: "Kerro projektista, aikataulusta ja tavoitteista…",
      selectPlaceholder: "Valitse…",
      submit: "Lähetä viesti",
      sending: "Avataan sähköpostiohjelmaa…",
      budgetOptions: [
        "Alle 1 000 €",
        "1 000 – 2 500 €",
        "2 500 – 5 000 €",
        "Yli 5 000 €",
        "En osaa vielä sanoa",
      ],
      mailSubject: "Projektikysely — {name}",
      mailBody:
        "Nimi: {name}\nYritys: {company}\nSähköposti: {email}\nBudjetti: {budget}\n\nViesti:\n{message}",
    },
  },
  pricing: {
    meta: {
      title: "Hinnasto — Restadigi",
      description:
        "Restadigin palveluiden hinnasto: verkkosivut, diginäkyvyys, graafinen suunnittelu ja hosting.",
      ogTitle: "Hinnasto — Restadigi",
      ogDescription:
        "Selkeät pakettihinnat verkkosivuille, näkyvyydelle, graafiselle suunnittelulle ja hostingille.",
    },
    eyebrow: "Hinnasto",
    titleBefore: "Selkeät ",
    titleAccent: "hinnat",
    titleAfter: " ilman yllätyksiä.",
    lead: "Kooste pakettihinnoista. Tutustu tuotteiden palvelusivuilla pakettien tarkempaan sisältöön.",
    sections: {
      websites: "Verkkosivut",
      visibility: "Diginäkyvyys",
      branding: "Graafinen suunnittelu",
      hosting: "Hosting & ylläpito",
    },
    seeMore: "Tutustu palveluun",
    vatNote: "Hinnat ilmoitetaan ilman arvonlisäveroa, ellei toisin mainita.",
  },
  about: {
    meta: {
      title: "Meistä — Restadigi",
      description:
        "Restadigi on pieni studio, joka rakentaa kotisivuja ja vahvistaa yritysten diginäkyvyyttä. Tutustu tapaamme tehdä työtä.",
      ogTitle: "Meistä — Restadigi",
      ogDescription:
        "Pieni studio, iso vastuu. Kotisivuja ja diginäkyvyyttä suomalaisille yrityksille.",
    },
    eyebrow: "Meistä",
    titleBefore: "Pieni studio, ",
    titleAccent: "iso",
    titleAfter: " vastuu.",
    lead: "Restadigi on itsenäinen digistudio, joka rakentaa kotisivuja ja vahvistaa pienten ja keskisuurten yritysten diginäkyvyyttä. Käytämme uusinta teknologiaa, jotta sivut valmistuvat nopeasti, toimivat kaikilla laitteilla ja ovat helposti päivitettävissä.",
    secondary:
      "Työskentelemme mielellämme pitkäjänteisesti: samat kädet, jotka suunnittelevat sivustosi, auttavat myös sen näkyvyyden ja kehittämisen kanssa eteenpäin.",
  },
  websites: {
    meta: {
      title: "Kotisivut yrityksille — Restadigi",
      description:
        "Selkeät ja vaikuttavat kotisivupaketit ja graafiset lisäpalvelut yrityksille ja yhdistyksille.",
      ogTitle: "Kotisivut yrityksille — Restadigi",
      ogDescription: "Kotisivupaketit ja graafiset lisäpalvelut yrityksesi tarpeisiin.",
    },
    hero: {
      titleBefore: "Verkkosivut ",
      titleAccent: "yritykselle",
      titleAfter: ".",
      description:
        "Hyvin suunnitellut verkkosivut ja verkkosisällöt ovat yrityksesi tärkeimmät digitaaliset työkalut. Ne vahvistavat brändisi näkyvyyttä, helpottavat asiakkaiden yhteydenottoa ja jättävät vahvan ensivaikutelman.",
      priceLabel: "Verkkosivupaketit alk. 399 €",
      phoneShop: {
        brand: "Freddo's",
        product: "Ice latte",
        price: "5,90 €",
        addToCart: "Lisää koriin",
      },
    },
    popular: "Suosittu",
    requestQuote: "Pyydä tarjous",
    explore: "Tutustu",
    packagesTitle: "Verkkosivupaketit",
    packages: [
      {
        name: "Start",
        tagline: "Yksinkertainen mutta vaikuttava sivusto pienyritykselle",
        summary:
          "Selkeä 1–3-sivuinen kokonaisuus, joka kertoo yrityksestäsi heti. Sopii pienelle toimijalle, joka haluaa ammattimaisen verkkonäkyvyyden.",
        price: "399 € + alv",
        bullets: withSitePages("Ammattimainen 1–3-sivuinen verkkosivusto yrityksesi tarpeisiin", [
          "Sisältää 1–2 sähköpostiosoitetta",
        ]),
      },
      {
        name: "Plus",
        tagline: "Tyylikäs kokonaisuus, joka esittelee palvelusi selkeästi",
        summary:
          "4–6 sivua palveluille, yhteystiedoille ja vahvalle ensivaikutelmalle. Esittelee tarjontasi selkeästi ja ohjaa kävijän helposti yhteydenottoon.",
        price: "549 € + alv",
        bullets: withSitePages("Ammattimainen 4–6-sivuinen verkkosivusto yrityksesi tarpeisiin", [
          "Sisältää 1–3 sähköpostiosoitetta",
        ]),
      },
      {
        name: "Kulta",
        tagline: "7–9 sivua ja AI-asiakaspalvelu 1 vuodeksi",
        summary:
          "Laajempi sivusto kasvavalle yritykselle. Sisältää AI-asiakaspalvelun vuodeksi — botti vastaa kysymyksiin ja kerää liidejä myös silloin, kun et itse ole paikalla.",
        price: "759 € + alv",
        bullets: withSitePages("Ammattimainen 7–9-sivuinen verkkosivusto yrityksesi tarpeisiin", [
          "Sisältää 1–5 sähköpostiosoitetta",
          "AI-asiakaspalvelu (chatbot) sisältyy 1 vuodeksi — vastaa asiakkaille 24/7 ja kerää liidejä",
        ]),
      },
      {
        name: "Timantti",
        tagline: "Yli 10 sivua, AI-asiakaspalvelu ja valitsemasi varauspalvelu 1 vuodeksi",
        summary:
          "Kattavin paketti: yli 10 sivua, AI-asiakaspalvelu ja valitsemasi varauspalvelu vuodeksi. Sopii, kun haluat myynnin ja palvelun toimivan verkossa ympäri vuorokauden.",
        price: "929 € + alv",
        featured: true,
        bullets: withSitePages(
          "Ammattimainen yli 10-sivuinen verkkosivusto yrityksesi tarpeisiin",
          [
            "Sisältää 1–10 sähköpostiosoitetta",
            "AI-asiakaspalvelu (chatbot) sisältyy 1 vuodeksi — vastaa asiakkaille 24/7 ja kerää liidejä",
            "Valitsemasi varauspalvelu 1 vuodeksi — esim. pöytävaraus-, majoitusvaraus- tai parturin ajanvarauspalvelu",
          ],
        ),
      },
    ],
    footnoteBefore: "Pakettihinnat ovat kiinteitä. Verkkotunnus ja hosting valitaan erikseen ",
    footnoteLink: "ylläpitopalveluista",
    footnoteAfter:
      ". Voit myös ostaa domainin ja verkkohotellin itse tai käyttää jo olemassa olevaa domainia.",
    dashboardPromo: {
      title: "Tutustu verkkosivuston yksilöitävään hallintapaneeliin",
      body: "demo.restadigi.fi",
      linkLabel: "Tutustu",
      href: "https://demo.restadigi.fi",
    },
    process: {
      title: "Verkkosivujen ostoprosessi — 8 askelta",
      steps: [
        {
          title: "Tarpeiden kartoitus",
          body: "Prosessi alkaa asiakkaan tavoitteiden ja verkkosivuston käyttötarkoituksen selvittämisellä. Samalla määritellään sivuston sisältö, ominaisuudet sekä projektin aikataulu.",
        },
        {
          title: "Sopivan paketin valinta",
          body: "Asiakas valitsee yritykselleen parhaiten sopivan verkkosivuratkaisun. Tarvittaessa valintaan voidaan yhdistää lisäpalveluita, kuten hakukoneoptimointi tai sisällöntuotanto.",
        },
        {
          title: "Tilauksen vahvistaminen",
          body: "Kun palvelu on valittu, tilaus vahvistetaan ja projekti käynnistyy. Samalla sovitaan käytännön asioista sekä toimitetaan tarvittavat materiaalit.",
        },
        {
          title: "Sivuston suunnittelu",
          body: "Restadigi suunnittelee verkkosivujen rakenteen, ulkoasun ja käyttökokemuksen asiakkaan toiveiden sekä yrityksen ilmeen mukaisesti.",
        },
        {
          title: "Verkkosivujen toteutus",
          body: "Suunnitelman pohjalta rakennetaan toimiva ja responsiivinen verkkosivusto, joka toimii sujuvasti niin tietokoneilla kuin mobiililaitteillakin.",
        },
        {
          title: "Asiakkaan tarkistus ja palautteet",
          body: "Valmis luonnos esitellään asiakkaalle. Mahdolliset muutostoiveet käydään läpi ja toteutetaan ennen julkaisua.",
        },
        {
          title: "Julkaisu verkkoon",
          body: "Kun sivusto on hyväksytty, se julkaistaan valittuun verkkotunnukseen ja varmistetaan, että kaikki toimii moitteettomasti.",
        },
        {
          title: "Jatkuva tuki ja kehitys",
          body: "Julkaisun jälkeen Restadigi tarjoaa tarvittaessa ylläpitoa, päivityksiä ja kehityspalveluita, jotta verkkosivut pysyvät ajan tasalla ja tukevat yrityksen kasvua.",
        },
      ],
    },
  },
  visibility: {
    meta: {
      title: "Näkyvyys — Restadigi",
      description:
        "Diginäkyvyytesi kerralla kuntoon: AI-optimointi, Google-optimointi ja huippu-urheilun näkyvyyspaketti.",
      ogTitle: "Näkyvyys — Restadigi",
      ogDescription:
        "Kolme tapaa kasvattaa näkyvyyttä: AI-optimointi, Google-optimointi ja huippu-urheilun näkyvyyspaketti.",
    },
    hero: {
      brand: "Restadigi",
      headlineLine1: "Laitetaanko näkyvyydet",
      headlineLine2: "kerralla kuntoon?",
      searchPlaceholder: "Haku",
      searchAriaLabel: "Hae diginäkyvyydestä",
    },
    midBanner: {
      title: "Matkasi huippunäkyvyyksille alkaa tästä!",
      description:
        "Tutustu alta paketteihin, joilla nostat yrityksesi verkkonäkyvyyden uudelle tasolle.",
    },
    promo: "alk. 99€",
    promoLine1: "alk.",
    promoLine2: "99€",
    popular: "Suosittu",
    contactCta: "Ota yhteyttä",
    resultPrefix: "Saat:",
    explore: "Tutustu",
    packagesTitle: "Näkyvyyspaketit",
    packages: [
      {
        name: "AI-optimointi",
        tagline: "Näkyväksi myös ChatGPT:n, Clauden, Geminin ja Copilotin hauissa",
        summary:
          "Yhä useampi etsii palveluita tekoälyn kautta. Varmistamme, että yrityksesi tiedot ja sisältö tukevat näkyvyyttä ChatGPT:ssä, Claudessa, Geminissä ja Copilotissa — vuodesta toiseen.",
        description:
          "Verkkohaku on muuttumassa. Yhä useampi etsii yrityksiä, tuotteita ja palveluita keskustelemalla tekoälyn kanssa. AI-optimointipalvelumme auttaa varmistamaan, että yrityksesi tiedot ovat ajan tasalla ja että verkkosivustosi sisältö tukee tekoälypalveluiden kykyä tunnistaa yrityksesi oikeassa yhteydessä.",
        price: "alk. 99 € / vuosi",
        bullets: [
          "Yrityksen verkkosivujen perustason AI-näkyvyyden tarkistus",
          "Tärkeimpien yritystietojen läpikäynti",
          "Keskeisten sisältöjen ja metatietojen perusoptimoinnin suositukset",
          "Rakenteellisten puutteiden tunnistaminen",
          "Vuosittainen tarkistus ja päivitys",
        ],
        result: "Yrityksesi on mukana myös tulevaisuuden hauissa.",
      },
      {
        name: "Google-optimointi",
        tagline: "Varmista, että asiakkaat löytävät yrityksesi",
        summary:
          "Google on edelleen tärkein kanava, kun asiakas etsii yritystä. Pidämme sivustosi SEO-perusteet kunnossa vuosittain, jotta löydettävyys ei pääse rapistumaan.",
        description:
          "Google on edelleen yksi tärkeimmistä kanavista, kun etsitään yrityksiä, tuotteita ja palveluita. Google-optimointipalvelumme on kevyt vuosittainen ylläpitopalvelu, jonka tavoitteena on varmistaa, että verkkosivustosi täyttää tärkeimmät hakukoneoptimoinnin perusvaatimukset ja tukee asiakkaiden löydettävyyttä.",
        price: "alk. 99 € / vuosi",
        bullets: [
          "Verkkosivujen perustason SEO-tarkistus",
          "Sivujen otsikoiden ja metakuvausten läpikäynti",
          "Yrityksen tärkeimpien hakusanojen arviointi",
          "Teknisten perusasioiden tarkistus",
          "Kehitysehdotukset näkyvyyden parantamiseksi",
          "Vuosittainen tarkistus ja päivitys",
        ],
        result: "Yrityksesi näkyvyys Googlessa pysyy ajan tasalla.",
      },
      {
        name: "Huippu-urheilun näkyvyyspaketti",
        tagline: "Näkyvyyttä Suomen suosituimmissa urheilusarjoissa",
        summary:
          "Näkyvyyttä Liigan, Veikkausliigan ja Superpesiksen yhteydessä. Edullinen mikrokumppanuus tuo brändisi katsomoon, digikanaviin ja verkostoitumistilaisuuksiin.",
        description:
          "Huippu-urheilu tarjoaa yrityksille ainutlaatuisen mahdollisuuden tavoittaa asiakkaita, vahvistaa brändiään ja rakentaa luotettavaa yrityskuvaa. Tarjoamme edullisia mikrokumppanuuksia Liigan, Veikkausliigan ja Superpesiksen seurojen kanssa.",
        price: "alk. 299 € / vuosi",
        featured: true,
        bullets: [
          "Kentänlaita- ja LED-mainosnäkyvyyttä otteluissa",
          "Näkyvyyttä areenoiden mediatauluilla",
          "Yritysesittelyn tai logon seuran verkkosivuilla",
          "Näkyvyyttä seuran digitaalisissa kanavissa",
          "Kutsuja kumppanitapaamisiin ja verkostoitumistilaisuuksiin",
          "Ottelulippuja asiakkaille tai henkilöstölle",
          "VIP-palveluja ja ottelutapahtumaelämyksiä",
          "Muita seurakohtaisia kumppanuusetuja",
        ],
        result:
          "Ammattimainen kumppanuus, näkyvyyttä tuhansille katsojille ja positiivista urheiluimagoa.",
      },
      {
        name: "Graafinen suunnittelu",
        tagline: "Logo, flyerit, somepohjat ja tuntityö",
        summary:
          "Laadukas graafinen suunnittelu painoon ja digiin — selkeät hinnat ja ammattimainen lopputulos.",
        description:
          "Logo, käyntikortit, flyerit, verkkosivujen ulkoasu, somepohjat, rollupit ja tuntityö.",
        price: "alk. 99 €",
        bullets: [
          "Logon suunnittelu — 199 €",
          "Käyntikortti tai flyer/mainos — 99 €",
          "Verkkosivujen ulkoasu — alk. 399 €",
          "Somepohjat tai rollup — alk. 149 €",
          "Tuntityö — 49 €/h",
        ],
        result: "ammattimaisen ja modernin visuaalisen ilmeen yrityksellesi.",
      },
    ],
    footnote: "Hinnat ovat vuosihintoja. Maksat vain siitä, mitä tarvitset — ei piilokustannuksia.",
    branding: {
      titleBefore: "Graafinen ",
      titleAccent: "suunnittelu",
      titleAfter: "",
      description:
        "Laadukas graafinen suunnittelu auttaa yritystä erottumaan ja luomaan ammattimaisen ensivaikutelman. Restadigi-tiimi suunnittelee selkeitä, aikaa kestäviä ja yrityksesi ilmeeseen sopivia materiaaleja niin painoon kuin digitaalisiin kanaviin.",
      products: [
        {
          name: "Logon suunnittelu",
          description:
            "Logo on yrityksen tärkein visuaalinen tunnus. Suunnittelemme yksilöllisen ja toimialaasi sopivan logon, joka välittää oikean mielikuvan ja toimii monipuolisesti eri käyttökohteissa.",
          price: "199 €",
        },
        {
          name: "Käyntikortin suunnittelu",
          description:
            "Tyylikäs käyntikortti täydentää yrityksesi visuaalista ilmettä. Suunnittelemme sen logon ja yrityksen ilmeen mukaisesti, jotta kokonaisuus on yhtenäinen ja ammattimainen.",
          price: "99 €",
        },
        {
          name: "Yksisivuisen flyerin tai mainoksen suunnittelu",
          description:
            "Suunnittelemme selkeän ja näyttävän flyerin tai mainoksen, joka herättää kiinnostuksen ja välittää viestisi tehokkaasti. Soveltuu esimerkiksi tapahtumiin, kampanjoihin tai yritysesittelyihin.",
          price: "99 €",
        },
        {
          name: "Verkkosivujen ulkoasun suunnittelu",
          description:
            "Suunnittelemme modernin ja käyttäjäystävällisen verkkosivujen ulkoasun yrityksesi ilmeen mukaisesti. Hyvin suunniteltu ulkoasu tukee yrityksesi brändiä ja tekee verkkosivuista selkeät sekä helposti käytettävät.",
          price: "Alkaen 399 €",
        },
        {
          name: "Somepohjien suunnittelu Cursorilla",
          description:
            "Suunnittelemme valmiit sosiaalisen median pohjat, joiden avulla julkaisut pysyvät visuaalisesti yhtenäisinä ja helposti muokattavina. Pohjat nopeuttavat sisällöntuotantoa ja vahvistavat yrityksen brändiä.",
          price: "Alkaen 149 €",
        },
        {
          name: "Rollupin tai banderollin suunnittelu",
          description:
            "Suunnittelemme näyttävät rollupit ja banderollit messuille, tapahtumiin, myymälöihin ja muihin markkinointitilanteisiin. Lopputulos on selkeä, huomiota herättävä ja yrityksesi ilmeen mukainen.",
          price: "Alkaen 149 €",
        },
        {
          name: "Tuntityö",
          description:
            "Tarvitsetteko pienempiä graafisia muutoksia tai yksittäisiä suunnittelutöitä? Tiimimme tuntityö sopii esimerkiksi olemassa olevien materiaalien päivityksiin, kuvien muokkaukseen, taittotöihin tai muihin graafisiin tehtäviin.",
          price: "49 €/h",
        },
      ],
      billing: {
        title: "Laskutuksesta",
        intro:
          "Noudatamme töissämme ennakkomaksukäytäntöä, jossa osa työstä veloitetaan jo ennen projektin alkua, kun tarjous on kirjallisesti hyväksytty. Tällä sitoutetaan sekä tilaaja että toimittaja projektiin.",
        providerLead: "Restadigi Finland -palvelun laskutuksesta Suomessa vastaa Laskuttamo.",
        providerName: "Laskuttamo",
        providerEmail: "asiakaspalvelu@laskuttamo.com",
        providerPhone: "02 0730 6710",
        providerHours: "ma–pe 8:00–16:00",
        providerSiteLabel: "laskuttamo.com",
        providerSiteUrl: "https://laskuttamo.com/",
        providerAddressNote: "Yhteystiedot ja osoitteet löytyvät Laskuttamon sivuilta.",
        groundsTitle: "Miksi ennakkomaksu?",
        groundsBody: [
          "Kun projekti käynnistyy, varaamme sille kalenteriaikaa. Jos tilaus peruuntuu kesken kaiken tai yhteydenpito katkeaa, menetämme mahdollisuuden ottaa muita toimeksiantoja samalle jaksolle. Ennakkomaksu toimii siksi varauksena, joka vahvistaa asiakkaan sitoutumisen.",
          "Luovassa työssä lopputulos — kuten logo tai visuaalinen ilme — syntyy usein vasta prosessin aikana. Ilman ennakkoa voisimme jäädä tilanteeseen, jossa lasku jää maksamatta, asiakas katoaa tai projekti keskeytyy. Pelkkä loppulaskutus voisi myös tarkoittaa viikkojen tai kuukausien työtä ilman kassavirtaa. Ennakkomaksu keventää näitä riskejä ja varmistaa, että saamme ainakin osan korvauksesta jo tehdystä työstä.",
        ],
      },
      form: {
        title: "Pyydä tarjous graafisen suunnittelun työstä",
        name: "Nimi",
        email: "Sähköposti",
        phone: "Puhelinnumero",
        submit: "Lähetä tarjouspyyntö",
        sending: "Avataan sähköposti…",
        mailSubject: "Tarjouspyyntö: graafinen suunnittelu — {name}",
        mailBody:
          "Nimi: {name}\nSähköposti: {email}\nPuhelin: {phone}\n\nPyydän tarjousta graafisen suunnittelun työstä.",
      },
    },
    cta: {
      titleBefore: "Haluatko paremman ",
      titleAccent: "näkyvyyden",
      titleAfter: "?",
      button: "Kysy näkyvyyspaketista",
    },
  },
  chatbot: {
    meta: {
      title: "Restachat — Restadigi",
      description:
        "Restachat — älykäs chatbot verkkosivustollesi. Palvelee asiakkaita 24/7, vastaa kysymyksiin, kerää liidejä ja vapauttaa henkilökunnan.",
      ogTitle: "Restachat — Restadigi",
      ogDescription: "Restachat — ympärivuorokautinen myynti ja asiakaspalvelu chatissa.",
    },
    hero: {
      titleBefore: "",
      titleAccent: "Restachat",
      titleAfter: " — älykäs asiakaspalvelu.",
      description:
        "Restachat asennetaan verkkosivuillesi ja palvelee asiakkaita ympäri vuorokauden — vastaa kysymyksiin, ohjaa oikeiden palveluiden pariin ja kerää liidejä.",
      headlineLine1: "Yrityksesi halvin työntekijä",
      headlineLine2: "on tässä.",
      subtitle: "Tutustu Restachatin personoitavaan chatbottiin.",
      cta: "Tutustu Restachatiin",
    },
    chatbot: {
      eyebrow: "Restachat",
      titleBefore: "Älykäs ",
      titleAccent: "Restachat",
      titleAfter: " — ympärivuorokautinen myyjä ja asiakaspalvelija.",
      intro:
        "Restachat on verkkosivuille asennettava älykäs virtuaaliavustaja, joka palvelee asiakkaita 24/7 — vastaa yleisiin kysymyksiin, opastaa oikeiden palveluiden pariin ja kerää liidejä. Se ei korvaa ihmistä, vaan toimii luotettavana apukätenä silloinkin, kun oma henkilökuntasi on vapaalla.",
      benefits: [
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
      ],
      safeTitleBefore: "Turvallinen ja ",
      safeTitleAccent: "vaivaton",
      safeTitleAfter: " ratkaisu.",
      safeBody:
        "Jotta chatbot tuottaa tulosta vuodesta toiseen, se vaatii jatkuvaa huolenpitoa. Kuukausimaksullinen palvelumalli varmistaa, että botti kehittyy ja toimii saumattomasti yrityksen muuttuvan datan ja teknologian mukana — päivitämme alustan turvalliseksi, koulutamme botin uusilla tuotetiedoilla ja kampanjoilla, analysoimme keskusteluja ja optimoimme vastauksia. Sinun ei tarvitse huolehtia teknisestä ylläpidosta: asiantuntijamme pitävät huolen, että botti palvelee asiakkaitasi luotettavasti kuukausi toisensa perään.",
      monthly: [
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
      ],
    },
    cta: {
      titleBefore: "Palvele paremmin. Kerää liidejä. ",
      titleAccent: "Kasva tehokkaammin.",
      body: "Restadigi kehittää digitaalisia ratkaisuja palvelualan yrityksille. Chatbot auttaa parantamaan asiakaskokemusta, tehostamaan toimintaa ja kasvattamaan myyntiä helposti käyttöönotettavalla tekoälyratkaisulla.",
      questions: [
        "Mitkä ovat yleisimmät kysymykset, joita asiakkaanne esittävät?",
        "Haluatteko botin keskittyvän enemmän asiakaspalveluun vai myyntiin ja liidien keruuseen?",
        "Millä kielillä haluatte botin palvelevan kävijöitä?",
      ],
      price: "29 € / kk",
      priceNote: "Kiinteä kuukausihinta",
      button: "Pyydä maksuton esittely",
    },
  },
  booking: {
    meta: {
      title: "Restatable — Restadigi",
      description:
        "Restatable — moderni pöytävarausjärjestelmä majoitus-, matkailu- ja ravintola-alalle sekä palvelualan yrityksille.",
      ogTitle: "Restatable — Restadigi",
      ogDescription: "Pöytävaraukset kanavilta ja saliin — Restatable.",
    },
    brand: {
      name: "Restatable",
      titleBefore: "Varauspalvelut ",
      titleAccent: "yhdellä brändillä",
      titleAfter: ".",
      body: "Restatable tarjoaa graafisen pöytävarausjärjestelmän majoitus-, matkailu- ja ravintola-alan toimijoille sekä palvelualan pienille ja keskisuurille yrityksille.",
    },
    restatable: {
      badge: "Restatable",
      titleBefore: "Pöytävaraukset ",
      titleAccent: "kanavilta ja saliin",
      titleAfter: ".",
      body: "Restatable on graafinen pöytävarausjärjestelmä ravintoloille ja palveluyrityksille. Vastaanota varauksia Googlesta ja sosiaalisesta mediasta, hallitse salia pöytäkartalla ja anna vieraiden muokata varauksiaan itse — kuten Ravintola Kajin esimerkissä.",
      exampleLabel: "Esimerkki: Ravintola Kaj",
    },
    restachat: {
      badge: "Restatable · chat",
      titleBefore: "",
      titleAccent: "Pöytävaraukset",
      titleAfter: " suoraan sivustolta.",
      description:
        "Integroimme ravintolasi verkkosivuille modernin pöytävarauspalvelun, joka toimii ympäri vuorokauden. Asiakas valitsee ajan ja seurueen koon, saa vahvistuksen sähköpostiin ja henkilökuntasi näkee varaukset selkeästä hallintapaneelista.",
      headlineLine1: "Asiakkaat varaavat pöydän",
      headlineLine2: "itse — 24/7.",
      subtitle: "Tutustu Restableen ja kokeile varausbottia.",
      shopHeadline: "Kauppa ei nuku",
      shopBody:
        "Ota pöytävaraukset vastaan digitaalisesti 24/7 Restadigin online-pöytävarausjärjestelmällä. Asiakkaasi voivat tehdä varauksen helposti joko verkkosivuille upotetun varausjärjestelmän tai älykkään pöytävarauschatbotin kautta – juuri silloin, kun heille parhaiten sopii. Tarvittaessa suunnittelemme palvelulle myös täysin oman, yrityksesi ilmeen mukaisen varaussivun.",
      tryLabel: "Testaa pöytävarauksen tekemistä Restadigin chatbotilla!",
    },
    channels: {
      eyebrow: "Kanavat",
      titleBefore: "Varaa suoraan ",
      titleAccent: "suosittujen verkkokanavien",
      titleAfter: " kautta.",
      body: "Tee varaamisesta helppoa siellä, missä asiakkaasi ovat. Vastaanota suoria varauksia Googlesta, Instagramista ja Facebookista sekä tavoita enemmän uusia asiakkaita.",
      items: ["Google", "Instagram", "Facebook"],
      mock: {
        name: "Ravintola Kaj",
        category: "Moderni nordic",
        status: "Auki",
        rating: "4,9",
        reviews: "(248)",
        priceLevel: "€€€",
        blurb:
          "Kaj tarjoaa sesongin raaka-aineita avotulen tunnelmassa. Varaa pöytä suoraan Google-profiilista — ilman puhelinsoittoa.",
        reserve: "Varaa pöytä",
        call: "Soita",
        directions: "Reitti",
        save: "Tallenna",
        website: "Sivusto",
      },
    },
    guestManage: {
      eyebrow: "Asiakkaan hallinta",
      titleBefore: "Peruutukset ja ",
      titleAccent: "varausten muutokset",
      titleAfter: ".",
      body: "Vieraat voivat peruuttaa tai muokata varauksiaan helposti itse selkeän ja käyttäjäystävällisen varaushallinnan kautta. Vaivaton asiointi parantaa asiakaskokemusta ja vähentää henkilökunnan työmäärää.",
      items: ["Peruuta varaus", "Muokkaa varausta"],
    },
    experience: {
      eyebrow: "Mukautetut näkymät",
      titleBefore: "Paranna ",
      titleAccent: "varauskokemustasi",
      titleAfter: "!",
      body: "Mukauta näkymääsi kaavion, listan tai pöytäkartan avulla. Selkeä ja intuitiivinen järjestelmä helpottaa aikataulujen hallintaa — samalla kun salin tilanne näkyy yhdellä silmäyksellä.",
      views: ["Pöytäkartanäkymä", "Aikajananäkymä", "Luettelonäkymä"],
    },
    integration: {
      eyebrow: "Integrointi",
      titleBefore: "Saumaton ",
      titleAccent: "integrointi",
      titleAfter: ".",
      body: "Teemme varaamisen helpoksi integroimalla Restablen palvelun ravintolasi sivustoon ja digikanaviin. Sosiaalisesta mediasta Googleen ja sähköpostivahvistuksiin — Restatable toimii siellä, mistä asiakkaat löytävät teidät.",
      logos: ["Google", "Instagram", "Facebook", "Sähköposti", "Oma sivusto", "Kalenteri"],
    },
    dashboard: {
      eyebrow: "Restatable",
      titleBefore: "Ravintolan ",
      titleAccent: "online-varausjärjestelmä",
      titleAfter: ".",
      body: "Restatable on intuitiivinen all-in-one-varausjärjestelmä ravintoloille. Hallitse varauksia ja liiketoimintaa pöytä pöydältä — selkeästi yhdessä näkymässä.",
      ctaPrimary: "Pyydä esittely",
      ctaSecondary: "Varaa maksuton demo",
      ctaNote: "Kiinteä kuukausihinta. Ei piilokuluja.",
    },
    floorPlan: {
      eyebrow: "Pöytäkartta kaikilla laitteilla",
      titleBefore: "Sali ",
      titleAccent: "kartalla",
      titleAfter: " — mobiilista isoon näyttöön.",
      body: "Kustomoitu pöytäkartta ravintolan asiakaspaikkojen mukaan. Sama Restatable-näkymä toimii puhelimella, tabletilla ja ravintolan isolla näytöllä.",
    },
    features: [
      {
        title: "Varaukset 24/7",
        body: "Asiakkaat voivat varata pöydän silloin kun heille sopii — ilman puhelinsoittoja.",
      },
      {
        title: "Vähemmän no-showta",
        body: "Automaattiset vahvistukset ja muistutukset vähentävät saapumatta jäämisiä.",
      },
      {
        title: "Selkeä hallinta",
        body: "Näet päivän varaukset yhdellä silmäyksellä ja voit muokata saatavuutta helposti.",
      },
      {
        title: "Kanavat & järjestelmä",
        body: "Varaukset Googlesta, Instagramista ja Facebookista sekä graafinen pöytäkartta — yksi Restatable-järjestelmä.",
      },
    ],
    cta: {
      titleBefore: "Ota ",
      titleAccent: "Restatable",
      titleAfter: " käyttöön.",
      price: "39 € / kk",
      priceNote: "Kiinteä kuukausihinta Restablen pöytävarauspalvelulle",
      button: "Kysy lisää",
    },
    demo: {
      sectionEyebrow: "Restatable · tuote-esittely",
      sectionTitleBefore: "Näin asiakas ",
      sectionTitleAccent: "varaa pöydän",
      sectionTitleAfter: " sivustoltasi.",
      sectionBody:
        "Alla on Restablen esimerkkinäkymä (Ravintola Kaj). Hallintapaneelissa voit muokata nimeä, aikoja ja tekstejä suomeksi, englanniksi ja espanjaksi. Demotiedot eivät tallennu.",
      bannerEyebrow: "Restatable — tuote-esittely",
      bannerBody:
        "Tämä varauspolku esittelee Restablen pöytävarausta. Täytetyt tiedot ovat vain esimerkki — niitä ei tallenneta. Oikeassa toteutuksessa varaukset menevät hallintapaneeliin.",
      liveBadge: "Demo",
      stepperAria: "Varauksen vaiheet",
      stepInfo: "Tyyppi",
      stepGuests: "Henkilöt",
      stepDate: "Päivä",
      stepTime: "Aika",
      stepConfirm: "Vahvista",
      infoTitle: "Valitse varaustyyppi",
      infoBody:
        "Aloita valitsemalla sopiva vaihtoehto. Tekstit ja tyypit asetetaan hallintapaneelissa.",
      guestsTitle: "Montako henkilöä?",
      guestsLabel: "henkilöä",
      continue: "Jatka",
      back: "Takaisin",
      prevMonth: "Edellinen kuukausi",
      nextMonth: "Seuraava kuukausi",
      prevDay: "Edellinen päivä",
      nextDay: "Seuraava päivä",
      noSlots: "Ei vapaita aikoja tälle päivälle.",
      confirmTitle: "Vahvista varaus",
      place: "Paikka",
      type: "Tyyppi",
      when: "Päivä ja aika",
      normalType: "Normaali varaus",
      name: "Nimi",
      phone: "Puhelin",
      email: "Sähköposti",
      comment: "Kommentti",
      termsFallback: "Hyväksyn ehdot. Tämä on demo — tietoja ei tallenneta.",
      submit: "Lähetä varaus",
      sending: "Lähetetään…",
      successTitle: "Kiitos — demo valmis!",
      successBody:
        "Oikeassa toteutuksessa asiakas saisi vahvistuksen sähköpostiin ja varaus näkyisi hallintapaneelissa. Tässä demossa mitään ei tallennettu.",
      tryAgain: "Kokeile uudelleen",
    },
  },
  stayBooking: {
    meta: {
      title: "Restabooking — majoitusvarauspalvelu — Restadigi",
      description:
        "Restabooking: majoitusvaraukset, aktiviteetit, elämykset, tapahtumat ja ryhmävaraukset yhdessä järjestelmässä.",
      ogTitle: "Restabooking — majoitusvaraus — Restadigi",
      ogDescription: "Kaikki varaukset yhdessä järjestelmässä — hotelleille, majataloille, mökeille ja lomakeskuksille.",
    },
    hero: {
      eyebrow: "Restabooking",
      title: "Kaikki varaukset yhdessä järjestelmässä.",
      paragraphs: [
        "RestaBooking on monipuolinen varausjärjestelmä hotelleille, majataloille, mökeille, lomakeskuksille ja muille majoitusliikkeille. Samalla järjestelmällä hallitset majoitusvaraukset, aktiviteetit, elämykset, tapahtumat ja ryhmävaraukset helposti yhdestä paikasta.",
        "Automatisoitu varausprosessi vähentää manuaalista työtä ja pitää saatavuuden sekä varauskalenterin aina ajan tasalla. Asiakkaasi voivat tehdä varauksia verkossa vuorokauden ympäri, mikä parantaa asiakaskokemusta ja auttaa kasvattamaan myyntiä.",
        "Selkeä käyttöliittymä tekee päivittäisestä hallinnasta sujuvaa niin pienille majoitusyrityksille kuin suuremmillekin kohteille. Olipa kyse hotellihuoneista, mökeistä, ohjelmapalveluista, tapahtumista tai ryhmien majoituksesta, RestaBooking kokoaa kaiken yhteen helppokäyttöiseen järjestelmään.",
        "Tarjoa asiakkaillesi vaivaton varauskokemus ja hallitse koko liiketoimintaasi tehokkaasti yhdellä modernilla alustalla.",
      ],
      cta: "Kysy lisää",
    },
    panelFeatures: {
      eyebrow: "Hallintapaneeli",
      titleBefore: "Kaikki toiminnot ",
      titleAccent: "yhdessä paneelissa",
      titleAfter: ".",
      body: "Restabooking-hallintapaneeli kokoaa majoituksen, varaukset, aktiviteetit ja laskutuksen samaan näkymään — ilman erillisiä järjestelmiä.",
      coreTitle: "Keskeiset toiminnot",
      coreItems: [
        "Majoituksenhallintajärjestelmä (PMS)",
        "Varauskalenteri",
        "Suora varausmoottori",
        "Lisäpalvelut",
        "Paketit",
        "Monituotevarauspolku",
        "Majoituksen hallinta",
        "Asiakashallinta",
        "Laskutus",
      ],
      activitiesTitle: "Aktiviteetit ja ohjelmapalvelut",
      activitiesItems: [
        "Aktiviteetti- ja ohjelmajärjestelmä",
        "Experience Designer",
        "Tuntipohjaiset tuotteet",
        "Resurssien saatavuuden hallinta",
        "Opastettujen elämysten varaukset",
        "Välinevuokraus",
        "Yhdistetyt majoitus + aktiviteetti -varaukset",
      ],
      calendarTitle: "Varauskalenteri",
      phoneTitle: "Päivän varaukset",
      activeNav: "Varauskalenteri",
    },
    pillarsHeading: {
      titleBefore: "Majoitusliiketoiminta ",
      titleAccent: "yhdessä näkymässä",
      titleAfter: ".",
    },
    pillars: [
      {
        title: "Property Management System",
        tagline: "Hallitse koko majoitusliiketoimintaasi yhdestä järjestelmästä",
        body: "Restadigin Property Management System kokoaa majoitusliiketoiminnan tärkeimmät toiminnot saman järjestelmän alle. Hallitse majoitusvaraukset, käyttöaste, huoneet, siivous, huolto, laskutus ja asiakasviestintä helposti yhdestä näkymästä. Automatisoidut työvaiheet vähentävät manuaalista työtä, tehostavat henkilökunnan arkea ja varmistavat sujuvan asiakaskokemuksen aina varauksesta uloskirjautumiseen.",
      },
      {
        title: "Aktiviteetit, elämykset ja lisäpalvelut",
        tagline: "Kasvata myyntiä tarjoamalla enemmän jokaiselle asiakkaalle",
        body: "Restadigin järjestelmällä myyt helposti aktiviteetteja, elämyksiä, välinevuokrausta, saunavuoroja, opastuksia, tapahtumia ja muita lisäpalveluita samassa varausprosessissa. Älykäs myyntiratkaisu mahdollistaa lisäpalveluiden tarjoamisen ennen varausta, sen aikana tai vierailun yhteydessä. Näin kasvatat lisämyyntiä, helpotat palveluiden hallintaa ja tarjoat asiakkaillesi entistä monipuolisemman elämyksen.",
      },
      {
        title: "Verkkokauppa ja online-varaukset",
        tagline: "Myy majoitukset, elämykset ja palvelut helposti verkossa",
        body: "Restadigin verkkokauppa yhdistää majoituksen, aktiviteetit, lisäpalvelut ja valmiit palvelupaketit yhdeksi sujuvaksi varauskokonaisuudeksi. Voit luoda erilaisia varauspolkuja esimerkiksi perheille, yrityksille ja ryhmille sekä tarjota juuri oikeat lisäpalvelut ja hinnat jokaiselle asiakasryhmälle. Selkeä varausprosessi parantaa asiakaskokemusta ja auttaa kasvattamaan myyntiä.",
      },
      {
        title: "Kokoukset, tapahtumat ja ryhmävaraukset",
        tagline: "Hallitse suuremmat varaukset vaivattomasti",
        body: "Restadigin järjestelmällä hoidat kokoustilat, tapahtumat, ryhmävaraukset ja majoituskiintiöt yhdestä paikasta. Hallitse aikatauluja, osallistujia, tarjoiluja ja lisäpalveluita helposti samalla järjestelmällä, jolloin koko varausprosessi pysyy selkeänä sekä henkilökunnalle että asiakkaillesi. Automatisoidut työkalut vähentävät manuaalista työtä ja tekevät ryhmien sekä tapahtumien hallinnasta sujuvaa.",
      },
    ],
    dashboard: {
      eyebrow: "Hallintapaneeli",
      titleBefore: "Varaukset ",
      titleAccent: "kalenterissa",
      titleAfter: " ja listalla.",
      body: "Henkilökunta näkee saapumiset, lähdöt ja majoitusvaraukset tabletilla tai näytöllä — vahvista, peruuta ja seuraa käyttöastetta yhdellä silmäyksellä.",
    },
    rooms: {
      eyebrow: "Huonekartta",
      titleBefore: "Huoneiden ",
      titleAccent: "tilanne",
      titleAfter: " — mobiilista isoon näyttöön.",
      body: "Selkeä näkymä huoneisiin: vapaa, varattu, saapuu tai lähtee. Sama näkymä toimii puhelimella, tabletilla ja vastaanoton näytöllä.",
    },
    cta: {
      titleBefore: "Ota ",
      titleAccent: "majoitusvaraukset",
      titleAfter: " haltuun.",
      price: "45 € / kk",
      priceNote: "Kiinteä kuukausihinta Restabooking-majoitusvaraukselle",
      button: "Kysy lisää",
    },
    demo: {
      sectionEyebrow: "Tuote-esittely · Restabooking",
      sectionTitleBefore: "Näin vieras ",
      sectionTitleAccent: "varaa majoituksen",
      sectionTitleAfter: " sivustoltasi.",
      sectionBody:
        "Alla on esimerkki Hotelli Aavasta — keksitty demokohde. Voit muokata tekstejä hallintapaneelissa suomeksi, englanniksi ja espanjaksi. Demotiedot eivät tallennu.",
      bannerEyebrow: "Restadigi Restabooking — tuote-esittely",
      bannerBody:
        "Tämä varauspolku esittelee majoitusvarausta. Tiedot ovat esimerkki — niitä ei tallenneta. Oikeassa toteutuksessa varaukset menevät hallintapaneeliin.",
      liveBadge: "Demo",
      stepperAria: "Majoitusvarauksen vaiheet",
      stepRoom: "Huone",
      stepGuests: "Vieraat",
      stepCheckIn: "Saapuminen",
      stepNights: "Yöt",
      stepConfirm: "Vahvista",
      roomTitle: "Valitse huonetyyppi",
      roomBody: "Aloita valitsemalla sopiva huone — asetukset tulevat hallintapaneelista.",
      guestsTitle: "Montako vierasta?",
      guestsLabel: "vierasta",
      checkInTitle: "Valitse saapumispäivä",
      nightsTitle: "Montako yötä?",
      nightsLabel: "yötä",
      checkIn: "Saapuminen",
      checkOut: "Lähtö",
      continue: "Jatka",
      back: "Takaisin",
      prevMonth: "Edellinen kuukausi",
      nextMonth: "Seuraava kuukausi",
      confirmTitle: "Vahvista majoitusvaraus",
      place: "Kohde",
      room: "Huone",
      stay: "Majoitus",
      standardRoom: "Standard-huone",
      name: "Nimi",
      phone: "Puhelin",
      email: "Sähköposti",
      comment: "Kommentti / toiveet",
      termsFallback: "Hyväksyn ehdot. Tämä on demo — tietoja ei tallenneta.",
      submit: "Lähetä varaus",
      sending: "Lähetetään…",
      successTitle: "Kiitos — demo valmis!",
      successBody:
        "Oikeassa toteutuksessa vieras saisi vahvistuksen sähköpostiin ja varaus näkyisi hallintapaneelissa. Tässä demossa mitään ei tallennettu.",
      tryAgain: "Kokeile uudelleen",
    },
  },
  hosting: {
    meta: {
      title: "Ylläpito — Restadigi",
      description:
        "Hosting- ja ylläpitopaketit yrityksille — nopea hosting Suomessa, domain, SSL ja jatkuva tuki.",
      ogTitle: "Ylläpito — Restadigi",
      ogDescription: "Hosting- ja ylläpitopaketit: Basic ja Pro Business.",
    },
    hero: {
      titleBefore: "Kotimainen ",
      titleAccent: "hosting",
      titleAfter: "",
      description:
        "Pidämme sivustosi nopeana, turvallisena ja ajan tasalla. Valitse sopiva hosting- ja ylläpitopaketti — domain ja SSL sisältyvät hintaan.",
      features: [
        "Nopea hosting Suomessa",
        "Domain ja SSL sisältyvät",
        "Hallinta suomeksi",
        "Palvelimet Helsingissä",
        "Säännölliset päivitykset ja tuki",
        "Selkeä kiinteä kuukausihinta",
      ],
      askCta: "Kysy lisää",
    },
    popular: "Suosittu",
    requestQuote: "Pyydä tarjous",
    explore: "Tutustu",
    packagesTitle: "Hosting-paketit",
    packages: [
      {
        name: "Basic",
        summary:
          "Nopea hosting Suomessa domainin ja SSL:n kanssa. Sopii, kun tarvitset luotettavan perustason ylläpidon sivustollesi ilman ylimääräisiä palveluita.",
        price: "11,90 € / kk + alv (laskutetaan vuosittain)",
        bullets: [
          "Hosting ja verkkotunnus sisältyvät hintaan",
          "Nopea ja luotettava hosting Suomessa",
          "SSL-sertifikaatti (HTTPS) sisältyy",
          "Domain (.fi tai muu) sisältyy hintaan",
        ],
      },
      {
        name: "Pro Business",
        summary:
          "Hostingin lisäksi jatkuva ylläpito, pienet sisältömuutokset ja henkilökohtainen tuki. Valitse tämä, kun sivuston pitää pysyä ajan tasalla ja apua on saatavilla tarvittaessa.",
        price: "29,90 € / kk + alv",
        featured: true,
        bullets: [
          "Hosting ja verkkotunnus sisältyvät hintaan",
          "Nopea ja luotettava hosting Suomessa",
          "SSL-sertifikaatti (HTTPS) sisältyy",
          "Domain (.fi tai muu) sisältyy hintaan",
          "Sähköpostiosoitteet sisältyvät",
          "Jatkuva ylläpito ja päivitykset",
          "Pienet sisältömuutokset sisältyvät",
          "Tietoturvapäivitykset",
          "AI-asiakaspalvelun ja/tai varauspalvelun tuki ja kehitys",
          "Henkilökohtainen tuki puhelimitse",
        ],
      },
    ],
    footnote:
      "Basic-paketti laskutetaan vuosittain (11,90 € / kk). Pro Business laskutetaan kuukausittain. Domain ja SSL-sertifikaatti sisältyvät hintaan.",
  },
  widget: {
    sales: {
      openLabel: "Asiakaspalvelu",
      closeLabel: "Sulje",
      openAria: "Avaa Resta-AI asiakaspalvelu",
      closeAria: "Sulje asiakaspalvelu",
      dialogAria: "Resta-AI asiakaspalvelu",
      eyebrow: "RESTADIGI",
      title: "Resta-AI",
      welcome:
        "Hei! 👋 Olen Resta-AI ja autan sinua löytämään yrityksellesi sopivat digiratkaisut.\n\nKerro lyhyesti yrityksestäsi tai siitä, mitä etsit, niin suosittelen sinulle sopivia vaihtoehtoja. Voit kysyä esimerkiksi verkkosivupaketeista, AI-asiakaspalvelusta tai muista palveluistamme.\n\nHalutessasi voit jättää myös puhelinnumerosi ja sähköpostiosoitteesi, niin otamme sinuun yhteyttä toivomallasi tavalla.\n\nHuomioithan, että olen tekoälyavustaja ja kehityn jatkuvasti.",
      placeholder: "Kirjoita kysymyksesi tästä…",
      sendAria: "Lähetä viesti",
      resetAria: "Aloita keskustelu uudelleen",
      typing: "Kirjoittaa…",
      sendFailed: "Viestin lähetys epäonnistui.",
      genericError: "Tapahtui virhe.",
      quickReplies: [
        { label: "Verkkosivupaketit", message: "Kerro verkkosivupaketeistanne." },
        { label: "AI-asiakaspalvelu", message: "Kerro AI-asiakaspalvelusta." },
        { label: "Hinnasto", message: "Mitä palvelut maksavat?" },
        { label: "Jätä yhteystiedot", message: "Haluan jättää puhelinnumeron ja sähköpostin." },
      ],
    },
    booking: {
      openLabel: "Varaa pöytä",
      closeLabel: "Sulje chat",
      openAria: "Avaa pöytävaraus",
      closeAria: "Sulje pöytävaraus",
      dialogAria: "Ravintolan pöytävaraus",
      eyebrow: "Pöytävaraus",
      title: "Varaa pöytä",
      welcome:
        "Hei! 👋 Tervetuloa Restadigille.\n\nHaluaisitko varata pöydän ravintolaamme? Olen Resta-AI, ja autan sinua tekemään varauksen.\n\nRavintolamme on avoinna päivittäin klo 12–24, ja pöytävarauksia voi tehdä klo 12–22 väliselle ajalle.\n\nKerro minulle:\n\n    nimesi\n    seurueen henkilömäärä\n    varauspäivä ja kellonaika\n    puhelinnumerosi\n    sähköpostiosoitteesi (varausvahvistusta varten)\n\nNormaali pöytävarauksen kesto on 2 tuntia. Tarvittaessa myös 3 tunnin varaus onnistuu pyynnöstä.",
      placeholder: "Kirjoita viestisi…",
      sendAria: "Lähetä viesti",
      typing: "Kirjoittaa…",
      sendFailed: "Viestin lähetys epäonnistui.",
      genericError: "Tapahtui virhe.",
    },
  },
};
