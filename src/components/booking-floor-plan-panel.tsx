import { DEMO_FLOOR_PLAN_LARGE } from "@/lib/floor-plan";
import { cn } from "@/lib/utils";

const BOOKINGS = [
  { time: "17:00", name: "Nieminen", table: "4", status: "seated" as const },
  { time: "17:30", name: "Korhonen", table: "7", status: "arrived" as const },
  { time: "18:00", name: "Virtanen", table: "2", status: "soon" as const },
  { time: "18:30", name: "Laine", table: "11", status: "noshow" as const },
  { time: "19:00", name: "Mäkinen", table: "5", status: "taken" as const },
];

const STATUS_CLASS: Record<(typeof BOOKINGS)[number]["status"] | "free", string> = {
  seated: "bg-[#0d9488] text-white border-[#0f766e]",
  arrived: "bg-[#1e3a5f] text-white border-[#0f2744]",
  soon: "bg-[#2563eb] text-white border-[#1d4ed8]",
  noshow: "bg-[#dc2626] text-white border-[#b91c1c]",
  taken: "bg-[#7c3aed] text-white border-[#6d28d9]",
  free: "bg-[#e5e7eb] text-[#4b5563] border-[#d1d5db]",
};

type BookingFloorPlanPanelProps = {
  dateLabel?: string;
  activeViewLabel: string;
  views: string[];
};

export function BookingFloorPlanPanel({
  dateLabel = "Ma 24.7.",
  activeViewLabel,
  views,
}: BookingFloorPlanPanelProps) {
  const plan = DEMO_FLOOR_PLAN_LARGE;
  const statusById: Record<string, (typeof BOOKINGS)[number]["status"]> = {
    l2: "soon",
    l4: "seated",
    l5: "taken",
    l7: "arrived",
    l9: "noshow",
    l11: "seated",
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-[0_18px_50px_rgba(15,23,42,0.1)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e5e7eb] bg-[#f8fafc] px-4 py-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#64748b]">
            Restatable · Kaj
          </p>
          <p className="text-sm font-semibold text-[#0f172a]">{dateLabel}</p>
        </div>
        <div className="flex gap-2">
          <span className="rounded-full bg-[#0d9488] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-white">
            Uusi varaus
          </span>
          <span className="rounded-full border border-[#e5e7eb] bg-white px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-[#475569]">
            Walk-in
          </span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        <aside className="border-b border-[#e5e7eb] lg:w-52 lg:border-b-0 lg:border-r">
          <div className="border-b border-[#e5e7eb] px-3 py-3">
            <div className="grid grid-cols-7 gap-1 text-center text-[9px] text-[#94a3b8]">
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
                      active ? "bg-[#0d9488] font-semibold text-white" : "text-[#475569]",
                    )}
                  >
                    {day}
                  </span>
                );
              })}
            </div>
          </div>
          <ul className="max-h-56 space-y-1 overflow-auto p-3 lg:max-h-none">
            {BOOKINGS.map((b) => (
              <li
                key={`${b.time}-${b.name}`}
                className="flex items-center justify-between rounded-lg border border-[#eef2f7] bg-[#f8fafc] px-2.5 py-2"
              >
                <div>
                  <p className="text-[11px] font-semibold tabular-nums text-[#0f172a]">{b.time}</p>
                  <p className="text-[11px] text-[#64748b]">{b.name}</p>
                </div>
                <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-medium text-[#64748b]">
                  #{b.table}
                </span>
              </li>
            ))}
          </ul>
        </aside>

        <div className="min-w-0 flex-1 p-3 sm:p-4">
          <div className="mb-3 flex flex-wrap gap-2">
            {views.map((view) => {
              const active = view === activeViewLabel;
              return (
                <span
                  key={view}
                  className={cn(
                    "rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wide",
                    active
                      ? "bg-[#0f172a] text-white"
                      : "border border-[#e5e7eb] bg-[#f8fafc] text-[#64748b]",
                  )}
                >
                  {view}
                </span>
              );
            })}
          </div>

          <div className="relative aspect-[5/3] overflow-hidden rounded-xl border border-[#e5e7eb] bg-[#f1f5f9]">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[20%] border-b border-dashed border-[#94a3b8]/40 bg-white/40" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[16%] border-t border-dashed border-[#94a3b8]/35 bg-white/30" />
            {plan.tables.map((table) => {
              const status = statusById[table.id] ?? "free";
              const booking = BOOKINGS.find((b) => b.table === table.label);
              return (
                <div
                  key={table.id}
                  className={cn(
                    "absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center border shadow-sm",
                    table.shape === "round" ? "rounded-full" : "rounded-md",
                    table.seats <= 2
                      ? "size-8 text-[8px]"
                      : table.seats <= 4
                        ? "size-9 text-[8px]"
                        : "h-9 w-12 text-[8px]",
                    STATUS_CLASS[status],
                  )}
                  style={{ left: `${table.x}%`, top: `${table.y}%` }}
                >
                  <span className="font-semibold leading-none">{table.label}</span>
                  {booking ? (
                    <span className="mt-0.5 text-[7px] opacity-90">{booking.time}</span>
                  ) : null}
                </div>
              );
            })}
          </div>

          <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5 text-[10px] text-[#475569]">
            <LegendDot className="bg-[#0d9488]" label="Istumassa" />
            <LegendDot className="bg-[#1e3a5f]" label="Saapunut" />
            <LegendDot className="bg-[#2563eb]" label="< 20 min" />
            <LegendDot className="bg-[#dc2626]" label="No-show" />
            <LegendDot className="bg-[#7c3aed]" label="Varattu" />
          </div>
        </div>
      </div>
    </div>
  );
}

function LegendDot({ className, label }: { className: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={cn("size-2.5 rounded-full", className)} />
      {label}
    </span>
  );
}
