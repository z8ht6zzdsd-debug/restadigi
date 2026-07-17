import { DEMO_FLOOR_PLAN, type FloorTable, ZONE_LABELS, sumSeats } from "@/lib/floor-plan";
import type { ReactNode } from "react";

const HIGHLIGHT = "t6";
const OCCUPIED = new Set(["t2", "t6", "t9", "t12"]);

const TOTAL_SEATS = sumSeats(DEMO_FLOOR_PLAN.tables);
const TABLE_COUNT = DEMO_FLOOR_PLAN.tables.length;
const OCCUPIED_COUNT = OCCUPIED.size;
const FREE_COUNT = TABLE_COUNT - OCCUPIED_COUNT;

function tableSize(seats: FloorTable["seats"], scale: "sm" | "md" | "lg") {
  const map = {
    sm: {
      2: "size-5 text-[5px]",
      4: "size-6 text-[5px]",
      6: "h-6 w-8 text-[5px]",
      8: "h-7 w-10 text-[5px]",
    },
    md: {
      2: "size-6 text-[6px]",
      4: "size-7 text-[6px]",
      6: "h-7 w-10 text-[6px]",
      8: "h-8 w-12 text-[6px]",
    },
    lg: {
      2: "size-8 text-[8px]",
      4: "size-10 text-[8px]",
      6: "h-10 w-[3.25rem] text-[8px]",
      8: "h-11 w-16 text-[8px]",
    },
  } as const;
  return map[scale][seats];
}

function MiniFloorMap({
  scale,
  showZones = true,
  wide = false,
}: {
  scale: "sm" | "md" | "lg";
  showZones?: boolean;
  wide?: boolean;
}) {
  return (
    <div
      className={
        "relative w-full overflow-hidden rounded-[0.35rem] border border-[#e5e0d8] bg-[#f3efe8] " +
        (wide ? "aspect-[16/10]" : "aspect-[4/3]")
      }
    >
      {showZones && (
        <>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[24%] border-b border-dashed border-[#c46a32]/25 bg-[#c46a32]/5" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[20%] border-t border-dashed border-[#432f24]/15 bg-[#432f24]/5" />
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
                <p className="text-[9px] font-medium tabular-nums text-[#1a1512]">{TOTAL_SEATS}</p>
              </div>
              <div className="rounded-[2px] border border-[#e5e0d8] bg-white px-1 py-1">
                <p className="text-[5px] uppercase tracking-wide text-[#8a8178]">Vapaana</p>
                <p className="text-[9px] font-medium tabular-nums text-[#1a1512]">{FREE_COUNT}</p>
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
        <ScreenChrome title={`Pöytäkartta · ${TOTAL_SEATS} paikkaa`}>
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
                <p className="text-[8px] font-medium tabular-nums text-[#1a1512]">{TABLE_COUNT}</p>
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
    <div className="w-full min-w-0 max-w-3xl flex-[1.85] basis-[min(100%,28rem)]">
      <div className="rounded-[0.95rem] border border-[#2a221c] bg-[#1a1512] p-[0.45rem] shadow-[0_18px_44px_-12px_rgba(26,18,12,0.4)]">
        <ScreenChrome title={`Pöytäkartta — Demo Ravintola · ${TOTAL_SEATS} paikkaa`}>
          <div className="flex min-h-[12rem] sm:min-h-[14.5rem]">
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
              <div className="grid grid-cols-4 gap-1.5">
                {[
                  { label: "Paikat", value: String(TOTAL_SEATS) },
                  { label: "Pöytiä", value: String(TABLE_COUNT) },
                  { label: "Vapaana", value: String(FREE_COUNT) },
                  { label: "Varattu", value: String(OCCUPIED_COUNT) },
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
              <MiniFloorMap scale="lg" wide />
              <div className="flex flex-wrap gap-2 text-[6px] text-[#6b635c]">
                <span className="inline-flex items-center gap-1">
                  <span className="size-1.5 rounded-full border border-[#d4cdc3] bg-white" /> Vapaa
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="size-1.5 rounded-full bg-[#c46a32]/35" /> Varattu
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="size-1.5 rounded-full bg-[#432f24]" /> Valittu
                </span>
              </div>
            </div>
          </div>
        </ScreenChrome>
      </div>
      <div className="mx-auto mt-0 flex w-[22%] flex-col items-center">
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
        "flex w-full flex-wrap items-end justify-center gap-5 sm:gap-6 lg:flex-nowrap lg:justify-between lg:gap-8 " +
        className
      }
      aria-hidden
    >
      <div className="origin-bottom transition-transform duration-700 hover:-translate-y-1">
        <PhonePreview />
      </div>
      <div className="origin-bottom transition-transform duration-700 hover:-translate-y-1.5">
        <TabletPreview />
      </div>
      <div className="origin-bottom w-full transition-transform duration-700 hover:-translate-y-1 lg:w-auto lg:flex-1">
        <MonitorPreview />
      </div>
    </div>
  );
}
