import { createFileRoute } from "@tanstack/react-router";
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
    ],
  }),
  component: MeistaPage,
});

function MeistaPage() {
  const t = useMessages();
  const a = t.about;

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground font-sans antialiased">
      <PageMeta
        title={a.meta.title}
        description={a.meta.description}
        ogTitle={a.meta.ogTitle}
        ogDescription={a.meta.ogDescription}
      />
      <SiteHeader />

      <main className="flex flex-1 items-center">
        <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-24">
          <div className="mb-8 text-xs uppercase tracking-[0.2em] text-accent">{a.eyebrow}</div>
          <h1 className="mb-12 max-w-[18ch] text-balance text-4xl font-medium leading-[1.02] tracking-tight sm:mb-16 sm:text-6xl">
            {a.titleBefore}
            <span className="font-serif italic text-accent">{a.titleAccent}</span>
            {a.titleAfter}
          </h1>
          <div className="grid gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
            <p className="text-base leading-relaxed text-foreground/70 sm:text-lg">{a.lead}</p>
            <p className="text-base leading-relaxed text-foreground/70 sm:text-lg">{a.secondary}</p>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
