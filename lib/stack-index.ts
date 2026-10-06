import { projects as allProjects, type Project } from "./projects";
import { stackCategories } from "./site-copy";

/**
 * El índice del Stack: junto a cada herramienta, los proyectos de la home
 * donde aparece. Se deriva del `stack` de cada proyecto para que añadir uno
 * actualice el índice sin tocarlo a mano.
 *
 * Los datos no siempre usan el mismo nombre que el índice ("WhatsApp API" en
 * un proyecto, "WhatsApp" en otro): los alias los reúnen.
 */
export const toolAliases: Record<string, string[]> = {
  "WhatsApp Business API": ["WhatsApp Business API", "WhatsApp API", "WhatsApp"],
};

/** Herramientas sin proyecto en la página pero con uso real que contar. */
export const toolNotes: Record<string, string> = {
  HubSpot: "en agencia",
};

export type StackEntry = { tool: string; projects: Project[]; note?: string };

export type StackIndexCategory = { label: string; entries: StackEntry[] };

export function buildStackIndex(
  categories: { label: string; tools: string[] }[],
  projects: Project[],
  aliases: Record<string, string[]> = toolAliases,
  notes: Record<string, string> = toolNotes,
): StackIndexCategory[] {
  const used = new Set(projects.flatMap((p) => p.stack));
  // Un alias mal escrito dejaría la herramienta sin números sin avisar.
  for (const [tool, names] of Object.entries(aliases)) {
    for (const name of names) {
      if (!used.has(name)) {
        throw new Error(`Alias de ${tool} sin proyecto: ${name}`);
      }
    }
  }

  return categories.map(({ label, tools }) => ({
    label,
    entries: tools.map((tool) => {
      const names = aliases[tool] ?? [tool];
      const found = projects
        .filter((p) => p.stack.some((s) => names.includes(s)))
        .sort((a, b) => a.number.localeCompare(b.number));
      return notes[tool] ? { tool, projects: found, note: notes[tool] } : { tool, projects: found };
    }),
  }));
}

export const stackIndex = buildStackIndex(stackCategories, allProjects);
