/**
 * Builds A4 HTML (+ optional PDF via Chrome) for mail attachments:
 *   - Digipalvelut (pdf1)
 *   - Verkkosivupaketit (pdf2)
 *
 * Visual language matches Resta-AI / Varaa pöytä chat panels:
 * dark brown (#2a2018 / #432f24), orange (#c46a32), white bubbles/cards.
 *
 * Usage:
 *   node scripts/build-package-pdfs.mjs
 *   node scripts/build-package-pdfs.mjs --pdf
 *   node scripts/build-package-pdfs.mjs --abs-logo --pdf
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const useAbsoluteLogo = process.argv.includes("--abs-logo") || process.argv.includes("--pdf");
const makePdf = process.argv.includes("--pdf");

const logoFs = path.join(root, "src/assets/restadigi-logo.png");
const logoRel = useAbsoluteLogo
  ? "file:///" + logoFs.replace(/\\/g, "/")
  : "../src/assets/restadigi-logo.png";

const assetUri = (name) =>
  useAbsoluteLogo
    ? "file:///" + path.join(root, "src/assets", name).replace(/\\/g, "/")
    : `../src/assets/${name}`;

const imgGoogle = assetUri("pkg-vis-google.jpg");
const imgAi = assetUri("pkg-vis-ai.jpg");
const imgChat = assetUri("pdf-digi-chat.jpg");
const imgBook = assetUri("pdf-digi-booking.jpg");

/** Resta-AI palette */
const C = {
  panel: "#2a2018",
  brown: "#432f24",
  orange: "#c46a32",
  orangeSoft: "#e8a05a",
  cream: "#f7f3ee",
  white: "#ffffff",
  ink: "#1a1512",
  muted: "#5c534c",
  line: "rgba(67,47,36,0.14)",
};

const cssShared = `
@page { size: A4 portrait; margin: 0; }
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body {
  width: 210mm; height: 297mm;
  font-family: "Segoe UI", Calibri, Arial, sans-serif;
  color: ${C.ink}; background: ${C.cream};
  -webkit-print-color-adjust: exact; print-color-adjust: exact;
}
.page {
  width: 210mm; height: 297mm;
  display: flex; flex-direction: column;
  background: ${C.cream};
  position: relative; overflow: hidden;
}
.topbar {
  flex-shrink: 0;
  background: ${C.panel};
  color: #fff;
  padding: 7mm 10mm 6.5mm;
  display: flex; align-items: center; justify-content: space-between; gap: 14px;
  border-bottom: 3px solid ${C.orange};
}
.brand-chip {
  background: ${C.white};
  border-radius: 12px;
  padding: 5px 10px 5px 8px;
  display: flex; align-items: center; gap: 0;
  box-shadow: 0 2px 10px rgba(0,0,0,0.18);
}
.logo { display: block; height: 52px; width: auto; }
.header-right {
  text-align: right; font-size: 10.5px; line-height: 1.45; color: rgba(255,255,255,0.78);
}
.header-right strong {
  display: block; color: ${C.orangeSoft}; font-size: 12.5px; margin-bottom: 2px; letter-spacing: 0.02em;
}
.body {
  flex: 1; min-height: 0;
  padding: 7mm 10mm 0;
  display: flex; flex-direction: column;
}
.intro {
  font-size: 11px; line-height: 1.4; color: ${C.muted};
  margin-bottom: 7px; flex-shrink: 0;
}
.section-title {
  display: flex; align-items: center; gap: 8px;
  font-size: 10px; font-weight: 800; letter-spacing: 0.16em;
  text-transform: uppercase; color: ${C.brown};
  margin: 0 0 6px; flex-shrink: 0;
}
.section-title::before {
  content: ""; width: 14px; height: 3px; border-radius: 999px; background: ${C.orange}; flex-shrink: 0;
}
.card {
  border: 1px solid ${C.line};
  border-radius: 12px;
  padding: 10px 11px 9px;
  background: ${C.white};
  position: relative;
  display: flex; flex-direction: column; min-height: 0;
  box-shadow: 0 1px 0 rgba(26,21,18,0.04);
}
.card.featured {
  border-color: rgba(196,106,50,0.45);
  background: linear-gradient(165deg, #fffaf5 0%, ${C.white} 55%);
  box-shadow: inset 3px 0 0 ${C.orange};
}
.badge {
  position: absolute; top: 8px; right: 8px;
  background: ${C.orange}; color: #fff;
  font-size: 8px; font-weight: 800; letter-spacing: 0.08em;
  text-transform: uppercase; padding: 3px 8px; border-radius: 999px;
}
.name { font-size: 16px; font-weight: 800; color: ${C.brown}; padding-right: 54px; line-height: 1.15; }
.price { margin-top: 2px; font-size: 14.5px; font-weight: 800; color: ${C.orange}; }
.tagline { margin-top: 3px; font-size: 10px; line-height: 1.3; color: ${C.muted}; font-style: italic; }
.divider { height: 1px; background: ${C.line}; margin: 6px 0 5px; flex-shrink: 0; }
ul { list-style: none; display: flex; flex-direction: column; gap: 3.5px; flex: 1; }
li { position: relative; padding-left: 12px; font-size: 9.8px; line-height: 1.32; color: ${C.ink}; }
li::before {
  content: ""; position: absolute; left: 0; top: 0.42em;
  width: 5px; height: 5px; border-radius: 50%; background: ${C.brown};
}
.card.featured li::before { background: ${C.orange}; }
.note {
  font-size: 10px; line-height: 1.4; color: ${C.ink};
  background: ${C.white};
  border: 1px solid ${C.line};
  border-left: 3px solid ${C.orange};
  border-radius: 10px;
  padding: 8px 10px; margin-bottom: 6px; flex-shrink: 0;
}
.note strong { color: ${C.brown}; }
.footer {
  margin-top: auto; flex-shrink: 0;
  background: ${C.brown};
  color: rgba(255,255,255,0.82);
  padding: 5.5mm 10mm;
  display: flex; justify-content: space-between; align-items: center;
  font-size: 9.5px;
}
.footer a { color: ${C.orangeSoft}; text-decoration: none; font-weight: 800; }
`;

const web = `<!DOCTYPE html>
<html lang="fi">
<head>
<meta charset="utf-8" />
<title>Restadigi Finland – Verkkosivu- ja hosting-paketit</title>
<style>${cssShared}
.grid-web {
  display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr;
  gap: 7px; flex: 1.25; min-height: 0; margin-bottom: 7px;
}
.grid-host {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 7px; flex: 0.78; min-height: 0; margin-bottom: 7px;
}
.shared {
  border-radius: 12px; padding: 9px 11px;
  background: ${C.panel}; color: #f7f3ee;
  margin-bottom: 7px; flex-shrink: 0;
  border: 1px solid rgba(196,106,50,0.35);
}
.shared h2 {
  font-size: 9.5px; letter-spacing: 0.14em; text-transform: uppercase;
  margin-bottom: 6px; color: ${C.orangeSoft}; font-weight: 800;
}
.shared-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 4px 12px; }
.shared-grid span {
  font-size: 9.5px; line-height: 1.3; position: relative; padding-left: 13px;
  color: rgba(255,255,255,0.9);
}
.shared-grid span::before { content: "✓"; position: absolute; left: 0; color: ${C.orange}; font-weight: 800; }
.footnote { font-size: 9px; line-height: 1.35; color: ${C.muted}; margin-bottom: 6px; flex-shrink: 0; }
.logo { height: 48px; }
</style>
</head>
<body>
<div class="page">
  <header class="topbar">
    <div class="brand-chip">
      <img class="logo" src="${logoRel}" alt="Restadigi Finland" />
    </div>
    <div class="header-right">
      <strong>www.restadigi.fi</strong>
      info@restadigi.fi<br />
      +358 403 738 332<br />
      Asiakaspalvelu ma–pe 9.00–16.00
    </div>
  </header>
  <div class="body">
    <p class="intro">Selkeät ja vaikuttavat kotisivupaketit yrityksille ja yhdistyksille. Kiinteät hinnat – ammattimainen toteutus, hallintapaneeli ja perus-SEO sisältyvät verkkosivupaketteihin.</p>
    <h2 class="section-title">Verkkosivupaketit</h2>
    <div class="grid-web">
      <article class="card"><div class="name">Start</div><div class="price">399 € + alv</div><p class="tagline">Yksinkertainen mutta vaikuttava sivusto pienyritykselle</p><div class="divider"></div><ul><li>Ammattimainen 1–3-sivuinen verkkosivusto</li><li>Perustekstit etusivulle, palveluille ja yhteystiedoille</li><li>Hallintapaneeli, responsiivisuus ja yhteydenottolomake</li><li>Sisältää 1–2 sähköpostiosoitetta</li><li>Perus-SEO · toimitus jopa 5 arkipäivässä</li><li>30 päivän asiakastuki julkaisun jälkeen</li></ul></article>
      <article class="card"><div class="name">Plus</div><div class="price">549 € + alv</div><p class="tagline">Tyylikäs kokonaisuus, joka esittelee palvelusi selkeästi</p><div class="divider"></div><ul><li>Ammattimainen 4–6-sivuinen verkkosivusto</li><li>Perustekstit etusivulle, palveluille ja yhteystiedoille</li><li>Hallintapaneeli, responsiivisuus ja yhteydenottolomake</li><li>Sisältää 1–3 sähköpostiosoitetta</li><li>Perus-SEO · toimitus jopa 5 arkipäivässä</li><li>30 päivän asiakastuki julkaisun jälkeen</li></ul></article>
      <article class="card"><div class="name">Kulta</div><div class="price">759 € + alv</div><p class="tagline">7–9 sivua ja AI-asiakaspalvelu 1 vuodeksi</p><div class="divider"></div><ul><li>Ammattimainen 7–9-sivuinen verkkosivusto</li><li>Kaikki Start/Plus-perussisällöt</li><li>Sisältää 1–5 sähköpostiosoitetta</li><li>AI-asiakaspalvelu (chatbot) 1 vuodeksi</li><li>Vastaa asiakkaille 24/7 ja kerää liidejä</li><li>Perus-SEO · nopea toimitus · 30 pv tuki</li></ul></article>
      <article class="card featured"><span class="badge">Suosittu</span><div class="name">Timantti</div><div class="price">929 € + alv</div><p class="tagline">Yli 10 sivua, AI ja valitsemasi varauspalvelu 1 vuodeksi</p><div class="divider"></div><ul><li>Ammattimainen yli 10-sivuinen verkkosivusto</li><li>Sisältää 1–10 sähköpostiosoitetta</li><li>AI-asiakaspalvelu (chatbot) 1 vuodeksi</li><li>Valitsemasi varauspalvelu 1 vuodeksi</li><li>Esim. pöytä-, majoitus- tai ajanvaraus</li><li>Perus-SEO · nopea toimitus · 30 pv tuki</li></ul></article>
    </div>
    <section class="shared"><h2>Kaikissa verkkosivupaketeissa</h2><div class="shared-grid"><span>Hallintapaneeli sisältöjen päivitykseen</span><span>Toimii mobiilissa, tabletissa ja tietokoneella</span><span>Yhteydenottolomake</span><span>Perus-SEO (meta, sivukartta)</span><span>Toimitus jopa 5 arkipäivässä</span><span>30 päivän asiakastuki julkaisun jälkeen</span></div></section>
    <h2 class="section-title">Hosting-paketit</h2>
    <div class="grid-host">
      <article class="card"><div class="name">Basic</div><div class="price">11,90 € / kk + alv</div><p class="tagline">Laskutetaan vuosittain</p><div class="divider"></div><ul><li>Hosting ja verkkotunnus sisältyvät hintaan</li><li>Nopea ja luotettava hosting Suomessa</li><li>SSL-sertifikaatti (HTTPS) sisältyy</li><li>Domain (.fi tai muu) sisältyy hintaan</li></ul></article>
      <article class="card featured"><span class="badge">Suosittu</span><div class="name">Pro Business</div><div class="price">29,99 € / kk + alv</div><p class="tagline">Kuukausilaskutus · täysi ylläpito</p><div class="divider"></div><ul><li>Hosting, domain ja SSL sisältyvät</li><li>Sähköpostiosoitteet sisältyvät</li><li>Jatkuva ylläpito, päivitykset ja tietoturva</li><li>Pienet sisältömuutokset · henkilökohtainen puhelintuki</li><li>AI- ja/tai varauspalvelun tuki ja kehitys</li></ul></article>
    </div>
    <p class="note"><strong>Domain ja hosting:</strong> Pakettihinnat ovat kiinteitä. Verkkotunnus ja hosting valitaan erikseen ylläpitopalveluista. Voit myös ostaa domainin ja verkkohotellin itse tai käyttää jo olemassa olevaa domainia.</p>
    <p class="footnote">Basic-paketti laskutetaan vuosittain (11,90 € / kk). Pro Business laskutetaan kuukausittain. Domain ja SSL-sertifikaatti sisältyvät hosting-paketteihin.</p>
  </div>
  <footer class="footer"><span>Restadigi Finland · Erkkiläntie 47, 04740 Mäntsälä</span><a href="https://www.restadigi.fi">www.restadigi.fi</a></footer>
</div>
</body>
</html>`;

const digi = `<!DOCTYPE html>
<html lang="fi">
<head>
<meta charset="utf-8" />
<title>Restadigi Finland – Digipalvelut</title>
<style>${cssShared}
.topbar { padding: 6mm 9mm 5.5mm; }
.body { padding: 6mm 9mm 0; }
.logo { height: 44px; }
.intro { font-size: 10.5px; margin-bottom: 6px; line-height: 1.38; }
.section-title { margin-bottom: 5px; }
.grid {
  display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr;
  gap: 6px; flex: 1; min-height: 0; margin-bottom: 6px;
}
.card { padding: 0; overflow: hidden; }
.card-media {
  width: 100%; height: 26mm; min-height: 26mm; max-height: 26mm;
  object-fit: cover; object-position: center 28%;
  display: block; border-bottom: 1px solid ${C.line}; flex-shrink: 0;
  background: ${C.cream};
}
.card-media--devices {
  object-fit: contain; object-position: center center;
  padding: 2.5mm 2mm; height: 26mm; box-sizing: border-box;
}
.card-body { padding: 5px 8px 6px; display: flex; flex-direction: column; flex: 1; min-height: 0; }
.name { font-size: 13.5px; padding-right: 54px; }
.price { font-size: 12.5px; margin-top: 1px; }
.tagline { font-size: 9.5px; margin-top: 2px; line-height: 1.28; }
.blurb {
  display: block; margin-top: 3px; font-size: 9px; line-height: 1.32; color: ${C.muted}; flex-shrink: 0;
}
.divider { margin: 4px 0 3px; }
ul { gap: 2.5px; flex: 0; }
li { font-size: 9px; line-height: 1.28; padding-left: 11px; }
.result {
  margin-top: auto; padding-top: 4px;
  border-top: 1px dashed rgba(196,106,50,0.35);
  font-size: 9px; line-height: 1.28; color: ${C.brown}; font-weight: 700; flex-shrink: 0;
}
.note { font-size: 9px; padding: 6px 8px; margin-bottom: 5px; }
.badge { top: 6px; right: 6px; font-size: 7.5px; z-index: 3; }
.footer { padding: 4.5mm 9mm; }
</style>
</head>
<body>
<div class="page">
  <header class="topbar">
    <div class="brand-chip">
      <img class="logo" src="${logoRel}" alt="Restadigi Finland" />
    </div>
    <div class="header-right">
      <strong>www.restadigi.fi</strong>
      info@restadigi.fi<br />
      +358 403 738 332<br />
      Asiakaspalvelu ma–pe 9.00–16.00
    </div>
  </header>
  <div class="body">
    <p class="intro">Neljä palvelua, joilla parannat löydettävyyttä, asiakaspalvelua ja varauksia. Vuosihinnat – maksat vain siitä, mitä tarvitset. Palvelut voi yhdistää verkkosivu- ja hosting-paketteihin.</p>
    <h2 class="section-title">Palvelut</h2>
    <div class="grid">
      <article class="card">
        <img class="card-media card-media--devices" src="${imgGoogle}" alt="" />
        <div class="card-body">
          <div>
            <div class="name">Google-optimointi</div>
            <div class="price">alk. 99 € / vuosi</div>
            <p class="tagline">Varmista, että asiakkaat löytävät yrityksesi</p>
            <p class="blurb">Kevyt vuosittainen SEO-ylläpito: sivusto täyttää perusvaatimukset ja tukee löydettävyyttä Googlessa.</p>
          </div>
          <div class="divider"></div>
          <ul>
            <li>Verkkosivujen perustason SEO-tarkistus</li>
            <li>Sivujen otsikoiden ja metakuvausten läpikäynti</li>
            <li>Yrityksen tärkeimpien hakusanojen arviointi</li>
            <li>Teknisten perusasioiden tarkistus (nopeus, rakenne)</li>
            <li>Kehitysehdotukset näkyvyyden parantamiseksi</li>
            <li>Vuosittainen tarkistus ja päivitys – ei piilokuluja</li>
          </ul>
          <p class="result">→ Yrityksesi näkyvyys Googlessa pysyy ajan tasalla.</p>
        </div>
      </article>
      <article class="card">
        <img class="card-media card-media--devices" src="${imgAi}" alt="" />
        <div class="card-body">
          <div>
            <div class="name">AI-optimointi</div>
            <div class="price">alk. 99 € / vuosi</div>
            <p class="tagline">Näkyväksi ChatGPT:n, Clauden, Geminin ja Copilotin hauissa</p>
            <p class="blurb">Pidä yritystiedot ajan tasalla, jotta ChatGPT, Claude, Gemini ja Copilot tunnistavat yrityksesi oikein.</p>
          </div>
          <div class="divider"></div>
          <ul>
            <li>Yrityksen verkkosivujen AI-näkyvyyden tarkistus</li>
            <li>Tärkeimpien yritystietojen läpikäynti</li>
            <li>Sisältöjen ja metatietojen perusoptimoinnin suositukset</li>
            <li>Rakenteellisten puutteiden tunnistaminen</li>
            <li>Vuosittainen tarkistus ja päivitys</li>
            <li>Valmius tulevaisuuden hakutapoihin jo nyt</li>
          </ul>
          <p class="result">→ Yrityksesi on mukana myös tulevaisuuden hauissa.</p>
        </div>
      </article>
      <article class="card featured">
        <img class="card-media" src="${imgChat}" alt="" />
        <span class="badge">Suosittu</span>
        <div class="card-body">
          <div>
            <div class="name">AI-asiakaspalvelu</div>
            <div class="price">alk. 199 € / vuosi</div>
            <p class="tagline">Chatbot – ympärivuorokautinen myyjä ja asiakaspalvelija</p>
            <p class="blurb">Chatbot sivuille: vastaa kysymyksiin, ohjaa palveluihin ja kerää liidejä 24/7 – myös kun henkilökunta on vapaalla.</p>
          </div>
          <div class="divider"></div>
          <ul>
            <li>Asiakaspalvelu 24/7 – vastaukset heti ilman jonotusta</li>
            <li>Tehokas liidien keräys myös yöaikaan</li>
            <li>Kasvanut konversio matalalla yhteydenottokynnyksellä</li>
            <li>Resurssien säästö: rutiinikysymykset botille</li>
            <li>Päivittyvä teknologia ja botin koulutus yrityksesi datalla</li>
            <li>Avaimet käteen -ylläpito asiantuntijoiltamme</li>
          </ul>
          <p class="result">→ Palvele paremmin. Kerää liidejä. Kasva tehokkaammin.</p>
        </div>
      </article>
      <article class="card featured">
        <img class="card-media" src="${imgBook}" alt="" />
        <span class="badge">Ravintolat</span>
        <div class="card-body">
          <div>
            <div class="name">Pöytävarauspalvelu</div>
            <div class="price">alk. 299 € / vuosi</div>
            <p class="tagline">Asiakkaat varaavat pöydän itse – 24/7</p>
            <p class="blurb">Asiakas varaa ajan ja seurueen koon sivuilta; vahvistus sähköpostiin ja varaukset hallintapaneeliin.</p>
          </div>
          <div class="divider"></div>
          <ul>
            <li>Varaukset suoraan verkkosivuiltasi ympäri vuorokauden</li>
            <li>Vähemmän no-showta: vahvistukset ja muistutukset</li>
            <li>Selkeä hallinta kalenterissa ja listalla</li>
            <li>Kustomoitu pöytäkartta salin mukaan</li>
            <li>Sama näkymä puhelimella, tabletilla ja isolla näytöllä</li>
            <li>Integroitu sivustosi ilmeeseen · kiinteä vuosihinta</li>
          </ul>
          <p class="result">→ Ota pöytävaraukset haltuun ilman puhelinkierrosta.</p>
        </div>
      </article>
    </div>
    <p class="note"><strong>Huomio:</strong> Hinnat ovat vuosihintoja (alk. + alv). Palvelut voidaan yhdistää verkkosivu- ja hosting-paketteihin. Kysy sopiva kokonaisuus: info@restadigi.fi · +358 403 738 332</p>
  </div>
  <footer class="footer"><span>Restadigi Finland · Erkkiläntie 47, 04740 Mäntsälä</span><a href="https://www.restadigi.fi">www.restadigi.fi</a></footer>
</div>
</body>
</html>`;

const webHtml = path.join(root, "docs/verkkosivupaketit-a4.html");
const digiHtml = path.join(root, "docs/digipalvelut-a4.html");
const webPdf = path.join(root, "docs/Restadigi-verkkosivupaketit-A4.pdf");
const digiPdf = path.join(root, "docs/Restadigi-digipalvelut-A4.pdf");

fs.writeFileSync(webHtml, web, "utf8");
fs.writeFileSync(digiHtml, digi, "utf8");
console.log("HTML written", useAbsoluteLogo ? "(abs assets)" : "(rel assets)");

function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    path.join(process.env.LOCALAPPDATA || "", "Google\\Chrome\\Application\\chrome.exe"),
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  ].filter(Boolean);
  return candidates.find((p) => fs.existsSync(p));
}

function printPdf(htmlPath, pdfPath) {
  const chrome = findChrome();
  if (!chrome) {
    throw new Error("Chrome/Edge not found. Install Chrome or set CHROME_PATH.");
  }
  const fileUrl = "file:///" + htmlPath.replace(/\\/g, "/");
  execFileSync(
    chrome,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-pdf-header-footer",
      `--print-to-pdf=${pdfPath}`,
      "--print-to-pdf-no-header",
      fileUrl,
    ],
    { stdio: "inherit", timeout: 60000 },
  );
  const size = fs.statSync(pdfPath).size;
  console.log("PDF:", path.basename(pdfPath), `(${Math.round(size / 1024)} kt)`);
}

if (makePdf) {
  printPdf(digiHtml, digiPdf);
  printPdf(webHtml, webPdf);
  console.log("Done. Upload to dashboard mail slots:");
  console.log("  pdf1 Digipalvelut  →", path.basename(digiPdf));
  console.log("  pdf2 Verkkosivut   →", path.basename(webPdf));
  console.log("Or: node scripts/seed-mail-pdfs.mjs  (requires DATABASE_URL)");
}
