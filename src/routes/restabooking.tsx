import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageMeta } from "@/components/page-meta";
import { useMessages } from "@/i18n";

export const Route = createFileRoute("/restabooking")({
  head: () => ({
    meta: [
      { title: "Restabooking — Restadigi" },
      {
        name: "description",
        content: "Restabooking — tulossa pian. Restadigin uusi varauspalvelubrändi.",
      },
      { property: "og:title", content: "Restabooking — Restadigi" },
      {
        property: "og:description",
        content: "Restabooking — tulossa pian.",
      },
    ],
  }),
  component: RestabookingPage,
});

function RestabookingPage() {
  const t = useMessages();
  const c = t.restabooking;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased">
      <PageMeta
        title={c.meta.title}
        description={c.meta.description}
        ogTitle={c.meta.ogTitle}
        ogDescription={c.meta.ogDescription}
      />
      <SiteHeader />

      <section className="relative w-full overflow-hidden border-b border-[#e8dfd4] bg-gradient-to-b from-[#2a2018] via-[#432f24] to-[#3a2a20]">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 30%, #c46a32 0%, transparent 45%), radial-gradient(circle at 80% 70%, #c46a32 0%, transparent 40%)",
          }}
          aria-hidden
        />
        <div className="relative mx-auto flex min-h-[70vh] max-w-6xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6 sm:py-28">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            {c.eyebrow}
          </p>
          <h1 className="font-serif text-5xl tracking-tight text-[#f7f3ee] sm:text-6xl lg:text-7xl">
            {c.title}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-[#f7f3ee]/75 sm:text-lg">
            {c.body}
          </p>
          <p className="mt-4 font-serif text-2xl italic text-accent sm:text-3xl">{c.soon}</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/restatable"
              className="inline-flex items-center rounded-full bg-accent px-6 py-3 text-sm font-bold uppercase tracking-[0.06em] text-accent-foreground transition-opacity hover:opacity-90"
            >
              {c.ctaRestatable}
            </Link>
            <Link
              to="/yhteys"
              className="inline-flex items-center rounded-full border border-white/25 bg-white/5 px-6 py-3 text-sm font-bold uppercase tracking-[0.06em] text-[#f7f3ee] transition-colors hover:bg-white/10"
            >
              {c.ctaContact}
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <SiteFooter />
      </section>
    </div>
  );
}
