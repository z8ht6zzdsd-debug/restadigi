import { useMessages } from "@/i18n";

type SiteFooterProps = {
  /** When set to primary, footer blends into a primary-colored page end. */
  tone?: "default" | "primary";
};

export function SiteFooter({ tone = "default" }: SiteFooterProps) {
  const t = useMessages();
  const onPrimary = tone === "primary";
  const year = new Date().getFullYear();
  const copyright = t.footer.copyright.replace("{year}", String(year));

  return (
    <footer
      className={
        onPrimary
          ? "py-12 border-t border-primary-foreground/15"
          : "py-12 border-t border-border"
      }
    >
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div
          className={
            onPrimary
              ? "text-sm text-primary-foreground/55"
              : "text-sm text-muted-foreground"
          }
        >
          {copyright}
        </div>
        <div
          className={
            onPrimary
              ? "flex gap-8 text-xs uppercase tracking-[0.15em] text-primary-foreground/55"
              : "flex gap-8 text-xs uppercase tracking-[0.15em] text-muted-foreground"
          }
        >
          <a
            href="#"
            className={
              onPrimary
                ? "hover:text-primary-foreground transition-colors"
                : "hover:text-foreground transition-colors"
            }
          >
            {t.footer.instagram}
          </a>
          <a
            href="#"
            className={
              onPrimary
                ? "hover:text-primary-foreground transition-colors"
                : "hover:text-foreground transition-colors"
            }
          >
            {t.footer.behance}
          </a>
          <a
            href="#"
            className={
              onPrimary
                ? "hover:text-primary-foreground transition-colors"
                : "hover:text-foreground transition-colors"
            }
          >
            {t.footer.linkedin}
          </a>
        </div>
      </div>
    </footer>
  );
}
