import { describe, expect, it } from "vitest";
import { addMinutes, civilDateInBogota, cotWallToUtc } from "./time";

describe("COT ↔ UTC", () => {
  it("09:00 COT de un día laboral → instante UTC 14:00Z", () => {
    const instant = cotWallToUtc("2026-09-18", "09:00");
    expect(instant.toISOString()).toBe("2026-09-18T14:00:00.000Z");
  });

  it("Duración 45 min: 09:00 COT termina 09:45 COT / 14:45Z", () => {
    const start = cotWallToUtc("2026-09-18", "09:00");
    const end = addMinutes(start, 45);
    expect(end.toISOString()).toBe("2026-09-18T14:45:00.000Z");
    expect(civilDateInBogota(end)).toBe("2026-09-18");
    const endHm = new Intl.DateTimeFormat("en-GB", {
      timeZone: "America/Bogota",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    }).format(end);
    expect(endHm).toBe("09:45");
  });
});

describe("fecha civil COT", () => {
  it('Fecha civil COT: toISOString() UTC no es la fecha del picker; extrae la fecha en America/Bogota (el bug: a las 19:00 COT "hoy" no puede ser mañana UTC)', () => {
    // 17 sep 2026 19:00 COT = 18 sep 2026 00:00 UTC
    const nineteenCot = new Date("2026-09-18T00:00:00.000Z");
    expect(nineteenCot.toISOString().split("T")[0]).toBe("2026-09-18");
    expect(civilDateInBogota(nineteenCot)).toBe("2026-09-17");
  });
});
