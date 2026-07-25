import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MarketingBand, MarketingBox, MarketingHeading } from "@/components/marketing-band";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageMeta } from "@/components/page-meta";
import { useMessages } from "@/i18n";
import { CONTACT_EMAIL } from "@/lib/company-contact";

export const Route = createFileRoute("/graafinen-suunnittelu")({
  head: () => ({
    meta: [
      { title: "Graafinen suunnittelu — Restadigi" },
      {
        name: "description",
        content:
          "Graafinen suunnittelu: yritysilme, logo, käyntikortit ja markkinointimateriaalit.",
      },
      { property: "og:title", content: "Graafinen suunnittelu — Restadigi" },
      {
        property: "og:description",
        content: "Yritysilme, logo ja markkinointimateriaalit yhdestä paikasta.",
      },
    ],
  }),
  component: GraafinenSuunnitteluPage,
});

function GraafinenSuunnitteluPage() {
  const t = useMessages();
  const v = t.visibility;
  const b = v.branding;
  const designPkg = v.packages.find((p) => p.name.toLowerCase().includes("graafinen"));
  const [quoteSent, setQuoteSent] = useState(false);

  const onQuoteSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const phone = String(data.get("phone") ?? "");
    const subject = encodeURIComponent(b.form.mailSubject.replace("{name}", name));
    const body = encodeURIComponent(
      b.form.mailBody.replace("{name}", name).replace("{email}", email).replace("{phone}", phone),
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setQuoteSent(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased">
      <PageMeta
        title="Graafinen suunnittelu — Restadigi"
        description="Yritysilme, logo, käyntikortit ja markkinointimateriaalit."
        ogTitle="Graafinen suunnittelu — Restadigi"
        ogDescription="Ammattimainen ja moderni visuaalinen ilme yrityksellesi."
      />
      <SiteHeader />

      <section className="w-full border-b border-[#e8dfd4] bg-gradient-to-b from-[#f7f3ee] to-[#ebe8e2]">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Restadigi
          </p>
          <h1 className="max-w-[18ch] font-serif text-4xl tracking-tight text-[#2a2018] sm:text-5xl lg:text-6xl">
            {b.titleBefore}
            <span className="italic text-accent">{b.titleAccent}</span>
            {b.titleAfter}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#5c534c] sm:text-lg">
            {b.description}
          </p>
          {designPkg ? (
            <p className="mt-4 text-sm font-semibold text-[#432f24]">
              {designPkg.price} — {designPkg.tagline}
            </p>
          ) : null}
        </div>
      </section>

      <MarketingBand className="pt-10 sm:pt-12">
        <MarketingHeading>
          {b.titleBefore}
          <span className="font-serif italic text-accent">{b.titleAccent}</span>
          {b.titleAfter}
        </MarketingHeading>

        <div className="mb-4 grid gap-4 sm:mb-5 sm:grid-cols-2 lg:grid-cols-2">
          {b.products.map((product) => (
            <MarketingBox key={product.name} tone="white" justify="start" className="min-h-[12rem]">
              <h3 className="text-lg font-bold tracking-tight text-[#2a2018]">{product.name}</h3>
              {"description" in product && typeof product.description === "string" ? (
                <p className="mt-2 text-sm leading-relaxed text-foreground/65">
                  {product.description}
                </p>
              ) : null}
              <p className="mt-4 text-base font-semibold text-accent">{product.price}</p>
            </MarketingBox>
          ))}
        </div>

        <MarketingBox tone="dark" justify="start" className="mt-10 min-h-[22rem] sm:mt-12">
          <h3 className="text-2xl font-bold tracking-tight text-balance sm:text-3xl">
            {b.form.title}
          </h3>
          <form onSubmit={onQuoteSubmit} className="mt-8 max-w-xl space-y-6">
            <QuoteField label={b.form.name} name="name" required />
            <QuoteField label={b.form.email} name="email" type="email" required />
            <QuoteField label={b.form.phone} name="phone" type="tel" required />
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="submit"
                className="inline-flex items-center rounded-full bg-accent px-6 py-3 text-sm font-bold uppercase tracking-[0.06em] text-accent-foreground transition-opacity hover:opacity-90"
              >
                {b.form.submit}
              </button>
              {quoteSent && <span className="text-sm text-white/70">{b.form.sending}</span>}
              <Link
                to="/yhteys"
                className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-bold uppercase tracking-[0.06em] text-black transition-opacity hover:opacity-90"
              >
                {v.contactCta}
              </Link>
            </div>
          </form>
        </MarketingBox>
      </MarketingBand>

      <section className="bg-background">
        <SiteFooter />
      </section>
    </div>
  );
}

function QuoteField({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-white/55">
        {label} {required && <span className="text-accent">*</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full border-b border-white/25 bg-transparent py-3 text-base text-white outline-none transition-colors placeholder:text-white/35 focus:border-white/70"
      />
    </div>
  );
}
