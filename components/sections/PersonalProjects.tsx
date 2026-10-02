import SectionHeading from "@/components/ui/SectionHeading";
import ProjectRow from "@/components/ui/ProjectRow";
import { personalProjects } from "@/lib/projects";

export default function PersonalProjects() {
  return (
    <section id="proyectos-propios">
      <div className="max-w-5xl mx-auto px-6 py-24">
        <SectionHeading title="Proyectos propios" note="construido por iniciativa propia" />
        <p className="measure text-body text-text-2 mb-6">
          Sin cliente ni plazo de evento: lo que construyo para probar una idea hasta
          el final y usarlo a diario.
        </p>

        {personalProjects.map((project) => (
          <ProjectRow key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
