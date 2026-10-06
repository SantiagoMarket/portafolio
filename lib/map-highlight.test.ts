import { describe, expect, it } from "vitest";
import { createMapReducer, initialMapState, isIsolating } from "./map-highlight";

const ids = ["komared", "cbs-alert-mesh"];

describe("resaltado del mapa", () => {
  const reduce = createMapReducer(ids, false);

  it("entrar a una línea la aísla y lanza su pulso", () => {
    const state = reduce(initialMapState, { type: "enter", id: "komared" });
    expect(state.active).toBe("komared");
    expect(state.sending).toBe("komared");
    expect(state.pulseKey).toBe(1);
    expect(isIsolating(state)).toBe(true);
  });

  it("salir devuelve el mapa completo", () => {
    const on = reduce(initialMapState, { type: "enter", id: "komared" });
    const off = reduce(on, { type: "leave" });
    expect(off.active).toBeNull();
    expect(isIsolating(off)).toBe(false);
  });

  it("volver a entrar relanza el pulso aunque sea la misma línea", () => {
    const once = reduce(initialMapState, { type: "enter", id: "komared" });
    const twice = reduce(reduce(once, { type: "leave" }), { type: "enter", id: "komared" });
    expect(twice.pulseKey).toBe(2);
  });

  it("un id desconocido no cambia el estado", () => {
    const state = reduce(initialMapState, { type: "enter", id: "fantasma" });
    expect(state).toBe(initialMapState);
  });

  it("salir sin haber entrado no cambia el estado", () => {
    expect(reduce(initialMapState, { type: "leave" })).toBe(initialMapState);
  });

  it("con movimiento reducido aísla la línea pero no hay pulso", () => {
    const quieto = createMapReducer(ids, true);
    const state = quieto(initialMapState, { type: "enter", id: "komared" });
    expect(state.active).toBe("komared");
    expect(state.sending).toBeNull();
    expect(state.pulseKey).toBe(0);
  });
});
