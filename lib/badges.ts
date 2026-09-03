import type { Project } from "./projects";

/**
 * El distintivo que la fila de la home muestra a la derecha del título.
 *
 * Se deriva en vez de escribirse en cada fila porque el mismo proyecto aparece
 * en dos contextos —la home y su ficha— y el criterio de qué mostrar no debe
 * vivir duplicado en el JSX.
 */
export type BadgeTone = "award" | "event" | "client";

export type Badge = { label: string; tone: BadgeTone };

export function projectBadge(project: Project): Badge {
  if (project.kind === "cliente") {
    return { label: "CLIENTE", tone: "client" };
  }
  // `badge` gana sobre `highlight` porque `highlight.label` a veces es el
  // nombre del evento ("Colombia Tech Week") y no cabe en una línea.
  if (project.badge) {
    return { label: project.badge.label.toUpperCase(), tone: project.badge.tone };
  }
  if (project.highlight) {
    return { label: project.highlight.label.toUpperCase(), tone: "award" };
  }
  // Un hackathon sin distintivo no debe dejar la fila sin marcar: el badge es
  // lo que separa visualmente las dos secciones al escanear.
  return { label: "HACKATHON", tone: "event" };
}
