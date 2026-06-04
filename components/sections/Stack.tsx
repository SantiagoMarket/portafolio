const categories = [
  { label: "AUTOMATIZACIÓN", tools: ["n8n", "Make", "Zapier"] },
  { label: "CRM & SALES OPS", tools: ["HubSpot", "GoHighLevel", "Clientify"] },
  { label: "DATA & REPORTING", tools: ["Looker Studio"] },
  { label: "MENSAJERÍA", tools: ["WhatsApp API"] },
  { label: "DESARROLLO", tools: ["Claude Code", "Vercel", "Supabase"] },
  { label: "PRODUCTIVIDAD", tools: ["Notion"] },
];

export default function Stack() {
  return (
    <section
      id="stack"
      className="border-b"
      style={{ backgroundColor: "var(--bg)", borderColor: "var(--divider)" }}
    >
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h2
          className="font-display text-4xl mb-8"
          style={{ color: "var(--burg)" }}
        >
          STACK
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map(({ label, tools }) => (
            <div key={label} className="flex flex-col gap-2">
              <p className="text-sm font-mono font-semibold tracking-wider" style={{ color: "var(--text-2)" }}>
                {label}
              </p>
              <ul className="flex flex-col gap-1">
                {tools.map((tool) => (
                  <li key={tool} className="flex items-center gap-2 text-sm" style={{ color: "var(--text-3)" }}>
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "var(--burg)" }} />
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
