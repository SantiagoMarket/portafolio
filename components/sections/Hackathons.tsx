import SectionHeading from "@/components/ui/SectionHeading";
import ProjectRow from "@/components/ui/ProjectRow";
import { hackathonProjects } from "@/lib/projects";

export default function Hackathons() {
  return (
    <section id="hackathons">
      <div className="max-w-5xl mx-auto px-6 py-24">
        <SectionHeading title="HACKATHONS" note="abre para ver el flujo" />
        <p className="measure text-body text-text-2 mb-6">
          Producto construido con plazo corto y en equipo. Es donde se ve qué decido
          cuando no hay tiempo para decidirlo todo.
        </p>

        {hackathonProjects.map((project, i) => (
          <ProjectRow key={project.slug} project={project} defaultOpen={i === 0} />
        ))}
      </div>
    </section>
  );
}
