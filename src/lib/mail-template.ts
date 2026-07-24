/** Shared Finnish mail template defaults + placeholders (safe for client + server). */

export const MAIL_TEMPLATE_IDS = ["default", "cold", "order", "free"] as const;
export type MailTemplateId = (typeof MAIL_TEMPLATE_IDS)[number];

export function isMailTemplateId(value: string | null | undefined): value is MailTemplateId {
  return MAIL_TEMPLATE_IDS.includes(value as MailTemplateId);
}

/** Demo hallintapaneeli — asiakas näkee esimerkin; tuotannossa paneeli räätälöidään. */
export const DEFAULT_DASHBOARD_DEMO_URL = "https://web-prueba-restadigi.vercel.app/dashboard";

/** After-call / follow-up (existing production template). */
export const DEFAULT_MAIL_SUBJECT = "Restadigi — verkkosivupaketti [YRITYS]";

export const DEFAULT_MAIL_BODY_FI = `Hei,

Kiitos mielenkiinnostanne Restadigi.fi-palvelun verkkosivu- ja verkkonäkyvyyspaketteja kohtaan.

Juttelimme puhelimessa Start-verkkosivupaketista yrityksellenne: [YRITYS]

Pakettimme sisältää kaiken verkkosivujen suunnittelusta julkaisuun — myös sisällöntuotannon.

Viitaten puheluumme, löydät verkkosivupakettien tiedot oheisesta liitteestä. Alla olevasta linkistä pääset tutustumaan esimerkkiin verkkosivustolle luotavasta hallintapaneelista, joka yksilöidään yrityksen tarpeen ja valittujen palvelujen mukaan:

${DEFAULT_DASHBOARD_DEMO_URL}

Jos sinulle herää kysymyksiä, voit vastata tähän sähköpostiin. Autamme mielellämme.

Tutustu palveluumme: Restadigi.fi — verkkosivut, sisällöt ja digimarkkinointi helposti, nopeasti ja edullisesti, laadusta tinkimättä.`;

/** Cold outreach before the first call. */
export const COLD_MAIL_SUBJECT = "Restadigi — verkkosivut ja diginäkyvyys [YRITYS]";

export const COLD_MAIL_BODY_FI = `Hei [ETUNIMI],

Olen yhteydessä Restadigilta. Autamme ravintoloita ja paikallisia yrityksiä saamaan selkeät, nopeat ja edulliset verkkosivut sekä diginäkyvyyden — ilman turhaa säätöä.

Huomasin yrityksenne [YRITYS] ja ajattelin, että Start-verkkosivupakettimme voisi sopia teille hyvin.

Liitteistä löydät lyhyen katsauksen palveluihimme. Jos sopii, soitan teille pian — tai voitte vastata tähän viestiin teille sopivalla ajalla.

Tutustu palveluumme: https://restadigi.fi

Restadigi.fi — verkkosivut, sisällöt ja digimarkkinointi helposti, nopeasti ja edullisesti, laadusta tinkimättä.`;

/** Order / package confirmation. */
export const ORDER_MAIL_SUBJECT = "Restadigi — tilausvahvistus [YRITYS]";

export const ORDER_MAIL_BODY_FI = `Hei [ETUNIMI],

Kiitos tilauksestanne! Vahvistamme, että olemme vastaanottaneet tilauksenne yritykselle [YRITYS].

Seuraavaksi:
1) Käymme tilauksen vielä yhdessä läpi tarvittaessa
2) Aloitamme työn sovitun aikataulun mukaan
3) Pidämme teidät ajan tasalla etenemisestä

Mahdolliset liitteet (sopimus / pakettikuvaus) ovat tämän viestin mukana.

Jos teillä on kysyttävää, vastatkaa tähän sähköpostiin — autamme mielellämme.

Tutustu palveluumme: https://restadigi.fi

Restadigi.fi — verkkosivut, sisällöt ja digimarkkinointi helposti, nopeasti ja edullisesti, laadusta tinkimättä.`;

/** Free-form body — same Restadigi visual skin + footer. */
export const FREE_MAIL_SUBJECT = "Restadigi — viesti [YRITYS]";

export const FREE_MAIL_BODY_FI = `Hei [ETUNIMI],

Kirjoita tähän vapaamuotoinen viesti. Ulkoasu, värit ja allekirjoitus säilyvät Restadigi-mallissa.

Ystävällisin terveisin`;

export type MailTemplateDefaults = {
  subject: string;
  body: string;
  /** Customer send requires both PDF slots when true. */
  requireAttachments: boolean;
};

export const MAIL_TEMPLATE_DEFAULTS: Record<MailTemplateId, MailTemplateDefaults> = {
  default: {
    subject: DEFAULT_MAIL_SUBJECT,
    body: DEFAULT_MAIL_BODY_FI,
    requireAttachments: true,
  },
  cold: {
    subject: COLD_MAIL_SUBJECT,
    body: COLD_MAIL_BODY_FI,
    requireAttachments: false,
  },
  order: {
    subject: ORDER_MAIL_SUBJECT,
    body: ORDER_MAIL_BODY_FI,
    requireAttachments: false,
  },
  free: {
    subject: FREE_MAIL_SUBJECT,
    body: FREE_MAIL_BODY_FI,
    requireAttachments: false,
  },
};

/** Physical DB slot names for a template (keeps legacy pdf1/pdf2 for `default`). */
export function physicalSlotsForTemplate(templateId: MailTemplateId): [string, string] {
  if (templateId === "default") return ["pdf1", "pdf2"];
  return [`${templateId}_pdf1`, `${templateId}_pdf2`];
}

export function logicalSlotFromPhysical(
  templateId: MailTemplateId,
  physicalSlot: string,
): "pdf1" | "pdf2" | null {
  const [a, b] = physicalSlotsForTemplate(templateId);
  if (physicalSlot === a) return "pdf1";
  if (physicalSlot === b) return "pdf2";
  return null;
}

export function physicalSlotForLogical(
  templateId: MailTemplateId,
  logical: "pdf1" | "pdf2",
): string {
  const [a, b] = physicalSlotsForTemplate(templateId);
  return logical === "pdf1" ? a : b;
}

export function applyMailPlaceholders(
  text: string,
  vars: { firstName?: string; company?: string },
) {
  return text
    .replaceAll("[ETUNIMI]", vars.firstName?.trim() || "[ETUNIMI]")
    .replaceAll("[YRITYS]", vars.company?.trim() || "[YRITYS]");
}
