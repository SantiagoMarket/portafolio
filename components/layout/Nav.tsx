"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Perfil", href: "/#perfil" },
  { label: "Experiencia", href: "/#experiencia" },
  { label: "Stack", href: "/#stack" },
  { label: "Proyectos", href: "/#proyectos" },
  { label: "Hackathons", href: "/#hackathons" },
  { label: "Contacto", href: "/#contacto" },
];

export default function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);

  const resolveHref = (href: string) =>
    isHome ? href.replace("/#", "#") : href;

  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{ backgroundColor: "var(--bg)", borderColor: "var(--divider)" }}
    >
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-mono text-sm font-bold tracking-wide"
          style={{ color: "var(--text-1)" }}
        >
          Santiago Cubillos
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Navegación principal">
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={resolveHref(href)}
              className="text-sm transition-colors"
              style={{ color: "var(--text-3)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--burg)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-3)")}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/agenda"
            className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-mono border rounded transition-colors"
            style={{ color: "var(--burg)", borderColor: "var(--burg)" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--burg-xl)")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            Agenda una llamada
          </Link>
          {/* El CTA «Ver proyectos →» vivía aquí y se quitó: el nav ya tiene
              «Proyectos» y el Hero repite el mismo botón. Con seis enlaces, los
              976 px útiles del contenedor no daban para los dos botones y
              «Agenda una llamada» se partía en dos líneas sobre «Contacto». */}

          {/* Hamburger — solo móvil */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 rounded"
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
              style={{
                backgroundColor: "var(--text-1)",
                opacity: menuOpen ? 0 : 1,
              }}
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
      </div>

      {/* Mobile menu panel */}
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
