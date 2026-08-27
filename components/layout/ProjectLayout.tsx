import Link from "next/link";
import Nav from "@/components/layout/Nav";
import Chip from "@/components/ui/Chip";
import type { Project } from "@/lib/projects";

type ProjectLayoutProps = {
  project: Project;
};

export default function ProjectLayout({ project }: ProjectLayoutProps) {
  return (
    <>
      <Nav />
      <main className="max-w-3xl mx-auto px-6 py-16">
        <Link
          href="/#proyectos"
          className="inline-flex items-center gap-1 text-sm font-mono mb-10 transition-colors hover:underline"
          style={{ color: "var(--text-4)" }}
        >
          ← Volver a proyectos
        </Link>

        <div className="flex items-start gap-4 mb-6">
          <span className="font-display text-6xl" style={{ color: "var(--border)" }}>
            {project.number}
          </span>
          <div>
            <h1 className="font-display text-5xl" style={{ color: "var(--text-1)" }}>
              {project.title.toUpperCase()}
            </h1>
            <p className="text-base mt-1" style={{ color: "var(--text-3)" }}>
              {project.tagline}
            </p>
          </div>
        </div>

        <div
          className="flex flex-wrap items-center gap-3 mb-8 pb-8 border-b"
          style={{ borderColor: "var(--divider)" }}
        >
          <span
            className="px-3 py-1 text-sm font-mono rounded border"
            style={{
              backgroundColor: "var(--burg-bg)",
              color: "var(--burg)",
              borderColor: "rgba(122, 11, 36, 0.2)",
            }}
          >
            {project.result}
          </span>
          {project.highlight && (
            <div className="flex items-center gap-2">
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
              <span className="text-sm" style={{ color: "var(--text-4)" }}>
                {project.highlight.detail}
              </span>
            </div>
          )}
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-1.5 text-sm font-mono rounded border transition-colors hover:bg-burg-xl"
              style={{ color: "var(--burg)", borderColor: "var(--burg)" }}
            >
              Ver sitio ↗
            </a>
          )}
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-1.5 text-sm font-mono rounded border transition-colors hover:bg-burg-xl"
              style={{ color: "var(--burg)", borderColor: "var(--burg)" }}
            >
              Ver código ↗
            </a>
          )}
        </div>

        <p className="text-base leading-relaxed mb-10" style={{ color: "var(--text-3)" }}>
          {project.description}
        </p>

        <div
          className="rounded-lg border p-6 mb-8"
          style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-alt)" }}
        >
          <h2 className="font-display text-2xl mb-4" style={{ color: "var(--burg)" }}>
            CÓMO FUNCIONA
          </h2>
          <ul className="flex flex-col gap-3">
            {project.details.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm" style={{ color: "var(--text-3)" }}>
                <span
                  className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-mono font-bold"
                  style={{ backgroundColor: "var(--burg-bg)", color: "var(--burg)" }}
                >
                  {i + 1}
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-2xl mb-4" style={{ color: "var(--burg)" }}>
            STACK
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tool) => (
              <Chip key={tool} label={tool} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
