type IconName = "out" | "down" | "mail";

/** Trazos en una caja de 24×24; color y grosor los pone `.icon` en CSS. */
const paths: Record<IconName, React.ReactNode> = {
  out: <path d="M7 17 17 7M8 7h9v9" />,
  down: <path d="M12 5v14M6 13l6 6 6-6" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
};

/**
 * Los tres íconos de la home. Siempre decorativos: el texto del enlace ya dice
 * a dónde lleva, así que el ícono queda oculto para lectores de pantalla.
 */
export default function Icon({ name }: { name: IconName }) {
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}
