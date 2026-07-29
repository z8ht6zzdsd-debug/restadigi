import type { ReactNode } from "react";

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
                <p className="text-[11px] font-semibold tabular-nums text-[#1a1512]">
                  {card.value}
                </p>
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
                    <span className="truncate text-[8px] font-medium text-[#1a1512]">
                      {lead.name}
                    </span>
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

/** Two side-by-side admin glances for the websites page demo promo. */
export function WebsiteAdminPanelPair({ className = "" }: { className?: string }) {
  return (
    <div className={"grid gap-3 sm:gap-4 md:grid-cols-2 " + className} aria-hidden>
      <AdminPanelFrame title="Hallintapaneeli" subtitle="Freddo's Café" activeNav="Yhteenveto">
        <AdminOpsPane />
      </AdminPanelFrame>
      <AdminPanelFrame title="Hallintapaneeli" subtitle="Live · tänään" activeNav="Chat">
        <AdminLivePane />
      </AdminPanelFrame>
    </div>
  );
}

const NAV_ITEMS = [
  { label: "Yhteenveto", color: "bg-[#432f24]" },
  { label: "Varaukset", color: "bg-[#c46a32]" },
  { label: "Menu", color: "bg-[#2f6b4f]" },
  { label: "Asiakkaat", color: "bg-[#2a5f8f]" },
  { label: "Chat", color: "bg-[#6b3d8f]" },
] as const;

function AdminPanelFrame({
  title,
  subtitle,
  activeNav,
  children,
}: {
  title: string;
  subtitle: string;
  activeNav: string;
  children: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#cfc8bf] bg-[#f4f0ea] shadow-[0_12px_32px_-14px_rgba(26,18,12,0.32)] ring-1 ring-[#432f24]/5">
      <div className="flex items-center justify-between gap-2 border-b border-[#e5e0d8] bg-gradient-to-r from-[#432f24] to-[#5a4032] px-3 py-2">
        <div className="min-w-0">
          <p className="text-[7px] uppercase tracking-[0.18em] text-[#e8c4a8]">Restadigi</p>
          <p className="truncate text-[11px] font-semibold text-white">{title}</p>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-[#7dcea0] shadow-[0_0_6px_rgba(125,206,160,0.8)]" />
          <p className="text-[8px] font-medium text-white/80">{subtitle}</p>
        </div>
      </div>
      <div className="flex gap-0.5 overflow-x-auto border-b border-[#e5e0d8] bg-white/80 px-2 py-1.5">
        {NAV_ITEMS.map((item) => {
          const active = item.label === activeNav;
          return (
            <span
              key={item.label}
              className={
                "shrink-0 rounded-full px-2 py-0.5 text-[7px] font-semibold tracking-wide " +
                (active ? item.color + " text-white shadow-sm" : "bg-[#ebe6df] text-[#5c534c]")
              }
            >
              {item.label}
            </span>
          );
        })}
      </div>
      {children}
    </div>
  );
}

function AdminOpsPane() {
  const bars = [38, 55, 48, 72, 61, 90, 78, 66, 84, 70];
  const maxBar = Math.max(...bars);

  return (
    <div className="space-y-2 p-2.5 sm:p-3">
      <div className="grid grid-cols-4 gap-1.5">
        {[
          {
            label: "Varaukset",
            value: "24",
            tone: "bg-[#c46a32]/15 text-[#9a4a1f] ring-[#c46a32]/25",
          },
          {
            label: "Asiakkaat",
            value: "186",
            tone: "bg-[#2a5f8f]/12 text-[#1e4a70] ring-[#2a5f8f]/20",
          },
          { label: "Chat", value: "12", tone: "bg-[#6b3d8f]/12 text-[#4a2a68] ring-[#6b3d8f]/20" },
          { label: "★ 4,9", value: "38", tone: "bg-[#2f6b4f]/12 text-[#1f4a36] ring-[#2f6b4f]/20" },
        ].map((card) => (
          <div key={card.label} className={"rounded-lg px-1.5 py-1.5 ring-1 " + card.tone}>
            <p className="text-[6px] font-semibold uppercase tracking-[0.08em] opacity-80">
              {card.label}
            </p>
            <p className="text-[13px] font-bold tabular-nums leading-tight">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-[1.15fr_0.85fr] gap-1.5">
        <div className="rounded-lg border border-[#e5e0d8] bg-white p-2 shadow-sm">
          <div className="mb-1.5 flex items-center justify-between">
            <p className="text-[8px] font-semibold text-[#1a1512]">Pöytävaraukset</p>
            <span className="rounded-full bg-[#c46a32]/15 px-1.5 py-0.5 text-[6px] font-bold uppercase text-[#c46a32]">
              Tänään
            </span>
          </div>
          <div className="flex h-12 items-end gap-0.5 sm:h-14">
            {bars.map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-[2px]"
                style={{
                  height: `${(h / maxBar) * 100}%`,
                  background:
                    i % 3 === 0
                      ? "#432f24"
                      : i % 3 === 1
                        ? "#c46a32"
                        : "linear-gradient(180deg,#e8a06a,#c46a32)",
                  opacity: 0.65 + (i / bars.length) * 0.35,
                }}
              />
            ))}
          </div>
          <div className="mt-1.5 space-y-1">
            {[
              {
                time: "18:30",
                name: "Pöytä 4 · 4 hlö",
                tag: "Vahvistettu",
                tagTone: "bg-[#2f6b4f]/15 text-[#2f6b4f]",
              },
              {
                time: "19:00",
                name: "Pöytä 7 · 2 hlö",
                tag: "Uusi",
                tagTone: "bg-[#c46a32]/15 text-[#c46a32]",
              },
            ].map((row) => (
              <div
                key={row.time + row.name}
                className="flex items-center gap-1.5 rounded-md bg-[#faf7f3] px-1.5 py-1"
              >
                <span className="shrink-0 rounded bg-[#432f24] px-1 py-0.5 text-[7px] font-bold tabular-nums text-white">
                  {row.time}
                </span>
                <span className="min-w-0 flex-1 truncate text-[8px] font-medium text-[#1a1512]">
                  {row.name}
                </span>
                <span
                  className={
                    "shrink-0 rounded-full px-1.5 py-0.5 text-[6px] font-bold " + row.tagTone
                  }
                >
                  {row.tag}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-[#e5e0d8] bg-white p-2 shadow-sm">
          <div className="mb-1.5 flex items-center justify-between">
            <p className="text-[8px] font-semibold text-[#1a1512]">Pöytäkartta</p>
            <span className="text-[6px] font-medium text-[#8a8178]">Sali A</span>
          </div>
          <div className="relative rounded-md bg-[#faf7f3] p-2 ring-1 ring-[#ebe6df]">
            <div className="grid grid-cols-3 gap-1.5 place-items-center">
              {[
                { n: "1", state: "free" as const },
                { n: "2", state: "busy" as const },
                { n: "3", state: "free" as const },
                { n: "4", state: "reserved" as const },
                { n: "5", state: "busy" as const },
                { n: "6", state: "free" as const },
                { n: "7", state: "reserved" as const },
                { n: "8", state: "free" as const },
                { n: "9", state: "busy" as const },
              ].map((t) => (
                <span
                  key={t.n}
                  className={
                    "flex size-6 items-center justify-center rounded-full text-[7px] font-bold shadow-sm sm:size-7 " +
                    (t.state === "busy"
                      ? "bg-[#432f24] text-white"
                      : t.state === "reserved"
                        ? "bg-[#c46a32] text-white"
                        : "bg-white text-[#5c534c] ring-1 ring-[#d6d0c8]")
                  }
                >
                  {t.n}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-0.5">
            {[
              { label: "Vapaa", tone: "bg-white ring-1 ring-[#d6d0c8]" },
              { label: "Varattu", tone: "bg-[#c46a32]" },
              { label: "Paikalla", tone: "bg-[#432f24]" },
            ].map((leg) => (
              <span key={leg.label} className="flex items-center gap-1 text-[6px] text-[#5c534c]">
                <span className={"size-1.5 rounded-full " + leg.tone} />
                {leg.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminLivePane() {
  return (
    <div className="space-y-2 p-2.5 sm:p-3">
      <div className="grid grid-cols-2 gap-1.5">
        <div className="rounded-lg border border-[#e5e0d8] bg-white p-2 shadow-sm">
          <div className="mb-1.5 flex items-center justify-between">
            <p className="text-[8px] font-semibold text-[#1a1512]">Asiakkaat</p>
            <span className="rounded-full bg-[#2a5f8f]/15 px-1.5 py-0.5 text-[6px] font-bold text-[#2a5f8f]">
              +3 tänään
            </span>
          </div>
          <ul className="space-y-1">
            {[
              { name: "Anna M.", meta: "VIP · 12 käyntiä", initials: "AM", bg: "bg-[#c46a32]" },
              { name: "Hotel Aura", meta: "Yritysasiakas", initials: "HA", bg: "bg-[#2a5f8f]" },
              { name: "Jari K.", meta: "Uusi · chat", initials: "JK", bg: "bg-[#2f6b4f]" },
            ].map((c) => (
              <li
                key={c.name}
                className="flex items-center gap-1.5 rounded-md bg-[#faf7f3] px-1.5 py-1"
              >
                <span
                  className={
                    "flex size-5 shrink-0 items-center justify-center rounded-full text-[6px] font-bold text-white " +
                    c.bg
                  }
                >
                  {c.initials}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[8px] font-semibold text-[#1a1512]">{c.name}</p>
                  <p className="truncate text-[6px] text-[#8a8178]">{c.meta}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-[#e5e0d8] bg-white p-2 shadow-sm">
          <div className="mb-1.5 flex items-center justify-between">
            <p className="text-[8px] font-semibold text-[#1a1512]">Palautteet</p>
            <span className="text-[9px] font-bold text-[#c46a32]">★ 4,9</span>
          </div>
          <ul className="space-y-1">
            {[
              { stars: "★★★★★", text: "Paras latte kaupungissa!", tone: "text-[#c46a32]" },
              { stars: "★★★★★", text: "Varaus sujui helposti.", tone: "text-[#2f6b4f]" },
              { stars: "★★★★☆", text: "Hyvä palvelu, kiitos!", tone: "text-[#6b3d8f]" },
            ].map((r) => (
              <li key={r.text} className="rounded-md bg-[#faf7f3] px-1.5 py-1">
                <p className={"text-[7px] leading-none " + r.tone}>{r.stars}</p>
                <p className="mt-0.5 truncate text-[7px] font-medium text-[#1a1512]">{r.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-lg border border-[#e5e0d8] bg-white p-2 shadow-sm">
        <div className="mb-1.5 flex items-center justify-between">
          <p className="text-[8px] font-semibold text-[#1a1512]">Chat-keskustelut</p>
          <span className="flex items-center gap-1 rounded-full bg-[#6b3d8f]/15 px-1.5 py-0.5 text-[6px] font-bold text-[#6b3d8f]">
            <span className="size-1 rounded-full bg-[#6b3d8f]" />2 avointa
          </span>
        </div>
        <div className="space-y-1.5">
          <div className="flex justify-start">
            <div className="max-w-[85%] rounded-2xl rounded-bl-md bg-[#ebe6df] px-2 py-1.5">
              <p className="text-[7px] font-semibold text-[#6b3d8f]">Asiakas</p>
              <p className="text-[8px] leading-snug text-[#1a1512]">
                Onko teillä vielä pöytä kahdelle klo 19?
              </p>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="max-w-[85%] rounded-2xl rounded-br-md bg-[#432f24] px-2 py-1.5">
              <p className="text-[7px] font-semibold text-[#e8c4a8]">Restachat</p>
              <p className="text-[8px] leading-snug text-white">
                Kyllä! Varaan pöydän 7 — vahvistus tulee sähköpostiin.
              </p>
            </div>
          </div>
          <div className="flex justify-start">
            <div className="max-w-[75%] rounded-2xl rounded-bl-md bg-[#c46a32]/15 px-2 py-1.5 ring-1 ring-[#c46a32]/20">
              <p className="text-[7px] font-semibold text-[#c46a32]">Asiakas</p>
              <p className="text-[8px] leading-snug text-[#1a1512]">Kiitos, täydellistä!</p>
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
                <p className="text-[6px] uppercase tracking-[0.12em] text-[#8a8178]">
                  {card.label}
                </p>
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
