import { describe, expect, it } from "vitest";
import { projects } from "./projects";
import {
  buildMapLines,
  getMapLine,
  lineLabel,
  mapLabels,
  mapLines,
  mapRoundels,
  mapStations,
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

describe("línea de Tino", () => {
  it("es una línea propia (punteada) que sale del transbordo de Next.js", () => {
    const tino = rawLines.find((l) => l.slug === "tino");
    expect(tino?.style).toBe("own");
    expect(tino?.d.startsWith("M598 220")).toBe(true);
    expect(getMapLine("tino")?.number).toBe(8);
  });

  it("sus estaciones son herramientas de su stack", () => {
    const textos = mapLabels.map((l) => l.text);
    for (const tool of ["TypeScript", "Claude API", "zod", "Vitest"]) {
      expect(textos, tool).toContain(tool);
      expect(projects.find((p) => p.slug === "tino")?.stack, tool).toContain(tool);
    }
  });
});

describe("integridad del dibujo", () => {
  // Las etiquetas y estaciones se usan como key de React: repetirlas rompe el
  // render en silencio (y una herramienta repetida debería ser un transbordo).
  it("no hay etiquetas ni estaciones repetidas", () => {
    const textos = mapLabels.map((l) => l.text);
    expect(new Set(textos).size).toBe(textos.length);
    const puntos = mapStations.map((s) => `${s.cx}-${s.cy}`);
    expect(new Set(puntos).size).toBe(puntos.length);
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
