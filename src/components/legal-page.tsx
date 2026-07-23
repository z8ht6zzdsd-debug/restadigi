import { Link } from "@tanstack/react-router";

import { PageMeta } from "@/components/page-meta";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { useMessages } from "@/i18n";

type LegalKind = "privacy" | "cookies" | "terms";

export function LegalPage({ kind }: { kind: LegalKind }) {
  const t = useMessages();
  const doc = t.legal[kind];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased">
      <PageMeta title={doc.metaTitle} description={doc.metaDescription} />
      <SiteHeader />

      <main className="mx-auto max-w-3xl px-6 py-14 sm:py-20">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {t.footer.legalNavLabel}
        </p>
        <h1 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">{doc.title}</h1>
        <p className="mt-3 text-sm text-muted-foreground">{doc.updated}</p>

        <div className="mt-10 space-y-8">
          {doc.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-lg font-medium">{section.heading}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-foreground/80">{section.body}</p>
            </section>
          ))}
        </div>

        <nav className="mt-12 flex flex-wrap gap-x-4 gap-y-2 border-t border-border pt-6 text-sm">
          <Link to="/tietosuoja" className="text-accent underline-offset-2 hover:underline">
            {t.footer.privacy}
          </Link>
          <Link to="/evasteet" className="text-accent underline-offset-2 hover:underline">
            {t.footer.cookies}
          </Link>
          <Link to="/kayttoehdot" className="text-accent underline-offset-2 hover:underline">
            {t.footer.terms}
          </Link>
        </nav>
      </main>

      <SiteFooter />
    </div>
  );
}
