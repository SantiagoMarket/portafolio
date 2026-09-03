import SectionHeading from "@/components/ui/SectionHeading";
import ProjectRow from "@/components/ui/ProjectRow";
import { clientProjects } from "@/lib/projects";

export default function Projects() {
  return (
    <section
      id="proyectos"
      className="border-b"
      style={{ backgroundColor: "var(--surface)", borderColor: "var(--divider)" }}
    >
      <div className="max-w-5xl mx-auto px-6 py-[60px]">
        <SectionHeading title="PROYECTOS" note="construido para cliente" />
        <p
          className="font-sans text-[15px] leading-relaxed max-w-[62ch] -mt-3.5 mb-6"
          style={{ color: "var(--text-3)" }}
        >
          Aquí lo que importa no es el plazo sino el proceso que resuelve: qué se hacía
          a mano antes y qué quedó funcionando solo.
        </p>

        {clientProjects.map((project) => (
          <ProjectRow key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
