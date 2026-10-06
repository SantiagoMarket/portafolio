import { describe, expect, it } from "vitest";
import { roleTitle } from "./profile";
import {
  about,
  contact,
  education,
  experience,
  hero,
  mapCaption,
  projectGroups,
  stackCategories,
} from "./site-copy";

describe("formación y stack", () => {
  it("Ignia Action Lab es programa práctico de emprendimiento", () => {
    const ignia = education.find((item) => item.institution === "Ignia Action Lab");
    expect(ignia?.detail).toBe("Programa práctico de emprendimiento");
  });

  it("DESARROLLO no incluye Next.js ni Kotlin y sí Codex y Cursor", () => {
    const desarrollo = stackCategories.find((c) => c.label === "DESARROLLO");
    expect(desarrollo?.tools).not.toContain("Next.js");
    expect(desarrollo?.tools).not.toContain("Kotlin");
    expect(desarrollo?.tools).toContain("Codex");
    expect(desarrollo?.tools).toContain("Cursor");
  });
});

describe("copy de la home", () => {
  it("el stack sigue el orden de la home: Mensajería antes que Desarrollo", () => {
    expect(stackCategories.map((c) => c.label)).toEqual([
      "AUTOMATIZACIÓN",
      "CRM & SALES OPS",
      "MENSAJERÍA",
      "DESARROLLO",
      "DATA & REPORTING",
      "PRODUCTIVIDAD",
    ]);
  });

  it("Desarrollo lista primero lo que aparece en los proyectos", () => {
    const desarrollo = stackCategories.find((c) => c.label === "DESARROLLO");
    expect(desarrollo?.tools.slice(0, 2)).toEqual(["Supabase", "Vercel"]);
  });

  it("hay un grupo por tipo de proyecto, con ancla y entrada", () => {
    expect(projectGroups.map((g) => [g.id, g.kind])).toEqual([
      ["hackathons", "hackathon"],
      ["clientes", "cliente"],
      ["propios", "personal"],
    ]);
    for (const group of projectGroups) expect(group.intro.length).toBeGreaterThan(0);
  });

  it("Sobre mí corrige la tilde: «enseñó que», no «enseñó qué»", () => {
    expect(about.lead).toContain("enseñó que");
    expect(about.lead).not.toContain("enseñó qué");
  });

  it("el cuerpo de Sobre mí usa el título público del perfil", () => {
    expect(about.body).toContain(roleTitle);
  });

  it("la experiencia conserva sus cuatro logros", () => {
    expect(experience.org).toBe("Hands Off Agencia");
    expect(experience.highlights).toHaveLength(4);
  });

  it("el hero tiene tres datos y el pie del mapa explica cómo usarlo", () => {
    expect(hero.meta).toEqual([
      "Bogotá, Colombia",
      "Disponible para roles full-time en LATAM",
      "Español / Inglés A2",
    ]);
    expect(mapCaption).toMatch(/^Siete sistemas construidos/);
  });

  it("contacto lleva la nota de la llamada", () => {
    expect(contact.note).toBe("Llamada de 30 o 45 min · Google Meet");
    expect(contact.headline).toBe("Disponible para roles full-time en LATAM");
  });
});
