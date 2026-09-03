import SectionHeading from "@/components/ui/SectionHeading";
import ProjectRow from "@/components/ui/ProjectRow";
import { hackathonProjects } from "@/lib/projects";

export default function Hackathons() {
  return (
    <section
      id="hackathons"
      className="border-b"
      style={{ backgroundColor: "var(--bg)", borderColor: "var(--divider)" }}
    >
      <div className="max-w-5xl mx-auto px-6 py-[60px]">
        <SectionHeading title="HACKATHONS" note="abre para ver el flujo" />
        <p
          className="font-sans text-[15px] leading-relaxed max-w-[62ch] -mt-3.5 mb-6"
          style={{ color: "var(--text-3)" }}
        >
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
