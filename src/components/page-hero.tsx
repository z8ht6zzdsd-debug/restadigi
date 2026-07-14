import type { ReactNode } from "react";

type PageHeroProps = {
  image: string;
  label: string;
  title: ReactNode;
  description: ReactNode;
  actions?: ReactNode;
  tall?: boolean;
};

export function PageHero({ image, label, title, description, actions, tall }: PageHeroProps) {
  return (
    <header className="page-hero">
      <div className="max-w-6xl mx-auto">
        <div className={tall ? "page-hero__frame page-hero__frame--home" : "page-hero__frame"}>
          <img
            src={image}
            alt=""
            aria-hidden
            width={1600}
            height={900}
            className="page-hero__image"
          />

          <div className="page-hero__gradient-side" aria-hidden />
          <div className="page-hero__gradient-bottom" aria-hidden />

          <div className="page-hero__content">
            <div className="page-hero__badge">
              <span className="size-1.5 rounded-full bg-accent" aria-hidden />
              <span className="text-xs uppercase tracking-[0.2em] text-white/80">{label}</span>
            </div>

            <h1 className="page-hero__title">{title}</h1>

            <p className="page-hero__description">{description}</p>

            {actions && <div className="page-hero__actions">{actions}</div>}
          </div>
        </div>
      </div>
    </header>
  );
}
