/** Shared Finnish mail template defaults + placeholders (safe for client + server). */

export const DEFAULT_MAIL_SUBJECT = "Restadigi — verkkosivupaketti [YRITYS]";

/** Demo hallintapaneeli — asiakas näkee esimerkin; tuotannossa paneeli räätälöidään. */
export const DEFAULT_DASHBOARD_DEMO_URL = "https://web-prueba-restadigi.vercel.app/dashboard";

export const DEFAULT_MAIL_BODY_FI = `Hei,

Kiitos mielenkiinnostanne Restadigi.fi-palvelun verkkosivu- ja verkkonäkyvyyspaketteja kohtaan.

Juttelimme puhelimessa Start-verkkosivupaketista yrityksellenne: [YRITYS]

Pakettimme sisältää kaiken verkkosivujen suunnittelusta julkaisuun — myös sisällöntuotannon.

Viitaten puheluumme, löydät verkkosivupakettien tiedot mukana olevasta liitteestä. Alla olevasta linkistä pääset tutustumaan esimerkkiin verkkosivustolle luotavasta hallintapaneelista, joka yksilöidään yrityksen tarpeen ja valittujen palvelujen mukaan:

${DEFAULT_DASHBOARD_DEMO_URL}

Jos sinulle herää kysymyksiä, voit vastata tähän sähköpostiin. Autamme mielellämme.

Tutustu palveluumme: Restadigi.fi — verkkosivut, sisällöt ja digimarkkinointi helposti, nopeasti ja edullisesti, laadusta tinkimättä.`;

export function applyMailPlaceholders(
  text: string,
  vars: { firstName?: string; company?: string },
) {
  return text
    .replaceAll("[ETUNIMI]", vars.firstName?.trim() || "[ETUNIMI]")
    .replaceAll("[YRITYS]", vars.company?.trim() || "[YRITYS]");
}
