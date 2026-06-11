import Image from "next/image";

const links = [
  {
    href: "https://www.linkedin.com/in/victor-santiago-cubillos-cruz-b09860256/",
    label: "LinkedIn",
    icon: "/linkedin.png",
  },
  {
    href: "https://www.instagram.com/santiago_market/",
    label: "Instagram",
    icon: "/instagram.png",
  },
  {
    href: "https://wa.me/573044161693",
    label: "WhatsApp",
    icon: "/whatsapp.png",
  },
];

export default function TarjetaPage() {
  return (
    <main
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <div
        className="w-full max-w-sm rounded-xl border p-8 text-center"
        style={{
          backgroundColor: "var(--bg-alt)",
          borderColor: "var(--divider)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        }}
      >
        {/* Nombre */}
        <h1
          className="font-display text-4xl mb-1 tracking-wide"
          style={{ color: "var(--text-1)" }}
        >
          Santiago Cubillos
        </h1>

        {/* Línea de acento */}
        <div
          className="mx-auto my-4 rounded-full"
          style={{ width: 48, height: 3, backgroundColor: "var(--burg)" }}
        />

        {/* Subtítulo */}
        <p
          className="font-mono text-xs tracking-widest uppercase mb-6"
          style={{ color: "var(--text-3)" }}
        >
          Automation Integrator
        </p>

        {/* Foto */}
        <Image
          src="/portada_tarjeta_contacto.png"
          alt="Santiago Cubillos"
          width={220}
          height={220}
          className="mx-auto rounded mb-6"
          style={{ border: "2px solid var(--burg)", width: "55%", height: "auto" }}
        />

        {/* Links */}
        <div className="flex flex-col gap-2.5">
          {links.map(({ href, label, icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 rounded-lg border font-mono text-sm transition-colors"
              style={{
                backgroundColor: "var(--bg)",
                borderColor: "var(--divider)",
                color: "var(--text-1)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--burg)";
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "var(--bg-alt)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--divider)";
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "var(--bg)";
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={icon} alt={label} width={28} height={28} style={{ objectFit: "contain" }} />
              {label}
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
