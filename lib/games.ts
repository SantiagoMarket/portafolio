export interface Game {
  slug: string;
  title: string;
  studio: string;
  genre: string;
  platform: string;
  tagline: string;
  description: string;
  mechanics: string[];
  /** Página pública del juego (externa). */
  url: string;
  /** Icono servido desde public/, nunca enlazado a hannagames.com. */
  icon: string;
  iconAlt: string;
}

/** Los videojuegos publicados. Cada uno es una fila en la sección Videojuegos. */
export const games: Game[] = [
  {
    slug: "destello",
    title: "Destello",
    studio: "HannaGames",
    genre: "Puzle de luz",
    platform: "Android",
    tagline: "Guía la luz hasta cada cristal.",
    description:
      "Puzle tranquilo para jugar con una mano: gira espejos, divide rayos y mezcla colores de luz. 60 niveles en 4 mecánicas.",
    mechanics: ["Espejos", "Divisores", "Filtros", "Mezcla"],
    url: "https://hannagames.com/destello/",
    icon: "/games/destello-icon.webp",
    iconAlt: "Icono de Destello: un cristal hexagonal magenta al que llegan dos rayos de luz",
  },
];
