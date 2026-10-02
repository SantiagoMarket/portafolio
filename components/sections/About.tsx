import SectionHeading from "@/components/ui/SectionHeading";
import { roleTitle } from "@/lib/profile";

export default function About() {
  return (
    <section id="sobre-mi">
      <div className="max-w-5xl mx-auto px-6 py-24">
        <SectionHeading title="SOBRE MÍ" />
        <div className="grid gap-4 measure text-body text-text-2">
          <p>
            Vengo del marketing y la creación de contenido — eso me enseñó qué el
            marketing y las ventas deben apalancarse de la tecnología para ser
            eficientes. Hoy conecto ese conocimiento con automatización, CRMs e
            integraciones para que los procesos funcionen solos.
          </p>
          <p>
            Año y medio especializándome como {roleTitle}, con experiencia en
            agencia y proyectos propios.
          </p>
        </div>
      </div>
    </section>
  );
}
