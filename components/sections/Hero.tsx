import ButtonLink from "@/components/ui/ButtonLink";
import TypedHeading from "@/components/ui/TypedHeading";
import { roleTitleLines } from "@/lib/profile";

export default function Hero() {
  return (
    <section id="perfil">
      <div className="max-w-5xl mx-auto px-6 pt-16 pb-8">
        <p className="font-mono text-meta mb-6 text-text-3">
          <b className="text-burg">$</b> whoami --role --location
        </p>

        <TypedHeading lines={roleTitleLines} />

        <p className="measure text-body mt-5 mb-8 text-text-2">
          Conecto procesos de negocio, CRMs y automatizaciones para que los equipos de
          ventas y marketing operen sin fricción. Del webhook al reporte, sin
          intervención manual.
        </p>

        <p className="font-mono text-meta text-text-3 mb-8">
          {["Bogotá, Colombia", "Disponible para roles full-time", "Español / Inglés A2"].join(
            " · ",
          )}
        </p>

        <div className="flex flex-wrap gap-2.5">
          <ButtonLink href="/#hackathons" variant="solid" size="lg">
            ./ver-proyectos
          </ButtonLink>
          <ButtonLink
            href="https://linkedin.com/in/victor-santiago-cubillos-cruz"
            size="lg"
          >
            LinkedIn ↗
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
