import { createFileRoute, Link } from "@tanstack/react-router";
import { Bot, Palette, Search, Trophy } from "lucide-react";
import { useState } from "react";
import { ProductPackageCards } from "@/components/product-package-cards";
import { VisibilityBrandLogoStrip } from "@/components/package-brand-logos";
import {
  MarketingBand,
  MarketingBox,
  MarketingHeading,
} from "@/components/marketing-band";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageMeta } from "@/components/page-meta";
import { useMessages } from "@/i18n";

const VISIBILITY_ICONS = [Bot, Search, Trophy, Palette] as const;

export const Route = createFileRoute("/diginakyvyys")({
  head: () => ({
    meta: [
      { title: "Diginäkyvyys — Restadigi" },
      {
        name: "description",
        content:
          "Diginäkyvyytesi kerralla kuntoon: AI-optimointi, Google-optimointi ja huippu-urheilun näkyvyyspaketti.",
      },
      { property: "og:title", content: "Diginäkyvyys — Restadigi" },
      {
        property: "og:description",
        content:
          "Kolme tapaa kasvattaa näkyvyyttä: AI-optimointi, Google-optimointi ja huippu-urheilun näkyvyyspaketti.",
      },
    ],
  }),
  component: DiginakyvyysPage,
});

function DiginakyvyysPage() {
  const t = useMessages();
  const v = t.visibility;
  const b = v.branding;
  const [quoteSent, setQuoteSent] = useState(false);

  const onQuoteSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const phone = String(data.get("phone") ?? "");
    const subject = encodeURIComponent(b.form.mailSubject.replace("{name}", name));
    const body = encodeURIComponent(
      b.form.mailBody
        .replace("{name}", name)
        .replace("{email}", email)
        .replace("{phone}", phone),
    );
    window.location.href = `mailto:${t.contact.email}?subject=${subject}&body=${body}`;
    setQuoteSent(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased">
      <PageMeta
        title={v.meta.title}
        description={v.meta.description}
        ogTitle={v.meta.ogTitle}
        ogDescription={v.meta.ogDescription}
      />
      <SiteHeader />

      <section className="relative w-full overflow-hidden bg-[#432f24] px-6 py-16 sm:py-24">
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
          aria-hidden
        >
          <span className="font-script w-[96vw] select-none whitespace-nowrap text-center text-[clamp(6rem,28vw,22rem)] leading-none tracking-wide text-[#4a3528]/55">
            {v.hero.brand}
          </span>
        </div>

        <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
          <h1 className="max-w-2xl text-3xl font-bold leading-[1.1] tracking-tight text-[#f7f3ee] sm:text-5xl lg:text-6xl">
            <span className="block">{v.hero.headlineLine1}</span>
            <span className="block">{v.hero.headlineLine2}</span>
          </h1>

          <form
            className="mt-8 w-full max-w-xl"
            onSubmit={(e) => {
              e.preventDefault();
              document.getElementById("nakyvyys-paketit")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
          >
            <label className="sr-only" htmlFor="nakyvyys-haku">
              {v.hero.searchAriaLabel}
            </label>
            <div className="flex items-center rounded-full bg-white px-5 py-3.5 shadow-sm ring-1 ring-black/10">
              <input
                id="nakyvyys-haku"
                type="search"
                name="q"
                placeholder={v.hero.searchPlaceholder}
                className="min-w-0 flex-1 bg-transparent text-base text-[#432f24] outline-none placeholder:text-[#432f24]/40"
              />
              <button
                type="submit"
                className="ml-3 shrink-0 text-[#432f24]/45 transition-colors hover:text-[#432f24]/75"
                aria-label={v.hero.searchAriaLabel}
              >
                <Search className="size-5" strokeWidth={1.75} />
              </button>
            </div>
          </form>

          <VisibilityBrandLogoStrip className="mt-10" onDark />
        </div>
      </section>

      <MarketingBand>
        <ProductPackageCards
          embedded
          sectionId="nakyvyys-paketit"
          title={v.packagesTitle}
          explore={v.explore}
          popular={v.popular}
          requestQuote={v.contactCta}
          closeLabel={t.widget.sales.closeLabel}
          packages={v.packages.map((pkg, i) => ({
            name: pkg.name,
            price: pkg.price,
            featured: pkg.featured,
            description: `${pkg.tagline}. ${pkg.description}`,
            bullets: [...pkg.bullets, `${v.resultPrefix} ${pkg.result}`],
            icon: VISIBILITY_ICONS[i],
          }))}
          footnote={v.footnote}
        />

        <MarketingHeading className="mt-14 sm:mt-16">{b.billing.title}</MarketingHeading>

        <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
          <MarketingBox tone="dark" justify="start" className="md:col-span-2">
            <p className="max-w-3xl text-sm leading-relaxed text-white/88 sm:text-base">
              {b.billing.intro}
            </p>
          </MarketingBox>

          {b.billing.grounds.map((ground) => (
            <MarketingBox key={ground.title} tone="white" justify="start">
              <p className="mb-2 text-xs uppercase tracking-[0.2em] text-foreground/45">
                {b.billing.groundsTitle}
              </p>
              <h3 className="text-xl font-bold tracking-tight sm:text-2xl">{ground.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground/70">{ground.body}</p>
              {ground.bullets && ground.bullets.length > 0 && (
                <ul className="mt-4 space-y-2 text-sm text-foreground/70">
                  {ground.bullets.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </MarketingBox>
          ))}
        </div>

        <MarketingBox tone="dark" justify="start" className="mt-4 sm:mt-5 min-h-[22rem]">
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
              {quoteSent && (
                <span className="text-sm text-white/70">{b.form.sending}</span>
              )}
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
