import Image from "next/image";
import { games } from "@/lib/games";
import { gamesIntro } from "@/lib/site-copy";

/**
 * Los videojuegos, en el mismo lenguaje que las líneas de proyecto: una fila
 * por juego separada por regla, con el icono en el lugar del número de línea.
 * Sin ficha interna: el único enlace lleva a la página del juego.
 */
export default function Games() {
  return (
    <section className="sec" id="videojuegos" aria-labelledby="games-h">
      <div className="wrap">
        <div className="group-head">
          <h2 id="games-h">Videojuegos</h2>
          <p>{gamesIntro}</p>
        </div>
        {games.map((game) => (
          <article key={game.slug} className="line-entry line-entry--game" id={game.slug}>
            <div className="le-head">
              <Image
                className="game-icon"
                src={game.icon}
                alt={game.iconAlt}
                width={72}
                height={72}
              />
              <h3>{game.title}</h3>
              <p className="le-tag">{game.tagline}</p>
              <p className="game-meta">
                {[game.studio, game.genre, game.platform].map((part, i) => (
                  <span key={part}>
                    {i > 0 && (
                      <>
                        {" "}
                        <span className="sep" aria-hidden="true">
                          ·
                        </span>{" "}
                      </>
                    )}
                    {part}
                  </span>
                ))}
              </p>
              <div className="le-links">
                <a className="ext" href={game.url} target="_blank" rel="noopener noreferrer">
                  Ver en HannaGames →
                </a>
              </div>
            </div>
            <div className="le-body">
              <p>{game.description}</p>
              <ul className="le-stack" aria-label={`Mecánicas: ${game.title}`}>
                <li className="le-stack__label">Mecánicas</li>
                {game.mechanics.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
