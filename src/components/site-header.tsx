import { Link } from "@tanstack/react-router";
import { useState } from "react";

const nav = [
  { to: "/", label: "Etusivu" },
  { to: "/kotisivut-yrityksille", label: "Kotisivut yrityksille" },
  { to: "/diginakyvyys", label: "Diginäkyvyys" },
  { to: "/meista", label: "Meistä" },
  { to: "/yhteys", label: "Ota yhteyttä" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="py-8 sm:py-10 relative z-20">
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="text-base font-serif tracking-tight" onClick={() => setOpen(false)}>
          Hola<span className="text-accent">Digi.</span>
        </Link>

        <div className="hidden md:flex gap-8 text-sm text-foreground/70">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="hover:text-foreground transition-colors"
              activeProps={{ className: "text-foreground" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <Link
          to="/yhteys"
          className="hidden md:inline-block text-sm border-b border-foreground/30 pb-0.5 hover:border-foreground transition-colors"
        >
          Aloita projekti
        </Link>

        <button
          type="button"
          aria-label="Valikko"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="md:hidden inline-flex items-center justify-center size-9 -mr-2"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-6">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden absolute inset-x-0 top-full bg-background border-t border-border">
          <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col gap-4">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="text-lg text-foreground/80 hover:text-foreground"
                activeProps={{ className: "text-accent" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
