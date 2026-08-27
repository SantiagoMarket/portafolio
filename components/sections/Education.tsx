import Chip from "@/components/ui/Chip";

const education = [
  {
    institution: "Ignia Action Lab",
    detail: "Programa práctico de automatización · 12 semanas · 2026",
    location: "Bogotá, Colombia",
    badge: null,
  },
  {
    institution: "Platzi",
    detail: "Automatización de procesos · CRM e integraciones",
    location: null,
    badge: null,
  },
];

export default function Education() {
  return (
    <section
      id="formacion"
      className="border-b"
      style={{ backgroundColor: "var(--surface)", borderColor: "var(--divider)" }}
    >
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h2
          className="font-display text-4xl mb-8"
          style={{ color: "var(--burg)" }}
        >
          FORMACIÓN
        </h2>

        <ul className="flex flex-col gap-5">
          {education.map(({ institution, detail, location, badge }) => (
            <li
              key={institution}
              className="flex items-start gap-4 pb-5 border-b last:border-0 last:pb-0"
              style={{ borderColor: "var(--divider)" }}
            >
              <span
                className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: "var(--burg)" }}
              />
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-base font-semibold" style={{ color: "var(--text-1)" }}>
                    {institution}
                  </span>
                  {badge && <Chip label={badge} size="sm" />}

                </div>
                <p className="text-base mt-0.5" style={{ color: "var(--text-3)" }}>
                  {detail}
                </p>
                {location && (
                  <p className="text-sm mt-0.5" style={{ color: "var(--text-4)" }}>
                    {location}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
