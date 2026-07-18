import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

type ServiceSplitHeroProps = {
  image: string;
  imageClassName?: string;
  icon: LucideIcon;
  overlayTitle: ReactNode;
  overlayDescription: string;
  headlineLine1: string;
  headlineLine2: string;
  subtitle: string;
  actions: ReactNode;
};

/**
 * Desktop: kuva + overlay-kortti + sivuteksti.
 * Mobiili: otsikko kuvan päällä ruskealla feidauksella + headline CTA alla.
 */
export function ServiceSplitHero({
  image,
  imageClassName,
  icon: Icon,
  overlayTitle,
  overlayDescription,
  headlineLine1,
  headlineLine2,
  subtitle,
  actions,
}: ServiceSplitHeroProps) {
  return (
    <section className="w-full bg-background px-6 py-8 sm:py-14 lg:py-16">
      <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] sm:aspect-[16/11] sm:rounded-[2.5rem] lg:aspect-[5/3]">
            <img
              src={image}
              alt=""
              aria-hidden
              className={
                "absolute inset-0 size-full object-cover" +
                (imageClassName ? ` ${imageClassName}` : "")
              }
            />

            {/* Mobiili / tabletti: teksti kuvan päällä, ruskea feidaus */}
            <div className="absolute inset-0 z-10 flex flex-col justify-end lg:hidden">
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-[#432f24] via-[#432f24]/75 to-transparent"
                aria-hidden
              />
              <div className="relative px-5 pb-5 pt-10 sm:px-7 sm:pb-7">
                <div className="flex items-start gap-3">
                  <span
                    className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent ring-1 ring-accent/35"
                    aria-hidden
                  >
                    <Icon className="size-4" strokeWidth={1.75} />
                  </span>
                  <h2 className="text-left text-[1.65rem] font-medium leading-[1.12] tracking-tight text-[#f7f3ee] sm:text-3xl">
                    {overlayTitle}
                  </h2>
                </div>
              </div>
            </div>

            {/* Desktop: kortti kuvan keskellä */}
            <div
              className="absolute inset-0 hidden bg-[#432f24]/25 lg:block"
              aria-hidden
            />
            <div className="absolute inset-0 hidden items-center justify-center p-8 lg:flex">
              <div className="w-[92%] max-w-2xl rounded-3xl bg-[#432f24]/92 px-10 py-10 text-center shadow-lg">
                <div className="flex items-center justify-center gap-4">
                  <span
                    className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent ring-1 ring-accent/35"
                    aria-hidden
                  >
                    <Icon className="size-6" strokeWidth={1.75} />
                  </span>
                  <h2 className="text-left text-4xl font-medium leading-[1.1] tracking-tight text-[#f7f3ee] lg:text-[2.75rem]">
                    {overlayTitle}
                  </h2>
                </div>
                <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#f7f3ee]/85">
                  {overlayDescription}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 lg:pl-2">
          <h1 className="text-3xl font-bold leading-[1.08] tracking-tight text-balance sm:text-4xl lg:text-5xl">
            <span className="block">{headlineLine1}</span>
            <span className="block">{headlineLine2}</span>
          </h1>
          <p className="mt-5 text-base leading-relaxed text-foreground/75 sm:text-lg">
            {subtitle}
          </p>
          <div className="mt-8">{actions}</div>
        </div>
      </div>
    </section>
  );
}
