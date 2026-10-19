import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { games } from "./games";

const destello = () => games.find((g) => g.slug === "destello");

describe("videojuegos", () => {
  it("Destello está en la lista con sus datos", () => {
    const game = destello();
    expect(game).toBeDefined();
    expect(game?.title).toBe("Destello");
    expect(game?.studio).toBe("HannaGames");
    expect(game?.genre).toBe("Puzle de luz");
    expect(game?.platform).toBe("Android");
    expect(game?.mechanics).toEqual(["Espejos", "Divisores", "Filtros", "Mezcla"]);
  });

  it("cada url es https y del host hannagames.com", () => {
    for (const game of games) {
      const url = new URL(game.url);
      expect(url.protocol, game.slug).toBe("https:");
      expect(url.host, game.slug).toBe("hannagames.com");
    }
  });

  it("los campos obligatorios no están vacíos", () => {
    for (const game of games) {
      for (const key of ["slug", "title", "studio", "genre", "platform", "tagline", "description", "url", "icon", "iconAlt"] as const) {
        expect(game[key].trim().length, `${game.slug}.${key}`).toBeGreaterThan(0);
      }
      expect(game.mechanics.length, game.slug).toBeGreaterThan(0);
      for (const m of game.mechanics) expect(m.trim().length, game.slug).toBeGreaterThan(0);
    }
  });

  it("el icono es una ruta local que existe en public/", () => {
    for (const game of games) {
      expect(game.icon.startsWith("/"), game.slug).toBe(true);
      expect(game.icon.startsWith("//"), game.slug).toBe(false);
      expect(existsSync(path.join(process.cwd(), "public", game.icon)), game.icon).toBe(true);
    }
  });

  it("los slugs son únicos", () => {
    const slugs = games.map((g) => g.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("el copy no lleva rayas largas ni medias", () => {
    for (const game of games) {
      const text = [game.title, game.tagline, game.description, game.iconAlt, ...game.mechanics].join(" ");
      expect(text, game.slug).not.toMatch(/[—–]/);
    }
  });
});
