import { describe, expect, it } from "vitest";
import { projects } from "./projects";
import {
  buildMapLines,
  getMapLine,
  lineLabel,
  mapLines,
  mapRoundels,
  pulseDelay,
  PULSE_STEP_MS,
  rawLines,
} from "./transit-map";

describe("líneas del mapa", () => {
  it("hay una línea por proyecto, con el mismo número", () => {
    expect(mapLines).toHaveLength(projects.length);
    for (const project of projects) {
      const line = getMapLine(project.slug);
      expect(line?.number).toBe(Number(project.number));
    }
  });

  it("las líneas salen en el orden de numeración, sin repetir número", () => {
    const numbers = mapLines.map((l) => l.number);
    expect(numbers).toEqual([...numbers].sort((a, b) => a - b));
    expect(new Set(numbers).size).toBe(numbers.length);
  });

  it("cada línea toma el título del proyecto, no uno escrito a mano", () => {
    const komared = getMapLine("komared");
    expect(komared?.title).toBe("Komared");
    expect(lineLabel(komared!)).toBe("Línea 1: Komared");
  });

  it("cada línea tiene su roundel en el mapa", () => {
    expect(mapRoundels.map((r) => r.number).sort((a, b) => a - b)).toEqual(
      mapLines.map((l) => l.number),
    );
  });

  it("un slug que no existe devuelve undefined", () => {
    expect(getMapLine("no-existe")).toBeUndefined();
    expect(getMapLine("")).toBeUndefined();
  });

  // Si un proyecto nuevo se queda sin línea, la home lo pinta en la lista pero
  // no en el mapa: debe fallar al construir, no pasar desapercibido.
  it("falla si un proyecto se queda sin línea", () => {
    const sinUna = rawLines.filter((l) => l.slug !== "komared");
    expect(() => buildMapLines(sinUna, projects)).toThrow(/komared/);
  });

  it("falla si una línea apunta a un proyecto que no existe", () => {
    const fantasma = [...rawLines, { ...rawLines[0], slug: "fantasma" }];
    expect(() => buildMapLines(fantasma, projects)).toThrow(/fantasma/);
  });
});

describe("pulseDelay", () => {
  it("la señal recorre las líneas en cascada de 120 ms", () => {
    expect(PULSE_STEP_MS).toBe(120);
    expect([0, 1, 2, 6].map(pulseDelay)).toEqual([0, 120, 240, 720]);
  });

  it("rechaza un índice negativo o fraccionario", () => {
    expect(() => pulseDelay(-1)).toThrow();
    expect(() => pulseDelay(1.5)).toThrow();
  });
});
