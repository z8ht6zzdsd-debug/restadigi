/** Restaurant floor-plan model — customized per venue by seat count & table mix. */

export type TableSeats = 2 | 4 | 6 | 8;

export type FloorTable = {
  id: string;
  label: string;
  seats: TableSeats;
  /** Position on canvas as % (0–100). */
  x: number;
  y: number;
  /** Visual size scale relative to seats. */
  shape: "round" | "rect";
  zone: "ikkuna" | "sali" | "terassi" | "kabinetti";
};

export type FloorPlan = {
  id: string;
  name: string;
  /** Target capacity used when Restadigi customizes the map. */
  capacity: number;
  tables: FloorTable[];
};

export function sumSeats(tables: FloorTable[]): number {
  return tables.reduce((sum, t) => sum + t.seats, 0);
}

export function countBySeats(tables: FloorTable[]): Record<TableSeats, number> {
  const counts: Record<TableSeats, number> = { 2: 0, 4: 0, 6: 0, 8: 0 };
  for (const t of tables) counts[t.seats] += 1;
  return counts;
}

/**
 * Demo floor plan for 50 covers — clearer spacing for marketing & admin preview.
 * Mix: 3×2 + 6×4 + 2×6 + 1×8 = 50 seats (12 tables).
 */
export const DEMO_FLOOR_PLAN: FloorPlan = {
  id: "demo-50",
  name: "Demo Ravintola — 50 paikkaa",
  capacity: 50,
  tables: [
    // Ikkunarivi — ilmava
    { id: "t1", label: "1", seats: 2, x: 14, y: 16, shape: "round", zone: "ikkuna" },
    { id: "t2", label: "2", seats: 4, x: 36, y: 18, shape: "rect", zone: "ikkuna" },
    { id: "t3", label: "3", seats: 4, x: 58, y: 18, shape: "rect", zone: "ikkuna" },
    { id: "t4", label: "4", seats: 2, x: 80, y: 16, shape: "round", zone: "ikkuna" },

    // Keskisali
    { id: "t5", label: "5", seats: 4, x: 22, y: 42, shape: "rect", zone: "sali" },
    { id: "t6", label: "6", seats: 6, x: 48, y: 44, shape: "rect", zone: "sali" },
    { id: "t7", label: "7", seats: 4, x: 74, y: 42, shape: "rect", zone: "sali" },

    // Takasali
    { id: "t8", label: "8", seats: 4, x: 28, y: 68, shape: "rect", zone: "sali" },
    { id: "t9", label: "9", seats: 6, x: 54, y: 70, shape: "rect", zone: "sali" },
    { id: "t10", label: "10", seats: 2, x: 78, y: 66, shape: "round", zone: "sali" },

    // Terassi + kabinetti
    { id: "t11", label: "11", seats: 4, x: 24, y: 88, shape: "rect", zone: "terassi" },
    { id: "t12", label: "12", seats: 8, x: 62, y: 88, shape: "rect", zone: "kabinetti" },
  ],
};

export const ZONE_LABELS: Record<FloorTable["zone"], string> = {
  ikkuna: "Ikkuna",
  sali: "Sali",
  terassi: "Terassi",
  kabinetti: "Kabinetti",
};

/** Suggest table mix for a target capacity (used when customizing a new venue). */
export function suggestTableMix(capacity: number): Record<TableSeats, number> {
  const target = Math.max(20, Math.min(200, capacity));
  // Rough split: 15% @2, 45% @4, 25% @6, 15% @8
  const seats2 = Math.round(target * 0.15);
  const seats4 = Math.round(target * 0.45);
  const seats6 = Math.round(target * 0.25);
  const seats8 = target - seats2 - seats4 - seats6;

  // Snap to table sizes
  const n2 = Math.max(1, Math.round(seats2 / 2));
  const n4 = Math.max(2, Math.round(seats4 / 4));
  const n6 = Math.max(1, Math.round(seats6 / 6));
  let n8 = Math.max(0, Math.round(seats8 / 8));

  let total = n2 * 2 + n4 * 4 + n6 * 6 + n8 * 8;
  while (total < target - 4) {
    n8 += 1;
    total += 8;
  }
  while (total > target + 4 && n8 > 0) {
    n8 -= 1;
    total -= 8;
  }

  return { 2: n2, 4: n4, 6: n6, 8: n8 };
}
