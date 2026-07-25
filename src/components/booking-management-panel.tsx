import { Users } from "lucide-react";
import { cn } from "@/lib/utils";

const TIMES = ["17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00"] as const;

const SIDEBAR_BOOKINGS = [
  { time: "17:00", name: "Nieminen", tag: "Valmis", tagTone: "ok", guests: 4 },
  { time: "17:30", name: "Korhonen", tag: "Jonossa", tagTone: "wait", guests: 2 },
  { time: "18:00", name: "Virtanen", tag: "Valmistelu", tagTone: "prep", guests: 6 },
  { time: "18:30", name: "Laine", tag: "Valmis", tagTone: "ok", guests: 3 },
  { time: "19:00", name: "Mäkinen", tag: "Jonossa", tagTone: "wait", guests: 2 },
] as const;

const TABLES = [
  { id: "1", zone: "Sali" },
  { id: "2", zone: "Sali" },
  { id: "3", zone: "Sali" },
  { id: "4", zone: "Ikkuna" },
  { id: "5", zone: "Ikkuna" },
  { id: "6", zone: "Terassi" },
  { id: "7", zone: "Terassi" },
  { id: "8", zone: "Kabinetti" },
] as const;

type Tone = "brown" | "orange" | "teal" | "slate" | "rose";

const BARS: Array<{
  table: string;
  start: number;
  span: number;
  name: string;
  tone: Tone;
}> = [
  { table: "1", start: 0, span: 2, name: "Nieminen", tone: "teal" },
  { table: "2", start: 1, span: 2, name: "Korhonen", tone: "orange" },
  { table: "3", start: 2, span: 3, name: "Virtanen", tone: "brown" },
  { table: "4", start: 0, span: 2, name: "Laine", tone: "slate" },
  { table: "5", start: 3, span: 2, name: "Mäkinen", tone: "rose" },
  { table: "6", start: 2, span: 2, name: "Heikkinen", tone: "teal" },
  { table: "7", start: 4, span: 2, name: "Salonen", tone: "orange" },
  { table: "8", start: 1, span: 3, name: "Aalto", tone: "brown" },
];

const TONE_CLASS: Record<Tone, string> = {
  brown: "bg-[#432f24] text-white",
  orange: "bg-[#c46a32] text-white",
  teal: "bg-[#0d9488] text-white",
  slate: "bg-[#64748b] text-white",
  rose: "bg-[#be4d5a] text-white",
};

const TAG_CLASS = {
  ok: "bg-[#0d9488]/15 text-[#0f766e]",
  wait: "bg-[#7c3aed]/12 text-[#6d28d9]",
  prep: "bg-[#c46a32]/15 text-[#a35528]",
} as const;

type BookingManagementPanelProps = {
  dateLabel?: string;
};

export function BookingManagementPanel({
  dateLabel = "Ma 24.7.2026",
}: BookingManagementPanelProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#e8dfd4] bg-white shadow-[0_20px_55px_rgba(42,32,24,0.12)]">
      <div className="flex flex-wrap items-center gap-2 border-b border-[#e8dfd4] bg-[#fbf8f4] px-3 py-2.5 sm:px-4">
        {["Varaukset", "Asiakkaat", "Arkisto"].map((tab, i) => (
          <span
            key={tab}
            className={cn(
              "rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wide",
              i === 0
                ? "bg-[#432f24] text-white"
                : "border border-[#e8dfd4] bg-white text-[#8a7f74]",
            )}
          >
            {tab}
          </span>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row">
        <aside className="border-b border-[#e8dfd4] lg:w-52 lg:shrink-0 lg:border-b-0 lg:border-r">
          <div className="border-b border-[#e8dfd4] px-3 py-3">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8a7f74]">
              Heinäkuu 2026
            </p>
            <div className="grid grid-cols-7 gap-1 text-center text-[9px] text-[#8a7f74]">
              {["Ma", "Ti", "Ke", "To", "Pe", "La", "Su"].map((d) => (
                <span key={d}>{d}</span>
              ))}
              {Array.from({ length: 28 }, (_, i) => {
                const day = i + 1;
                const active = day === 24;
                return (
                  <span
                    key={day}
                    className={cn(
                      "flex aspect-square items-center justify-center rounded-full text-[10px]",
                      active ? "bg-[#c46a32] font-semibold text-white" : "text-[#5c534c]",
                    )}
                  >
                    {day}
                  </span>
                );
              })}
            </div>
          </div>

          <ul className="max-h-64 space-y-1.5 overflow-auto p-3 lg:max-h-[22rem]">
            {SIDEBAR_BOOKINGS.map((b) => (
              <li
                key={`${b.time}-${b.name}`}
                className="rounded-lg border border-[#eee8e0] bg-[#fbf8f4] px-2.5 py-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-[11px] font-semibold tabular-nums text-[#432f24]">
                      {b.time}
                    </p>
                    <p className="text-[11px] text-[#5c534c]">{b.name}</p>
                  </div>
                  <span className="inline-flex items-center gap-0.5 text-[10px] text-[#8a7f74]">
                    <Users className="size-2.5" />
                    {b.guests}
                  </span>
                </div>
                <span
                  className={cn(
                    "mt-1.5 inline-flex rounded-full px-1.5 py-0.5 text-[9px] font-medium",
                    TAG_CLASS[b.tagTone],
                  )}
                >
                  {b.tag}
                </span>
              </li>
            ))}
          </ul>
        </aside>

        <div className="min-w-0 flex-1 p-3 sm:p-4">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8a7f74]">
                Restatable · Hallinta
              </p>
              <p className="text-sm font-semibold text-[#2a2018]">{dateLabel}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-[#432f24] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                Uusi varaus
              </span>
              <span className="rounded-full border border-[#e8dfd4] bg-white px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-[#5c534c]">
                Walk-in
              </span>
            </div>
          </div>

          <div className="mb-3 flex flex-wrap gap-2">
            {["Kaavio", "Lista", "Aikajana"].map((view, i) => (
              <span
                key={view}
                className={cn(
                  "rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wide",
                  i === 2
                    ? "bg-[#c46a32] text-white"
                    : "border border-[#e8dfd4] bg-[#fbf8f4] text-[#8a7f74]",
                )}
              >
                {view}
              </span>
            ))}
            {["Kaikki", "Lounas", "Ilta"].map((f, i) => (
              <span
                key={f}
                className={cn(
                  "rounded-full px-2.5 py-1 text-[10px] font-medium",
                  i === 0 ? "bg-[#432f24]/10 text-[#432f24]" : "text-[#8a7f74]",
                )}
              >
                {f}
              </span>
            ))}
          </div>

          <div className="overflow-x-auto rounded-xl border border-[#e8dfd4] bg-[#fbf8f4]">
            <div className="min-w-[36rem]">
              <div
                className="grid border-b border-[#e8dfd4] bg-white"
                style={{ gridTemplateColumns: "4.5rem repeat(7, minmax(0, 1fr))" }}
              >
                <div className="border-r border-[#e8dfd4] px-2 py-2 text-[9px] font-semibold uppercase tracking-wide text-[#8a7f74]">
                  Pöytä
                </div>
                {TIMES.map((t) => (
                  <div
                    key={t}
                    className="border-r border-[#e8dfd4] px-1 py-2 text-center text-[10px] font-medium tabular-nums text-[#5c534c] last:border-r-0"
                  >
                    {t}
                  </div>
                ))}
              </div>

              {TABLES.map((table) => {
                const bars = BARS.filter((b) => b.table === table.id);
                return (
                  <div
                    key={table.id}
                    className="grid border-b border-[#eee8e0] last:border-b-0"
                    style={{ gridTemplateColumns: "4.5rem repeat(7, minmax(0, 1fr))" }}
                  >
                    <div className="flex flex-col justify-center border-r border-[#e8dfd4] bg-white px-2 py-2">
                      <span className="text-[11px] font-semibold text-[#2a2018]">
                        #{table.id}
                      </span>
                      <span className="text-[9px] text-[#8a7f74]">{table.zone}</span>
                    </div>
                    <div className="relative col-span-7 grid grid-cols-7">
                      {TIMES.map((t) => (
                        <div key={t} className="min-h-11 border-r border-[#eee8e0] last:border-r-0" />
                      ))}
                      {bars.map((bar) => (
                        <div
                          key={`${bar.table}-${bar.name}`}
                          className={cn(
                            "absolute top-1.5 flex h-7 items-center truncate rounded-md px-2 text-[10px] font-semibold shadow-sm",
                            TONE_CLASS[bar.tone],
                          )}
                          style={{
                            left: `calc(${(bar.start / 7) * 100}% + 3px)`,
                            width: `calc(${(bar.span / 7) * 100}% - 6px)`,
                          }}
                        >
                          {bar.name}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
