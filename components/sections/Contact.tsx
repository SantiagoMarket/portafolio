const channels = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/victor-santiago-cubillos-cruz",
    display: "linkedin.com/in/victor-santiago-cubillos-cruz",
  },
  {
    label: "Email",
    href: "mailto:sant4cubillos@outlook.com",
    display: "sant4cubillos@outlook.com",
  },
  {
    label: "GitHub",
    href: "https://github.com/SantiagoMarket",
    display: "github.com/SantiagoMarket",
  },
];

export default function Contact() {
  return (
    <section
      id="contacto"
      style={{ backgroundColor: "var(--bg-alt)" }}
    >
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h2
          className="font-display text-4xl mb-2"
          style={{ color: "var(--burg)" }}
        >
          CONTACTO
        </h2>
        <p className="text-base mb-8" style={{ color: "var(--text-4)" }}>
          Disponible para roles full-time en LATAM
        </p>

        <div className="flex flex-col gap-5">
          {channels.map(({ label, href, display }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              className="flex items-center gap-4 group"
            >
              <span
                className="w-24 text-sm font-mono flex-shrink-0"
                style={{ color: "var(--text-4)" }}
              >
                {label}
              </span>
              <span
                className="text-base transition-colors group-hover:underline"
                style={{ color: "var(--text-2)" }}
              >
                {display}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
