import SectionHeading from "@/components/ui/SectionHeading";
import ButtonLink from "@/components/ui/ButtonLink";

const channels = [
  {
    label: "EMAIL",
    href: "mailto:sant4cubillos@outlook.com",
    display: "sant4cubillos@outlook.com",
  },
  {
    label: "LINKEDIN",
    href: "https://linkedin.com/in/victor-santiago-cubillos-cruz",
    display: "victor-santiago-cubillos-cruz ↗",
  },
  {
    label: "GITHUB",
    href: "https://github.com/SantiagoMarket",
    display: "github.com/SantiagoMarket ↗",
  },
];

export default function Contact() {
  return (
    <footer id="contacto">
      <div className="max-w-5xl mx-auto px-6 py-24">
        <SectionHeading title="CONTACTO" note="disponible para roles full-time en LATAM" />

        {/* El horario es contexto de la acción, no parte del botón: dentro
            inflaba el área clicable y competía con la etiqueta. */}
        <div className="flex flex-wrap items-center gap-4">
          <ButtonLink href="/agenda" variant="solid" size="lg">
            Agenda una llamada →
          </ButtonLink>
          <span className="font-mono text-meta text-text-3">
            30 o 45 min · Google Meet · gratis
          </span>
        </div>

        <div className="grid gap-3 mt-8">
          {channels.map(({ label, href, display }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              className="group grid grid-cols-[96px_minmax(0,1fr)] gap-3.5 py-2.5"
            >
              <span className="font-mono text-meta text-text-3">{label}</span>
              <span className="font-sans text-body text-text-2 transition-colors group-hover:text-burg">
                {display}
              </span>
            </a>
          ))}
        </div>

        <p className="mt-8 font-mono text-meta text-text-3">
          exit 0 — Víctor Santiago Cubillos Cruz · Bogotá
        </p>
      </div>
    </footer>
  );
}
