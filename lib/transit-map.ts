import { projects as allProjects, type Project } from "./projects";

/**
 * El mapa del hero: cada proyecto es una línea de metro y cada herramienta una
 * estación. Las coordenadas son las del SVG (viewBox `mapViewBox`) y están
 * dibujadas a mano: los transbordos caen donde dos proyectos comparten
 * herramienta, así que mover una línea es rediseñar el mapa, no ajustar datos.
 *
 * El número y el título salen de `projects.ts`; aquí sólo vive la geometría.
 */
export const mapViewBox = "80 36 752 530";

/**
 * Trazo de la línea en el mapa. "hack" es más grueso (hackathons), "cased"
 * lleva un hilo borgoña dentro (clientes con producto propio), "own" va
 * punteado (proyecto propio) y "plain" es el trazo base.
 */
export type LineStyle = "hack" | "cased" | "plain" | "own";

/** Los tres colores de la leyenda: se resuelven a tokens en el CSS. */
export type SwatchTone = "white" | "blush" | "burg";

export type SwatchStroke = {
  tone: SwatchTone;
  width: number;
  dash?: string;
  round?: boolean;
};

export type RawLine = {
  slug: string;
  /** Nombre corto para la leyenda, donde el título completo no cabe. */
  shortName: string;
  style: LineStyle;
  d: string;
  /** Muestra de la leyenda: uno o dos trazos superpuestos. */
  swatch: SwatchStroke[];
};

export type MapLine = RawLine & { number: number; title: string; delay: number };

export const rawLines: RawLine[] = [
  {
    slug: "komared",
    shortName: "Komared",
    style: "hack",
    d: "M320 300H516L596 220H700V120",
    swatch: [{ tone: "white", width: 5 }],
  },
  {
    slug: "cbs-alert-mesh",
    shortName: "CBS Alert Mesh",
    style: "hack",
    d: "M520 540V300L700 120",
    swatch: [{ tone: "blush", width: 5 }],
  },
  {
    slug: "cotizador",
    shortName: "Cotizador",
    style: "cased",
    d: "M200 460H440",
    swatch: [
      { tone: "white", width: 6 },
      { tone: "burg", width: 2 },
    ],
  },
  {
    slug: "agendamiento",
    shortName: "Agendamiento",
    style: "cased",
    d: "M760 380H600L520 300",
    swatch: [
      { tone: "blush", width: 6 },
      { tone: "burg", width: 2 },
    ],
  },
  {
    slug: "crm-whatsapp",
    shortName: "CRM + WhatsApp",
    style: "plain",
    d: "M320 300V540",
    swatch: [{ tone: "white", width: 4, dash: "10 4" }],
  },
  {
    slug: "agente-rag-pacientes",
    shortName: "Agente IA pacientes",
    style: "plain",
    d: "M320 300V140L260 80H140",
    swatch: [{ tone: "white", width: 5, dash: "0 8", round: true }],
  },
  {
    slug: "asistente-ia-local",
    shortName: "Asistente IA local",
    style: "own",
    d: "M140 380V80",
    swatch: [{ tone: "blush", width: 4, dash: "6 5" }],
  },
];

export const PULSE_STEP_MS = 120;

/**
 * Retardo de la señal en la línea `index` (base 0): las líneas se encienden en
 * cascada, una cada `PULSE_STEP_MS`.
 */
export function pulseDelay(index: number): number {
  if (!Number.isInteger(index) || index < 0) {
    throw new RangeError(`pulseDelay: índice inválido ${index}`);
  }
  return index * PULSE_STEP_MS;
}

/**
 * Une la geometría con los datos del proyecto. Falla si sobra o falta una
 * línea: un proyecto sin línea saldría en la lista pero no en el mapa.
 */
export function buildMapLines(raw: RawLine[], projects: Project[]): MapLine[] {
  const missing = projects.filter((p) => !raw.some((l) => l.slug === p.slug));
  if (missing.length > 0) {
    throw new Error(`Proyectos sin línea en el mapa: ${missing.map((p) => p.slug).join(", ")}`);
  }
  return raw
    .map((line) => {
      const project = projects.find((p) => p.slug === line.slug);
      if (!project) throw new Error(`Línea sin proyecto: ${line.slug}`);
      return { ...line, number: Number(project.number), title: project.title };
    })
    .sort((a, b) => a.number - b.number)
    .map((line, i) => ({ ...line, delay: pulseDelay(i) }));
}

export const mapLines = buildMapLines(rawLines, allProjects);

export function getMapLine(slug: string): MapLine | undefined {
  return mapLines.find((l) => l.slug === slug);
}

export function lineLabel(line: MapLine): string {
  return `Línea ${line.number}: ${line.title}`;
}

/** Estaciones: `hub` son los transbordos, que se dibujan más grandes. */
export type Station = { cx: number; cy: number; hub?: boolean };

export const mapStations: Station[] = [
  { cx: 420, cy: 300 },
  { cx: 700, cy: 220 },
  { cx: 520, cy: 540 },
  { cx: 520, cy: 460 },
  { cx: 520, cy: 380 },
  { cx: 200, cy: 460 },
  { cx: 440, cy: 460 },
  { cx: 760, cy: 380 },
  { cx: 680, cy: 380 },
  { cx: 600, cy: 380 },
  { cx: 320, cy: 380 },
  { cx: 320, cy: 540 },
  { cx: 320, cy: 220 },
  { cx: 320, cy: 140 },
  { cx: 260, cy: 80 },
  { cx: 140, cy: 380 },
  { cx: 140, cy: 290 },
  { cx: 140, cy: 190 },
  { cx: 320, cy: 300, hub: true },
  { cx: 518, cy: 300, hub: true },
  { cx: 598, cy: 220, hub: true },
  { cx: 700, cy: 120, hub: true },
  { cx: 320, cy: 460, hub: true },
  { cx: 140, cy: 80, hub: true },
];

/** Radio del círculo: los transbordos no son todos iguales en el diseño. */
export function stationRadius(station: Station): number {
  if (!station.hub) return 5;
  // Los dos transbordos de la diagonal de Komared van un punto más grandes
  // para que el ojo los lea como cruce y no como codo.
  return station.cx === 518 || station.cx === 598 ? 11 : 10;
}

export type MapLabel = {
  x: number;
  y: number;
  text: string;
  anchor?: "middle" | "end";
  hub?: boolean;
};

export const mapLabels: MapLabel[] = [
  { x: 302, y: 305, text: "WhatsApp", anchor: "end", hub: true },
  { x: 420, y: 284, text: "Gemini 2.5 Flash", anchor: "middle" },
  { x: 538, y: 305, text: "Supabase", hub: true },
  { x: 580, y: 214, text: "Next.js", anchor: "end", hub: true },
  { x: 714, y: 225, text: "SendGrid" },
  { x: 700, y: 98, text: "Vercel", anchor: "middle", hub: true },
  { x: 534, y: 545, text: "Firebase Cloud Messaging" },
  { x: 534, y: 465, text: "Kotlin" },
  { x: 506, y: 385, text: "Android BLE", anchor: "end" },
  { x: 200, y: 444, text: "PDF", anchor: "middle" },
  { x: 440, y: 484, text: "Clientify", anchor: "middle" },
  { x: 760, y: 404, text: "Google Calendar", anchor: "middle" },
  { x: 680, y: 366, text: "Google Meet", anchor: "middle" },
  { x: 600, y: 404, text: "n8n", anchor: "middle" },
  { x: 306, y: 385, text: "Webhooks", anchor: "end" },
  { x: 334, y: 447, text: "Make", hub: true },
  { x: 334, y: 545, text: "GoHighLevel" },
  { x: 334, y: 225, text: "Embeddings" },
  { x: 334, y: 145, text: "Búsqueda vectorial" },
  { x: 260, y: 64, text: "RAG", anchor: "middle" },
  { x: 140, y: 58, text: "Agentes de IA", anchor: "middle", hub: true },
  { x: 154, y: 195, text: "LLM local" },
  { x: 154, y: 295, text: "NPU" },
  { x: 154, y: 385, text: "Python" },
];

/** El número de cada línea, en un círculo sobre su trazo. */
export const mapRoundels: { number: number; cx: number; cy: number }[] = [
  { number: 1, cx: 470, cy: 300 },
  { number: 2, cx: 520, cy: 500 },
  { number: 3, cx: 260, cy: 460 },
  { number: 4, cx: 720, cy: 380 },
  { number: 5, cx: 320, cy: 420 },
  { number: 6, cx: 200, cy: 80 },
  { number: 7, cx: 140, cy: 335 },
];
