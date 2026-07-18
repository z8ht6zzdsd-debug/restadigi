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
        onPrimary ? "py-12 border-t border-primary-foreground/15" : "py-12 border-t border-border"
      }
    >
      <div className="mx-auto max-w-6xl px-6">
        <div
          className={
            onPrimary ? "text-sm text-primary-foreground/55" : "text-sm text-muted-foreground"
          }
        >
          {copyright}
        </div>
      </div>
    </footer>
  );
}
