import type { ReactNode } from "react";

type PageHeroProps = {
  image: string;
  title: ReactNode;
  description: ReactNode;
  actions?: ReactNode;
  tall?: boolean;
  /** Laitemockup: laitteet ylhäällä, teksti alla omalla kaistalla */
  devices?: boolean;
};

export function PageHero({ image, title, description, actions, tall, devices }: PageHeroProps) {
  if (devices) {
    return (
      <header className="page-hero page-hero--devices">
        <div className="page-hero__devices-visual">
          <img
            src={image}
            alt=""
            aria-hidden
            width={1600}
            height={900}
            className="page-hero__devices-image"
          />
        </div>
        <div className="page-hero__devices-copy">
          <div className="page-hero__devices-copy-inner">
            <h1 className="page-hero__title">{title}</h1>
            <p className="page-hero__description">{description}</p>
            {actions && <div className="page-hero__actions">{actions}</div>}
          </div>
        </div>
      </header>
    );
  }

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
