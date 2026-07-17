import { createFileRoute, Link } from "@tanstack/react-router";
import restaurantKitchen from "@/assets/restaurant-kitchen.jpg";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageMeta } from "@/components/page-meta";
import { useMessages } from "@/i18n";

export const Route = createFileRoute("/meista")({
  head: () => ({
    meta: [
      { title: "Meistä — Restadigi" },
      {
        name: "description",
        content:
          "Restadigi on pieni studio, joka rakentaa kotisivuja ja vahvistaa yritysten diginäkyvyyttä. Tutustu tapaamme tehdä työtä.",
      },
      { property: "og:title", content: "Meistä — Restadigi" },
      {
        property: "og:description",
        content:
          "Pieni studio, iso vastuu. Kotisivuja ja diginäkyvyyttä suomalaisille yrityksille.",
      },
      { property: "og:image", content: restaurantKitchen },
    ],
  }),
  component: MeistaPage,
});

function MeistaPage() {
  const t = useMessages();
  const a = t.about;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased">
      <PageMeta
        title={a.meta.title}
        description={a.meta.description}
        ogTitle={a.meta.ogTitle}
        ogDescription={a.meta.ogDescription}
      />
      <SiteHeader />

      {/* Intro */}
      <header className="pt-10 pb-16 sm:pt-16 sm:pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-xs uppercase tracking-[0.2em] text-accent mb-8">{a.eyebrow}</div>
          <h1 className="text-4xl sm:text-6xl leading-[1.02] font-medium text-balance max-w-[16ch] mb-8 tracking-tight">
            {a.titleBefore}
            <span className="font-serif italic text-accent">{a.titleAccent}</span>
            {a.titleAfter}
          </h1>
          <div className="grid md:grid-cols-12 gap-8">
            <p className="md:col-span-7 text-base sm:text-lg text-foreground/70 leading-relaxed">
              {a.lead}
            </p>
            <p className="md:col-span-5 text-base text-foreground/60 leading-relaxed">
              {a.secondary}
            </p>
          </div>
        </div>
      </header>

      {/* Kuva */}
      <section className="px-6">
        <div className="max-w-6xl mx-auto">
          <img
            src={restaurantKitchen}
            alt={a.imageAlt}
            width={1600}
            height={900}
            className="w-full aspect-[16/9] object-cover rounded-sm"
          />
        </div>
      </section>

      {/* Arvot */}
      <section className="py-24 sm:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {a.values.map((v) => (
              <div key={v.titleAccent + v.titleRest}>
                <h3 className="text-xl font-medium mb-3">
                  <span className="font-serif italic text-accent">{v.titleAccent}</span>{" "}
                  {v.titleRest}
                </h3>
                <p className="text-sm text-foreground/60 leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prosessi */}
      <section className="py-24 sm:py-32 bg-secondary/60">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4">
              <h2 className="text-3xl sm:text-4xl font-medium leading-[1.1] tracking-tight text-balance">
                {a.process.titleBefore}
                <span className="font-serif italic">{a.process.titleAccent}</span>
                {a.process.titleAfter}
              </h2>
            </div>
            <div className="md:col-span-7 md:col-start-6">
              <div className="space-y-6">
                {a.process.steps.map((s) => (
                  <div key={s.n} className="flex gap-5 border-t border-border pt-6">
                    <span className="text-xs font-mono text-accent tabular-nums pt-1">{s.n}</span>
                    <div>
                      <h3 className="text-lg font-medium mb-1.5">{s.title}</h3>
                      <p className="text-sm text-foreground/60 leading-relaxed">{s.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 sm:py-32">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-5xl font-medium leading-[1.05] tracking-tight text-balance max-w-[20ch] mx-auto">
            {a.cta.titleBefore}
            <span className="font-serif italic text-accent">{a.cta.titleAccent}</span>
            {a.cta.titleAfter}
          </h2>
          <Link
            to="/yhteys"
            className="inline-flex items-center gap-3 mt-10 bg-primary text-primary-foreground text-sm font-medium py-3 pr-4 pl-5 rounded-full hover:bg-accent transition-colors"
          >
            {a.cta.button}
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
      </section>

      <SiteFooter />
    </div>
  );
}
