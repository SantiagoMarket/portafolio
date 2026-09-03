import SectionHeading from "@/components/ui/SectionHeading";
import Entry from "@/components/ui/Entry";

const education = [
  {
    institution: "Ignia Action Lab",
    detail: "Programa práctico de automatización",
    period: "12 semanas · 2026 · Bogotá, Colombia",
  },
  {
    institution: "Platzi",
    detail: "Automatización de procesos · CRM e integraciones",
    period: undefined,
  },
];

export default function Education() {
  return (
    <section
      id="formacion"
      className="border-b"
      style={{ backgroundColor: "var(--bg)", borderColor: "var(--divider)" }}
    >
      <div className="max-w-5xl mx-auto px-6 py-[60px]">
        <SectionHeading title="FORMACIÓN" />
        {education.map(({ institution, detail, period }, i) => (
          <Entry
            key={institution}
            first={i === 0}
            title={institution}
            org={detail}
            period={period}
          />
        ))}
      </div>
    </section>
  );
}
