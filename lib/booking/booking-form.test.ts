import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("BookingForm motivo", () => {
  it('Motivo "test" (4 caracteres) no bloquea Confirmar llamada: sin mínimo 5 ni el hint', () => {
    const src = readFileSync(
      resolve("components/agenda/BookingForm.tsx"),
      "utf8",
    );
    expect(src).not.toMatch(/motivo\.trim\(\)\.length >= 5/);
    expect(src).not.toMatch(/Mínimo 5 caracteres/);
    expect(src).not.toMatch(/motivo-hint/);
    expect(src).toMatch(/form\.motivo\.trim\(\)\.length >= 1/);
  });
});
