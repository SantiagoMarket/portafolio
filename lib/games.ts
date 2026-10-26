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
  {
    slug: "colmena",
    title: "Colmena",
    studio: "HannaGames",
    genre: "Puzle de panal",
    platform: "Android",
    tagline: "Encaja piezas de panal, llena líneas de miel y bate tu récord.",
    description:
      "Puzle relajante de piezas hexagonales: arrastra piezas de panal al tablero y llena líneas en cualquiera de sus tres direcciones. Modo infinito y reto diario.",
    mechanics: ["Piezas hexagonales", "Líneas en 3 direcciones", "Combos y rachas", "Reto diario"],
    url: "https://hannagames.com/colmena/",
    icon: "/games/colmena-icon.webp",
    iconAlt: "Icono de Colmena: una abeja sentada sobre celdas de panal de las que gotea miel",
  },
  {
    slug: "fiel",
    title: "Fiel",
    studio: "HannaGames",
    genre: "Puzle de balanzas",
    platform: "Android",
    tagline: "Cuelga cada pesa hasta que todas las balanzas queden en equilibrio.",
    description:
      "Puzle de pensar con una sola solución por nivel: platillos, balanzas colgadas de otras, palancas donde cuenta la distancia al centro y globos que tiran hacia arriba. 80 niveles.",
    mechanics: ["Platillos", "Móviles", "Palancas", "Globos"],
    url: "https://hannagames.com/fiel/",
    icon: "/games/fiel-icon.webp",
    iconAlt: "Icono de Fiel: una balanza con una pesa dorada y otra oscura colgadas de sus brazos",
  },
];
