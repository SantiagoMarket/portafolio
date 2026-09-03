import { describe, expect, it } from "vitest";
import { readSlots, slotsRequestKey, type SlotsResult } from "./slots";

describe("slotsRequestKey", () => {
  it("combina día y duración", () => {
    expect(slotsRequestKey("2026-09-10", 45)).toBe("2026-09-10|45");
  });

  it("dos duraciones sobre el mismo día son peticiones distintas", () => {
    expect(slotsRequestKey("2026-09-10", 30)).not.toBe(
      slotsRequestKey("2026-09-10", 45),
    );
  });

  it("sin día no hay petición", () => {
    expect(slotsRequestKey(null, 45)).toBeNull();
  });
});

describe("readSlots", () => {
  const key = "2026-09-10|45";

  it("con la respuesta de la petición actual, muestra los horarios", () => {
    const result: SlotsResult = { key, slots: ["09:00", "10:00"] };
    expect(readSlots(result, key)).toEqual({
      loading: false,
      error: false,
      slots: ["09:00", "10:00"],
    });
  });

  it("sin día elegido no carga ni falla", () => {
    expect(readSlots(null, null)).toEqual({
      loading: false,
      error: false,
      slots: [],
    });
  });

  it("sin respuesta todavía, está cargando", () => {
    expect(readSlots(null, key)).toEqual({
      loading: true,
      error: false,
      slots: [],
    });
  });

  // La carrera que motivó el cambio: se elige un día, se cambia a otro antes de
  // que llegue la respuesta. La respuesta vieja no debe pintarse como buena.
  it("una respuesta de otra petición cuenta como cargando, no como resultado", () => {
    const viejo: SlotsResult = { key: "2026-09-09|45", slots: ["08:00"] };
    expect(readSlots(viejo, key)).toEqual({
      loading: true,
      error: false,
      slots: [],
    });
  });

  it("slots en null es el fallo de la petición", () => {
    expect(readSlots({ key, slots: null }, key)).toEqual({
      loading: false,
      error: true,
      slots: [],
    });
  });

  // Un día sin huecos no es un error: son estados distintos y el texto que ve
  // la persona también.
  it("una lista vacía no es un error", () => {
    expect(readSlots({ key, slots: [] }, key)).toEqual({
      loading: false,
      error: false,
      slots: [],
    });
  });

  it("un fallo de otra petición tampoco se pinta", () => {
    const viejo: SlotsResult = { key: "2026-09-09|45", slots: null };
    expect(readSlots(viejo, key).error).toBe(false);
  });
});
