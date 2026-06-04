export default function About() {
  return (
    <section
      id="sobre-mi"
      className="border-b"
      style={{ backgroundColor: "var(--surface)", borderColor: "var(--divider)" }}
    >
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h2
          className="font-display text-4xl mb-8"
          style={{ color: "var(--burg)" }}
        >
          SOBRE MÍ
        </h2>

        <div className="max-w-2xl flex flex-col gap-4">
          <p className="text-base leading-relaxed" style={{ color: "var(--text-3)" }}>
            Vengo del marketing y la creación de contenido — eso me enseñó a entender
            qué el marketing y las ventas deben apalancarse de la tecnologia para ser eficientes. Hoy conecto
            ese conocimiento con automatización, CRMs e integraciones para que los procesos
            funcionen solos.
          </p>
          <p className="text-base leading-relaxed" style={{ color: "var(--text-3)" }}>
            Año y medio especializándome en RevOps, con experiencia en agencia y proyectos
            propios.
          </p>
        </div>
      </div>
    </section>
  );
}
