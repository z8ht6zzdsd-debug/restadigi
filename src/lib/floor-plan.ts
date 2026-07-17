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
 * Demo floor plan for ~80 covers.
 * Mix: 4×2, 8×4, 4×6, 2×8 = 80 seats (18 tables).
 * Restadigi customizes layout & mix per restaurant.
 */
export const DEMO_FLOOR_PLAN: FloorPlan = {
  id: "demo-80",
  name: "Demo Ravintola — 80 paikkaa",
  capacity: 80,
  tables: [
    // Ikkunarivi
    { id: "t1", label: "1", seats: 2, x: 8, y: 12, shape: "round", zone: "ikkuna" },
    { id: "t2", label: "2", seats: 2, x: 20, y: 12, shape: "round", zone: "ikkuna" },
    { id: "t3", label: "3", seats: 4, x: 36, y: 14, shape: "rect", zone: "ikkuna" },
    { id: "t4", label: "4", seats: 4, x: 54, y: 14, shape: "rect", zone: "ikkuna" },
    { id: "t5", label: "5", seats: 4, x: 72, y: 14, shape: "rect", zone: "ikkuna" },
    { id: "t6", label: "6", seats: 2, x: 88, y: 12, shape: "round", zone: "ikkuna" },

    // Keskisali
    { id: "t7", label: "7", seats: 4, x: 22, y: 38, shape: "rect", zone: "sali" },
    { id: "t8", label: "8", seats: 6, x: 42, y: 40, shape: "rect", zone: "sali" },
    { id: "t9", label: "9", seats: 6, x: 62, y: 40, shape: "rect", zone: "sali" },
    { id: "t10", label: "10", seats: 4, x: 82, y: 38, shape: "rect", zone: "sali" },

    // Takasali
    { id: "t11", label: "11", seats: 4, x: 18, y: 62, shape: "rect", zone: "sali" },
    { id: "t12", label: "12", seats: 4, x: 38, y: 62, shape: "rect", zone: "sali" },
    { id: "t13", label: "13", seats: 6, x: 60, y: 64, shape: "rect", zone: "sali" },
    { id: "t14", label: "14", seats: 2, x: 82, y: 60, shape: "round", zone: "sali" },

    // Terassi / sivusiipi
    { id: "t15", label: "15", seats: 4, x: 12, y: 84, shape: "rect", zone: "terassi" },
    { id: "t16", label: "16", seats: 6, x: 32, y: 86, shape: "rect", zone: "terassi" },

    // Kabinetti (isot seurueet)
    { id: "t17", label: "17", seats: 8, x: 58, y: 86, shape: "rect", zone: "kabinetti" },
    { id: "t18", label: "18", seats: 8, x: 82, y: 86, shape: "rect", zone: "kabinetti" },
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
  let seats2 = Math.round(target * 0.15);
  let seats4 = Math.round(target * 0.45);
  let seats6 = Math.round(target * 0.25);
  let seats8 = target - seats2 - seats4 - seats6;

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
