const achievements = [
  "12 proyectos de integración CRM (HubSpot, GoHighLevel, Clientify)",
  "Flujos de sincronización: webhook → Make → HTTP API",
  "Ahorro de ~1 hora manual semanal por cliente",
  "Automatización WhatsApp + etiquetado automático de leads en GHL",
];

export default function Experience() {
  return (
    <section
      id="experiencia"
      className="border-b"
      style={{ backgroundColor: "var(--bg)", borderColor: "var(--divider)" }}
    >
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h2
          className="font-display text-4xl mb-8"
          style={{ color: "var(--burg)" }}
        >
          EXPERIENCIA
        </h2>

        <div
          className="rounded-lg border p-6"
          style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-alt)" }}
        >
          <div className="pb-4 mb-4 border-b" style={{ borderColor: "var(--divider)" }}>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-1">
              <h3 className="text-lg font-semibold" style={{ color: "var(--text-1)" }}>
                Integrador de Sistemas
              </h3>
              <span className="text-base font-medium" style={{ color: "var(--burg-s)" }}>
                Hands Off Agencia
              </span>
            </div>
            <p className="text-sm font-mono" style={{ color: "var(--text-4)" }}>
              Oct 2024 → May 2025 · Bogotá, Colombia
            </p>
          </div>

          <ul className="flex flex-col gap-2.5">
            {achievements.map((item) => (
              <li key={item} className="flex items-start gap-3 text-base" style={{ color: "var(--text-3)" }}>
                <span className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--burg)" }} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
