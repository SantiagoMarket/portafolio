import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  clientProjects,
  getProjectBySlug,
  getProjectsByKind,
  homeSummary,
  hackathonProjects,
  personalProjects,
  projects,
} from "./projects";

describe("getProjectBySlug", () => {
  it("devuelve el proyecto que corresponde al slug", () => {
    const project = getProjectBySlug("cbs-alert-mesh");
    expect(project?.title).toBe("CBS Alert Mesh");
  });

  it("devuelve undefined cuando el slug no existe", () => {
    expect(getProjectBySlug("no-existe")).toBeUndefined();
  });

  it("devuelve undefined con un slug vacío", () => {
    expect(getProjectBySlug("")).toBeUndefined();
  });
});

describe("separación por tipo", () => {
  it("los hackathons salen en orden, con CBS después de Komared", () => {
    expect(hackathonProjects.map((p) => p.slug)).toEqual([
      "komared",
      "cbs-alert-mesh",
    ]);
  });

  it("los proyectos de cliente no incluyen ningún hackathon", () => {
    expect(clientProjects.every((p) => p.kind === "cliente")).toBe(true);
  });

  // Si un proyecto nuevo se quedara sin `kind` válido desaparecería de la
  // página sin error: no rompe nada, simplemente no se ve.
  it("cada proyecto cae en exactamente una de las tres listas", () => {
    expect(
      hackathonProjects.length + clientProjects.length + personalProjects.length,
    ).toBe(projects.length);
  });

  it("los proyectos propios son Lucía y Tino, en ese orden", () => {
    expect(personalProjects.map((p) => p.slug)).toEqual(["asistente-ia-local", "tino"]);
    expect(getProjectsByKind("personal").every((p) => p.kind === "personal")).toBe(true);
  });

  it("un tipo sin proyectos devuelve lista vacía, no undefined", () => {
    const soloHackathons = getProjectsByKind("hackathon");
    expect(Array.isArray(soloHackathons)).toBe(true);
    expect(getProjectsByKind("cliente").length).toBeGreaterThan(0);
  });
});

describe("integridad de los datos", () => {
  it("los slugs no se repiten", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("la numeración es continua y sin huecos", () => {
    expect(projects.map((p) => p.number)).toEqual(["01", "02", "03", "04", "05", "06", "07", "08"]);
  });

  // El fallo propio de este diseño: los proyectos son datos y las rutas son
  // archivos. Agregar la entrada y olvidar la página deja «Ver proyecto →»
  // apuntando a un 404, y nada lo avisa hasta que alguien lo hace clic.
  it("cada proyecto tiene su página en app/proyectos", () => {
    const sinPagina = projects
      .map((p) => p.slug)
      .filter(
        (slug) =>
          !existsSync(join(__dirname, "..", "app", "proyectos", slug, "page.tsx")),
      );
    expect(sinPagina).toEqual([]);
  });

  it("los enlaces externos son absolutos y https", () => {
    const enlaces = projects.flatMap((p) =>
      [p.url, p.repo].filter((u): u is string => typeof u === "string"),
    );
    expect(enlaces.length).toBeGreaterThan(0);
    for (const enlace of enlaces) {
      expect(enlace.startsWith("https://")).toBe(true);
    }
  });

  it("todo hackathon dice en qué evento se construyó", () => {
    for (const p of hackathonProjects) {
      expect(p.highlight?.label.trim()).toBeTruthy();
      expect(p.highlight?.detail.trim()).toBeTruthy();
    }
  });

  // Escribir la ficha antes de tener los datos del evento es lo normal; que el
  // marcador llegue a producción, no.
  //
  // Los marcadores se buscan en mayúsculas y como palabra completa: en
  // minúsculas y sin límites, «PENDIENTE» hace match dentro de
  // «independientes» y el test acusa a un texto que está bien.
  it("ninguna ficha publica un texto pendiente de rellenar", () => {
    const textos = projects.flatMap((p) => [
      p.tagline,
      p.description,
      p.result,
      p.highlight?.detail ?? "",
      ...p.details,
    ]);
    for (const texto of textos) {
      expect(texto).not.toMatch(/\b(PENDIENTE|TODO|FIXME|XXX)\b/);
      expect(texto).not.toMatch(/lorem ipsum/i);
    }
  });

  it("ningún proyecto se queda sin título, tagline o resultado", () => {
    for (const p of projects) {
      expect(p.title.trim()).not.toBe("");
      expect(p.tagline.trim()).not.toBe("");
      expect(p.result.trim()).not.toBe("");
      expect(p.details.length).toBeGreaterThan(0);
    }
  });
});

describe("proyectos nuevos", () => {
  it.each([
    ["agente-rag-pacientes", "cliente", "06"],
    ["asistente-ia-local", "personal", "07"],
    ["tino", "personal", "08"],
  ] as const)("%s existe como %s con número %s y tiene página", (slug, kind, number) => {
    const project = getProjectBySlug(slug);
    expect(project?.kind).toBe(kind);
    expect(project?.number).toBe(number);
    expect(
      existsSync(join(__dirname, "..", "app", "proyectos", slug, "page.tsx")),
    ).toBe(true);
  });
});

function textos(p: (typeof projects)[number]): string[] {
  return [
    p.slug,
    p.title,
    p.tagline,
    p.result,
    p.description,
    p.url ?? "",
    p.repo ?? "",
    p.highlight?.label ?? "",
    p.highlight?.detail ?? "",
    p.badge?.label ?? "",
    ...p.stack,
    ...p.details,
  ];
}

describe("guard de datos sensibles", () => {
  // Nombres de clientes, proveedores y del equipo propio: no se publican en
  // ninguna ficha.
  const IDENTIFICABLES = ["nieves", "kommo", "supermainds", "lenovo", "bancolombia", "zivex"];

  it("ningún proyecto publica datos identificables", () => {
    for (const p of projects) {
      const texto = textos(p).join(" ").toLowerCase();
      for (const termino of IDENTIFICABLES) {
        expect(texto, `${p.slug} contiene ${termino}`).not.toContain(termino);
      }
    }
  });

  it("el guard detecta un término sin importar mayúsculas", () => {
    const texto = textos({
      ...projects[0],
      tagline: "Hecho para NIEVES",
    })
      .join(" ")
      .toLowerCase();
    expect(texto).toContain("nieves");
  });
});

describe("ficha de Lucía", () => {
  it("se presenta como gestión de tareas con IA local", () => {
    const lucia = getProjectBySlug("asistente-ia-local")!;
    expect(lucia.title).toBe("Lucía: Gestión de tareas con IA local");
    expect(lucia.title).not.toContain("Actas de reunión");
    expect(lucia.result).toBe("Cero datos fuera del equipo");
  });

  it("explica que de la reunión salen acta y tareas", () => {
    const texto = textos(getProjectBySlug("asistente-ia-local")!).join(" ");
    expect(texto).toMatch(/tareas/i);
    expect(texto).toContain("acta");
  });

  it("asistente-ia-local menciona Ritmia y Whisper", () => {
    const texto = textos(getProjectBySlug("asistente-ia-local")!).join(" ");
    expect(texto).toContain("Ritmia");
    expect(texto).toContain("Whisper");
  });

  // Contenido aprobado: la ficha de Lucía no publica el conteo de tests ni TDD.
  it.each(["1000 tests", "TDD"])("no menciona «%s»", (termino) => {
    const lucia = getProjectBySlug("asistente-ia-local")!;
    expect([...textos(lucia), lucia.summary ?? ""].join(" ")).not.toContain(termino);
  });
});

describe("fechas de los hackathons", () => {
  it("Komared es de 2026, no de 2025", () => {
    const komared = getProjectBySlug("komared")!;
    const texto = [...textos(komared), komared.summary ?? ""].join(" ");
    expect(komared.highlight?.detail).toContain("2026");
    expect(texto).not.toContain("2025");
  });

  it("todos los hackathons quedan fechados en 2026", () => {
    for (const p of hackathonProjects) {
      expect(p.highlight?.detail, p.slug).toContain("2026");
    }
  });
});

describe("ficha de Tino", () => {
  const tino = () => getProjectBySlug("tino")!;

  it("es la herramienta de prospección de Ritmia, con título en el estilo de Lucía", () => {
    expect(tino().title).toBe("Tino — Prospección B2B con IA");
    expect(textos(tino()).join(" ")).toContain("Ritmia");
    expect(tino().result).toBe("Cada lead con fuente y fecha");
  });

  it("declara el stack aprobado", () => {
    expect(tino().stack).toEqual(["Next.js", "TypeScript", "Claude API", "SQLite", "zod", "Vitest"]);
  });

  // Contenido aprobado: ni la ley, ni el cliente de prueba, ni el conteo de
  // tests salen en la ficha.
  it.each(["1581", "zivex", "tests"])("no menciona «%s»", (termino) => {
    expect(textos(tino()).join(" ").toLowerCase()).not.toContain(termino);
  });

  // Ajustes aprobados: Tino habla de mensajes, no de correos; sin el origen
  // del nombre ni el traspaso a una persona; la investigación incluye LinkedIn.
  const todoTino = () => [...textos(tino()), tino().summary ?? ""].join(" ");

  it("no habla de correo ni de email", () => {
    expect(todoTino()).not.toMatch(/correo|e-?mail/i);
  });

  it("no explica el nombre ni el traspaso a una persona", () => {
    expect(todoTino().toLowerCase()).not.toContain("tener tino");
    expect(todoTino().toLowerCase()).not.toContain("deja de hablar");
  });

  it("la investigación incluye LinkedIn y redacta el primer mensaje de contacto", () => {
    expect(todoTino()).toContain("LinkedIn");
    expect(todoTino()).toContain("primer mensaje de contacto");
  });
});

describe("copy alineado con la home", () => {
  it("el resultado de CRM + WhatsApp dice la hora con espacio y sin barra", () => {
    expect(getProjectBySlug("crm-whatsapp")?.result).toBe("~1 h manual ahorrada por cliente");
  });

  it("el cotizador escribe «vía» con tilde", () => {
    const detalles = getProjectBySlug("cotizador")!.details.join(" ");
    expect(detalles).toContain("vía Make");
    expect(detalles).not.toMatch(/\bvia\b/);
  });

  // La home recorta la descripción de CBS; la ficha conserva la completa.
  it("CBS tiene un resumen más corto que su descripción", () => {
    const cbs = getProjectBySlug("cbs-alert-mesh")!;
    expect(cbs.summary).toBeDefined();
    expect(cbs.summary!.length).toBeLessThan(cbs.description.length);
    expect(cbs.summary).not.toContain("Un disparo remoto");
  });

  it("la ficha de CBS no menciona los 171 tests ni el CI en GitHub Actions", () => {
    const cbs = getProjectBySlug("cbs-alert-mesh")!;
    const textos = JSON.stringify(cbs);
    expect(textos).not.toContain("171 tests");
    expect(textos).not.toContain("GitHub Actions");
  });

  it("homeSummary usa la descripción cuando no hay resumen", () => {
    const komared = getProjectBySlug("komared")!;
    expect(komared.summary).toBeUndefined();
    expect(homeSummary(komared)).toBe(komared.description);
  });
});
