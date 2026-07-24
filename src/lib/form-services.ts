/** Service catalog for the public intake form (Finnish, prices + alv noted in UI). */

export type FormServiceOption = {
  id: string;
  name: string;
  price: string;
  blurb: string;
  group: "website" | "visibility" | "branding" | "ai" | "booking" | "hosting";
  exclusiveGroup?: "website" | "hosting";
};

export const FORM_SERVICE_OPTIONS: FormServiceOption[] = [
  {
    id: "website-start",
    group: "website",
    exclusiveGroup: "website",
    name: "Verkkosivut · Start",
    price: "399 € + alv",
    blurb: "1–3 sivua, 1–2 sähköpostia, hallintapaneeli, perus-SEO.",
  },
  {
    id: "website-plus",
    group: "website",
    exclusiveGroup: "website",
    name: "Verkkosivut · Plus",
    price: "549 € + alv",
    blurb: "4–6 sivua, 1–3 sähköpostia — selkeä kokonaisuus palveluille.",
  },
  {
    id: "website-kulta",
    group: "website",
    exclusiveGroup: "website",
    name: "Verkkosivut · Kulta",
    price: "759 € + alv",
    blurb: "7–9 sivua, 1–5 sähköpostia + AI-asiakaspalvelu 1 vuodeksi.",
  },
  {
    id: "website-timantti",
    group: "website",
    exclusiveGroup: "website",
    name: "Verkkosivut · Timantti",
    price: "929 € + alv",
    blurb: "Yli 10 sivua, 1–10 sähköpostia + AI + varauspalvelu 1 vuodeksi.",
  },
  {
    id: "ai-optimointi",
    group: "visibility",
    name: "AI-optimointi",
    price: "alk. 99 € / vuosi",
    blurb: "Näkyvyys ChatGPT:ssä, Claudessa, Geminissä ja Copilotissa.",
  },
  {
    id: "google-optimointi",
    group: "visibility",
    name: "Google-optimointi",
    price: "alk. 99 € / vuosi",
    blurb: "Vuosittainen SEO-ylläpito ja löydettävyyden tarkistus.",
  },
  {
    id: "huippu-urheilu",
    group: "visibility",
    name: "Huippu-urheilun näkyvyyspaketti",
    price: "alk. 299 € / vuosi",
    blurb: "Liiga / Veikkausliiga / Superpesis -tyylinen mikropartneruus.",
  },
  {
    id: "branding-ilme",
    group: "branding",
    name: "Yritysilme (logo + käyntikortit)",
    price: "alk. 199 €",
    blurb: "Yhtenäinen visuaalinen ilme yrityksellesi.",
  },
  {
    id: "branding-mainos",
    group: "branding",
    name: "Mainos- ja markkinointimateriaalit",
    price: "alk. 149 €",
    blurb: "Some- ja printtimateriaalit myynnin tueksi.",
  },
  {
    id: "branding-logo",
    group: "branding",
    name: "Logon suunnittelu",
    price: "alk. 149 €",
    blurb: "Uusi tai päivitetty logo.",
  },
  {
    id: "branding-cards",
    group: "branding",
    name: "Käyntikortit",
    price: "alk. 99 €",
    blurb: "Painovalmis käyntikorttisuunnittelu.",
  },
  {
    id: "ai-chatbot",
    group: "ai",
    name: "AI-asiakaspalvelu (chatbot)",
    price: "alk. 199 € / vuosi",
    blurb: "24/7 vastaukset, liidit ja ylläpito sisältyvät.",
  },
  {
    id: "poytavaraupalvelu",
    group: "booking",
    name: "Pöytävarauspalvelu",
    price: "alk. 299 € / vuosi",
    blurb: "Varaukset sivuilta, hallinta ja pöytäkartta.",
  },
  {
    id: "hosting-basic",
    group: "hosting",
    exclusiveGroup: "hosting",
    name: "Hosting · Basic",
    price: "11,90 € / kk + alv",
    blurb: "Hosting, domain ja SSL — laskutus vuosittain.",
  },
  {
    id: "hosting-pro",
    group: "hosting",
    exclusiveGroup: "hosting",
    name: "Hosting · Pro Business",
    price: "29,99 € / kk + alv",
    blurb: "Ylläpito, sähköpostit, tuki ja AI/varauspalvelun tuki.",
  },
];

export const FORM_SERVICE_GROUPS: {
  id: FormServiceOption["group"];
  title: string;
  hint: string;
  multi: boolean;
}[] = [
  {
    id: "website",
    title: "Verkkosivupaketti",
    hint: "Valitse yksi paketti, tai jätä tyhjäksi jos tarvitset vain muita palveluita.",
    multi: false,
  },
  {
    id: "visibility",
    title: "Diginäkyvyys",
    hint: "Voit valita useita.",
    multi: true,
  },
  {
    id: "branding",
    title: "Graafinen suunnittelu",
    hint: "Voit valita useita.",
    multi: true,
  },
  {
    id: "ai",
    title: "AI-asiakaspalvelu",
    hint: "Chatbot sivuille — 24/7.",
    multi: true,
  },
  {
    id: "booking",
    title: "Varauspalvelu",
    hint: "Ravintoloiden pöytävaraukset.",
    multi: true,
  },
  {
    id: "hosting",
    title: "Hosting & ylläpito",
    hint: "Valitse yksi, jos tarvitset domainin ja ylläpidon meiltä.",
    multi: false,
  },
];

export const INDUSTRY_OPTIONS = [
  "Ravintola / kahvila",
  "Hotelli / majoitus",
  "Parturi / kauneus",
  "Aktiviteetit / elämys",
  "Urheilu / seura",
  "Yritys / B2B",
  "Yhdistys",
  "Muu",
] as const;

export const TIMELINE_OPTIONS = [
  "Mahdollisimman pian",
  "1–2 viikkoa",
  "1 kuukausi",
  "2–3 kuukautta",
  "En ole varma",
] as const;

export const BUDGET_OPTIONS = [
  "Alle 500 €",
  "500–1000 €",
  "1000–2000 €",
  "Yli 2000 €",
  "Keskustellaan",
] as const;
