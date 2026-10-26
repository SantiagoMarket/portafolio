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

  it("Colmena está en la lista con sus datos", () => {
    const game = games.find((g) => g.slug === "colmena");
    expect(game).toBeDefined();
    expect(game?.title).toBe("Colmena");
    expect(game?.studio).toBe("HannaGames");
    expect(game?.genre).toBe("Puzle de panal");
    expect(game?.platform).toBe("Android");
    expect(game?.url).toBe("https://hannagames.com/colmena/");
    expect(game?.icon).toBe("/games/colmena-icon.webp");
    expect(game?.mechanics).toEqual(["Piezas hexagonales", "Líneas en 3 direcciones", "Combos y rachas", "Reto diario"]);
  });

  it("Fiel está en la lista con sus datos", () => {
    const game = games.find((g) => g.slug === "fiel");
    expect(game).toBeDefined();
    expect(game?.title).toBe("Fiel");
    expect(game?.studio).toBe("HannaGames");
    expect(game?.genre).toBe("Puzle de balanzas");
    expect(game?.platform).toBe("Android");
    expect(game?.url).toBe("https://hannagames.com/fiel/");
    expect(game?.icon).toBe("/games/fiel-icon.webp");
    expect(game?.mechanics).toEqual(["Platillos", "Móviles", "Palancas", "Globos"]);
  });

  it("el orden es Destello, Colmena, Fiel", () => {
    expect(games.map((g) => g.slug)).toEqual(["destello", "colmena", "fiel"]);
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
