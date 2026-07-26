import type { ReactNode } from "react";

/** Marketing mock: room inventory / occupancy board for lodging. */

const ROOMS = [
  { id: "101", name: "Standard 101", status: "Vapaa", tone: "free" as const },
  { id: "102", name: "Standard 102", status: "Varattu", tone: "busy" as const },
  { id: "201", name: "Merinäköala 201", status: "Saapuu", tone: "in" as const },
  { id: "202", name: "Merinäköala 202", status: "Vapaa", tone: "free" as const },
  { id: "301", name: "Sviitti 301", status: "Varattu", tone: "busy" as const },
  { id: "302", name: "Sviitti 302", status: "Lähtee", tone: "out" as const },
];

function RoomChip({
  name,
  status,
  tone,
}: {
  name: string;
  status: string;
  tone: "free" | "busy" | "in" | "out";
}) {
  const toneClass =
    tone === "free"
      ? "border-[#c5d5b8] bg-[#f3f7ef] text-[#3d5230]"
      : tone === "busy"
        ? "border-[#e5e0d8] bg-white text-[#6b635c]"
        : tone === "in"
          ? "border-[#c46a32]/40 bg-[#f2f2f2] text-[#a35528]"
          : "border-[#432f24]/25 bg-[#e8e8e8] text-[#432f24]";

  return (
    <div className={"rounded-sm border px-2 py-1.5 " + toneClass}>
      <p className="truncate text-[8px] font-medium">{name}</p>
      <p className="mt-0.5 text-[6px] uppercase tracking-wide opacity-80">{status}</p>
    </div>
  );
}

function BoardFrame({
  title,
  children,
  compact = false,
}: {
  title: string;
  children: ReactNode;
  compact?: boolean;
}) {
  return (
    <div className={compact ? "w-full max-w-[11.5rem]" : "w-full max-w-[22rem]"}>
      <div
        className={
          compact
            ? "rounded-[1.15rem] border border-[#2a221c] bg-[#1a1512] p-[0.4rem] shadow-[0_18px_40px_-14px_rgba(26,18,12,0.45)]"
            : "rounded-[0.95rem] border border-[#2a221c] bg-[#1a1512] p-[0.45rem] shadow-[0_18px_44px_-12px_rgba(26,18,12,0.4)]"
        }
      >
        <div
          className={
            "overflow-hidden border border-[#3d322a] bg-[#f0f0f0] " +
            (compact ? "rounded-[0.75rem]" : "rounded-[0.55rem]")
          }
        >
          {compact ? (
            <div className="flex justify-center bg-[#1a1512] py-1">
              <div className="h-1 w-8 rounded-full bg-[#3d322a]" />
            </div>
          ) : null}
          <div className="border-b border-[#e5e0d8] bg-white px-2.5 py-2">
            <p className="text-[6px] uppercase tracking-[0.16em] text-[#8a8178]">Restabooking</p>
            <p className="text-[10px] font-medium text-[#1a1512]">{title}</p>
          </div>
          {children}
        </div>
      </div>
      {!compact ? (
        <div className="mx-auto mt-0 flex w-[28%] flex-col items-center">
          <div className="h-3 w-[18%] bg-[#2a221c]" />
          <div className="h-1.5 w-full rounded-b-sm bg-[#1a1512]" />
        </div>
      ) : null}
    </div>
  );
}

export function StayRoomsDevicePreviews({ className = "" }: { className?: string }) {
  return (
    <div
      className={"flex flex-wrap items-end justify-center gap-6 sm:gap-10 " + className}
      aria-hidden
    >
      <div className="origin-bottom transition-transform duration-700 hover:-translate-y-1">
        <BoardFrame title="Huonekartta" compact>
          <div className="grid grid-cols-2 gap-1.5 p-2">
            {ROOMS.slice(0, 4).map((room) => (
              <RoomChip key={room.id} {...room} />
            ))}
          </div>
        </BoardFrame>
      </div>
      <div className="origin-bottom transition-transform duration-700 hover:-translate-y-1.5">
        <BoardFrame title="Huoneiden tilanne">
          <div className="grid grid-cols-2 gap-2 p-2.5 sm:grid-cols-3">
            {ROOMS.map((room) => (
              <RoomChip key={room.id} {...room} />
            ))}
          </div>
        </BoardFrame>
      </div>
    </div>
  );
}
