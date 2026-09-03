"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "hackathons", href: "/#hackathons" },
  { label: "proyectos", href: "/#proyectos" },
  { label: "sobre-mí", href: "/#sobre-mi" },
  { label: "experiencia", href: "/#experiencia" },
  { label: "stack", href: "/#stack" },
  { label: "contacto", href: "/#contacto" },
];

/**
 * La barra es un prompt, no una cabecera de landing: punto de estado, usuario y
 * los enlaces sin mayúsculas. El menú hamburguesa se conserva de la versión
 * anterior porque en móvil no caben seis enlaces y esconderlos sin más deja la
 * página sin navegación.
 */
export default function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);

  const resolveHref = (href: string) => (isHome ? href.replace("/#", "#") : href);

  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur"
      style={{ backgroundColor: "rgba(255,255,255,.9)", borderColor: "var(--divider)" }}
    >
      <div className="max-w-5xl mx-auto px-6 h-[52px] flex items-center gap-4 text-xs">
        <Link href="/" className="flex items-center gap-2.5 min-w-0">
          <span
            className="w-[7px] h-[7px] rounded-full flex-shrink-0"
            style={{ backgroundColor: "var(--burg)" }}
          />
          <span className="truncate" style={{ color: "var(--text-4)" }}>
            santiago@revops:~
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-[18px] ml-auto" aria-label="Navegación principal">
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={resolveHref(href)}
              className="transition-colors hover:text-[var(--burg)]"
              style={{ color: "var(--text-3)" }}
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
            className="block w-5 h-0.5 transition-all duration-200"
            style={{
              backgroundColor: "var(--text-1)",
              transform: menuOpen ? "translateY(4px) rotate(45deg)" : "none",
            }}
          />
          <span
            className="block w-5 h-0.5 transition-all duration-200"
            style={{ backgroundColor: "var(--text-1)", opacity: menuOpen ? 0 : 1 }}
          />
          <span
            className="block w-5 h-0.5 transition-all duration-200"
            style={{
              backgroundColor: "var(--text-1)",
              transform: menuOpen ? "translateY(-8px) rotate(-45deg)" : "none",
            }}
          />
        </button>
      </div>

      {menuOpen && (
        <nav
          id="mobile-menu"
          className="md:hidden border-t px-6 py-4 flex flex-col gap-4"
          style={{ backgroundColor: "var(--bg)", borderColor: "var(--divider)" }}
          aria-label="Menú móvil"
        >
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={resolveHref(href)}
              className="text-sm py-1"
              style={{ color: "var(--text-2)" }}
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
