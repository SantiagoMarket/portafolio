import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { civilDateInBogota } from "./time";

describe("CalendarPicker fecha civil", () => {
  it('Fecha civil COT: toISOString() UTC no es la fecha del picker; extrae la fecha en America/Bogota (el bug: a las 19:00 COT "hoy" no puede ser mañana UTC)', () => {
    const nineteenCot = new Date("2026-09-18T00:00:00.000Z");
    expect(nineteenCot.toISOString().split("T")[0]).toBe("2026-09-18");
    expect(civilDateInBogota(nineteenCot)).toBe("2026-09-17");

    const src = readFileSync(
      resolve("components/agenda/CalendarPicker.tsx"),
      "utf8",
    );
    expect(src).not.toMatch(/toISOString\(\)/);
    expect(src).toMatch(/civilDateInBogota/);
  });
});
