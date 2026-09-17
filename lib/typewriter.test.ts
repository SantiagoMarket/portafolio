import { describe, expect, it } from "vitest";
import { roleTitleLines } from "./profile";
import { typewriterFrame } from "./typewriter";

const msPerChar = 10;
const first = roleTitleLines[0];
const second = roleTitleLines[1];

describe("typewriterFrame", () => {
  it("`SYSTEMS` aparece completo en la línea 1 antes de que empiece `INTEGRATOR`", () => {
    const frame = typewriterFrame({
      lines: roleTitleLines,
      elapsedMs: first.length * msPerChar,
      msPerChar,
    });

    expect(frame.lines[0]).toBe("SYSTEMS");
    expect(frame.lines[1]).toBe("");
    expect(frame.done).toBe(false);
  });

  it("`INTEGRATOR` se revela carácter a carácter en la línea 2", () => {
    const revealed: string[] = [];

    for (let count = 1; count <= second.length; count += 1) {
      const frame = typewriterFrame({
        lines: roleTitleLines,
        elapsedMs: (first.length + count) * msPerChar,
        msPerChar,
      });
      expect(frame.lines[0]).toBe("SYSTEMS");
      revealed.push(frame.lines[1]);
    }

    expect(revealed).toEqual([
      "I",
      "IN",
      "INT",
      "INTE",
      "INTEG",
      "INTEGR",
      "INTEGRA",
      "INTEGRAT",
      "INTEGRATO",
      "INTEGRATOR",
    ]);
  });

  it("con reduced-motion el frame 0 ya tiene `SYSTEMS` e `INTEGRATOR` completos y `done: true`", () => {
    const frame = typewriterFrame({
      lines: roleTitleLines,
      elapsedMs: 0,
      reducedMotion: true,
    });

    expect(frame.lines[0]).toBe("SYSTEMS");
    expect(frame.lines[1]).toBe("INTEGRATOR");
    expect(frame.done).toBe(true);
  });

  it("a elapsed 0 (sin reduced-motion) ninguna línea tiene aún el texto completo", () => {
    const frame = typewriterFrame({
      lines: roleTitleLines,
      elapsedMs: 0,
    });

    expect(frame.lines[0]).not.toBe("SYSTEMS");
    expect(frame.lines[1]).not.toBe("INTEGRATOR");
    expect(frame.done).toBe(false);
  });

  it("al terminar, línea 1 === `SYSTEMS` y línea 2 === `INTEGRATOR`", () => {
    const frame = typewriterFrame({
      lines: roleTitleLines,
      elapsedMs: (first.length + second.length) * msPerChar,
      msPerChar,
    });

    expect(frame.lines[0]).toBe("SYSTEMS");
    expect(frame.lines[1]).toBe("INTEGRATOR");
    expect(frame.done).toBe(true);
  });
});
