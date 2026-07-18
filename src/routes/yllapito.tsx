import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageMeta } from "@/components/page-meta";
import { useMessages } from "@/i18n";

export const Route = createFileRoute("/yllapito")({
  head: () => ({
    meta: [
      { title: "Ylläpito — Restadigi" },
      {
        name: "description",
        content:
          "Hosting- ja ylläpitopaketit yrityksille — nopea hosting Suomessa, domain, SSL ja jatkuva tuki.",
      },
      { property: "og:title", content: "Ylläpito — Restadigi" },
      {
        property: "og:description",
        content: "Hosting- ja ylläpitopaketit: Basic ja Pro Business.",
      },
    ],
  }),
  component: YllapitoPage,
});

function YllapitoPage() {
  const t = useMessages();
  const h = t.hosting;
  const [openPackage, setOpenPackage] = useState<string | null>(null);
  const selected = h.packages.find((pkg) => pkg.name === openPackage) ?? null;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased">
      <PageMeta
        title={h.meta.title}
        description={h.meta.description}
        ogTitle={h.meta.ogTitle}
        ogDescription={h.meta.ogDescription}
      />
      <SiteHeader />

      <section className="w-full bg-background px-6 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl">
              {h.hero.titleBefore}
              <span className="font-serif italic text-accent">{h.hero.titleAccent}</span>
              {h.hero.titleAfter}
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-foreground/75 sm:text-lg">
              {h.hero.description}
            </p>
            <Link
              to="/yhteys"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-accent"
            >
              {h.requestQuote}
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
            </Link>
          </div>

          <div className="lg:col-span-7">
            <RestadigiBrownPanel className="aspect-[16/10] min-h-[14rem]" />
          </div>
        </div>
      </section>

      <section className="bg-[#f3f1ed] py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight sm:mb-16 sm:text-5xl">
            {h.packagesTitle}
          </h2>

          <div className="grid gap-8 sm:grid-cols-2 sm:gap-10">
            {h.packages.map((pkg) => (
              <article
                key={pkg.name}
                className="overflow-hidden rounded-[2rem] bg-white shadow-[0_16px_48px_-20px_rgba(50,30,20,0.4)] ring-1 ring-black/5"
              >
                <RestadigiBrownPanel className="aspect-[16/10] rounded-none" compact />
                <div className="flex flex-col items-center gap-6 px-6 py-8 text-center sm:px-10 sm:py-10">
                  <div>
                    <div className="mb-2 flex items-center justify-center gap-2">
                      <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">{pkg.name}</h3>
                      {pkg.featured && (
                        <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-accent-foreground">
                          {h.popular}
                        </span>
                      )}
                    </div>
                    <p className="font-serif text-3xl text-foreground sm:text-4xl">{pkg.price}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpenPackage(pkg.name)}
                    className="inline-flex min-w-[10rem] items-center justify-center rounded-full bg-accent px-8 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-accent-foreground transition-opacity hover:opacity-90"
                  >
                    {h.explore}
                  </button>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-12 text-center text-xs text-muted-foreground">{h.footnote}</p>
        </div>
      </section>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/25 px-4 backdrop-blur-[2px]"
          onClick={() => setOpenPackage(null)}
          role="presentation"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="hosting-package-title"
            className="w-full max-w-xl rounded-xl border border-border bg-background p-6 shadow-lg sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-1 text-xs uppercase tracking-[0.2em] text-accent">
              {h.packagesTitle}
            </div>
            <div className="mb-2 flex flex-wrap items-baseline gap-3">
              <h3 id="hosting-package-title" className="text-2xl font-medium tracking-tight">
                {selected.name}
              </h3>
              {selected.featured && (
                <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-accent-foreground">
                  {h.popular}
                </span>
              )}
            </div>
            <p className="mb-5 font-serif text-3xl text-foreground/90">{selected.price}</p>
            <ul className="space-y-0 divide-y divide-border/80">
              {selected.bullets.map((bullet) => (
                <li key={bullet} className="py-3.5 first:pt-0 last:pb-0">
                  <p className="text-sm leading-relaxed text-foreground/70">{bullet}</p>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/yhteys"
                className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-accent"
              >
                {h.requestQuote}
              </Link>
              <button
                type="button"
                onClick={() => setOpenPackage(null)}
                className="inline-flex items-center justify-center rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground/70 transition-colors hover:border-foreground/30 hover:text-foreground"
              >
                {t.widget.sales.closeLabel}
              </button>
            </div>
          </div>
        </div>
      )}

      <SiteFooter />
    </div>
  );
}

function RestadigiBrownPanel({
  className = "",
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <div className={"relative overflow-hidden rounded-[1.75rem] bg-[#432f24] " + className}>
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
        aria-hidden
      >
        <span
          className={
            "font-script w-[110%] select-none whitespace-nowrap text-center leading-none tracking-wide text-[#4a3528]/55 " +
            (compact
              ? "text-[clamp(3.5rem,12vw,6rem)]"
              : "text-[clamp(4.5rem,14vw,9rem)]")
          }
        >
          Restadigi
        </span>
      </div>
      <div className="relative flex h-full items-center justify-center px-6">
        <p
          className={
            "font-script leading-none text-[#c9a882] " +
            (compact ? "text-4xl sm:text-5xl" : "text-5xl sm:text-6xl lg:text-7xl")
          }
        >
          Restadigi
        </p>
      </div>
    </div>
  );
}
