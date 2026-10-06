import { describe, expect, it } from "vitest";
import { projects } from "./projects";
import { stackCategories } from "./site-copy";
import { buildStackIndex, stackIndex, toolAliases } from "./stack-index";

function entry(tool: string) {
  for (const category of stackIndex) {
    const found = category.entries.find((e) => e.tool === tool);
    if (found) return found;
  }
  throw new Error(`${tool} no está en el índice`);
}

const numbers = (tool: string) => entry(tool).projects.map((p) => p.number);

describe("índice herramienta → proyectos", () => {
  it("Make aparece en el cotizador y en CRM + WhatsApp", () => {
    expect(numbers("Make")).toEqual(["03", "05"]);
  });

  it("WhatsApp Business API reúne sus alias de los datos", () => {
    expect(numbers("WhatsApp Business API")).toEqual(["01", "05", "06"]);
  });

  it("los resultados salen ordenados y sin duplicados", () => {
    for (const category of stackIndex) {
      for (const { projects: found } of category.entries) {
        const nums = found.map((p) => p.number);
        expect(nums).toEqual([...new Set(nums)].sort());
      }
    }
  });

  it("HubSpot no tiene proyectos en la página y lleva la nota de agencia", () => {
    expect(numbers("HubSpot")).toEqual([]);
    expect(entry("HubSpot").note).toBe("en agencia");
  });

  it("una herramienta sin proyectos devuelve lista vacía y sin nota", () => {
    expect(numbers("Notion")).toEqual([]);
    expect(entry("Notion").note).toBeUndefined();
  });

  it("conserva las categorías y el orden de la home", () => {
    expect(stackIndex.map((c) => c.label)).toEqual(stackCategories.map((c) => c.label));
  });

  // Un alias mal escrito dejaría la herramienta sin números en silencio.
  it("un alias que no aparece en ningún stack lanza error", () => {
    expect(() =>
      buildStackIndex(stackCategories, projects, { ...toolAliases, Make: ["Mkae"] }),
    ).toThrow(/Mkae/);
  });
});
