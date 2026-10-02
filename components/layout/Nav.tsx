"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { shellPrompt } from "@/lib/profile";

const navLinks = [
  { label: "hackathons", href: "/#hackathons" },
  { label: "propios", href: "/#proyectos-propios" },
  { label: "proyectos", href: "/#proyectos" },
  { label: "sobre-mí", href: "/#sobre-mi" },
  { label: "experiencia", href: "/#experiencia" },
  { label: "stack", href: "/#stack" },
  { label: "contacto", href: "/#contacto" },
];

/**
 * La barra es un prompt, no una cabecera de landing: punto de estado, usuario y
 * los enlaces sin mayúsculas. El menú hamburguesa se conserva de la versión
 * anterior porque en móvil no caben siete enlaces y esconderlos sin más deja la
 * página sin navegación.
 */
export default function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);

  const resolveHref = (href: string) => (isHome ? href.replace("/#", "#") : href);

  return (
    <header className="sticky top-0 z-50 border-b border-divider backdrop-blur bg-bg/90 font-mono">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center gap-4 text-meta">
        <Link href="/" className="flex items-center gap-2.5 min-w-0">
          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-burg" />
          <span className="truncate text-text-3">{shellPrompt}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-4 ml-auto" aria-label="Navegación principal">
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={resolveHref(href)}
              className="transition-colors text-text-2 hover:text-burg"
            >
              {label}
            </Link>
          ))}
        </nav>

        <button
          className="md:hidden ml-auto flex flex-col justify-center items-center w-10 h-10 gap-1.5 rounded"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span
            className="block w-5 h-0.5 bg-text-1 transition-all duration-200"
            style={{
              transform: menuOpen ? "translateY(4px) rotate(45deg)" : "none",
            }}
          />
          <span
            className="block w-5 h-0.5 bg-text-1 transition-all duration-200"
            style={{ opacity: menuOpen ? 0 : 1 }}
          />
          <span
            className="block w-5 h-0.5 bg-text-1 transition-all duration-200"
            style={{
              transform: menuOpen ? "translateY(-8px) rotate(-45deg)" : "none",
            }}
          />
        </button>
      </div>

      {menuOpen && (
        <nav
          id="mobile-menu"
          className="md:hidden px-6 py-4 flex flex-col gap-4 bg-bg"
          aria-label="Menú móvil"
        >
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={resolveHref(href)}
              className="text-body py-1 text-text-2"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
