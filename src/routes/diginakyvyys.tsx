import { createFileRoute, Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useState } from "react";
import sportFootball from "@/assets/sport-football.jpg";
import sportHockey from "@/assets/sport-hockey.jpg";
import sportPesapallo from "@/assets/sport-pesapallo.jpg";
import {
  PackageBrandLogos,
  VisibilityBrandLogoStrip,
  packageLogoKind,
} from "@/components/package-brand-logos";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageMeta } from "@/components/page-meta";
import { useMessages } from "@/i18n";

const sportsPackageImages = [
  { src: sportFootball, alt: "Jalkapallo" },
  { src: sportHockey, alt: "Jääkiekko" },
  { src: sportPesapallo, alt: "Pesäpallo" },
] as const;

function isSportsPackage(name: string) {
  return (
    name === "Huippu-urheilun näkyvyyspaketti" ||
    name === "Elite sports visibility package"
  );
}

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

      {/* Paketit */}
      <section id="nakyvyys-paketit">
        <div>
          {v.packages.map((p, i) => {
            const dark = Boolean(p.featured);
            const alt = !dark && i % 2 === 1;
            const logoKind = packageLogoKind(p.name);
            const sports = isSportsPackage(p.name);
            return (
              <div
                key={p.name}
                className={
                  "w-full px-6 py-8 sm:py-10 " +
                  (dark
                    ? "bg-primary text-primary-foreground"
                    : alt
                      ? "bg-secondary/50"
                      : "bg-background")
                }
              >
                <div className="mx-auto max-w-6xl">
                  <div className="mb-5 flex items-baseline gap-3">
                    <h3 className="text-xl font-medium sm:text-2xl">{p.name}</h3>
                    {p.featured && (
                      <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-accent-foreground">
                        {v.popular}
                      </span>
                    )}
                  </div>
                  <div
                    className={
                      "grid gap-8 md:items-start md:gap-10 " +
                      (logoKind ? "md:grid-cols-3" : "md:grid-cols-2")
                    }
                  >
                    <div>
                      <p
                        className={
                          "mb-1.5 text-sm " +
                          (dark ? "text-primary-foreground/70" : "text-foreground/60")
                        }
                      >
                        {p.tagline}
                      </p>
                      <p
                        className={
                          "mb-3 text-sm leading-snug " +
                          (dark ? "text-primary-foreground/80" : "text-foreground/70")
                        }
                      >
                        {p.description}
                      </p>
                      <p
                        className={
                          "text-sm italic " +
                          (dark ? "text-primary-foreground/75" : "text-foreground/65")
                        }
                      >
                        {v.resultPrefix} {p.result}
                      </p>
                      {sports && (
                        <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
                          {sportsPackageImages.map((img) => (
                            <img
                              key={img.alt}
                              src={img.src}
                              alt={img.alt}
                              className="aspect-[4/3] w-full object-cover"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-5">
                      <ul className="space-y-2 text-sm">
                        {p.bullets.map((b) => (
                          <li key={b} className="flex gap-3">
                            <span className="mt-1.5 size-1 shrink-0 rounded-full bg-accent" />
                            <span
                              className={
                                "leading-snug " +
                                (dark ? "text-primary-foreground/85" : "text-foreground/75")
                              }
                            >
                              {b}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <div>
                        <div className="mb-3 font-serif text-3xl sm:text-4xl">{p.price}</div>
                        <Link
                          to="/yhteys"
                          className={
                            "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors " +
                            (dark
                              ? "bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
                              : "bg-primary text-primary-foreground hover:bg-accent")
                          }
                        >
                          {v.contactCta}
                        </Link>
                      </div>
                    </div>
                    {logoKind && (
                      <div className="md:flex md:justify-center">
                        <PackageBrandLogos kind={logoKind} dark={dark} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Graafinen suunnittelu */}
      <section className="w-full bg-background px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-medium leading-[1.1] tracking-tight text-balance sm:text-4xl">
              {b.titleBefore}
              <span className="font-serif italic">{b.titleAccent}</span>
              {b.titleAfter}
            </h2>
            <p className="mt-5 text-foreground/70 leading-relaxed">{b.description}</p>
          </div>

          <ul className="mx-auto mt-12 max-w-3xl space-y-8 border-t border-border pt-10 text-center">
            {b.products.map((product) => (
              <li key={product.name} className="flex flex-col items-center gap-2">
                <div className="text-base font-medium sm:text-lg">{product.name}</div>
                {product.description && (
                  <p className="max-w-xl text-sm leading-snug text-foreground/65">
                    {product.description}
                  </p>
                )}
                <div className="font-serif text-2xl tabular-nums sm:text-3xl">{product.price}</div>
              </li>
            ))}
          </ul>

          <div className="mx-auto mt-16 max-w-3xl border-t border-border pt-12 text-center sm:mt-20 sm:pt-16">
            <h3 className="text-2xl font-medium tracking-tight sm:text-3xl">{b.billing.title}</h3>
            <p className="mt-5 text-sm leading-relaxed text-foreground/75 sm:text-base">
              {b.billing.intro}
            </p>
            <p className="mt-8 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {b.billing.groundsTitle}
            </p>
            <div className="mt-6 space-y-8">
              {b.billing.grounds.map((ground) => (
                <div key={ground.title}>
                  <h4 className="text-base font-medium">{ground.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/70">{ground.body}</p>
                  {ground.bullets && ground.bullets.length > 0 && (
                    <ul className="mt-3 inline-flex flex-col items-start space-y-1.5 text-left text-sm text-foreground/70">
                      {ground.bullets.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-1.5 size-1 shrink-0 rounded-full bg-accent" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mx-auto mt-16 max-w-xl border-t border-border pt-12 text-center sm:mt-20 sm:pt-16">
            <h3 className="text-2xl font-medium tracking-tight text-balance sm:text-3xl">
              {b.form.title}
            </h3>
            <form onSubmit={onQuoteSubmit} className="mt-8 space-y-6 text-left">
              <QuoteField label={b.form.name} name="name" required />
              <QuoteField label={b.form.email} name="email" type="email" required />
              <QuoteField label={b.form.phone} name="phone" type="tel" required />
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center gap-3 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-accent"
                >
                  {b.form.submit}
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
                {quoteSent && (
                  <span className="text-sm text-foreground/60">{b.form.sending}</span>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>

      <SiteFooter />
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
      <label className="mb-3 block text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {label} {required && <span className="text-accent">*</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full border-b border-border bg-transparent py-3 text-base outline-none transition-colors focus:border-foreground"
      />
    </div>
  );
}
