import LineEntry from "@/components/ui/LineEntry";
import { getProjectsByKind } from "@/lib/projects";
import { projectGroups } from "@/lib/site-copy";

/**
 * Los proyectos en tres grupos —hackathons, clientes, propio—. El grupo de
 * clientes es más denso porque allí pesa el proceso, no la ficha.
 */
export default function ProjectGroups() {
  return (
    <section className="sec" id="proyectos" aria-label="Proyectos">
      <div className="wrap">
        {projectGroups.map((group) => (
          <div key={group.id} className={group.kind === "cliente" ? "group group--client" : "group"}>
            <div className="group-head">
              <h2 id={group.id}>{group.title}</h2>
              <p>{group.intro}</p>
            </div>
            {getProjectsByKind(group.kind).map((project) => (
              <LineEntry key={project.slug} project={project} />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
