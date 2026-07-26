/** Restabooking hero: laptop + phone admin panel mock — no stock photo. */

type StayBookingHeroDevicesProps = {
  className?: string;
  navItems: string[];
  activeNav: string;
  calendarTitle: string;
  phoneTitle: string;
  phoneItems: string[];
  rooms?: string[];
};

const DEFAULT_ROOMS = ["Merinäköala", "Villa Aava", "Sviitti", "Standard"];

const BOOKING_BLOCKS = [
  { row: 0, start: 1, span: 3, tone: "a" as const },
  { row: 1, start: 0, span: 2, tone: "b" as const },
  { row: 1, start: 3, span: 2, tone: "a" as const },
  { row: 2, start: 2, span: 3, tone: "c" as const },
  { row: 3, start: 0, span: 4, tone: "b" as const },
];

const TONE = {
  a: "bg-[#432f24] text-white",
  b: "bg-[#c46a32] text-white",
  c: "bg-[#c46a32]/25 text-[#432f24]",
} as const;

export function StayBookingHeroDevices({
  className = "",
  navItems,
  activeNav,
  calendarTitle,
  phoneTitle,
  phoneItems,
  rooms = DEFAULT_ROOMS,
}: StayBookingHeroDevicesProps) {
  const days = ["18", "19", "20", "21", "22", "23", "24"];

  return (
    <div
      className={
        "relative mx-auto w-full max-w-[34rem] select-none pb-2 pl-1 pt-1 sm:pb-3 sm:pl-2 lg:ml-0 lg:mr-auto " +
        className
      }
      aria-hidden
    >
      {/* Soft brand oval behind devices */}
      <div
        className="pointer-events-none absolute left-[6%] top-[10%] h-[76%] w-[82%] rounded-[50%] bg-[#d0d0d0]/55 blur-[2px]"
        aria-hidden
      />

      {/* Laptop */}
      <div className="relative z-[1] ml-auto w-[88%] origin-bottom sm:w-[86%]">
        <div className="relative overflow-hidden rounded-[0.65rem] bg-gradient-to-b from-[#4a4540] via-[#2a2622] to-[#141210] p-[0.45rem] shadow-[0_28px_70px_-18px_rgba(26,18,14,0.55)] ring-1 ring-black/25 sm:rounded-[0.85rem] sm:p-[0.55rem]">
          <span className="absolute left-1/2 top-[0.28rem] z-[2] h-[0.22rem] w-[0.22rem] -translate-x-1/2 rounded-full bg-[#0a0908] ring-1 ring-white/10 sm:top-[0.35rem]" />
          <div className="relative aspect-[16/10] overflow-hidden rounded-[0.28rem] bg-[#f0f0f0] sm:rounded-[0.35rem]">
            <div className="flex h-full min-h-0">
              <nav className="hidden w-[30%] shrink-0 flex-col gap-0.5 border-r border-[#e5e0d8] bg-[#1a1512] p-1.5 sm:flex sm:p-2">
                <p className="mb-1 truncate px-1 text-[6px] font-semibold uppercase tracking-[0.14em] text-[#c46a32] sm:text-[7px]">
                  Restabooking
                </p>
                {navItems.slice(0, 7).map((label) => {
                  const active = label === activeNav;
                  return (
                    <div
                      key={label}
                      className={
                        "truncate rounded-sm px-1.5 py-1 text-[6px] leading-tight sm:text-[7px] " +
                        (active ? "bg-[#c46a32] text-white" : "text-[#f0f0f0]/75")
                      }
                    >
                      {label}
                    </div>
                  );
                })}
              </nav>

              <div className="flex min-w-0 flex-1 flex-col bg-[#f0f0f0]">
                <div className="flex items-center justify-between border-b border-[#e5e0d8] bg-white px-2 py-1.5 sm:px-2.5">
                  <div className="min-w-0">
                    <p className="text-[6px] uppercase tracking-[0.14em] text-[#8a8178]">
                      Hallintapaneeli
                    </p>
                    <p className="truncate text-[9px] font-semibold text-[#1a1512] sm:text-[10px]">
                      {calendarTitle}
                    </p>
                  </div>
                  <span className="hidden rounded-full bg-[#432f24] px-2 py-0.5 text-[6px] font-medium text-white sm:inline">
                    Heinäkuu
                  </span>
                </div>

                <div className="min-h-0 flex-1 p-1.5 sm:p-2">
                  <div className="mb-1 grid grid-cols-[3.2rem_repeat(7,minmax(0,1fr))] gap-0.5 text-center text-[5px] text-[#8a8178] sm:grid-cols-[4rem_repeat(7,minmax(0,1fr))] sm:text-[6px]">
                    <span />
                    {days.map((d) => (
                      <span key={d}>{d}</span>
                    ))}
                  </div>
                  <div className="space-y-0.5">
                    {rooms.slice(0, 4).map((room, row) => (
                      <div
                        key={room}
                        className="grid grid-cols-[3.2rem_repeat(7,minmax(0,1fr))] gap-0.5 sm:grid-cols-[4rem_repeat(7,minmax(0,1fr))]"
                      >
                        <span className="truncate self-center text-[5px] font-medium text-[#432f24] sm:text-[6px]">
                          {room}
                        </span>
                        {days.map((_, col) => {
                          const block = BOOKING_BLOCKS.find(
                            (b) => b.row === row && col >= b.start && col < b.start + b.span,
                          );
                          const isStart = block && col === block.start;
                          if (block && !isStart) {
                            return <span key={col} className="h-4 sm:h-5" />;
                          }
                          if (isStart && block) {
                            return (
                              <span
                                key={col}
                                className={
                                  "col-span-" +
                                  block.span +
                                  " flex h-4 items-center justify-center rounded-[2px] text-[5px] font-medium sm:h-5 sm:text-[6px] " +
                                  TONE[block.tone]
                                }
                                style={{ gridColumn: `span ${block.span} / span ${block.span}` }}
                              >
                                ●
                              </span>
                            );
                          }
                          return (
                            <span
                              key={col}
                              className="h-4 rounded-[2px] bg-white ring-1 ring-[#d6d6d6] sm:h-5"
                            />
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative mx-[-2%] h-[0.55rem] rounded-b-[0.55rem] bg-gradient-to-b from-[#3a3530] to-[#1c1916] shadow-[0_10px_24px_-8px_rgba(26,18,14,0.45)] sm:h-[0.7rem] sm:rounded-b-[0.7rem]">
          <span className="absolute inset-x-[28%] top-0 h-px bg-white/15" />
          <span className="absolute left-1/2 top-[0.12rem] h-[0.28rem] w-[18%] -translate-x-1/2 rounded-sm bg-[#12100e]/80 sm:h-[0.35rem]" />
        </div>
      </div>

      {/* Phone */}
      <div className="absolute bottom-0 left-0 z-[2] w-[28%] sm:w-[26%]">
        <div className="relative overflow-hidden rounded-[1.15rem] bg-gradient-to-br from-[#4a4540] via-[#2a2622] to-[#0e0c0b] p-[0.22rem] shadow-[0_22px_50px_-14px_rgba(26,18,14,0.7)] ring-1 ring-white/10 sm:rounded-[1.35rem] sm:p-[0.26rem]">
          <span className="absolute left-1/2 top-[0.36rem] z-[3] h-[0.55rem] w-[28%] -translate-x-1/2 rounded-full bg-[#050403] sm:top-[0.42rem] sm:h-[0.62rem]" />
          <div className="relative aspect-[9/19.2] overflow-hidden rounded-[0.95rem] bg-[#f0f0f0] sm:rounded-[1.1rem]">
            <div className="border-b border-[#e5e0d8] bg-white px-2 pb-1.5 pt-5">
              <p className="text-[5px] uppercase tracking-[0.14em] text-[#8a8178]">Restabooking</p>
              <p className="text-[8px] font-semibold text-[#1a1512]">{phoneTitle}</p>
            </div>
            <ul className="space-y-1 p-1.5">
              {phoneItems.slice(0, 5).map((item, i) => (
                <li
                  key={item}
                  className="rounded-sm border border-[#e5e0d8] bg-white px-1.5 py-1"
                >
                  <div className="flex items-center gap-1">
                    <span
                      className={
                        "size-1.5 shrink-0 rounded-full " +
                        (i % 2 === 0 ? "bg-[#c46a32]" : "bg-[#432f24]")
                      }
                    />
                    <p className="truncate text-[6px] font-medium leading-tight text-[#1a1512]">
                      {item}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <span className="absolute bottom-[0.28rem] left-1/2 z-[3] h-[0.12rem] w-[28%] -translate-x-1/2 rounded-full bg-white/30" />
        </div>
      </div>
    </div>
  );
}
