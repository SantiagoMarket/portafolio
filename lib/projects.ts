export type Project = {
  slug: string;
  number: string;
  title: string;
  tagline: string;
  stack: string[];
  url?: string;
  award?: { label: string; detail: string };
  result: string;
  description: string;
  details: string[];
};

export const projects: Project[] = [
  {
    slug: "komared",
    number: "01",
    title: "Komared",
    tagline: "Bot de Vedurida ciudadana con IA que mapea incidentes en tiempo real en Colombia",
    stack: ["WhatsApp Business API", "Gemini 2.5 Flash", "Supabase", "Next.js", "SendGrid", "Vercel"],
    url: "https://komared.com",
    award: { label: "3er lugar", detail: "Ignia Creaton · Hackathon de 2 semanas · Responsable técnico del equipo · 2025" },
    result: "Cobertura nacional en tiempo real",
    description:
      "Plataforma de Vedurida ciudadana donde cualquier persona reporta un incidente de desnutricion o la no entrega del pae por WhatsApp. Un bot con Gemini 2.5 Flash procesa el mensaje, extrae la información relevante y la almacena en Supabase. Los reportes se visualizan en un mapa en tiempo real cubriendo toda Colombia y disparan alertas automáticas por email vía SendGrid.",
    details: [
      "El ciudadano reporta un incidente enviando un mensaje de WhatsApp",
      "El bot —potenciado con Gemini 2.5 Flash— interpreta el mensaje, extrae tipo de incidente y ubicación",
      "La información se almacena en Supabase y aparece en el mapa en tiempo real",
      "El mapa cubre toda Colombia y muestra incidentes activos agrupados por zona",
      "SendGrid dispara una alerta de email al detectar un nuevo reporte",
      "Las alertas vencidas envian una alerta",
    ],
  },
  {
    slug: "cotizador",
    number: "02",
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
    number: "03",
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
    number: "04",
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
