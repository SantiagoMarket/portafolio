import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { projects } from "@/lib/projects";
import { projectGroups } from "@/lib/site-copy";

const ROOT = process.cwd();
const read = (file: string) => readFileSync(path.join(ROOT, file), "utf8");

/** Lo que pinta la home: de aquí salen los ids a los que se puede saltar. */
const HOME_FILES = [
  "app/page.tsx",
  "components/layout/HomeHeader.tsx",
  "components/sections/Hero.tsx",
  "components/sections/TransitMap.tsx",
  "components/sections/ProjectGroups.tsx",
  "components/sections/About.tsx",
  "components/sections/Stack.tsx",
  "components/sections/Contact.tsx",
  "components/ui/LineEntry.tsx",
] as const;

/** Las páginas que enlazan de vuelta a la home. */
const OUTSIDE_FILES = ["components/layout/Nav.tsx", "components/layout/ProjectLayout.tsx"] as const;

const ALL_FILES = [...HOME_FILES, ...OUTSIDE_FILES];

/** Ids escritos a mano más los que salen de los datos (grupos y una entrada por proyecto). */
function homeIds(): Set<string> {
  const ids = new Set<string>();
  for (const file of HOME_FILES) {
    for (const m of read(file).matchAll(/\bid="([^"]+)"/g)) ids.add(m[1]);
  }
  for (const group of projectGroups) ids.add(group.id);
  for (const project of projects) ids.add(project.slug);
  return ids;
}

/** Hrefs literales: "/x", "/#ancla" o "#ancla". */
function literalHrefs(file: string): string[] {
  return [...read(file).matchAll(/href[=:]\s*\{?\s*"([/#][^"]*)"/g)].map((m) => m[1]);
}

/** Una ruta "/x/y" existe si hay app/x/y/page.tsx. */
const routeExists = (route: string) =>
  existsSync(path.join(ROOT, "app", route.replace(/^\//, ""), "page.tsx"));

describe("enlaces internos", () => {
  it("cada ruta enlazada desde la home, Nav o ProjectLayout tiene su página", () => {
    const routes = ALL_FILES.flatMap(literalHrefs)
      .map((href) => href.split("#")[0])
      .filter((route) => route !== "" && route !== "/");
    for (const route of routes) expect(routeExists(route), `${route} no existe`).toBe(true);
  });

  it("cada proyecto tiene su ficha en /proyectos/<slug>", () => {
    for (const { slug } of projects) {
      expect(routeExists(`/proyectos/${slug}`), `falta la ficha de ${slug}`).toBe(true);
    }
  });

  it("las entradas de la home enlazan a su ficha", () => {
    expect(read("components/ui/LineEntry.tsx")).toMatch(/\/proyectos\/\$\{project\.slug\}/);
  });

  it("cada ancla usada existe como id en la home", () => {
    const ids = homeIds();
    const anchors = ALL_FILES.flatMap(literalHrefs)
      .filter((href) => href.includes("#"))
      .map((href) => href.split("#")[1]);
    expect(anchors.length).toBeGreaterThan(0);
    for (const anchor of anchors) expect(ids.has(anchor), `#${anchor} no existe`).toBe(true);
  });

  it("un ancla que la home ya no tiene se detecta", () => {
    const ids = homeIds();
    expect(ids.has("proyectos-propios")).toBe(false);
    expect(ids.has("experiencia")).toBe(false);
  });

  it("la ficha vuelve a su propia entrada en la home", () => {
    expect(read("components/layout/ProjectLayout.tsx")).toMatch(/\/#\$\{project\.slug\}/);
  });

  it("el CTA de contacto lleva a /agenda y no a un mailto", () => {
    const contact = read("components/sections/Contact.tsx");
    expect(contact).toMatch(/href="\/agenda"/);
    expect(contact).not.toMatch(/mailto:[^"]*subject=/i);
  });

  it("la home no enlaza a /tarjeta ni a /meet", () => {
    for (const file of HOME_FILES) {
      expect(read(file), file).not.toMatch(/["'`]\/(tarjeta|meet)\b/);
    }
  });
});
