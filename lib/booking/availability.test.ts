import { describe, expect, it } from "vitest";
import { availableSlots } from "./availability";
import { cotWallToUtc } from "./time";

const FRIDAY = "2026-09-18";
const SATURDAY = "2026-09-19";

describe("huecos", () => {
  it("Un busy 10:00–10:45 COT tumba 10:00 y NO tumba 11:00", () => {
    const busy = [
      {
        start: cotWallToUtc(FRIDAY, "10:00"),
        end: cotWallToUtc(FRIDAY, "10:45"),
      },
    ];
    const slots = availableSlots(FRIDAY, busy);
    expect(slots).not.toContain("10:00");
    expect(slots).toContain("11:00");
  });

  it("Sábado → slots []", () => {
    expect(availableSlots(SATURDAY, [])).toEqual([]);
  });

  it("Día laboral lleno → [] con éxito, no error", () => {
    const candidates = availableSlots(FRIDAY, []);
    expect(candidates.length).toBeGreaterThan(0);
    const busy = candidates.map((hm) => {
      const start = cotWallToUtc(FRIDAY, hm);
      return { start, end: new Date(start.getTime() + 45 * 60 * 1000) };
    });
    expect(availableSlots(FRIDAY, busy)).toEqual([]);
  });
});
