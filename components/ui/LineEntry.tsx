import { Fragment } from "react";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Icon from "@/components/ui/Icon";
import RouteList from "@/components/ui/RouteList";
import StackList from "@/components/ui/StackList";
import { projectBadge } from "@/lib/badges";
import { homeSummary, type Project } from "@/lib/projects";

/**
 * El contexto del hackathon. Cuando el distintivo es corto ("24 h") el nombre
 * del evento no aparece en él, así que se antepone aquí; cuando el distintivo
 * ya es el `highlight.label` ("3er lugar"), repetirlo sobraría.
 */
function contextOf(project: Project): string | undefined {
  if (!project.highlight) return undefined;
  const { label, detail } = project.highlight;
  return project.badge ? `${label} · ${detail}` : detail;
}

/** Los enlaces externos: con repo hay demo y repositorio; sin repo, el dominio. */
function externalLinks(project: Project): { href: string; label: string }[] {
  if (!project.url) return [];
  if (project.repo) {
    return [
      { href: project.url, label: "Demo" },
      { href: project.repo, label: "Repositorio" },
    ];
  }
  return [{ href: project.url, label: new URL(project.url).host }];
}

/**
 * La ficha de un proyecto en la home: cabecera fija a la izquierda (número,
 * título, distintivo, datos, enlaces) y recorrido a la derecha. El `id` es el
 * ancla a la que vuelven el mapa y la ficha completa.
 */
export default function LineEntry({ project }: { project: Project }) {
  const context = contextOf(project);
  const own = project.kind === "personal";

  return (
    <article
      className={own ? "line-entry line-entry--own" : "line-entry"}
      id={project.slug}
      data-route={project.slug}
    >
      <div className="le-head">
        <span className="le-num" aria-hidden="true">
          {Number(project.number)}
        </span>
        <h3>{project.title}</h3>
        <p className="le-tag">{project.tagline}</p>
        <Badge {...projectBadge(project)} />
        <dl className="le-facts">
          {context && (
            <div>
              <dt>Contexto</dt>
              <dd>
                {context.split(" · ").map((part, i) => (
                  <Fragment key={part}>
                    {i > 0 && (
                      <>
                        {" "}
                        <span className="sep" aria-hidden="true">
                          ·
                        </span>{" "}
                      </>
                    )}
                    {part}
                  </Fragment>
                ))}
              </dd>
            </div>
          )}
          <div>
            <dt>Resultado</dt>
            <dd>{project.result}</dd>
          </div>
        </dl>
        <div className="le-links">
          {externalLinks(project).map((link) => (
            <a key={link.href} className="ext" href={link.href} target="_blank" rel="noopener noreferrer">
              {link.label} <Icon name="out" />
            </a>
          ))}
          <Link className="ext" href={`/proyectos/${project.slug}`}>
            Ver ficha completa →
          </Link>
        </div>
      </div>
      <div className="le-body">
        <p>{homeSummary(project)}</p>
        <RouteList title={project.title} steps={project.details} />
        <StackList title={project.title} tools={project.stack} />
      </div>
    </article>
  );
}
