import ButtonLink from "@/components/ui/ButtonLink";

export default function Hero() {
  return (
    <section
      id="perfil"
      className="border-b"
      style={{ backgroundColor: "var(--bg-alt)", borderColor: "var(--divider)" }}
    >
      <div className="max-w-5xl mx-auto px-6 py-24 flex gap-8">
        <div
          className="hidden md:block w-1 flex-shrink-0 rounded-full self-stretch"
          style={{ backgroundColor: "var(--burg)" }}
        />

        <div className="flex flex-col gap-6">
          <h1
            className="font-display text-7xl md:text-8xl leading-none tracking-wide"
            style={{ color: "var(--text-1)" }}
          >
            REVOPS & AUTOMATION SPECIALIST
          </h1>

          <p className="text-lg max-w-xl" style={{ color: "var(--text-3)" }}>
            Conecto procesos de negocio, CRMs y automatizaciones para que los
            equipos de ventas y marketing operen sin fricción.
          </p>

          <div className="flex flex-wrap gap-2">
            {["Bogotá, Colombia", "Disponible para roles full-time", "Español / Inglés A2"].map(
              (badge) => (
                <span
                  key={badge}
                  className="px-3 py-1 text-xs font-mono rounded-full border"
                  style={{
                    color: "var(--text-4)",
                    borderColor: "var(--border)",
                    backgroundColor: "var(--surface)",
                  }}
                >
                  {badge}
                </span>
              )
            )}
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <ButtonLink href="/#proyectos" variant="solid" size="lg">
              Ver proyectos →
            </ButtonLink>
            <ButtonLink
              href="https://linkedin.com/in/victor-santiago-cubillos-cruz"
              size="lg"
            >
              Ver LinkedIn ↗
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
