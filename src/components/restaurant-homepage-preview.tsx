import erikoismenut from "@/assets/mock-erikoismenut.jpg";
import tapahtumat from "@/assets/mock-tapahtumat.jpg";
import ryhmille from "@/assets/mock-ryhmille.jpg";
import { useMessages } from "@/i18n";

/** Mini-mock: ravintolan verkkosivun etusivu — editorial / ei geneerinen AI-layout */
export function RestaurantHomepagePreview({ image }: { image: string }) {
  const { home } = useMessages();
  const p = home.sitePreview;

  const tiles = [
    { label: p.tileSpecialMenus, image: erikoismenut, position: "center 45%", n: "01" },
    { label: p.tileEvents, image: tapahtumat, position: "center 40%", n: "02" },
    { label: p.tileGroups, image: ryhmille, position: "center 45%", n: "03" },
  ] as const;

  return (
    <div className="relative flex size-full flex-col overflow-hidden bg-[#f3eee8]" aria-hidden>
      {/* Paper texture + corner marks */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(67,47,36,0.18) 1px, transparent 0)",
          backgroundSize: "10px 10px",
        }}
      />
      <span className="pointer-events-none absolute left-1.5 top-1.5 size-2 border-l border-t border-[#432f24]/35" />
      <span className="pointer-events-none absolute right-1.5 top-1.5 size-2 border-r border-t border-[#432f24]/35" />
      <span className="pointer-events-none absolute bottom-1.5 left-1.5 size-2 border-b border-l border-[#432f24]/35" />
      <span className="pointer-events-none absolute bottom-1.5 right-1.5 size-2 border-b border-r border-[#432f24]/35" />

      {/* Yläpalkki — monogrammi + nav */}
      <div className="relative z-[1] flex shrink-0 items-center justify-between gap-2 border-b border-[#432f24]/10 bg-[#f7f3ee]/95 px-2.5 py-2 sm:px-3 sm:py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="inline-flex size-5 items-center justify-center rounded-full border border-[#432f24]/40 font-serif text-[0.55rem] italic leading-none text-[#432f24] sm:size-6 sm:text-[0.65rem]">
            A
          </span>
          <span className="font-serif text-[0.72rem] italic leading-none tracking-tight text-[#432f24] sm:text-[0.82rem]">
            Atelier
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[0.42rem] font-semibold uppercase tracking-[0.16em] text-[#432f24]/50 sm:gap-2 sm:text-[0.48rem]">
          <span>{p.navMenu}</span>
          <span className="text-[#c9a882]">·</span>
          <span>{p.navHours}</span>
          <span className="text-[#c9a882]">·</span>
          <span>{p.navContact}</span>
        </div>
      </div>

      {/* Hero — asymmetrinen editorial */}
      <div className="relative z-[1] min-h-0 flex-1 overflow-hidden">
        <img
          src={image}
          alt=""
          className="absolute inset-0 size-full object-cover object-[center_32%] scale-[1.04]"
        />
        {/* Vinot aksentit */}
        <div
          className="pointer-events-none absolute -right-6 top-0 h-full w-16 -skew-x-12 bg-gradient-to-l from-[#c9a882]/35 to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, rgba(26,18,14,0.55) 0%, transparent 42%, transparent 55%, rgba(26,18,14,0.82) 100%)",
          }}
        />
        {/* Script watermark */}
        <span className="pointer-events-none absolute -right-1 top-3 rotate-12 font-script text-[2.4rem] leading-none text-white/15 sm:text-[2.8rem]">
          Atelier
        </span>

        <div className="absolute inset-x-0 bottom-0 flex flex-col items-start px-3 pb-3.5 pt-12 text-left sm:px-3.5 sm:pb-4">
          <div className="mb-2 flex items-center gap-2">
            <span className="h-px w-5 bg-[#c9a882]" />
            <span className="text-[0.42rem] uppercase tracking-[0.28em] text-[#c9a882] sm:text-[0.48rem]">
              {p.tagline}
            </span>
          </div>
          <p className="font-serif text-[1.45rem] italic leading-[0.95] text-white sm:text-[1.65rem]">
            Atelier
          </p>
          <div className="mt-2.5 flex flex-wrap items-center gap-1.5 sm:mt-3 sm:gap-2">
            <span className="inline-flex rounded-sm bg-[#c9a882] px-2.5 py-1.5 text-[0.48rem] font-bold uppercase tracking-[0.1em] text-[#2a1f18] sm:text-[0.52rem]">
              {p.bookTable}
            </span>
            <span className="inline-flex rounded-sm border border-white/55 bg-transparent px-2.5 py-1.5 text-[0.48rem] font-bold uppercase tracking-[0.1em] text-white sm:text-[0.52rem]">
              {p.customerService}
            </span>
          </div>
        </div>
      </div>

      {/* Alarivi — numeroidut kortit */}
      <div className="relative z-[1] grid shrink-0 grid-cols-3 gap-1 border-t border-[#432f24]/10 bg-[#f7f3ee] p-1.5 sm:gap-1.5 sm:p-2">
        {tiles.map((tile) => (
          <div
            key={tile.label}
            className="group relative flex aspect-[5/4] flex-col overflow-hidden rounded-[0.35rem] bg-[#ebe8e2]"
          >
            <img
              src={tile.image}
              alt=""
              className="absolute inset-0 size-full object-cover"
              style={{ objectPosition: tile.position }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a120e]/80 via-[#1a120e]/20 to-transparent" />
            <span className="absolute left-1 top-1 font-serif text-[0.55rem] italic leading-none text-white/70 sm:text-[0.6rem]">
              {tile.n}
            </span>
            <p className="absolute inset-x-0 bottom-0 px-1 pb-1 text-[0.34rem] font-semibold uppercase leading-tight tracking-[0.08em] text-white sm:text-[0.38rem]">
              {tile.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
