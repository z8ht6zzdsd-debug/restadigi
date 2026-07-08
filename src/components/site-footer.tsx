export function SiteFooter() {
  return (
    <footer className="py-12 border-t border-border">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} YritysDIGI — Helsinki
        </div>
        <div className="flex gap-8 text-xs uppercase tracking-[0.15em] text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">Instagram</a>
          <a href="#" className="hover:text-foreground transition-colors">Behance</a>
          <a href="#" className="hover:text-foreground transition-colors">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
