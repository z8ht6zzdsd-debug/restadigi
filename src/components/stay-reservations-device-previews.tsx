/** Marketing mock: lodging stays dashboard on tablet + monitor. */

const SAMPLE_DAYS = [
  { d: "14", booked: true },
  { d: "15", booked: true },
  { d: "16", booked: false },
  { d: "17", booked: true },
  { d: "18", booked: true },
  { d: "19", booked: false },
  { d: "20", booked: true },
];

const SAMPLE_STAYS = [
  {
    name: "Anna Korhonen",
    meta: "18.–20.7. · Merinäköala · 2 hlö",
    phone: "+358 40 111 2233",
    status: "Vahvistettu",
    statusTone: "ok" as const,
  },
  {
    name: "James Miller",
    meta: "18.–22.7. · Sviitti · 3 hlö",
    phone: "+44 7700 900123",
    status: "Odottaa",
    statusTone: "wait" as const,
  },
  {
    name: "Sofía Ruiz",
    meta: "19.–21.7. · Standard · 2 hlö",
    phone: "+34 612 345 678",
    status: "Vahvistettu",
    statusTone: "ok" as const,
  },
];

function StatusPill({ label, tone }: { label: string; tone: "ok" | "wait" }) {
  return (
    <span
      className={
        "shrink-0 rounded-full px-1.5 py-0.5 text-[6px] uppercase tracking-wide " +
        (tone === "ok" ? "bg-[#c46a32]/15 text-[#a35528]" : "bg-[#432f24]/10 text-[#432f24]")
      }
    >
      {label}
    </span>
  );
}

function MiniCalendar({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "p-2" : "p-2.5"}>
      <p className="mb-1.5 text-[8px] font-medium text-[#1a1512]">Heinäkuu 2026</p>
      <div className="mb-1 grid grid-cols-7 gap-0.5 text-center text-[5px] uppercase tracking-wide text-[#8a8178]">
        {["Ma", "Ti", "Ke", "To", "Pe", "La", "Su"].map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-0.5">
        {Array.from({ length: 3 }, (_, i) => (
          <span key={`e${i}`} className="aspect-square" />
        ))}
        {SAMPLE_DAYS.map((day) => (
          <span
            key={day.d}
            className={
              "flex aspect-square items-center justify-center rounded-[2px] text-[7px] tabular-nums " +
              (day.d === "18"
                ? "bg-[#432f24] font-medium text-white"
                : day.booked
                  ? "bg-[#c46a32]/25 font-semibold text-[#432f24]"
                  : "text-[#1a1512]")
            }
          >
            {day.d}
          </span>
        ))}
      </div>
    </div>
  );
}

function StayRows({ dense = false }: { dense?: boolean }) {
  return (
    <ul className={dense ? "space-y-1.5" : "space-y-2"}>
      {SAMPLE_STAYS.map((row) => (
        <li key={row.name} className="rounded-sm border border-[#e5e0d8] bg-white px-2 py-1.5">
          <div className="flex items-start justify-between gap-1">
            <p className="truncate text-[8px] font-medium text-[#1a1512]">{row.name}</p>
            <StatusPill label={row.status} tone={row.statusTone} />
          </div>
          <p className="mt-0.5 text-[7px] text-[#6b635c]">{row.meta}</p>
          <p className="text-[7px] text-[#8a8178]">{row.phone}</p>
        </li>
      ))}
    </ul>
  );
}

function MonitorPreview() {
  return (
    <div className="w-full max-w-[22rem]">
      <div className="rounded-[0.95rem] border border-[#2a221c] bg-[#1a1512] p-[0.45rem] shadow-[0_18px_44px_-12px_rgba(26,18,12,0.4)]">
        <div className="overflow-hidden rounded-[0.55rem] border border-[#3d322a] bg-[#f7f5f2]">
          <div className="border-b border-[#e5e0d8] bg-white px-2.5 py-2">
            <p className="text-[6px] uppercase tracking-[0.18em] text-[#8a8178]">Restabooking</p>
            <p className="text-[10px] font-medium text-[#1a1512]">Majoitusvaraukset</p>
          </div>

          <div className="flex min-h-[12.5rem] sm:min-h-[14rem]">
            <nav className="hidden w-[4.25rem] shrink-0 border-r border-[#e5e0d8] bg-[#faf8f5] p-1.5 sm:block">
              {[
                { label: "Yhteenveto", active: false },
                { label: "Varaukset", active: true },
                { label: "Huoneet", active: false },
              ].map((item) => (
                <div
                  key={item.label}
                  className={
                    "mb-1 rounded-sm px-1.5 py-1.5 text-[8px] leading-tight " +
                    (item.active ? "bg-[#432f24] text-white" : "text-[#6b635c]")
                  }
                >
                  {item.label}
                </div>
              ))}
            </nav>

            <div className="grid flex-1 gap-2 p-2 sm:grid-cols-[7.5rem_1fr] sm:p-2.5">
              <div className="rounded-sm border border-[#e5e0d8] bg-white">
                <MiniCalendar />
              </div>
              <div className="min-w-0">
                <p className="mb-1.5 text-[9px] font-medium text-[#1a1512]">Saapumiset · 18.7.</p>
                <StayRows />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-0 flex w-[28%] flex-col items-center">
        <div className="h-3 w-[18%] bg-[#2a221c]" />
        <div className="h-1.5 w-full rounded-b-sm bg-[#1a1512]" />
      </div>
    </div>
  );
}

function TabletPreview() {
  return (
    <div className="w-full max-w-[11.5rem]">
      <div className="rounded-[1.15rem] border border-[#2a221c] bg-[#1a1512] p-[0.4rem] shadow-[0_18px_40px_-14px_rgba(26,18,12,0.45)]">
        <div className="overflow-hidden rounded-[0.75rem] border border-[#3d322a] bg-[#f7f5f2]">
          <div className="flex justify-center bg-[#1a1512] py-1">
            <div className="h-1 w-8 rounded-full bg-[#3d322a]" />
          </div>
          <div className="border-b border-[#e5e0d8] bg-white px-2.5 py-2">
            <p className="text-[6px] uppercase tracking-[0.16em] text-[#8a8178]">Restadigi</p>
            <p className="text-[10px] font-medium text-[#1a1512]">Päivän majoitukset</p>
          </div>
          <div className="space-y-2 p-2">
            <div className="rounded-sm border border-[#e5e0d8] bg-white">
              <MiniCalendar compact />
            </div>
            <StayRows dense />
          </div>
        </div>
      </div>
    </div>
  );
}

export function StayReservationsDevicePreviews({ className = "" }: { className?: string }) {
  return (
    <div
      className={"flex flex-wrap items-end justify-center gap-6 sm:gap-10 " + className}
      aria-hidden
    >
      <div className="origin-bottom transition-transform duration-700 hover:-translate-y-1">
        <TabletPreview />
      </div>
      <div className="origin-bottom transition-transform duration-700 hover:-translate-y-1.5">
        <MonitorPreview />
      </div>
    </div>
  );
}
