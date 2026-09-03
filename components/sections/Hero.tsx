import ButtonLink from "@/components/ui/ButtonLink";

export default function Hero() {
  return (
    <section
      id="perfil"
      className="border-b"
      style={{ backgroundColor: "var(--bg-alt)", borderColor: "var(--divider)" }}
    >
      <div className="max-w-5xl mx-auto px-6 pt-[76px] pb-[60px]">
        <p className="text-xs mb-6" style={{ color: "var(--text-4)" }}>
          <b style={{ color: "var(--burg)" }}>$</b> whoami --role --location
        </p>

        <h1
          className="font-display font-normal leading-[0.92] tracking-wide break-words mb-1.5 text-[clamp(38px,10.5vw,110px)]"
          style={{ color: "var(--text-1)" }}
        >
          REVOPS &amp;<br />
          <span style={{ color: "var(--burg)" }}>AUTOMATION</span> SPECIALIST
          {/* Pegado a la T final el cursor se leía como una I: «SPECIALISTI». */}
          <span className="caret" aria-hidden="true" />
        </h1>

        <p
          className="font-sans text-[17px] leading-relaxed max-w-[54ch] mt-5 mb-[26px]"
          style={{ color: "var(--text-3)" }}
        >
          Conecto procesos de negocio, CRMs y automatizaciones para que los equipos de
          ventas y marketing operen sin fricción. Del webhook al reporte, sin
          intervención manual.
        </p>

        <div className="flex flex-wrap gap-2 mb-7">
          {["Bogotá, Colombia", "Disponible para roles full-time", "Español / Inglés A2"].map(
            (badge) => (
              <span
                key={badge}
                className="text-[11px] px-2.5 py-1 rounded-full border"
                style={{
                  color: "var(--text-4)",
                  borderColor: "var(--border)",
                  backgroundColor: "var(--bg)",
                }}
              >
                {badge}
              </span>
            )
          )}
        </div>

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
