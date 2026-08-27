import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  clientProjects,
  getProjectBySlug,
  getProjectsByKind,
  hackathonProjects,
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
  it("cada proyecto cae en exactamente una de las dos listas", () => {
    expect(hackathonProjects.length + clientProjects.length).toBe(
      projects.length,
    );
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
    expect(projects.map((p) => p.number)).toEqual(["01", "02", "03", "04", "05"]);
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
