/**
 * Menú de la home. No es sticky: vive sobre el burdeos del hero y se va con
 * él. Las subpáginas usan `Nav`, que apunta a estas mismas anclas con `/#`.
 */
const links = [
  { href: "#proyectos", label: "Proyectos" },
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#stack", label: "Stack" },
  { href: "#contacto", label: "Contacto" },
];

export default function HomeHeader() {
  return (
    <nav className="nav" aria-label="Principal">
      <a className="nav__name" href="#top">
        Santiago Cubillos
      </a>
      <ul>
        {links.map((l) => (
          <li key={l.href}>
            <a href={l.href}>{l.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
