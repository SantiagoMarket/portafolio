import { describe, expect, it } from "vitest";
import { metrics } from "./metrics";
import { projects } from "./projects";

describe("metrics", () => {
  // La franja está maquetada en 4 columnas (2x2 en móvil): con 3 o 5 quedan
  // huecos o una fila coja.
  it("son exactamente cuatro", () => {
    expect(metrics).toHaveLength(4);
  });

  it("la primera cifra sigue al número real de proyectos", () => {
    expect(metrics[0].value).toBe(String(projects.length));
    expect(metrics[0].label).toBe("sistemas en producción");
  });

  it("ninguna métrica queda sin cifra o sin etiqueta", () => {
    for (const m of metrics) {
      expect(m.value.trim()).not.toBe("");
      expect(m.label.trim()).not.toBe("");
    }
  });

  // Una cifra larga desborda la columna y parte la franja.
  it("ninguna cifra pasa de 5 caracteres", () => {
    for (const m of metrics) {
      expect(m.value.length).toBeLessThanOrEqual(5);
    }
  });

  it("las etiquetas no repiten texto entre sí", () => {
    const labels = metrics.map((m) => m.label);
    expect(new Set(labels).size).toBe(labels.length);
  });
});
