import Link from "next/link";
import { projectBadge, type BadgeTone } from "@/lib/badges";
import type { Project } from "@/lib/projects";

type ProjectRowProps = {
  project: Project;
  /** La primera fila de cada sección abre por defecto: enseña que las filas abren. */
  defaultOpen?: boolean;
};

const badgeStyles: Record<BadgeTone, React.CSSProperties> = {
  award: { color: "var(--burg)", backgroundColor: "var(--burg-xl)" },
  event: { color: "var(--burg-s)", backgroundColor: "var(--burg-xl)" },
  client: { color: "var(--text-4)" },
};

/**
 * Un proyecto es una fila de un log, no una tarjeta: la regla inferior separa
 * igual y no encierra. El cuerpo se indenta bajo el número al abrirse, porque
 * la sangría ya dice «esto pertenece a la fila de arriba».
 */
export default function ProjectRow({ project, defaultOpen = false }: ProjectRowProps) {
  const badge = projectBadge(project);

  return (
    <details className="proj-row" open={defaultOpen}>
      <summary>
        <span
          className="hidden sm:block font-display text-[22px] leading-none"
          style={{ color: "var(--text-4)" }}
        >
          {project.number}
        </span>

        <span className="min-w-0">
          <span className="proj-title block font-sans font-bold text-[17px] leading-snug" style={{ color: "var(--text-1)" }}>
            {project.title}
          </span>
          <span className="block font-sans text-sm mt-0.5 leading-relaxed" style={{ color: "var(--text-3)" }}>
            {project.tagline}
          </span>
        </span>

        <span
          className="text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full whitespace-nowrap border border-current justify-self-start sm:justify-self-auto"
          style={badgeStyles[badge.tone]}
        >
          {badge.label}
        </span>
      </summary>

      <div className="grid gap-[18px] pb-6 sm:pl-12">
        <p className="font-sans text-[15px] leading-[1.72] max-w-[72ch]" style={{ color: "var(--text-3)" }}>
          {project.description}
        </p>

        <div
          className="grid gap-2 pl-4 border-l-2"
          style={{ borderColor: "var(--burg-bg)" }}
        >
          {project.details.map((step) => (
            <span key={step} className="text-[13px] leading-relaxed" style={{ color: "var(--text-3)" }}>
              <span style={{ color: "var(--burg)", fontWeight: 700 }}>→ </span>
              {step}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((tool) => (
            <span
              key={tool}
              className="text-[11px] px-2.5 py-1 rounded border"
              style={{
                color: "var(--text-4)",
                backgroundColor: "var(--surface)",
                borderColor: "var(--border)",
              }}
            >
              {tool}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs">
          <span style={{ color: "var(--text-4)" }}>
            {project.highlight ? project.highlight.detail : `Resultado: ${project.result}`}
          </span>
          {/* La ficha interna sigue siendo la versión larga: la fila resume, la
              ficha profundiza. Sin este enlace la ruta queda huérfana. */}
          <Link
            href={`/proyectos/${project.slug}`}
            className="font-bold border-b"
            style={{ color: "var(--burg)", borderColor: "var(--burg-bg)" }}
          >
            ver ficha completa →
          </Link>
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold border-b"
              style={{ color: "var(--burg)", borderColor: "var(--burg-bg)" }}
            >
              {project.url.replace("https://", "")} ↗
            </a>
          )}
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold border-b"
              style={{ color: "var(--burg)", borderColor: "var(--burg-bg)" }}
            >
              repo ↗
            </a>
          )}
        </div>
      </div>
    </details>
  );
}
