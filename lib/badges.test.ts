import { describe, expect, it } from "vitest";
import { projectBadge } from "./badges";
import { projects, type Project } from "./projects";

const base: Project = {
  slug: "x",
  number: "99",
  kind: "hackathon",
  title: "X",
  tagline: "t",
  stack: [],
  result: "r",
  description: "d",
  details: ["a"],
};

describe("projectBadge", () => {
  it("marca los proyectos de cliente como CLIENTE", () => {
    const badge = projectBadge({ ...base, kind: "cliente" });
    expect(badge).toEqual({ label: "CLIENTE", tone: "client" });
  });

  it("usa el highlight en mayúsculas cuando el hackathon tiene premio", () => {
    const badge = projectBadge({
      ...base,
      highlight: { label: "3er lugar", detail: "d" },
    });
    expect(badge).toEqual({ label: "3ER LUGAR", tone: "award" });
  });

  it("el badge explícito gana sobre el highlight", () => {
    const badge = projectBadge({
      ...base,
      badge: { label: "24 h", tone: "event" },
      highlight: { label: "Colombia Tech Week", detail: "d" },
    });
    expect(badge).toEqual({ label: "24 H", tone: "event" });
  });

  // Límite: sin premio ni badge la fila seguiría existiendo, y sin distintivo
  // se confundiría con un proyecto de cliente al escanear.
  it("un hackathon sin premio ni badge cae en HACKATHON, no en vacío", () => {
    expect(projectBadge(base)).toEqual({ label: "HACKATHON", tone: "event" });
  });

  it("el cliente ignora highlight y badge si los tuviera", () => {
    const badge = projectBadge({
      ...base,
      kind: "cliente",
      badge: { label: "no", tone: "event" },
      highlight: { label: "tampoco", detail: "d" },
    });
    expect(badge.label).toBe("CLIENTE");
  });
});

describe("los datos reales producen badges usables", () => {
  it("ningún badge sale vacío", () => {
    for (const p of projects) {
      expect(projectBadge(p).label.trim()).not.toBe("");
    }
  });

  // Un badge largo rompe la fila en móvil: el título pierde su espacio y el
  // distintivo se parte en dos líneas.
  it("ningún badge pasa de 14 caracteres", () => {
    for (const p of projects) {
      expect(projectBadge(p).label.length).toBeLessThanOrEqual(14);
    }
  });
});
