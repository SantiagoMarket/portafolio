import SectionHeading from "@/components/ui/SectionHeading";
import Entry from "@/components/ui/Entry";

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
      style={{ backgroundColor: "var(--surface)", borderColor: "var(--divider)" }}
    >
      <div className="max-w-5xl mx-auto px-6 py-[60px]">
        <SectionHeading title="EXPERIENCIA" />
        <Entry
          first
          title="Integrador de Sistemas"
          org="Hands Off Agencia"
          period="Oct 2024 → May 2025 · Bogotá, Colombia"
          bullets={achievements}
        />
      </div>
    </section>
  );
}
