import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  documentTitle,
  roleKeywords,
  roleTitle,
  roleTitleLines,
  shellPrompt,
} from "./profile";

const root = join(__dirname, "..");

function source(rel: string) {
  return readFileSync(join(root, rel), "utf8");
}

const publicSurfaces = [
  "components/sections/Hero.tsx",
  "components/sections/About.tsx",
  "components/layout/Nav.tsx",
  "app/layout.tsx",
  "app/tarjeta/page.tsx",
  "app/api/book/route.ts",
];

describe("título público", () => {
  it("el rol es Systems Integrator, no RevOps", () => {
    expect(roleTitle).toBe("Systems Integrator");
    expect(roleTitle).not.toMatch(/RevOps/i);
  });

  it("el título del documento y las líneas del H1 salen del mismo rol", () => {
    expect(documentTitle).toBe(`Santiago Cubillos — ${roleTitle}`);
    expect(roleTitleLines.join(" ")).toBe(roleTitle.toUpperCase());
  });

  it("el prompt del shell y las keywords no arrastran RevOps", () => {
    expect(shellPrompt).not.toMatch(/revops/i);
    expect(roleKeywords).toContain(roleTitle);
    expect(roleKeywords.some((k) => /revops/i.test(k))).toBe(false);
  });

  it("las superficies públicas importan el perfil y no dejan el título viejo pegado", () => {
    for (const file of publicSurfaces) {
      const text = source(file);
      expect(text, file).toMatch(/from ["']@\/lib\/profile["']/);
      expect(text, file).not.toMatch(/RevOps/);
      expect(text, file).not.toMatch(/Automation Specialist/);
      expect(text, file).not.toMatch(/Automation Integrator/);
    }
  });
});
