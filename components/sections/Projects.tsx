import Link from "next/link";
import { projects } from "@/lib/projects";
import Chip from "@/components/ui/Chip";

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
          {projects.map((project) => (
            <div
              key={project.slug}
              className="rounded-lg border p-6 flex flex-col md:flex-row gap-6"
              style={{ borderColor: "var(--border)", backgroundColor: "var(--bg)" }}
            >
              <div className="flex-shrink-0 flex items-start">
                <span
                  className="font-display text-2xl leading-none"
                  style={{ color: "var(--text-4)" }}
                >
                  {project.number}
                </span>
              </div>

              <div className="flex-1 flex flex-col gap-3">
                <div>
                  <h3 className="text-lg font-semibold" style={{ color: "var(--text-1)" }}>
                    {project.title}
                  </h3>
                  <p className="text-base mt-0.5" style={{ color: "var(--text-3)" }}>
                    {project.tagline}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tool) => (
                    <Chip key={tool} label={tool} />
                  ))}
                </div>

                <div className="flex items-center gap-4 pt-1">
                  <Link
                    href={`/proyectos/${project.slug}`}
                    className="text-sm font-mono border rounded px-4 py-1.5 transition-colors hover:bg-burg-xl"
                    style={{ color: "var(--burg)", borderColor: "var(--burg)" }}
                  >
                    Ver proyecto →
                  </Link>
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm"
                      style={{ color: "var(--text-4)" }}
                    >
                      {project.url.replace("https://", "")} ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
