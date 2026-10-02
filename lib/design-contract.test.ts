import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = process.cwd();

const HOME_FILES = [
  "app/globals.css",
  "app/page.tsx",
  "components/layout/Nav.tsx",
  "components/ui/TypedHeading.tsx",
  "components/ui/SectionHeading.tsx",
  "components/ui/Entry.tsx",
  "components/ui/ProjectRow.tsx",
  "components/ui/ButtonLink.tsx",
  "components/sections/Hero.tsx",
  "components/sections/Metrics.tsx",
  "components/sections/Hackathons.tsx",
  "components/sections/PersonalProjects.tsx",
  "components/sections/Projects.tsx",
  "components/sections/About.tsx",
  "components/sections/Experience.tsx",
  "components/sections/Education.tsx",
  "components/sections/Stack.tsx",
  "components/sections/Contact.tsx",
] as const;

function read(rel: string): string {
  return readFileSync(path.join(ROOT, rel), "utf8");
}

function tsxHomeFiles(): string[] {
  return HOME_FILES.filter((f) => f.endsWith(".tsx"));
}

const LOOSE_TEXT =
  /\btext-\[|\btext-xs\b|\btext-sm\b|\btext-base\b|\btext-lg\b|\btext-xl\b|\btext-2xl\b|\btext-3xl\b|\btext-4xl\b|\btext-5xl\b|\btext-6xl\b/;

describe("contrato de diseño de la home", () => {
  it("la home no usa tamaños de texto sueltos", () => {
    for (const rel of tsxHomeFiles()) {
      const src = read(rel);
      expect(src, rel).not.toMatch(LOOSE_TEXT);
    }
  });

  it("la prosa de la home usa una sola medida y no margen negativo", () => {
    for (const rel of [
      "components/sections/Hero.tsx",
      "components/sections/Projects.tsx",
      "components/sections/Hackathons.tsx",
      "components/sections/PersonalProjects.tsx",
      "components/sections/About.tsx",
    ]) {
      expect(read(rel), rel).toContain("measure");
    }
    for (const rel of tsxHomeFiles()) {
      expect(read(rel), rel).not.toContain("-mt-");
    }
  });

  it("las secciones de la home no se separan con reglas", () => {
    const noSectionRules = [
      "components/sections/Hero.tsx",
      "components/sections/Hackathons.tsx",
      "components/sections/PersonalProjects.tsx",
      "components/sections/Projects.tsx",
      "components/sections/About.tsx",
      "components/sections/Experience.tsx",
      "components/sections/Education.tsx",
      "components/sections/Stack.tsx",
      "components/sections/Contact.tsx",
      "components/sections/Metrics.tsx",
      "components/ui/SectionHeading.tsx",
      "components/ui/Entry.tsx",
    ];
    for (const rel of noSectionRules) {
      const src = read(rel);
      expect(src, rel).not.toContain("border-b");
      expect(src, rel).not.toContain("border-t");
      expect(src, rel).not.toContain("border-r");
      expect(src, rel).not.toContain("borderTop");
      expect(src, rel).not.toContain("borderBottom");
      expect(src, rel).not.toContain("<hr");
      expect(src, rel).not.toContain("border-dashed");
    }
    const proj = read("components/ui/ProjectRow.tsx");
    expect(proj).not.toContain("border-l");
    expect(proj).not.toContain("border-t");
    expect(proj).not.toContain("border-r");
    expect(proj).not.toContain("border-dashed");
    expect(proj).not.toContain("<hr");
  });

  it("siguen las dos líneas de control", () => {
    expect(read("components/layout/Nav.tsx")).toContain("border-b");
    const css = read("app/globals.css");
    expect(css).toContain(".proj-row");
    expect(css).toMatch(/\.proj-row[^{]*\{[^}]*border-bottom/s);
    expect(css).not.toContain("proj-row:first-of-type");
  });

  it("el cuerpo es DM Sans y el mono no desaparece", () => {
    const css = read("app/globals.css");
    const bodyMatch = css.match(/body\s*\{([^}]+)\}/);
    expect(bodyMatch).toBeTruthy();
    const bodyBlock = bodyMatch![1];
    expect(bodyBlock).not.toMatch(/Space Mono/);
    expect(
      bodyBlock.includes("DM Sans") || bodyBlock.includes("var(--font-sans)"),
    ).toBe(true);

    const hero = read("components/sections/Hero.tsx");
    const nav = read("components/layout/Nav.tsx");
    expect(hero.includes("font-mono") || nav.includes("font-mono")).toBe(true);

    const typed = read("components/ui/TypedHeading.tsx");
    expect(typed).toContain("font-display");
    expect(typed).toContain("text-hero");

    const metrics = read("components/sections/Metrics.tsx");
    expect(metrics).toContain("font-display");
    expect(metrics).toContain("text-figure");
  });

  it("siguen las tres familias y ningúna cuarta", () => {
    const css = read("app/globals.css");
    expect(css).toContain("Bebas Neue");
    expect(css).toContain("DM Sans");
    expect(css).toContain("Space Mono");
    expect(css).not.toContain("Inter");
    expect(css).not.toContain("Geist");
    expect(css).not.toContain("Instrument");
    expect(css).not.toContain("IBM Plex");
    expect(css).not.toContain("Newsreader");
  });

  it("cada hex de la paleta está una sola vez", () => {
    const css = read("app/globals.css");
    const hexes = [
      "#FAFAF8",
      "#FFFFFF",
      "#F5F2EF",
      "#7A0B24",
      "#111314",
    ] as const;
    for (const hex of hexes) {
      const count = css.split(hex).length - 1;
      expect(count, hex).toBe(1);
    }
    if (css.includes(":root")) {
      const rootMatch = css.match(/:root\s*\{([^}]+)\}/);
      expect(rootMatch).toBeTruthy();
      const rootBody = rootMatch![1];
      for (const hex of hexes) {
        expect(rootBody).not.toContain(hex);
      }
      expect(rootBody).toMatch(/var\(--color-/);
    }
  });

  it("las cifras no se aplastan en móvil y siguen en fila desde sm", () => {
    const metrics = read("components/sections/Metrics.tsx");
    expect(metrics).toContain("grid-cols-1");
    expect(metrics).toContain("sm:grid-cols-3");
  });

  it("las secciones de la home no pintan su propio fondo", () => {
    const sections = [
      "components/sections/Hero.tsx",
      "components/sections/Hackathons.tsx",
      "components/sections/PersonalProjects.tsx",
      "components/sections/Projects.tsx",
      "components/sections/About.tsx",
      "components/sections/Experience.tsx",
      "components/sections/Education.tsx",
      "components/sections/Stack.tsx",
      "components/sections/Contact.tsx",
    ];
    for (const rel of sections) {
      const src = read(rel);
      expect(src, rel).not.toContain("backgroundColor");
      expect(src, rel).not.toContain("bg-surface");
      expect(src, rel).not.toContain("bg-bg-alt");
      expect(src, rel).not.toContain("bg-bg");
    }
    const css = read("app/globals.css");
    const bodyMatch = css.match(/body\s*\{([^}]+)\}/);
    expect(bodyMatch).toBeTruthy();
    const bodyBlock = bodyMatch![1];
    expect(bodyBlock).toContain("var(--color-surface)");
    expect(bodyBlock).not.toContain("var(--color-bg-alt)");
    expect(css.split("#FAFAF8").length - 1).toBe(1);
  });

  it("la apertura es una sola hoja blanca", () => {
    const page = read("app/page.tsx");
    const bgBgMatches = page.match(/\bbg-bg\b/g) ?? [];
    expect(bgBgMatches).toHaveLength(1);
    expect(page).not.toContain("shadow");
    expect(page).not.toContain("rounded");
    expect(page).not.toContain("border");
    const bgBgIdx = page.search(/\bbg-bg\b/);
    const heroIdx = page.indexOf("<Hero");
    const metricsIdx = page.indexOf("<Metrics");
    const hackathonsIdx = page.indexOf("<Hackathons");
    expect(bgBgIdx).toBeLessThan(heroIdx);
    expect(heroIdx).toBeLessThan(metricsIdx);
    expect(metricsIdx).toBeLessThan(hackathonsIdx);
    const personalIdx = page.indexOf("<PersonalProjects");
    expect(hackathonsIdx).toBeLessThan(personalIdx);
  });

  it("el titulo del hero supera a las cifras", () => {
    const css = read("app/globals.css");
    const heroMatch = css.match(/--text-hero:\s*clamp\(([\d.]+)rem/);
    expect(heroMatch).toBeTruthy();
    const figureMatch = css.match(/--text-figure:\s*([\d.]+)rem/);
    expect(figureMatch).toBeTruthy();
    expect(Number(heroMatch![1])).toBeGreaterThan(Number(figureMatch![1]));
    expect(read("components/ui/TypedHeading.tsx")).toContain("text-hero");
    expect(read("components/sections/Metrics.tsx")).toContain("text-figure");
  });

  it("el relato se separa con aire y no con otro tono", () => {
    const sections = [
      "components/sections/Hackathons.tsx",
      "components/sections/PersonalProjects.tsx",
      "components/sections/Projects.tsx",
      "components/sections/About.tsx",
      "components/sections/Experience.tsx",
      "components/sections/Education.tsx",
      "components/sections/Stack.tsx",
      "components/sections/Contact.tsx",
    ];
    for (const rel of sections) {
      const src = read(rel);
      expect(src, rel).toContain("py-24");
      expect(src, rel).not.toContain("py-16");
      expect(src, rel).not.toContain("bg-bg");
      expect(src, rel).not.toContain("bg-surface");
      expect(src, rel).not.toContain("bg-bg-alt");
      expect(src, rel).not.toContain("bg-burg");
      expect(src, rel).not.toContain("backgroundColor");
    }
  });
});
