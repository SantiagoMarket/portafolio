import { describe, expect, it } from "vitest";
import { education, stackCategories } from "./site-copy";

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
