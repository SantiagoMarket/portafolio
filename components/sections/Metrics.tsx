import { metrics } from "@/lib/metrics";

/**
 * Tres cifras sin reglas ni tarjetas: es lo primero que se escanea. Va fuera
 * de `section` porque no es una sección con título, es una franja de cierre
 * del hero.
 */
export default function Metrics() {
  return (
    <div className="max-w-5xl mx-auto px-6 pb-16">
      <dl className="grid grid-cols-1 gap-8 sm:grid-cols-3">
        {metrics.map((metric) => (
          <div key={metric.label}>
            <dd className="font-display text-figure leading-none mb-1.5 text-burg">
              {metric.value}
            </dd>
            <dt className="font-mono text-meta text-text-3">{metric.label}</dt>
          </div>
        ))}
      </dl>
    </div>
  );
}
