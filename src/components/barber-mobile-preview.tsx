import { useMessages } from "@/i18n";

/** Mini-mock: parturin verkkosivu puhelimen näytöllä */
export function BarberMobilePreview() {
  const { home } = useMessages();
  const b = home.barberPreview;

  return (
    <div
      className="relative flex size-full flex-col overflow-hidden bg-[#1a1512] text-[#f4efe8]"
      aria-hidden
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(201,168,130,0.22) 1px, transparent 0)",
          backgroundSize: "8px 8px",
        }}
      />

      {/* Status bar */}
      <div className="relative z-[1] flex shrink-0 items-center justify-between px-2.5 pb-1 pt-2 text-[0.42rem] font-medium text-white/55">
        <span>9:41</span>
        <span className="flex items-center gap-0.5">
          <span className="h-1.5 w-3 rounded-[1px] border border-white/40" />
        </span>
      </div>

      {/* Nav */}
      <div className="relative z-[1] flex shrink-0 items-center justify-between border-b border-white/10 px-2.5 py-1.5">
        <div className="flex items-center gap-1.5">
          <span className="inline-flex size-5 items-center justify-center rounded-full border border-[#c9a882]/70 text-[0.55rem] font-serif italic text-[#c9a882]">
            N
          </span>
          <span className="text-[0.58rem] font-semibold tracking-tight">{b.brand}</span>
        </div>
        <span className="text-[0.38rem] font-semibold uppercase tracking-[0.16em] text-white/45">
          {b.menu}
        </span>
      </div>

      {/* Hero band */}
      <div className="relative z-[1] mx-2 mt-2 overflow-hidden rounded-lg bg-[#2a211c]">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(145deg, rgba(201,168,130,0.28) 0%, transparent 42%, rgba(26,18,14,0.55) 100%), repeating-linear-gradient(-55deg, transparent, transparent 6px, rgba(201,168,130,0.07) 6px, rgba(201,168,130,0.07) 7px)",
          }}
        />
        <div className="relative px-2.5 pb-3 pt-4">
          <p className="text-[0.38rem] font-semibold uppercase tracking-[0.22em] text-[#c9a882]">
            {b.tagline}
          </p>
          <p className="mt-1 font-serif text-[1.05rem] italic leading-[1.02] text-[#f7f3ee]">
            {b.headline}
          </p>
          <span className="mt-2.5 inline-flex rounded-full bg-[#c9a882] px-2.5 py-1 text-[0.42rem] font-bold uppercase tracking-[0.1em] text-[#1a1512]">
            {b.bookCta}
          </span>
        </div>
      </div>

      {/* Services */}
      <div className="relative z-[1] mt-2 flex min-h-0 flex-1 flex-col gap-1 px-2 pb-2">
        {b.services.map((service, i) => (
          <div
            key={service}
            className="flex items-center justify-between rounded-md border border-white/10 bg-white/[0.04] px-2 py-1.5"
          >
            <div className="flex items-center gap-1.5">
              <span className="font-serif text-[0.55rem] italic text-[#c9a882]/80">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[0.52rem] font-medium tracking-tight">{service}</span>
            </div>
            <span className="text-[0.4rem] uppercase tracking-[0.12em] text-white/40">
              {b.bookShort}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
