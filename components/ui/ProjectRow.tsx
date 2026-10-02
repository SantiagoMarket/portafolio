import Link from "next/link";
import { projectBadge, type BadgeTone } from "@/lib/badges";
import type { Project } from "@/lib/projects";

type ProjectRowProps = {
  project: Project;
  /** La primera fila de cada sección abre por defecto: enseña que las filas abren. */
  defaultOpen?: boolean;
};

const badgeToneClass: Record<BadgeTone, string> = {
  award: "text-burg",
  event: "text-burg-s",
  client: "text-text-3",
};

/**
 * Un proyecto es una fila de un log, no una tarjeta: la regla inferior
 * (`.proj-row`) separa igual y no encierra.
 */
export default function ProjectRow({ project, defaultOpen = false }: ProjectRowProps) {
  const badge = projectBadge(project);

  return (
    <details className="proj-row" open={defaultOpen}>
      <summary>
        <span className="hidden sm:block font-mono text-meta text-text-3">
          {project.number}
        </span>

        <span className="min-w-0">
          <span className="proj-title block font-sans font-bold text-title leading-snug text-text-1">
            {project.title}
          </span>
          <span className="block font-sans text-body mt-0.5 leading-relaxed text-text-2">
            {project.tagline}
          </span>
        </span>

        <span
          className={`font-mono text-meta font-bold tracking-wider whitespace-nowrap justify-self-start sm:justify-self-auto ${badgeToneClass[badge.tone]}`}
        >
          {badge.label}
        </span>
      </summary>

      <div className="grid gap-4 pb-6 sm:pl-12">
        <p className="font-sans measure text-body leading-relaxed text-text-2">
          {project.description}
        </p>

        <div className="grid gap-2">
          {project.details.map((step) => (
            <span key={step} className="text-body leading-relaxed text-text-2">
              <span className="text-burg font-bold">→ </span>
              {step}
            </span>
          ))}
        </div>

        <p className="font-mono text-meta text-text-3">
          {project.stack.join(" · ")}
        </p>

        <div className="flex flex-wrap items-center gap-4 text-meta font-mono text-text-3">
          <span>
            {project.highlight ? project.highlight.detail : `Resultado: ${project.result}`}
          </span>
          {/* La ficha interna sigue siendo la versión larga: la fila resume, la
              ficha profundiza. Sin este enlace la ruta queda huérfana. */}
          <Link
            href={`/proyectos/${project.slug}`}
            className="font-bold text-burg underline"
          >
            ver ficha completa →
          </Link>
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-burg underline"
            >
              {project.url.replace("https://", "")} ↗
            </a>
          )}
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-burg underline"
            >
              repo ↗
            </a>
          )}
        </div>
      </div>
    </details>
  );
}
