import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/yhteys")({
  head: () => ({
    meta: [
      { title: "Ota yhteyttä — YritysDIGI" },
      { name: "description", content: "Kerro projektistasi, palaamme asiaan yhden arkipäivän kuluessa. info@yritysdigi.fi" },
      { property: "og:title", content: "Ota yhteyttä — YritysDIGI" },
      { property: "og:description", content: "Kerro projektistasi — palaamme asiaan yhden arkipäivän kuluessa." },
    ],
  }),
  component: YhteysPage,
});

function YhteysPage() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`Projektikysely — ${data.get("name") ?? ""}`);
    const body = encodeURIComponent(
      `Nimi: ${data.get("name")}\nYritys: ${data.get("company")}\nSähköposti: ${data.get("email")}\nBudjetti: ${data.get("budget")}\n\nViesti:\n${data.get("message")}`,
    );
    window.location.href = `mailto:hola@holadigi.fi?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased">
      <SiteHeader />

      <header className="pt-10 pb-12 sm:pt-16 sm:pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-xs uppercase tracking-[0.2em] text-accent mb-8">Yhteys</div>
          <h1 className="text-4xl sm:text-6xl leading-[1.02] font-medium text-balance max-w-[22ch] mb-8 tracking-tight">
            Kerro <span className="font-serif italic text-accent">projektistasi</span>.
          </h1>
          <p className="max-w-2xl text-base sm:text-lg text-foreground/70 leading-relaxed">
            Vastaamme yleensä yhden arkipäivän sisällä. Voit myös laittaa suoraan sähköpostia tai
            varata lyhyen puhelun.
          </p>
        </div>
      </header>

      <section className="pb-24 sm:pb-32">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-12 gap-12">
          {/* Yhteystiedot */}
          <aside className="md:col-span-4 space-y-8">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">Sähköposti</div>
              <a href="mailto:hola@holadigi.fi" className="text-lg font-serif hover:text-accent transition-colors">
                hola@holadigi.fi
              </a>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">Puhelin</div>
              <a href="tel:+358401234567" className="text-lg font-serif hover:text-accent transition-colors">
                +358 40 123 4567
              </a>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">Studio</div>
              <p className="text-base text-foreground/70">
                Helsinki, Suomi<br />
                Etätyö koko Euroopassa
              </p>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">Some</div>
              <div className="flex gap-6 text-sm text-foreground/70">
                <a href="#" className="hover:text-foreground">Instagram</a>
                <a href="#" className="hover:text-foreground">Behance</a>
                <a href="#" className="hover:text-foreground">LinkedIn</a>
              </div>
            </div>
          </aside>

          {/* Lomake */}
          <form onSubmit={onSubmit} className="md:col-span-7 md:col-start-6 space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <Field label="Nimi" name="name" required />
              <Field label="Yritys" name="company" />
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <Field label="Sähköposti" name="email" type="email" required />
              <SelectField
                label="Budjetti"
                name="budget"
                options={["Alle 1 000 €", "1 000 – 2 500 €", "2 500 – 5 000 €", "Yli 5 000 €", "En osaa vielä sanoa"]}
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
                Viesti
              </label>
              <textarea
                name="message"
                required
                rows={6}
                placeholder="Kerro projektista, aikataulusta ja tavoitteista…"
                className="w-full bg-transparent border-b border-border focus:border-foreground outline-none py-3 text-base resize-none transition-colors"
              />
            </div>
            <div className="flex items-center gap-4 pt-2">
              <button
                type="submit"
                className="inline-flex items-center gap-3 bg-primary text-primary-foreground text-sm font-medium py-3 pr-4 pl-5 rounded-full hover:bg-accent transition-colors"
              >
                Lähetä viesti
                <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                </svg>
              </button>
              {sent && (
                <span className="text-sm text-foreground/60">Avataan sähköpostiohjelmaa…</span>
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

function SelectField({ label, name, options }: { label: string; name: string; options: string[] }) {
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
        <option value="" disabled>Valitse…</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}
