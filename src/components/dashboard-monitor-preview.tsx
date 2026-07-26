/** Marketing preview of the Restadigi admin dashboard inside a desktop monitor. */
export function DashboardMonitorPreview({ className = "" }: { className?: string }) {
  const bars = [42, 58, 51, 72, 64, 88, 76];
  const maxBar = Math.max(...bars);

  return (
    <div className={className} aria-hidden>
      <div className="mx-auto w-full max-w-md">
        <div className="rounded-[0.95rem] border border-[#2a221c] bg-[#1a1512] p-[0.45rem] shadow-[0_18px_44px_-12px_rgba(26,18,12,0.4)]">
          <div className="overflow-hidden rounded-[0.55rem] border border-[#3d322a] bg-[#f7f5f2]">
            <DashboardChrome bars={bars} maxBar={maxBar} tall />
          </div>
        </div>

        <div className="mx-auto mt-0 flex w-[28%] flex-col items-center">
          <div className="h-3 w-[18%] bg-[#2a221c]" />
          <div className="h-1.5 w-full rounded-b-sm bg-[#1a1512]" />
        </div>
      </div>
    </div>
  );
}

/** Wide, short dashboard glance for homepage promo — no monitor frame. */
export function DashboardStripPreview({ className = "" }: { className?: string }) {
  const bars = [38, 52, 46, 68, 58, 82, 70, 64];
  const maxBar = Math.max(...bars);

  return (
    <div
      className={
        "overflow-hidden rounded-xl border border-[#e8dfd4] bg-[#f7f5f2] shadow-[0_8px_24px_-12px_rgba(42,32,24,0.2)] " +
        className
      }
      aria-hidden
    >
      <div className="flex items-center justify-between border-b border-[#e5e0d8] bg-white px-3 py-1.5">
        <div className="min-w-0">
          <p className="text-[7px] uppercase tracking-[0.16em] text-[#8a8178]">Restadigi</p>
          <p className="truncate text-[10px] font-semibold text-[#1a1512]">Hallintapaneeli</p>
        </div>
        <div className="hidden items-center gap-1.5 sm:flex">
          {["Yhteenveto", "Liidit", "Varaukset", "Chat"].map((label, i) => (
            <span
              key={label}
              className={
                "rounded-full px-2 py-0.5 text-[7px] font-medium " +
                (i === 0 ? "bg-[#432f24] text-white" : "bg-[#f0ebe4] text-[#6b635c]")
              }
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-2 p-2 sm:gap-2.5 sm:p-2.5">
        <div className="hidden w-16 shrink-0 flex-col gap-1 sm:flex">
          {["Yhteenveto", "Myyntiliidit", "Keskustelut", "Varaukset"].map((label, i) => (
            <div
              key={label}
              className={
                "rounded-md px-1.5 py-1 text-[7px] leading-tight " +
                (i === 0
                  ? "bg-[#432f24] text-white"
                  : "bg-white text-[#6b635c] ring-1 ring-[#e5e0d8]")
              }
            >
              {label}
            </div>
          ))}
        </div>

        <div className="min-w-0 space-y-2">
          <div className="grid grid-cols-4 gap-1.5 sm:grid-cols-5">
            {[
              { label: "Sivut", value: "1 284" },
              { label: "Kävijät", value: "412" },
              { label: "Liidit", value: "37" },
              { label: "Chat", value: "89" },
              { label: "Varaukset", value: "24" },
            ].map((card, i) => (
              <div
                key={card.label}
                className={
                  "rounded-md border border-[#e5e0d8] bg-white px-1.5 py-1 " +
                  (i === 4 ? "hidden sm:block" : "")
                }
              >
                <p className="text-[6px] uppercase tracking-[0.1em] text-[#8a8178]">{card.label}</p>
                <p className="text-[11px] font-semibold tabular-nums text-[#1a1512]">{card.value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-[1.2fr_0.8fr] gap-1.5">
            <div className="rounded-md border border-[#e5e0d8] bg-white px-2 py-1.5">
              <p className="mb-1 text-[7px] font-medium text-[#1a1512]">Kävijät päivittäin</p>
              <div className="flex h-8 items-end gap-0.5 sm:h-9">
                {bars.map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-[2px] bg-[#c46a32]"
                    style={{
                      height: `${(h / maxBar) * 100}%`,
                      opacity: 0.5 + (i / bars.length) * 0.5,
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="rounded-md border border-[#e5e0d8] bg-white px-2 py-1.5">
              <p className="mb-1 text-[7px] font-medium text-[#1a1512]">Uudet liidit</p>
              <ul className="space-y-1">
                {[
                  { name: "Anna M.", status: "Uusi" },
                  { name: "Hotel Aura", status: "Soitettu" },
                ].map((lead) => (
                  <li key={lead.name} className="flex items-center justify-between gap-1">
                    <span className="truncate text-[8px] font-medium text-[#1a1512]">{lead.name}</span>
                    <span className="shrink-0 rounded-full bg-[#432f24]/10 px-1.5 py-0.5 text-[6px] uppercase text-[#432f24]">
                      {lead.status}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardChrome({
  bars,
  maxBar,
  tall = false,
}: {
  bars: number[];
  maxBar: number;
  tall?: boolean;
}) {
  return (
    <>
      <div className="border-b border-[#e5e0d8] bg-white px-2.5 py-2">
        <p className="text-[6px] uppercase tracking-[0.18em] text-[#8a8178]">Admin</p>
        <p className="text-[10px] font-medium text-[#1a1512]">Restadigi Dashboard</p>
      </div>

      <div className={tall ? "flex min-h-[11.5rem] sm:min-h-[13.5rem]" : "flex"}>
        <nav className="hidden w-[4.5rem] shrink-0 border-r border-[#e5e0d8] bg-[#faf8f5] p-1.5 sm:block">
          {[
            { label: "Yhteenveto", active: true },
            { label: "Myyntiliidit", active: false },
            { label: "Keskustelut", active: false },
            { label: "Varaukset", active: false },
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

        <div className="flex-1 space-y-2.5 p-2.5 sm:p-3">
          <div>
            <p className="text-[12px] font-medium text-[#1a1512]">Yhteenveto</p>
            <p className="text-[8px] text-[#8a8178]">Viimeiset 30 päivää</p>
          </div>

          <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-5">
            {[
              { label: "Sivut", value: "1 284" },
              { label: "Kävijät", value: "412" },
              { label: "Liidit", value: "37" },
              { label: "Chat", value: "89" },
              { label: "Varaukset", value: "24" },
            ].map((card) => (
              <div
                key={card.label}
                className="rounded-sm border border-[#e5e0d8] bg-white px-1.5 py-1.5"
              >
                <p className="text-[6px] uppercase tracking-[0.12em] text-[#8a8178]">{card.label}</p>
                <p className="mt-0.5 text-[11px] font-medium tabular-nums text-[#1a1512]">
                  {card.value}
                </p>
              </div>
            ))}
          </div>

          <div className="grid gap-1.5 sm:grid-cols-2">
            <div className="rounded-sm border border-[#e5e0d8] bg-white p-2">
              <p className="mb-2 text-[8px] font-medium text-[#1a1512]">Kävijät päivittäin</p>
              <div className="flex h-12 items-end gap-1">
                {bars.map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-[2px] bg-[#c46a32]"
                    style={{
                      height: `${(h / maxBar) * 100}%`,
                      opacity: 0.55 + (i / bars.length) * 0.45,
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="rounded-sm border border-[#e5e0d8] bg-white p-2">
              <p className="mb-2 text-[8px] font-medium text-[#1a1512]">Myyntiliidit</p>
              <ul className="space-y-1.5">
                {[
                  { name: "Anna M.", meta: "Puhelin · Verkkosivut", status: "Uusi" },
                  { name: "Hotel Aura", meta: "Sähköposti · Chatbot", status: "Soitettu" },
                  { name: "Café Norte", meta: "WhatsApp · Varaus", status: "Uusi" },
                ].map((lead) => (
                  <li
                    key={lead.name}
                    className="flex items-center justify-between gap-1 border-b border-[#f0ebe4] pb-1 last:border-0 last:pb-0"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-[8px] font-medium text-[#1a1512]">{lead.name}</p>
                      <p className="truncate text-[7px] text-[#8a8178]">{lead.meta}</p>
                    </div>
                    <span className="shrink-0 rounded-full bg-[#432f24]/10 px-1.5 py-0.5 text-[6px] uppercase tracking-wide text-[#432f24]">
                      {lead.status}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
