import HomeHeader from "@/components/layout/HomeHeader";
import TransitMap from "@/components/sections/TransitMap";
import Icon from "@/components/ui/Icon";
import { roleTitle } from "@/lib/profile";
import { hero } from "@/lib/site-copy";

/**
 * Cabecera burdeos: menú, quién soy y el mapa de sistemas. El título va quieto;
 * el único movimiento de la home es la señal del mapa.
 */
export default function Hero() {
  return (
    <header className="on-burg" id="top">
      <div className="wrap">
        <HomeHeader />

        <div className="hero">
          <div>
            <h1>{roleTitle}</h1>
            <p className="hero__who">{hero.name}</p>
            <p className="hero__lede">{hero.lede}</p>
            <p className="hero__meta">
              {hero.meta.map((m) => (
                <span key={m}>{m}</span>
              ))}
            </p>
            <div className="actions">
              <a className="btn btn--light" href="#proyectos">
                Ver los proyectos <Icon name="down" />
              </a>
              <a className="btn btn--line" href="mailto:sant4cubillos@outlook.com">
                Escríbeme <Icon name="mail" />
              </a>
            </div>
          </div>

          <TransitMap />
        </div>
      </div>
    </header>
  );
}
