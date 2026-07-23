import type { ReactNode } from "react";

import restadigiLogo from "@/assets/restadigi-logo.png";
import {
  CONTACT_ADDRESS,
  CONTACT_COMPANY,
  CONTACT_EMAIL,
  CONTACT_PERSON,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_TEL,
} from "@/lib/company-contact";

/** Exact visual match for Desktop/Restadigi-sahkopostipohjat/esikatselu.html */
const ESIKATSELU_CSS = `
.mail-esikatselu {
  --ink: #1a1512;
  --muted: #5c534c;
  --line: #e6dfd7;
  --bg: #f7f3ee;
  --paper: #ffffff;
  --accent: #432f24;
  box-sizing: border-box;
  margin: 0;
  font-family: Georgia, "Times New Roman", serif;
  color: var(--ink);
  background: var(--bg);
  line-height: 1.55;
}
.mail-esikatselu *,
.mail-esikatselu *::before,
.mail-esikatselu *::after {
  box-sizing: border-box;
}
.mail-esikatselu .wrap {
  max-width: 720px;
  margin: 0 auto;
  padding: 0;
}
.mail-esikatselu .mail {
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 36px 40px 40px;
  box-shadow: 0 8px 28px rgba(67, 47, 36, 0.06);
}
.mail-esikatselu .subject {
  font-family: system-ui, sans-serif;
  font-size: 13px;
  color: var(--muted);
  margin-bottom: 22px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--line);
}
.mail-esikatselu .subject strong {
  color: var(--ink);
  font-weight: 600;
}
.mail-esikatselu .mail-body p {
  margin: 0 0 1em;
  font-size: 17px;
}
.mail-esikatselu .tagline {
  margin-top: 1.4em;
  color: var(--accent);
  font-style: italic;
}
.mail-esikatselu .site {
  margin-bottom: 1.6em;
}
.mail-esikatselu .site a {
  color: var(--accent);
}
.mail-esikatselu .sig {
  margin-top: 2rem;
  padding-top: 1.4rem;
  border-top: 1px solid var(--line);
  font-family: system-ui, -apple-system, Segoe UI, sans-serif;
}
.mail-esikatselu .sig p {
  margin: 0.2em 0;
  font-size: 15px;
}
.mail-esikatselu .sig .name {
  font-weight: 600;
  font-size: 16px;
  margin-top: 0.35em;
  margin-bottom: 1em;
}
.mail-esikatselu .sig img {
  display: block;
  height: 72px;
  width: auto;
  margin: 0 0 0.85em -2mm;
  padding: 0;
  object-fit: contain;
  object-position: left center;
}
.mail-esikatselu .sig .company {
  color: var(--muted);
  margin: 0 0 0.35em;
  font-size: 14px;
}
.mail-esikatselu .sig .contact {
  color: var(--muted);
  font-size: 14px;
  line-height: 1.45;
}
.mail-esikatselu .sig .contact a {
  color: var(--accent);
  text-decoration: none;
}
@media (max-width: 640px) {
  .mail-esikatselu .mail {
    padding: 28px 20px 32px;
  }
}
`;

function splitParagraphs(body: string) {
  return body
    .split(/\n\s*\n/)
    .map((p) => p.replace(/\n/g, " ").trim())
    .filter(Boolean);
}

function paragraphClass(text: string) {
  if (text.startsWith("Restadigi.fi —")) return "tagline";
  if (text.startsWith("Tutustu palveluumme")) return "site";
  return undefined;
}

function renderBodyParagraphs(bodyText: string): ReactNode[] {
  return splitParagraphs(bodyText).map((paragraph, index) => {
    const cls = paragraphClass(paragraph);
    if (cls === "site") {
      return (
        <p key={`${index}-site`} className="site">
          Tutustu palveluumme: <a href="https://restadigi.fi">https://restadigi.fi</a>
        </p>
      );
    }
    return (
      <p key={`${index}-${paragraph.slice(0, 20)}`} className={cls}>
        {paragraph}
      </p>
    );
  });
}

type MailEsikatseluPreviewProps = {
  subject: string;
  bodyText: string;
};

export function MailEsikatseluPreview({ subject, bodyText }: MailEsikatseluPreviewProps) {
  return (
    <div className="mail-esikatselu">
      <style>{ESIKATSELU_CSS}</style>
      <div className="wrap">
        <article className="mail">
          <div className="subject">
            <strong>Aihe:</strong> <span>{subject}</span>
          </div>

          <div className="mail-body">{renderBodyParagraphs(bodyText)}</div>

          <div className="sig">
            <p>Parhain terveisin,</p>
            <p className="name">{CONTACT_PERSON}</p>
            <img src={restadigiLogo} alt="Restadigi" />
            <div className="contact">
              <p className="company">{CONTACT_COMPANY}</p>
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              <br />
              <a href={`tel:${CONTACT_PHONE_TEL}`}>{CONTACT_PHONE_DISPLAY}</a>
              <br />
              <a href="https://restadigi.fi">https://restadigi.fi</a>
              <br />
              {CONTACT_ADDRESS}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
