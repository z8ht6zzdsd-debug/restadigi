import type { ReactNode } from "react";
import { PhoneShopPreview } from "./phone-shop-preview";

type PageHeroProps = {
  image: string;
  title: ReactNode;
  description: ReactNode;
  actions?: ReactNode;
  /** Optional promo chip on the brown devices hero band */
  promo?: ReactNode;
  /** Optional photo overlaid on the left phone screen (devices hero) */
  phoneScreenImage?: string;
  /** Optional sharp coffee photo over the big tablet left panel */
  tabletCoffeeImage?: string;
  tall?: boolean;
  /** Laitemockup: laitteet ylhäällä, teksti alla omalla kaistalla */
  devices?: boolean;
  /** Full-bleed lifestyle: left-aligned copy on the image (McDonald’s-style) */
  lifestyle?: boolean;
  /** Extra classes for the hero image (e.g. object-position) */
  imageClassName?: string;
};

export function PageHero({
  image,
  title,
  description,
  actions,
  promo,
  phoneScreenImage,
  tabletCoffeeImage,
  tall,
  devices,
  lifestyle,
  imageClassName,
}: PageHeroProps) {
  if (devices) {
    return (
      <header className="page-hero page-hero--devices">
        <div className="page-hero__devices-visual">
          <div className="page-hero__devices-stage">
            <img
              src={image}
              alt=""
              aria-hidden
              width={1600}
              height={900}
              className={"page-hero__devices-image" + (imageClassName ? ` ${imageClassName}` : "")}
            />
            {tabletCoffeeImage && (
              <div className="page-hero__devices-tablet-coffee" aria-hidden>
                <img src={tabletCoffeeImage} alt="" />
              </div>
            )}
            {phoneScreenImage && (
              <div className="page-hero__devices-phone page-hero__devices-phone--slim" aria-hidden>
                <div className="page-hero__devices-phone-bezel">
                  <span className="page-hero__devices-phone-island" />
                  <div className="page-hero__devices-phone-screen">
                    <PhoneShopPreview image={phoneScreenImage} />
                  </div>
                </div>
              </div>
            )}
            {promo && <div className="page-hero__devices-promo">{promo}</div>}
          </div>
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

  if (lifestyle) {
    return (
      <header className="page-hero page-hero--lifestyle">
        <div
          className={
            "page-hero__frame page-hero__frame--bleed page-hero__frame--lifestyle" +
            (tall ? " page-hero__frame--home" : "")
          }
        >
          <img
            src={image}
            alt=""
            aria-hidden
            width={1600}
            height={900}
            className={"page-hero__image" + (imageClassName ? ` ${imageClassName}` : "")}
          />
          <div className="page-hero__lifestyle-scrim" aria-hidden />
          <div className="page-hero__content-wrap page-hero__content-wrap--lifestyle">
            <div className="page-hero__content page-hero__content--lifestyle">
              <h1 className="page-hero__title page-hero__title--lifestyle">{title}</h1>
              <p className="page-hero__description page-hero__description--lifestyle">
                {description}
              </p>
              {actions && (
                <div className="page-hero__actions page-hero__actions--lifestyle">{actions}</div>
              )}
            </div>
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
          className={"page-hero__image" + (imageClassName ? ` ${imageClassName}` : "")}
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
