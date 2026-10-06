import { stackIntro } from "@/lib/site-copy";
import { stackIndex } from "@/lib/stack-index";

/**
 * Índice de estaciones: cada herramienta lleva los números de los proyectos
 * de la home donde aparece, y cada número salta a su línea.
 */
export default function Stack() {
  return (
    <section className="sec" id="stack" aria-labelledby="stack-h">
      <div className="wrap">
        <div className="sec-head">
          <h2 id="stack-h">Stack</h2>
          <p>{stackIntro}</p>
        </div>
        <div className="index">
          {stackIndex.map(({ label, entries }) => (
            <section key={label} aria-label={label}>
              <h3>{label}</h3>
              <ul>
                {entries.map(({ tool, projects, note }) => (
                  <li key={tool}>
                    {tool}
                    {projects.length > 0 && (
                      <span className="lines">
                        {projects.map((p) => (
                          <a
                            key={p.slug}
                            href={`#${p.slug}`}
                            aria-label={`Proyecto ${Number(p.number)}: ${p.title}`}
                            title={p.title}
                          >
                            {Number(p.number)}
                          </a>
                        ))}
                      </span>
                    )}
                    {note && <span className="none">{note}</span>}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
