/**
 * Los proyectos son datos, no páginas: cada `app/proyectos/<slug>/page.tsx`
 * busca por slug y delega en `ProjectLayout`.
 *
 * `kind` separa dos contextos que no se comparan entre sí: lo construido para
 * un cliente, donde lo que importa es el proceso que resuelve, y lo construido
 * en un hackathon, donde importan el plazo y el equipo. "personal" es lo
 * construido por iniciativa propia, sin cliente ni evento. La numeración es
 * continua entre todos para que no haya dos "01".
 */
export type ProjectKind = "hackathon" | "cliente" | "personal";

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
  /**
   * Versión corta para la home, sólo cuando la descripción completa no cabe
   * allí. La ficha siempre muestra `description`: ver `homeSummary`.
   */
  summary?: string;
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
    highlight: { label: "3er lugar", detail: "Ignia Creaton · Hackathon de 2 semanas · Responsable técnico del equipo · 2026" },
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
    summary:
      "En un terremoto la red móvil es lo primero que se cae, y es justo cuando hace falta. En 24 horas el equipo planteó un sistema de alerta temprana con tres piezas —el aviso, la ubicación de quien responde y la comunicación cuando ya no hay red— y yo me encargué de la app Android: las dos últimas. El aviso por internet y la malla Bluetooth son caminos independientes: la malla se enciende aunque el envío falle, porque quedarse sin red es exactamente el escenario para el que existe el canal directo entre teléfonos.",
    details: [
      "Una notificación push abre la pantalla de autorización: la ubicación nunca sale sin el gesto de la persona",
      "El gesto dispara una lectura GPS de un solo uso, que entrega una muestra y cierra el proveedor sin dejar procesos escuchando",
      "El teléfono publica la alerta al backend, que la valida con zod estricto y la pinta en un mapa en vivo",
      "En paralelo se enciende la malla Bluetooth: cada teléfono es servidor y cliente a la vez, y de cada pareja abre la conexión uno solo",
      "Los mensajes se propagan por inundación con TTL: nadie conoce la topología, cada nodo repite una vez lo que oye por primera vez",
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
      "Integración con Clientify vía Make para crear oportunidad automática",
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
    result: "~1 h manual ahorrada por cliente",
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
  {
    slug: "agente-rag-pacientes",
    number: "06",
    kind: "cliente",
    title: "Agente IA de Atención al Paciente",
    tagline: "Agente de IA con RAG que atiende pacientes por WhatsApp",
    stack: ["OpenAI", "Embeddings", "RAG", "pgvector", "Supabase", "WhatsApp"],
    result: "Respuestas solo desde conocimiento autorizado",
    description:
      "Agente conversacional para una clínica que responde a pacientes usando recuperación semántica sobre una base de conocimiento propia: cada pregunta se convierte en embedding, se buscan las fichas más cercanas y el modelo solo puede responder con el contenido autorizado por la clínica.",
    details: [
      "Base de conocimiento editable por personal no técnico, re-indexada automáticamente cada noche",
      "Recuperación por similitud semántica de las fichas más relevantes para cada mensaje",
      "Reglas de seguridad clínica: no diagnostica, escala síntomas graves y no confirma servicios inexistentes",
      "Derivación a un asesor humano con resumen de la conversación",
      "Captura progresiva de datos del paciente durante la conversación",
      "Validado con un plan de pruebas de aceptación de más de 120 casos",
    ],
  },
  {
    slug: "asistente-ia-local",
    number: "07",
    kind: "personal",
    title: "Lucía — Actas de reunión con IA local",
    tagline: "Herramienta interna de Ritmia: graba, transcribe y redacta el acta sin que el audio salga del equipo",
    stack: ["Python", "Whisper", "Qwen3", "OpenVINO", "NPU", "SQLite"],
    result: "Cero datos fuera del equipo",
    description:
      "App de escritorio en desarrollo para Ritmia que graba reuniones presenciales, muestra un borrador en vivo y al terminar genera el acta —resumen, decisiones y tareas con responsable y fecha— con modelos que corren en el portátil. Sin nube y sin coste por uso.",
    details: [
      "Transcripción en vivo y final con Whisper, acelerada en la NPU y la GPU del portátil",
      "Acta generada por un LLM local con salida estructurada y validada",
      "Reuniones largas divididas por bloques y consolidadas en una sola acta",
      "Reglas contra alucinaciones: no inventa responsables ni fechas",
      "Evaluaciones propias de la calidad de la transcripción y del acta",
    ],
  },
  {
    slug: "tino",
    number: "08",
    kind: "personal",
    title: "Tino — Prospección B2B con IA",
    tagline: "Herramienta interna de Ritmia: encuentra, califica e investiga empresas y redacta el primer contacto",
    stack: ["Next.js", "TypeScript", "Claude API", "SQLite", "zod", "Vitest"],
    result: "Cada lead con fuente y fecha",
    description:
      "Prospector B2B en desarrollo para Ritmia que trabaja sobre datos públicos colombianos —RUES, SECOP y REPS—: encuentra empresas que encajan con el perfil buscado, las califica, las investiga con IA y redacta el primer mensaje de contacto.",
    details: [
      "Empresas encontradas y cruzadas en registros públicos colombianos: RUES, SECOP y REPS",
      "Cada lead lleva un puntaje que se explica: cada señal con su fuente y su fecha",
      "Investiga cada empresa, incluida su información de LinkedIn, y redacta el primer contacto con Claude, a un costo de IA de ~US$0,09 por lead",
      "Un humano aprueba cada mensaje antes de enviarlo",
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** El texto que la home muestra bajo el título del proyecto. */
export function homeSummary(project: Project): string {
  return project.summary ?? project.description;
}

export function getProjectsByKind(kind: ProjectKind): Project[] {
  return projects.filter((p) => p.kind === kind);
}

export const hackathonProjects = getProjectsByKind("hackathon");
export const clientProjects = getProjectsByKind("cliente");
export const personalProjects = getProjectsByKind("personal");
