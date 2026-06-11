"use client";

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
      className="min-h-dvh flex items-center justify-center px-4 py-8 sm:py-12"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <div
        className="w-full max-w-sm rounded-xl border p-5 sm:p-8 text-center"
        style={{
          backgroundColor: "var(--bg-alt)",
          borderColor: "var(--divider)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
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
        <div className="mx-auto mb-6" style={{ width: "62%" }}>
          <Image
            src="/portada_tarjeta_contacto.png"
            alt="Santiago Cubillos"
            width={220}
            height={220}
            className="w-full h-auto rounded"
            style={{ border: "2px solid var(--burg)" }}
          />
        </div>

        {/* Links */}
        <div className="flex flex-col gap-3">
          {links.map(({ href, label, icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3.5 rounded-lg border font-mono text-sm transition-colors active:scale-[0.98]"
              style={{
                backgroundColor: "var(--bg)",
                borderColor: "var(--divider)",
                color: "var(--text-1)",
                touchAction: "manipulation",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--burg)";
                e.currentTarget.style.backgroundColor = "var(--bg-alt)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--divider)";
                e.currentTarget.style.backgroundColor = "var(--bg)";
              }}
            >
              <Image src={icon} alt={label} width={28} height={28} style={{ objectFit: "contain" }} />
              {label}
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
