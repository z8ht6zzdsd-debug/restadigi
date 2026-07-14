import { Link } from "@tanstack/react-router";
import { useState } from "react";
import restadigiLogo from "@/assets/restadigi-logo.png";

const nav = [
  { to: "/kotisivut-yrityksille", label: "VERKKOSIVUT RAVINTOLALLE" },
  { to: "/diginakyvyys", label: "NÄKYVYYS JA SUUNNITTELU" },
  { to: "/chatbot", label: "AI-ASIAKASPALVELU" },
  { to: "/potyvarauspalvelu", label: "PÖYTÄVARAUSPALVELU" },
  { to: "/yhteys", label: "OTA YHTEYTTÄ" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="py-8 sm:py-10 relative z-20">
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <Link
          to="/"
          className="inline-flex shrink-0 items-center"
          onClick={() => setOpen(false)}
          aria-label="Restadigi — etusivu"
        >
          <img
            src={restadigiLogo}
            alt="Restadigi — AI ja web"
            width={180}
            height={48}
            className="h-10 w-auto sm:h-11"
          />
        </Link>

        <div className="hidden lg:flex gap-6 text-sm text-foreground/70">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="hover:text-foreground transition-colors"
              activeProps={{ className: "text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <Link
          to="/yhteys"
          className="hidden lg:inline-block text-sm border-b border-foreground/30 pb-0.5 hover:border-foreground transition-colors"
        >
          Aloita projekti
        </Link>

        <button
          type="button"
          aria-label="Valikko"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="lg:hidden inline-flex items-center justify-center size-9 -mr-2"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="size-6"
          >
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="lg:hidden absolute inset-x-0 top-full bg-background border-t border-border">
          <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col gap-4">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="text-lg text-foreground/80 hover:text-foreground"
                activeProps={{ className: "text-accent" }}
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
