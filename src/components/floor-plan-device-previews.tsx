import { DEMO_FLOOR_PLAN, type FloorTable, ZONE_LABELS } from "@/lib/floor-plan";
import type { ReactNode } from "react";

const HIGHLIGHT = "t8";
const OCCUPIED = new Set(["t3", "t8", "t9", "t17"]);

function tableSize(seats: FloorTable["seats"], scale: "sm" | "md" | "lg") {
  const map = {
    sm: {
      2: "size-4 text-[5px]",
      4: "size-5 text-[5px]",
      6: "h-5 w-7 text-[5px]",
      8: "h-6 w-8 text-[5px]",
    },
    md: {
      2: "size-5 text-[6px]",
      4: "size-6 text-[6px]",
      6: "h-6 w-8 text-[6px]",
      8: "h-7 w-10 text-[6px]",
    },
    lg: {
      2: "size-7 text-[7px]",
      4: "size-9 text-[8px]",
      6: "h-9 w-12 text-[8px]",
      8: "h-10 w-14 text-[8px]",
    },
  } as const;
  return map[scale][seats];
}

function MiniFloorMap({
  scale,
  showZones = true,
}: {
  scale: "sm" | "md" | "lg";
  showZones?: boolean;
}) {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[0.35rem] border border-[#e5e0d8] bg-[#f3efe8]">
      {showZones && (
        <>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[22%] border-b border-dashed border-[#c46a32]/25 bg-[#c46a32]/5" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[22%] border-t border-dashed border-[#432f24]/15 bg-[#432f24]/5" />
        </>
      )}
      {DEMO_FLOOR_PLAN.tables.map((table) => {
        const occupied = OCCUPIED.has(table.id);
        const active = table.id === HIGHLIGHT;
        return (
          <div
            key={table.id}
            className={
              "absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center border shadow-sm " +
              (table.shape === "round" ? "rounded-full " : "rounded-[3px] ") +
              tableSize(table.seats, scale) +
              " " +
              (active
                ? "z-[2] border-[#c46a32] bg-[#432f24] text-white"
                : occupied
                  ? "border-[#c46a32]/50 bg-[#c46a32]/20 text-[#432f24]"
                  : "border-[#d4cdc3] bg-white text-[#1a1512]")
            }
            style={{ left: `${table.x}%`, top: `${table.y}%` }}
          >
            <span className="font-medium leading-none">{table.label}</span>
          </div>
        );
      })}
    </div>
  );
}

function ScreenChrome({
  title,
  children,
  dense = false,
}: {
  title: string;
  children: ReactNode;
  dense?: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-[0.45rem] border border-[#3d322a] bg-[#f7f5f2]">
      <div
        className={"border-b border-[#e5e0d8] bg-white " + (dense ? "px-2 py-1.5" : "px-2.5 py-2")}
      >
        <p className="text-[5px] uppercase tracking-[0.16em] text-[#8a8178]">Admin</p>
        <p className={"font-medium text-[#1a1512] " + (dense ? "text-[8px]" : "text-[10px]")}>
          {title}
        </p>
      </div>
      {children}
    </div>
  );
}

function PhonePreview() {
  const table = DEMO_FLOOR_PLAN.tables.find((t) => t.id === HIGHLIGHT)!;
  return (
    <div className="w-[7.25rem] shrink-0 sm:w-32">
      <div className="rounded-[1.35rem] border border-[#2a221c] bg-[#1a1512] p-[0.35rem] shadow-[0_16px_36px_-12px_rgba(26,18,12,0.45)]">
        <div className="mb-1 flex justify-center">
          <div className="h-1 w-10 rounded-full bg-[#3d322a]" />
        </div>
        <ScreenChrome title="Pöytäkartta" dense>
          <div className="space-y-1.5 p-1.5">
            <div className="grid grid-cols-2 gap-1">
              <div className="rounded-[2px] border border-[#e5e0d8] bg-white px-1 py-1">
                <p className="text-[5px] uppercase tracking-wide text-[#8a8178]">Paikat</p>
                <p className="text-[9px] font-medium tabular-nums text-[#1a1512]">80</p>
              </div>
              <div className="rounded-[2px] border border-[#e5e0d8] bg-white px-1 py-1">
                <p className="text-[5px] uppercase tracking-wide text-[#8a8178]">Vapaana</p>
                <p className="text-[9px] font-medium tabular-nums text-[#1a1512]">14</p>
              </div>
            </div>
            <MiniFloorMap scale="sm" showZones={false} />
            <div className="rounded-[2px] border border-[#e5e0d8] bg-white px-1.5 py-1">
              <p className="text-[7px] font-medium text-[#1a1512]">Pöytä {table.label}</p>
              <p className="text-[6px] text-[#8a8178]">
                {table.seats} hlö · {ZONE_LABELS[table.zone]} · varattu
              </p>
            </div>
          </div>
        </ScreenChrome>
        <div className="mx-auto mt-1.5 h-1 w-8 rounded-full bg-[#3d322a]" />
      </div>
      <p className="mt-3 text-center text-[10px] uppercase tracking-[0.14em] text-[#8a8178]">
        Mobiili
      </p>
    </div>
  );
}

function TabletPreview() {
  const table = DEMO_FLOOR_PLAN.tables.find((t) => t.id === HIGHLIGHT)!;
  return (
    <div className="w-[11.5rem] shrink-0 sm:w-[13.5rem]">
      <div className="rounded-[1.1rem] border border-[#2a221c] bg-[#1a1512] p-[0.4rem] shadow-[0_18px_40px_-14px_rgba(26,18,12,0.45)]">
        <div className="mb-1 flex justify-center">
          <div className="h-1 w-8 rounded-full bg-[#3d322a]" />
        </div>
        <ScreenChrome title="Pöytäkartta · 80 paikkaa">
          <div className="grid grid-cols-[1fr_4.25rem] gap-1.5 p-2">
            <MiniFloorMap scale="md" />
            <div className="space-y-1.5">
              <div className="rounded-[2px] border border-[#e5e0d8] bg-white p-1.5">
                <p className="text-[5px] uppercase tracking-wide text-[#8a8178]">Valittu</p>
                <p className="text-[8px] font-medium text-[#1a1512]">Pöytä {table.label}</p>
                <p className="text-[6px] text-[#6b635c]">{table.seats} hlö</p>
                <p className="text-[6px] text-[#8a8178]">{ZONE_LABELS[table.zone]}</p>
              </div>
              <div className="rounded-[2px] border border-[#e5e0d8] bg-white p-1.5">
                <p className="text-[5px] uppercase tracking-wide text-[#8a8178]">Tila</p>
                <p className="mt-0.5 text-[7px] font-medium text-[#a35528]">Varattu</p>
                <p className="text-[6px] text-[#8a8178]">19:00 · 6 hlö</p>
              </div>
              <div className="rounded-[2px] border border-[#e5e0d8] bg-white p-1.5">
                <p className="text-[5px] uppercase tracking-wide text-[#8a8178]">Pöytiä</p>
                <p className="text-[8px] font-medium tabular-nums text-[#1a1512]">18</p>
              </div>
            </div>
          </div>
        </ScreenChrome>
      </div>
      <p className="mt-3 text-center text-[10px] uppercase tracking-[0.14em] text-[#8a8178]">
        Tabletti
      </p>
    </div>
  );
}

function MonitorPreview() {
  return (
    <div className="w-full min-w-0 max-w-xl flex-1">
      <div className="rounded-[0.95rem] border border-[#2a221c] bg-[#1a1512] p-[0.45rem] shadow-[0_18px_44px_-12px_rgba(26,18,12,0.4)]">
        <ScreenChrome title="Pöytäkartta — Demo Ravintola · 80 paikkaa">
          <div className="flex min-h-[11rem] sm:min-h-[13rem]">
            <nav className="hidden w-[4.25rem] shrink-0 border-r border-[#e5e0d8] bg-[#faf8f5] p-1.5 sm:block">
              {["Yhteenveto", "Varaukset", "Pöytäkartta", "Asetukset"].map((label, i) => (
                <div
                  key={label}
                  className={
                    "mb-1 rounded-sm px-1.5 py-1.5 text-[7px] leading-tight " +
                    (i === 2 ? "bg-[#432f24] text-white" : "text-[#6b635c]")
                  }
                >
                  {label}
                </div>
              ))}
            </nav>
            <div className="flex-1 space-y-2 p-2 sm:p-2.5">
              <div className="grid grid-cols-4 gap-1">
                {[
                  { label: "Paikat", value: "80" },
                  { label: "Pöytiä", value: "18" },
                  { label: "Vapaana", value: "14" },
                  { label: "Varattu", value: "4" },
                ].map((card) => (
                  <div
                    key={card.label}
                    className="rounded-[2px] border border-[#e5e0d8] bg-white px-1.5 py-1"
                  >
                    <p className="text-[5px] uppercase tracking-wide text-[#8a8178]">
                      {card.label}
                    </p>
                    <p className="text-[10px] font-medium tabular-nums text-[#1a1512]">
                      {card.value}
                    </p>
                  </div>
                ))}
              </div>
              <MiniFloorMap scale="lg" />
              <div className="flex flex-wrap gap-1.5 text-[6px] text-[#6b635c]">
                <span className="inline-flex items-center gap-1">
                  <span className="size-1.5 rounded-full bg-white border border-[#d4cdc3]" /> Vapaa
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="size-1.5 rounded-full bg-[#c46a32]/35" /> Varattu
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="size-1.5 rounded-full bg-[#432f24]" /> Valittu
                </span>
                <span className="ml-auto text-[#8a8178]">2–8 hlö · kustomoitava</span>
              </div>
            </div>
          </div>
        </ScreenChrome>
      </div>
      <div className="mx-auto mt-0 flex w-[26%] flex-col items-center">
        <div className="h-2.5 w-[18%] bg-[#2a221c]" />
        <div className="h-1.5 w-full rounded-b-sm bg-[#1a1512]" />
      </div>
      <p className="mt-3 text-center text-[10px] uppercase tracking-[0.14em] text-[#8a8178]">
        Iso näyttö
      </p>
    </div>
  );
}

export function FloorPlanDevicePreviews({ className = "" }: { className?: string }) {
  return (
    <div
      className={
        "flex w-full flex-wrap items-end justify-center gap-6 sm:gap-8 lg:gap-10 " + className
      }
      aria-hidden
    >
      <div className="origin-bottom transition-transform duration-700 hover:-translate-y-1">
        <PhonePreview />
      </div>
      <div className="origin-bottom transition-transform duration-700 hover:-translate-y-1.5">
        <TabletPreview />
      </div>
      <div className="origin-bottom transition-transform duration-700 hover:-translate-y-1">
        <MonitorPreview />
      </div>
    </div>
  );
}
