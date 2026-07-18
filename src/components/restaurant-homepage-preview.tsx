/** Mini-mock: ravintolan verkkosivun etusivu laitteen näytöllä */
export function RestaurantHomepagePreview({ image }: { image: string }) {
  return (
    <div className="flex size-full flex-col bg-[#f7f3ee]" aria-hidden>
      {/* Sivuston yläpalkki */}
      <div className="flex shrink-0 items-center justify-between gap-2 bg-white px-2.5 py-2 sm:px-3 sm:py-2.5">
        <span className="font-serif text-[0.7rem] italic leading-none text-[#432f24] sm:text-[0.8rem]">
          Atelier
        </span>
        <div className="flex items-center gap-2 text-[0.45rem] font-semibold uppercase tracking-[0.14em] text-[#432f24]/55 sm:gap-2.5 sm:text-[0.5rem]">
          <span>Menu</span>
          <span>Aukiolo</span>
          <span>Yhteys</span>
        </div>
      </div>

      {/* Hero — ravintolan etusivu */}
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <img
          src={image}
          alt=""
          className="absolute inset-0 size-full object-cover object-[center_35%]"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#1a120e]/80 via-[#1a120e]/25 to-[#1a120e]/30"
          aria-hidden
        />
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center px-3 pb-4 pt-10 text-center sm:pb-5">
          <p className="font-serif text-[1.35rem] italic leading-none text-white sm:text-[1.55rem]">
            Atelier
          </p>
          <p className="mt-1.5 text-[0.5rem] uppercase tracking-[0.22em] text-white/75 sm:text-[0.55rem]">
            Helsinki · Illallinen
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5 sm:mt-3.5 sm:gap-2">
            <span className="inline-flex rounded-full bg-[#c9a882] px-3 py-1.5 text-[0.5rem] font-bold uppercase tracking-[0.12em] text-[#2a1f18] sm:text-[0.55rem]">
              Varaa pöytä
            </span>
            <span className="inline-flex rounded-full bg-white/95 px-3 py-1.5 text-[0.5rem] font-bold uppercase tracking-[0.12em] text-[#2a1f18] sm:text-[0.55rem]">
              Asiakaspalvelu
            </span>
          </div>
        </div>
      </div>

      {/* Etusivun alarivi: kolme sisältöpalikkaa */}
      <div className="grid shrink-0 grid-cols-3 gap-1 bg-white p-1.5 sm:gap-1.5 sm:p-2">
        {["Menu", "Tunnelma", "Ryhmille"].map((label) => (
          <div
            key={label}
            className="flex aspect-[5/4] flex-col justify-end overflow-hidden rounded-md bg-[#ebe8e2]"
          >
            <div className="relative min-h-0 flex-1 overflow-hidden">
              <img
                src={image}
                alt=""
                className="absolute inset-0 size-full object-cover opacity-80"
                style={{
                  objectPosition:
                    label === "Menu"
                      ? "20% 60%"
                      : label === "Tunnelma"
                        ? "70% 30%"
                        : "50% 80%",
                }}
              />
              <div className="absolute inset-0 bg-[#432f24]/35" />
            </div>
            <p className="bg-white px-1 py-1 text-center text-[0.4rem] font-semibold uppercase tracking-[0.12em] text-[#432f24]/70 sm:text-[0.45rem]">
              {label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
