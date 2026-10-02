import SectionHeading from "@/components/ui/SectionHeading";
import { stackCategories } from "@/lib/site-copy";

/**
 * Clave-valor en una sola columna: la categoría es la etiqueta y las
 * herramientas son el valor. Separadas por espacio, sin reglas ni cajas.
 */
export default function Stack() {
  return (
    <section id="stack">
      <div className="max-w-5xl mx-auto px-6 py-24">
        <SectionHeading title="STACK" note="herramientas en uso real" />
        <dl className="grid gap-6">
          {stackCategories.map(({ label, tools }) => (
            <div
              key={label}
              className="grid grid-cols-1 sm:grid-cols-[150px_minmax(0,1fr)] gap-1 sm:gap-3.5 items-start"
            >
              <dt className="font-mono text-meta font-bold tracking-[0.09em] text-text-3">
                {label}
              </dt>
              <dd className="font-sans text-body text-text-2">{tools.join(" · ")}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
