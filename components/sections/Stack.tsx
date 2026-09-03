import SectionHeading from "@/components/ui/SectionHeading";

const categories = [
  { label: "AUTOMATIZACIÓN", tools: ["n8n", "Make", "Zapier"] },
  { label: "CRM & SALES OPS", tools: ["HubSpot", "GoHighLevel", "Clientify"] },
  { label: "DATA & REPORTING", tools: ["Looker Studio"] },
  { label: "MENSAJERÍA", tools: ["WhatsApp Business API"] },
  { label: "DESARROLLO", tools: ["Claude Code", "Next.js", "Supabase", "Vercel", "Kotlin"] },
  { label: "PRODUCTIVIDAD", tools: ["Notion"] },
];

/**
 * Clave-valor en una sola columna, no una grilla de bloques: la categoría es
 * la etiqueta y las herramientas son el valor. Separadas por reglas, sin cajas.
 */
export default function Stack() {
  return (
    <section
      id="stack"
      className="border-b"
      style={{ backgroundColor: "var(--surface)", borderColor: "var(--divider)" }}
    >
      <div className="max-w-5xl mx-auto px-6 py-[60px]">
        <SectionHeading title="STACK" note="herramientas en uso real" />
        <dl className="grid gap-4">
          {categories.map(({ label, tools }, i) => (
            <div
              key={label}
              className="grid grid-cols-1 sm:grid-cols-[150px_minmax(0,1fr)] gap-1 sm:gap-3.5 items-start pb-3.5"
              style={{
                borderBottom:
                  i === categories.length - 1 ? "none" : "1px solid var(--divider)",
              }}
            >
              <dt className="text-[11px] font-bold tracking-[0.09em]" style={{ color: "var(--text-4)" }}>
                {label}
              </dt>
              <dd className="font-sans text-[15px]" style={{ color: "var(--text-2)" }}>
                {tools.join(" · ")}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
