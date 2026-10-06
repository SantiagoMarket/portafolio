import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = process.cwd();
const PAGE = path.join(ROOT, "app", "privacidad", "page.tsx");
const read = (file: string) => readFileSync(file, "utf8");

/**
 * Google exige una política de privacidad pública para publicar la app de
 * OAuth: la página tiene que existir y decir qué se hace con Calendar.
 */
describe("/privacidad", () => {
  it("la página existe", () => {
    expect(existsSync(PAGE)).toBe(true);
  });

  it("nombra Google Calendar, el Uso Limitado y la Ley 1581", () => {
    const src = read(PAGE);
    expect(src).toMatch(/Google Calendar/);
    expect(src).toMatch(/Uso Limitado/);
    expect(src).toMatch(/1581 de 2012/);
  });

  it("da el mismo correo de contacto que el sitio publica", () => {
    const contact = read(path.join(ROOT, "components", "sections", "Contact.tsx"));
    const email = contact.match(/mailto:([^"]+)"/)?.[1];
    expect(email, "Contact.tsx no publica correo").toBeTruthy();
    expect(read(PAGE)).toContain(email!);
  });

  it("exporta metadata con título", () => {
    expect(read(PAGE)).toMatch(/export const metadata[\s\S]*title:/);
  });

  it("/agenda enlaza a /privacidad", () => {
    expect(read(path.join(ROOT, "app", "agenda", "page.tsx"))).toMatch(/href="\/privacidad"/);
  });
});
