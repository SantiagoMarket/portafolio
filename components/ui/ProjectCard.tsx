import Link from "next/link";
import Chip from "@/components/ui/Chip";
import type { Project } from "@/lib/projects";

type ProjectCardProps = {
  project: Project;
};

/**
 * La ficha se extrae porque la usan dos secciones —proyectos de cliente y
 * hackathons— y un cambio de diseño tiene que alcanzarlas a las dos.
 */
export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div
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
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold" style={{ color: "var(--text-1)" }}>
              {project.title}
            </h3>
            {project.highlight && (
              <span
                className="px-2 py-0.5 text-xs font-mono rounded-full border"
                style={{
                  backgroundColor: "var(--burg-bg)",
                  color: "var(--burg)",
                  borderColor: "rgba(122, 11, 36, 0.2)",
                }}
              >
                {project.highlight.label}
              </span>
            )}
          </div>
          <p className="text-base mt-0.5" style={{ color: "var(--text-3)" }}>
            {project.tagline}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.stack.map((tool) => (
            <Chip key={tool} label={tool} />
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-1">
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
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-mono"
              style={{ color: "var(--text-4)" }}
            >
              Código ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
