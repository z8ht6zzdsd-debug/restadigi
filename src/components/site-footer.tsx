type SiteFooterProps = {
  /** When set to primary, footer blends into a primary-colored page end. */
  tone?: "default" | "primary";
};

export function SiteFooter({ tone = "default" }: SiteFooterProps) {
  const onPrimary = tone === "primary";

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
          &copy; {new Date().getFullYear()} Restadigi — Helsinki
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
            Instagram
          </a>
          <a
            href="#"
            className={
              onPrimary
                ? "hover:text-primary-foreground transition-colors"
                : "hover:text-foreground transition-colors"
            }
          >
            Behance
          </a>
          <a
            href="#"
            className={
              onPrimary
                ? "hover:text-primary-foreground transition-colors"
                : "hover:text-foreground transition-colors"
            }
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
