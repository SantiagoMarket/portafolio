/**
 * Los proyectos son datos, no páginas: cada `app/proyectos/<slug>/page.tsx`
 * busca por slug y delega en `ProjectLayout`.
 *
 * `kind` separa dos contextos que no se comparan entre sí: lo construido para
 * un cliente, donde lo que importa es el proceso que resuelve, y lo construido
 * en un hackathon, donde importan el plazo y el equipo. La numeración es
 * continua entre ambos para que no haya dos "01".
 */
export type ProjectKind = "hackathon" | "cliente";

export type Project = {
  slug: string;
  number: string;
  kind: ProjectKind;
  title: string;
  tagline: string;
  stack: string[];
  url?: string;
  /** Sólo los proyectos de código abierto lo tienen. */
  repo?: string;
  /**
   * El distintivo de la ficha. A veces es un premio ("3er lugar") y a veces
   * sólo el evento donde se construyó: por eso no se llama `award`, para no
   * insinuar un podio donde hubo participación.
   */
  highlight?: { label: string; detail: string };
  /**
   * Distintivo corto para la fila de la home, cuando `highlight.label` no cabe
   * en una línea. Sólo se escribe en ese caso: `projectBadge` lo deriva solo.
   */
  badge?: { label: string; tone: "award" | "event" };
  result: string;
  description: string;
  details: string[];
};

export const projects: Project[] = [
  {
    slug: "komared",
    number: "01",
    kind: "hackathon",
    title: "Komared",
    tagline: "Bot de veeduría ciudadana con IA que mapea incidentes en tiempo real en Colombia",
    stack: ["WhatsApp Business API", "Gemini 2.5 Flash", "Supabase", "Next.js", "SendGrid", "Vercel"],
    url: "https://komared.com",
    highlight: { label: "3er lugar", detail: "Ignia Creaton · Hackathon de 2 semanas · Responsable técnico del equipo · 2025" },
    result: "Cobertura nacional en tiempo real",
    description:
      "Plataforma de veeduría ciudadana donde cualquier persona reporta un incidente de desnutrición o la no entrega del PAE por WhatsApp. Un bot con Gemini 2.5 Flash procesa el mensaje, extrae la información relevante y la almacena en Supabase. Los reportes se visualizan en un mapa en tiempo real cubriendo toda Colombia y disparan alertas automáticas por email vía SendGrid.",
    details: [
      "El ciudadano reporta un incidente enviando un mensaje de WhatsApp",
      "El bot —potenciado con Gemini 2.5 Flash— interpreta el mensaje, extrae tipo de incidente y ubicación",
      "La información se almacena en Supabase y aparece en el mapa en tiempo real",
      "El mapa cubre toda Colombia y muestra incidentes activos agrupados por zona",
      "SendGrid dispara una alerta de email al detectar un nuevo reporte",
      "Las alertas vencidas envían una notificación de seguimiento",
    ],
  },
  {
    slug: "cbs-alert-mesh",
    number: "02",
    kind: "hackathon",
    title: "CBS Alert Mesh",
    tagline: "Alerta temprana para un terremoto: ubicación y mensajes entre teléfonos cuando ya no hay red",
    stack: ["Kotlin", "Android BLE", "Next.js", "Supabase", "Firebase Cloud Messaging", "Vercel"],
    url: "https://cbs-alert-mesh.vercel.app",
    repo: "https://github.com/SantiagoMarket/cbs-alert-mesh",
    highlight: {
      label: "Colombia Tech Week",
      detail: "Hackathon de 24 horas · Desarrollo de la app Android: geolocalización y comunicación sin internet · 2026",
    },
    badge: { label: "24 h", tone: "event" },
    result: "Funciona sin cobertura",
    description:
      "En un terremoto la red móvil es lo primero que se cae, y es justo cuando hace falta. En 24 horas el equipo planteó un sistema de alerta temprana con tres piezas —el aviso, la ubicación de quien responde y la comunicación cuando ya no hay red— y yo me encargué de la app Android: las dos últimas. Un disparo remoto abre una pantalla de autorización en el teléfono; el gesto de la persona lanza a la vez una lectura GPS de un solo uso, un aviso al backend y una malla Bluetooth por la que los teléfonos cercanos se retransmiten mensajes entre sí. El aviso por internet y la malla son caminos independientes: la malla se enciende aunque el envío falle, porque quedarse sin red es exactamente el escenario para el que existe el canal directo entre teléfonos.",
    details: [
      "Una notificación push abre la pantalla de autorización: la ubicación nunca sale sin el gesto de la persona",
      "El gesto dispara una lectura GPS de un solo uso, que entrega una muestra y cierra el proveedor sin dejar procesos escuchando",
      "El teléfono publica la alerta al backend, que la valida con zod estricto y la pinta en un mapa en vivo",
      "En paralelo se enciende la malla Bluetooth: cada teléfono es servidor y cliente a la vez, y de cada pareja abre la conexión uno solo",
      "Los mensajes se propagan por inundación con TTL: nadie conoce la topología, cada nodo repite una vez lo que oye por primera vez",
      "171 tests unitarios y CI en GitHub Actions cubren el protocolo — presupuesto de 31 bytes del anuncio BLE, deduplicación y reenvío",
    ],
  },
  {
    slug: "cotizador",
    number: "03",
    kind: "cliente",
    title: "Cotizador de Ineficiencias",
    tagline: "Calculadora ROI que convierte en oportunidades CRM",
    stack: ["Clientify", "Make", "PDF generation"],
    url: "https://herramientas.handsoff.com.co",
    result: "Lead a CRM automático",
    description:
      "Herramienta que calcula el costo real de los procesos manuales de un equipo, genera un PDF con el análisis y crea la oportunidad en Clientify automáticamente.",
    details: [
      "Formulario de diagnóstico con cálculo de ROI en tiempo real",
      "Generación de PDF personalizado con el análisis de ineficiencias",
      "Integración con Clientify via Make para crear oportunidad automática",
      "Asignación automática al comercial según segmento",
      "Notificación al equipo de ventas vía email",
    ],
  },
  {
    slug: "agendamiento",
    number: "04",
    kind: "cliente",
    title: "Sistema de Agendamiento",
    tagline: "Booking propio integrado con Google Calendar",
    stack: ["n8n", "Google Calendar", "Google Meet", "Supabase"],
    result: "0 conflictos de agenda",
    description:
      "Sistema de agendamiento propio sin dependencia de Calendly, con sincronización bidireccional con Google Calendar y creación automática de videollamadas.",
    details: [
      "Disponibilidad calculada en tiempo real desde Google Calendar",
      "Creación automática de evento en Google Calendar del cliente y del host",
      "Link de Google Meet generado automáticamente por cita",
      "Confirmación y recordatorios automáticos vía email",
      "Orquestado con n8n para máxima flexibilidad",
    ],
  },
  {
    slug: "crm-whatsapp",
    number: "05",
    kind: "cliente",
    title: "Integración CRM + WhatsApp",
    tagline: "Lead entra por WhatsApp, sale etiquetado en GHL",
    stack: ["GoHighLevel", "Make", "WhatsApp API", "Webhooks"],
    result: "~1h manual ahorrada/cliente",
    description:
      "Flujo de automatización que captura leads desde WhatsApp, los enruta por Make y los registra en GoHighLevel con etiquetado automático según respuestas.",
    details: [
      "Webhook receptor de mensajes entrantes desde WhatsApp Business API",
      "Lógica de clasificación en Make según palabras clave y respuestas",
      "Creación o actualización de contacto en GoHighLevel",
      "Etiquetado automático según intención detectada",
      "Disparo de secuencia de seguimiento personalizada",
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByKind(kind: ProjectKind): Project[] {
  return projects.filter((p) => p.kind === kind);
}

export const hackathonProjects = getProjectsByKind("hackathon");
export const clientProjects = getProjectsByKind("cliente");
