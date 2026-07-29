import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MarketingBand, MarketingBox, MarketingHeading } from "@/components/marketing-band";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageMeta } from "@/components/page-meta";
import { useMessages } from "@/i18n";
import { CONTACT_EMAIL } from "@/lib/company-contact";

export const Route = createFileRoute("/yhteys")({
  head: () => ({
    meta: [
      { title: "Ota yhteyttä — Restadigi" },
      {
        name: "description",
        content: `Kerro projektistasi, palaamme asiaan yhden arkipäivän kuluessa. ${CONTACT_EMAIL}`,
      },
      { property: "og:title", content: "Ota yhteyttä — Restadigi" },
      {
        property: "og:description",
        content: "Kerro projektistasi — palaamme asiaan yhden arkipäivän kuluessa.",
      },
    ],
  }),
  component: YhteysPage,
});

function YhteysPage() {
  const t = useMessages();
  const c = t.contact;
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const company = String(data.get("company") ?? "");
    const email = String(data.get("email") ?? "");
    const budget = String(data.get("budget") ?? "");
    const message = String(data.get("message") ?? "");
    const subject = encodeURIComponent(c.form.mailSubject.replace("{name}", name));
    const body = encodeURIComponent(
      c.form.mailBody
        .replace("{name}", name)
        .replace("{company}", company)
        .replace("{email}", email)
        .replace("{budget}", budget)
        .replace("{message}", message),
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased">
      <PageMeta
        title={c.meta.title}
        description={c.meta.description}
        ogTitle={c.meta.ogTitle}
        ogDescription={c.meta.ogDescription}
      />
      <SiteHeader />

      <MarketingBand>
        <MarketingHeading>
          {c.hero.titleBefore}
          <span className="font-serif italic text-inherit">{c.hero.titleAccent}</span>
          {c.hero.titleAfter}
        </MarketingHeading>
        <p className="mb-8 max-w-2xl text-base leading-relaxed text-foreground/70 sm:mb-10 sm:text-lg">
          {c.hero.description}
        </p>

        <div className="grid gap-4 sm:gap-5 lg:grid-cols-12">
          <MarketingBox
            tone="dark"
            justify="start"
            className="lg:col-span-4 min-h-[22rem] space-y-0"
          >
            <div className="space-y-7">
              <div>
                <div className="mb-2 text-xs uppercase tracking-[0.2em] text-white/50">
                  {c.labels.email}
                </div>
                <a
                  href={`mailto:${c.email}`}
                  className="text-lg font-medium transition-colors hover:text-accent"
                >
                  {c.email}
                </a>
              </div>
              <div>
                <div className="mb-2 text-xs uppercase tracking-[0.2em] text-white/50">
                  {c.labels.phone}
                </div>
                <a
                  href={`tel:${c.phoneTel}`}
                  className="text-lg font-medium transition-colors hover:text-accent"
                >
                  {c.phoneDisplay}
                </a>
              </div>
              <div>
                <div className="mb-2 text-xs uppercase tracking-[0.2em] text-white/50">
                  {c.labels.whatsapp}
                </div>
                <a
                  href={`https://wa.me/${c.phoneTel.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-lg font-medium transition-colors hover:text-accent"
                >
                  <WhatsAppIcon className="size-5 shrink-0 text-[#25D366]" />
                  {c.whatsappDisplay}
                </a>
              </div>
              <div>
                <div className="mb-2 text-xs uppercase tracking-[0.2em] text-white/50">
                  {c.labels.studio}
                </div>
                <p className="text-base text-white/75">
                  {c.studioLine2}
                  <br />
                  {c.studioLine1}
                </p>
              </div>
            </div>
          </MarketingBox>

          <MarketingBox tone="white" justify="start" className="lg:col-span-8 min-h-[22rem]">
            <form id="yhteys-lomake" onSubmit={onSubmit} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <Field label={c.form.name} name="name" required />
                <Field label={c.form.company} name="company" />
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <Field label={c.form.email} name="email" type="email" required />
                <SelectField
                  label={c.form.budget}
                  name="budget"
                  placeholder={c.form.selectPlaceholder}
                  options={c.form.budgetOptions}
                />
              </div>
              <div>
                <label className="mb-3 block text-xs uppercase tracking-[0.2em] text-foreground/45">
                  {c.form.message}
                </label>
                <textarea
                  name="message"
                  required
                  rows={6}
                  placeholder={c.form.messagePlaceholder}
                  className="w-full resize-none border-b border-foreground/20 bg-transparent py-3 text-base outline-none transition-colors focus:border-foreground"
                />
              </div>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center rounded-full bg-accent px-7 py-3.5 text-sm font-bold uppercase tracking-[0.06em] text-accent-foreground transition-opacity hover:opacity-90"
                >
                  {c.form.submit}
                </button>
                {sent && <span className="text-sm text-foreground/60">{c.form.sending}</span>}
              </div>
            </form>
          </MarketingBox>
        </div>
      </MarketingBand>

      <MarketingBand className="pt-4 sm:pt-6">
        <MarketingHeading>{c.faq.title}</MarketingHeading>
        <div className="space-y-3">
          {c.faq.items.map((item) => (
            <MarketingBox key={item.question} tone="white" justify="start" className="min-h-0">
              <h3 className="text-base font-bold tracking-tight text-[#2a2018] sm:text-lg">
                {item.question}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/70 sm:text-base">
                {item.answer}
              </p>
            </MarketingBox>
          ))}
        </div>
      </MarketingBand>

      <section className="bg-background">
        <SiteFooter />
      </section>
    </div>
  );
}

function Field({
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
      <label className="mb-3 block text-xs uppercase tracking-[0.2em] text-foreground/45">
        {label} {required && <span className="text-accent">*</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full border-b border-foreground/20 bg-transparent py-3 text-base outline-none transition-colors focus:border-foreground"
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
  placeholder,
}: {
  label: string;
  name: string;
  options: string[];
  placeholder: string;
}) {
  return (
    <div>
      <label className="mb-3 block text-xs uppercase tracking-[0.2em] text-foreground/45">
        {label}
      </label>
      <select
        name={name}
        defaultValue=""
        className="w-full border-b border-foreground/20 bg-transparent py-3 text-base outline-none transition-colors focus:border-foreground"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
