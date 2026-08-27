import { clientProjects } from "@/lib/projects";
import ProjectCard from "@/components/ui/ProjectCard";

export default function Projects() {
  return (
    <section
      id="proyectos"
      className="border-b"
      style={{ backgroundColor: "var(--surface)", borderColor: "var(--divider)" }}
    >
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h2
          className="font-display text-4xl mb-8"
          style={{ color: "var(--burg)" }}
        >
          PROYECTOS
        </h2>

        <div className="flex flex-col gap-4">
          {clientProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
