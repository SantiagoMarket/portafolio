import { roleTitle } from "@/lib/profile";
import { about, education, experience } from "@/lib/site-copy";

/** Separa una cifra inicial ("12 proyectos…") para darle la tipografía de número. */
function Highlight({ text }: { text: string }) {
  const match = text.match(/^(\d+)\s(.*)$/);
  if (!match) return <>{text}</>;
  return (
    <>
      <span className="num">{match[1]}</span> {match[2]}
    </>
  );
}

/**
 * Sobre mí con el trabajo y la formación dentro: la biografía va después de
 * los proyectos y se lee como una sola columna, no como tres secciones.
 */
export default function About() {
  return (
    <section className="sec about" id="sobre-mi" aria-labelledby="about-h">
      <div className="wrap about-grid">
        <div>
          <h2 id="about-h">Sobre mí</h2>
        </div>
        <div>
          <p className="about-lead">{about.lead}</p>
          <p>{about.body}</p>

          <div className="job">
            <h3>{experience.role}</h3>
            <p className="job-org">{experience.org}</p>
            <p className="job-when num">
              {experience.period} <span className="sep" aria-hidden="true">·</span>{" "}
              {experience.place}
            </p>
            <ul aria-label={`Logros como ${roleTitle}`}>
              {experience.highlights.map((h) => (
                <li key={h}>
                  <Highlight text={h} />
                </li>
              ))}
            </ul>
          </div>

          <div className="job job--side">
            <h3>Formación</h3>
            <ul className="edu">
              {education.map(({ institution, detail, period }) => (
                <li key={institution}>
                  <b>{institution}</b>
                  <span>
                    {detail}
                    {period && (
                      <>
                        {" "}
                        <span className="sep" aria-hidden="true">·</span> {period}
                      </>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
