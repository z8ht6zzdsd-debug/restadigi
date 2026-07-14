import { Link } from "@tanstack/react-router";
import { useState } from "react";
import restadigiLogo from "@/assets/restadigi-logo.png";

const nav = [
  { to: "/kotisivut-yrityksille", label: "VERKKOSIVUT" },
  { to: "/diginakyvyys", label: "NÄKYVYYS JA SUUNNITTELU" },
  { to: "/chatbot", label: "AI-ASIAKASPALVELU" },
  { to: "/potyvarauspalvelu", label: "PÖYTÄVARAUSPALVELU" },
  { to: "/yhteys", label: "YHTEYS" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="relative z-20 pt-4 pb-0 sm:pt-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 pl-2 pr-6 sm:pl-3 lg:pl-1">
        <Link
          to="/"
          className="inline-flex shrink-0 items-center"
          onClick={() => setOpen(false)}
          aria-label="Restadigi — etusivu"
        >
          <img
            src={restadigiLogo}
            alt="Restadigi — AI ja web"
            width={640}
            height={172}
            className="h-32 w-auto sm:h-36 lg:h-40"
          />
        </Link>

        <div className="hidden items-center gap-5 text-xs tracking-[0.12em] text-foreground/70 lg:flex xl:gap-6 xl:text-sm">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="whitespace-nowrap hover:text-foreground transition-colors"
              activeProps={{ className: "text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
        </div>

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
          <div className="mx-auto flex max-w-6xl flex-col gap-4 py-6 pl-2 pr-6 sm:pl-3 lg:pl-1">
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
