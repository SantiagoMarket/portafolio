import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = process.cwd();

const STYLE_FILES = [
  "app/styles/map.css",
  "app/styles/routes.css",
  "app/styles/home.css",
] as const;

const HOME_TSX = [
  "app/page.tsx",
  "components/layout/HomeHeader.tsx",
  "components/sections/Hero.tsx",
  "components/sections/TransitMap.tsx",
  "components/sections/ProjectGroups.tsx",
  "components/sections/About.tsx",
  "components/sections/Stack.tsx",
  "components/sections/Contact.tsx",
  "components/ui/LineEntry.tsx",
  "components/ui/RouteList.tsx",
  "components/ui/StackList.tsx",
  "components/ui/Badge.tsx",
  "components/ui/Icon.tsx",
] as const;

/** Los hex de la paleta: cada uno se escribe una vez, en el @theme. */
const PALETTE = [
  "#FFFFFF",
  "#F8F7F8",
  "#EFECEE",
  "#1A1418",
  "#4E454B",
  "#D9D2D6",
  "#7A0B24",
  "#9B0E2E",
  "#C4405A",
  "#F0D6DC",
] as const;

const HEX = /#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/;

const LOOSE_TEXT =
  /\btext-\[|\btext-xs\b|\btext-sm\b|\btext-base\b|\btext-lg\b|\btext-xl\b|\btext-2xl\b|\btext-3xl\b|\btext-4xl\b|\btext-5xl\b|\btext-6xl\b/;

function read(rel: string): string {
  return readFileSync(path.join(ROOT, rel), "utf8");
}

/** Todos los .ts/.tsx/.css de app/ y components/, sin tests. */
function sourceFiles(dir: string): string[] {
  const out: string[] = [];
  for (const name of readdirSync(path.join(ROOT, dir))) {
    const rel = path.posix.join(dir, name);
    if (statSync(path.join(ROOT, rel)).isDirectory()) {
      out.push(...sourceFiles(rel));
    } else if (/\.(tsx?|css)$/.test(name) && !/\.test\.tsx?$/.test(name)) {
      out.push(rel);
    }
  }
  return out;
}

function allCss(): string {
  return [read("app/globals.css"), ...STYLE_FILES.map(read)].join("\n");
}

describe("contrato de diseño de la home", () => {
  it("un solo par tipográfico: Big Shoulders Display y Overpass", () => {
    const css = read("app/globals.css");
    expect(css).toContain("family=Big+Shoulders+Display");
    expect(css).toContain("family=Overpass");
    expect(css).toMatch(/--font-display:\s*"Big Shoulders Display"/);
    expect(css).toMatch(/--font-sans:\s*"Overpass"/);
    expect(css).not.toMatch(/--font-mono/);
  });

  it("ninguna familia anterior ni ajena queda en el sitio", () => {
    const banned = /Space Mono|Space\+Mono|Bebas|DM Sans|DM\+Sans|\bInter\b|Geist|Instrument|IBM Plex|Newsreader/;
    for (const rel of [...sourceFiles("app"), ...sourceFiles("components")]) {
      expect(read(rel), rel).not.toMatch(banned);
    }
  });

  it("sin la familia mono, nadie pide font-mono", () => {
    for (const rel of [...sourceFiles("app"), ...sourceFiles("components")]) {
      expect(read(rel), rel).not.toMatch(/\bfont-mono\b/);
    }
  });

  it("el cuerpo es Overpass sobre papel", () => {
    const body = read("app/globals.css").match(/\nbody\s*\{([^}]+)\}/);
    expect(body).toBeTruthy();
    expect(body![1]).toContain("var(--font-sans)");
    expect(body![1]).toContain("var(--color-paper)");
    expect(body![1]).toContain("var(--color-ink)");
  });

  it("cada hex de la paleta está una sola vez", () => {
    const css = allCss();
    for (const hex of PALETTE) {
      expect(css.split(hex).length - 1, hex).toBe(1);
    }
  });

  it(":root sólo apunta al @theme, sin hex propios", () => {
    const root = read("app/globals.css").match(/:root\s*\{([^}]+)\}/);
    expect(root).toBeTruthy();
    expect(root![1]).not.toMatch(HEX);
    expect(root![1]).toMatch(/var\(--color-/);
  });

  it("las hojas de la home usan tokens, no hex", () => {
    for (const rel of STYLE_FILES) {
      expect(read(rel), rel).not.toMatch(HEX);
    }
  });

  it("globals.css importa las tres hojas de la home dentro de una capa", () => {
    const css = read("app/globals.css");
    for (const rel of STYLE_FILES) {
      expect(css).toContain(`@import "./${rel.replace("app/", "")}"`);
      expect(read(rel), rel).toContain("@layer components");
    }
  });

  it("la home no usa tamaños de texto sueltos ni margen negativo", () => {
    for (const rel of HOME_TSX) {
      const src = read(rel);
      expect(src, rel).not.toMatch(LOOSE_TEXT);
      expect(src, rel).not.toContain("-mt-");
    }
  });

  it("la home no pinta colores a mano", () => {
    for (const rel of HOME_TSX) {
      const src = read(rel);
      expect(src, rel).not.toMatch(HEX);
      expect(src, rel).not.toContain("rgba(");
    }
  });

  it("el orden de la home es mapa, proyectos, sobre mí, stack y contacto", () => {
    const page = read("app/page.tsx");
    const order = ["<Hero", "<ProjectGroups", "<About", "<Stack", "<Contact"].map(
      (tag) => page.indexOf(tag),
    );
    for (const idx of order) expect(idx).toBeGreaterThan(-1);
    expect([...order].sort((a, b) => a - b)).toEqual(order);
    for (const gone of ["<Metrics", "<Hackathons", "<PersonalProjects", "<Experience", "<Education"]) {
      expect(page).not.toContain(gone);
    }
  });

  it("el hero no escribe a máquina: el título está quieto", () => {
    for (const rel of HOME_TSX) {
      expect(read(rel), rel).not.toContain("TypedHeading");
    }
  });

  it("agendar lleva a /agenda, no a un correo", () => {
    const contact = read("components/sections/Contact.tsx");
    expect(contact).toContain('"/agenda"');
    expect(contact).not.toContain("subject=Agendar");
  });

  it("el mapa y la leyenda usan las clases de map.css", () => {
    const map = read("components/sections/TransitMap.tsx");
    for (const cls of ["map", "map-pan", "legend", "roundel", "swatch"]) {
      expect(map).toMatch(new RegExp(`["\\s]${cls}["\\s]`));
    }
  });
});
