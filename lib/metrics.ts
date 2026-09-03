import { projects } from "./projects";

/**
 * La franja de cifras bajo el hero: es lo primero que se escanea, antes de
 * leer una sola línea.
 *
 * `sistemas en producción` se deriva de `projects` en vez de escribirse a mano
 * porque es la única de las cuatro que cambia al agregar un proyecto, y una
 * cifra desactualizada arriba del todo es peor que no ponerla.
 */
export type Metric = { value: string; label: string };

export const metrics: Metric[] = [
  { value: String(projects.length), label: "sistemas en producción" },
  { value: "12", label: "integraciones CRM" },
  { value: "171", label: "tests en CI" },
  { value: "~1H", label: "manual ahorrada / cliente" },
];
