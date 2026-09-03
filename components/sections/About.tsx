import SectionHeading from "@/components/ui/SectionHeading";

export default function About() {
  return (
    <section
      id="sobre-mi"
      className="border-b"
      style={{ backgroundColor: "var(--bg)", borderColor: "var(--divider)" }}
    >
      <div className="max-w-5xl mx-auto px-6 py-[60px]">
        <SectionHeading title="SOBRE MÍ" />
        <div className="grid gap-4 max-w-[64ch]">
          <p className="font-sans text-base leading-[1.75]" style={{ color: "var(--text-3)" }}>
            Vengo del marketing y la creación de contenido — eso me enseñó qué el
            marketing y las ventas deben apalancarse de la tecnología para ser
            eficientes. Hoy conecto ese conocimiento con automatización, CRMs e
            integraciones para que los procesos funcionen solos.
          </p>
          <p className="font-sans text-base leading-[1.75]" style={{ color: "var(--text-3)" }}>
            Año y medio especializándome en RevOps, con experiencia en agencia y
            proyectos propios.
          </p>
        </div>
      </div>
    </section>
  );
}
