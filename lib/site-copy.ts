import { roleTitle } from "./profile";
import type { ProjectKind } from "./projects";

export const hero = {
  name: "Víctor Santiago Cubillos Cruz",
  lede: "Conecto procesos de negocio, CRMs y automatizaciones para que los equipos de ventas y marketing operen sin fricción. Del webhook al reporte, sin intervención manual.",
  meta: ["Bogotá, Colombia", "Disponible para roles full-time en LATAM", "Español / Inglés A2"],
};

export const mapCaption =
  "Siete sistemas construidos. Cada línea es un proyecto y cada estación una herramienta; los transbordos son las herramientas que comparten. Pasa sobre una línea o tócala para seguir su recorrido.";

/**
 * Los tres grupos de la home. El `id` es el ancla que usan el menú y las
 * fichas para volver: cambiarlo rompe esos enlaces.
 */
export const projectGroups: { id: string; kind: ProjectKind; title: string; intro: string }[] = [
  {
    id: "hackathons",
    kind: "hackathon",
    title: "Hackathons",
    intro:
      "Producto construido con plazo corto y en equipo. Es donde se ve qué decido cuando no hay tiempo para decidirlo todo.",
  },
  {
    id: "clientes",
    kind: "cliente",
    title: "Para clientes",
    intro:
      "Aquí lo que importa no es el plazo sino el proceso que resuelve: qué se hacía a mano antes y qué quedó funcionando solo.",
  },
  {
    id: "propios",
    kind: "personal",
    title: "Proyecto propio",
    intro:
      "Sin cliente ni plazo de evento: lo que construyo para probar una idea hasta el final y usarlo a diario.",
  },
];

export const about = {
  lead: "Vengo del marketing y la creación de contenido — eso me enseñó que el marketing y las ventas deben apalancarse de la tecnología para ser eficientes.",
  body: `Hoy conecto ese conocimiento con automatización, CRMs e integraciones para que los procesos funcionen solos. Año y medio especializándome como ${roleTitle}, con experiencia en agencia y proyectos propios.`,
};

export const experience = {
  role: "Integrador de Sistemas",
  org: "Hands Off Agencia",
  period: "Oct 2024 → May 2025",
  place: "Bogotá, Colombia",
  highlights: [
    "12 proyectos de integración CRM (HubSpot, GoHighLevel, Clientify)",
    "Flujos de sincronización: webhook → Make → HTTP API",
    "Ahorro de ~1 hora manual semanal por cliente",
    "Automatización WhatsApp + etiquetado automático de leads en GHL",
  ],
};

export const education = [
  {
    institution: "Ignia Action Lab",
    detail: "Programa práctico de emprendimiento",
    period: "12 semanas · 2026 · Bogotá, Colombia",
  },
  {
    institution: "Platzi",
    detail: "Automatización de procesos · CRM e integraciones",
  },
];

export const stackIntro =
  "Las herramientas con las que trabajo a diario. Junto a cada una, el número de los proyectos de esta página donde aparece.";

/**
 * Dentro de cada categoría van primero las herramientas que aparecen en algún
 * proyecto: son las que llevan números en el índice.
 */
export const stackCategories = [
  { label: "AUTOMATIZACIÓN", tools: ["n8n", "Make", "Zapier"] },
  { label: "CRM & SALES OPS", tools: ["HubSpot", "GoHighLevel", "Clientify"] },
  { label: "MENSAJERÍA", tools: ["WhatsApp Business API"] },
  { label: "DESARROLLO", tools: ["Supabase", "Vercel", "Claude Code", "Codex", "Cursor"] },
  { label: "DATA & REPORTING", tools: ["Looker Studio"] },
  { label: "PRODUCTIVIDAD", tools: ["Notion"] },
];

export const contact = {
  headline: "Disponible para roles full-time en LATAM",
  cta: "Agendar una llamada",
  note: "Llamada de 30 o 45 min · Google Meet",
};
