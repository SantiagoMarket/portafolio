import { metrics } from "@/lib/metrics";

/**
 * Cuatro cifras separadas por reglas, sin tarjetas: es lo primero que se
 * escanea. Va fuera de `section` porque no es una sección con título, es una
 * franja de cierre del hero.
 */
export default function Metrics() {
  return (
    <div className="max-w-5xl mx-auto px-6">
      <dl
        className="grid grid-cols-2 md:grid-cols-4 border-b"
        style={{ borderColor: "var(--divider)" }}
      >
        {metrics.map((metric, i) => (
          <div
            key={metric.label}
            className={[
              "px-5 py-6 border-r last:border-r-0",
              i % 2 === 1 ? "border-r-0 md:border-r" : "",
              i < 2 ? "border-b md:border-b-0" : "",
            ].join(" ")}
            style={{ borderColor: "var(--divider)" }}
          >
            <dd
              className="font-display text-[44px] leading-[0.9] mb-1.5"
              style={{ color: "var(--burg)" }}
            >
              {metric.value}
            </dd>
            <dt className="text-[11px]" style={{ color: "var(--text-4)" }}>
              {metric.label}
            </dt>
          </div>
        ))}
      </dl>
    </div>
  );
}
