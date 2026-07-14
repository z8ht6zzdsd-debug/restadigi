import type { ReactNode } from "react";

type PageHeroProps = {
  image: string;
  title: ReactNode;
  description: ReactNode;
  actions?: ReactNode;
  tall?: boolean;
};

const SITE_TAGLINE =
  "DIGITAALISEN KASVUN KUMPPANI MATKAILU- JA RAVINTOLA-ALAN YRITYKSILLE";

export function PageHero({ image, title, description, actions, tall }: PageHeroProps) {
  return (
    <header className="page-hero">
      <div className="max-w-6xl mx-auto">
        <p className="page-hero__tagline">{SITE_TAGLINE}</p>

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
            <h1 className="page-hero__title">{title}</h1>
            <p className="page-hero__description">{description}</p>
            {actions && <div className="page-hero__actions">{actions}</div>}
          </div>
        </div>
      </div>
    </header>
  );
}
