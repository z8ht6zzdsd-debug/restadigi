import type { ReactNode } from "react";

type PageHeroProps = {
  image: string;
  label: string;
  title: ReactNode;
  description: ReactNode;
  actions?: ReactNode;
};

export function PageHero({ image, label, title, description, actions }: PageHeroProps) {
  return (
    <header className="px-6 pb-8 sm:pb-12">
      <div className="max-w-6xl mx-auto">
        <div className="relative isolate flex min-h-[min(75vh,36rem)] flex-col justify-end overflow-hidden rounded-sm sm:min-h-[min(70vh,32rem)]">
          <img
            src={image}
            alt=""
            aria-hidden
            width={1600}
            height={900}
            className="absolute inset-0 size-full object-cover"
          />

          <div
            className="absolute inset-y-0 left-0 w-full max-w-4xl bg-gradient-to-r from-foreground/90 via-foreground/55 to-transparent"
            aria-hidden
          />
          <div
            className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-foreground/75 via-foreground/20 to-transparent"
            aria-hidden
          />

          <div className="relative z-10 px-8 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 backdrop-blur-sm">
              <span className="size-1.5 rounded-full bg-accent" aria-hidden />
              <span className="text-xs uppercase tracking-[0.2em] text-white/80">{label}</span>
            </div>

            <h1 className="mb-6 max-w-[16ch] text-4xl font-medium leading-[1.02] tracking-tight text-balance text-white sm:text-6xl lg:text-7xl">
              {title}
            </h1>

            <p className="max-w-xl text-base leading-relaxed text-pretty text-white/75 sm:text-lg">
              {description}
            </p>

            {actions && <div className="mt-10 flex flex-wrap items-center gap-4">{actions}</div>}
          </div>
        </div>
      </div>
    </header>
  );
}
