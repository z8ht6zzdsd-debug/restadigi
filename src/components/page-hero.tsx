import type { ReactNode } from "react";

type PageHeroProps = {
  image: string;
  title: ReactNode;
  description: ReactNode;
  actions?: ReactNode;
  tall?: boolean;
};

export function PageHero({ image, title, description, actions, tall }: PageHeroProps) {
  const frameClass = [
    "page-hero__frame",
    "page-hero__frame--bleed",
    tall ? "page-hero__frame--home" : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className="page-hero page-hero--bleed">
      <div className={frameClass}>
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

        <div className="page-hero__content-wrap">
          <div className="page-hero__content">
            <div className="page-hero__copy">
              <h1 className="page-hero__title">{title}</h1>
              <p className="page-hero__description">{description}</p>
            </div>
            {actions && <div className="page-hero__actions">{actions}</div>}
          </div>
        </div>
      </div>
    </header>
  );
}
