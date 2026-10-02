import SectionHeading from "@/components/ui/SectionHeading";
import ProjectRow from "@/components/ui/ProjectRow";
import { clientProjects } from "@/lib/projects";

export default function Projects() {
  return (
    <section id="proyectos">
      <div className="max-w-5xl mx-auto px-6 py-24">
        <SectionHeading title="PROYECTOS" note="construido para cliente" />
        <p className="measure text-body text-text-2 mb-6">
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
