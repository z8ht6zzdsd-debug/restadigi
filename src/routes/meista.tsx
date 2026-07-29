import { createFileRoute, Link } from "@tanstack/react-router";
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
          "Restadigi on kahden yrittäjän digistudio. Verkkosivut, näkyvyys ja digipalvelut — yrittäjiltä yrittäjille.",
      },
      { property: "og:title", content: "Meistä — Restadigi" },
      {
        property: "og:description",
        content: "Pieni tiimi, iso vastuu. Digistudio pienille ja keskisuurille yrityksille.",
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

      <main className="flex-1">
        <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-24">
          <div className="mb-8 text-xs uppercase tracking-[0.2em] text-accent">{a.eyebrow}</div>
          <h1 className="mb-10 max-w-[18ch] text-balance text-4xl font-medium leading-[1.02] tracking-tight sm:mb-14 sm:text-6xl">
            {a.titleBefore}
            <span className="font-serif italic text-inherit">{a.titleAccent}</span>
            {a.titleAfter}
          </h1>

          <div className="space-y-6">
            {a.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 48)}
                className="max-w-none text-base leading-relaxed text-foreground/70 sm:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-14 border-t border-[#d6d6d6] pt-12 sm:mt-16 sm:pt-14">
            <h2 className="mb-8 text-xl font-bold tracking-tight text-[#2a2018] sm:text-2xl">
              {a.teamHeading}
            </h2>
            <div className="space-y-8">
              {a.team.map((member) => (
                <div key={member.name}>
                  <p className="text-lg font-bold tracking-tight text-[#2a2018]">{member.name}</p>
                  <p className="mt-2 text-base leading-relaxed text-foreground/70 sm:text-lg">
                    {member.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-14 text-base leading-relaxed text-foreground/70 sm:mt-16 sm:text-lg">
            {a.closing}
          </p>

          <div className="mt-10">
            <Link
              to="/form"
              className="inline-flex items-center rounded-full bg-[#432f24] px-7 py-3.5 text-sm font-bold uppercase tracking-[0.06em] text-[#f7f3ee] transition-opacity hover:opacity-90"
            >
              {a.cta}
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
