import { hackathonProjects } from "@/lib/projects";
import ProjectCard from "@/components/ui/ProjectCard";

export default function Hackathons() {
  return (
    <section
      id="hackathons"
      className="border-b"
      style={{ backgroundColor: "var(--bg)", borderColor: "var(--divider)" }}
    >
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="font-display text-4xl mb-2" style={{ color: "var(--burg)" }}>
          HACKATHONS
        </h2>
        <p className="text-base mb-8 max-w-2xl" style={{ color: "var(--text-3)" }}>
          Producto construido con plazo corto y en equipo. Es donde se ve qué decido
          cuando no hay tiempo para decidirlo todo.
        </p>

        <div className="flex flex-col gap-4">
          {hackathonProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
