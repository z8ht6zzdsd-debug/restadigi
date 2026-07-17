import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import heroYhteys from "@/assets/hero-yhteys.jpg";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";
import { PageMeta } from "@/components/page-meta";
import { useMessages } from "@/i18n";

export const Route = createFileRoute("/yhteys")({
  head: () => ({
    meta: [
      { title: "Ota yhteyttä — Restadigi" },
      {
        name: "description",
        content:
          "Kerro projektistasi, palaamme asiaan yhden arkipäivän kuluessa. info@restadigi.fi",
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
    const subject = encodeURIComponent(
      c.form.mailSubject.replace("{name}", name),
    );
    const body = encodeURIComponent(
      c.form.mailBody
        .replace("{name}", name)
        .replace("{company}", company)
        .replace("{email}", email)
        .replace("{budget}", budget)
        .replace("{message}", message),
    );
    window.location.href = `mailto:${c.email}?subject=${subject}&body=${body}`;
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

      <PageHero
        image={heroYhteys}
        title={
          <>
            {c.hero.titleBefore}
            <span className="font-serif italic text-accent">{c.hero.titleAccent}</span>
            {c.hero.titleAfter}
          </>
        }
        description={c.hero.description}
      />

      <section className="pb-24 sm:pb-32">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-12 gap-12">
          {/* Yhteystiedot */}
          <aside className="md:col-span-4 space-y-8">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
                {c.labels.email}
              </div>
              <a
                href={`mailto:${c.email}`}
                className="text-lg font-serif hover:text-accent transition-colors"
              >
                {c.email}
              </a>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
                {c.labels.phone}
              </div>
              <a
                href={`tel:${c.phoneTel}`}
                className="text-lg font-serif hover:text-accent transition-colors"
              >
                {c.phoneDisplay}
              </a>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
                {c.labels.studio}
              </div>
              <p className="text-base text-foreground/70">
                {c.studioLine1}
                <br />
                {c.studioLine2}
              </p>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
                {c.labels.social}
              </div>
              <div className="flex gap-6 text-sm text-foreground/70">
                <a href="#" className="hover:text-foreground">
                  {t.footer.instagram}
                </a>
                <a href="#" className="hover:text-foreground">
                  {t.footer.behance}
                </a>
                <a href="#" className="hover:text-foreground">
                  {t.footer.linkedin}
                </a>
              </div>
            </div>
          </aside>

          {/* Lomake */}
          <form onSubmit={onSubmit} className="md:col-span-7 md:col-start-6 space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <Field label={c.form.name} name="name" required />
              <Field label={c.form.company} name="company" />
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <Field label={c.form.email} name="email" type="email" required />
              <SelectField
                label={c.form.budget}
                name="budget"
                placeholder={c.form.selectPlaceholder}
                options={c.form.budgetOptions}
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
                {c.form.message}
              </label>
              <textarea
                name="message"
                required
                rows={6}
                placeholder={c.form.messagePlaceholder}
                className="w-full bg-transparent border-b border-border focus:border-foreground outline-none py-3 text-base resize-none transition-colors"
              />
            </div>
            <div className="flex items-center gap-4 pt-2">
              <button
                type="submit"
                className="inline-flex items-center gap-3 bg-primary text-primary-foreground text-sm font-medium py-3 pr-4 pl-5 rounded-full hover:bg-accent transition-colors"
              >
                {c.form.submit}
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
              </button>
              {sent && (
                <span className="text-sm text-foreground/60">{c.form.sending}</span>
              )}
            </div>
          </form>
        </div>
      </section>

      <SiteFooter />
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
      <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
        {label} {required && <span className="text-accent">*</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full bg-transparent border-b border-border focus:border-foreground outline-none py-3 text-base transition-colors"
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
      <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
        {label}
      </label>
      <select
        name={name}
        defaultValue=""
        className="w-full bg-transparent border-b border-border focus:border-foreground outline-none py-3 text-base transition-colors"
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
