import Link from "next/link";
import type { ReactNode } from "react";

type ButtonVariant = "outline" | "solid";
type ButtonSize = "sm" | "md" | "lg";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Clases extra del sitio de uso — visibilidad por breakpoint, sobre todo. */
  className?: string;
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-1.5",
  md: "px-4 py-2",
  lg: "px-5 py-2.5",
};

const variantClasses: Record<ButtonVariant, string> = {
  // `bg-burg-xl` es el borgoña más claro del tema (`globals.css`), no un color suelto.
  outline: "hover:bg-burg-xl",
  solid: "",
};

const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
  outline: { color: "var(--burg)", borderColor: "var(--burg)" },
  solid: { backgroundColor: "var(--burg)", borderColor: "var(--burg)", color: "white" },
};

/**
 * El botón de borde borgoña, que estaba repetido en seis archivos con tres
 * tamaños y dos formas distintas de resolver el mismo hover: unas con Tailwind
 * y otras mutando `style.backgroundColor` desde `onMouseEnter`. La versión en
 * JS dejaba el estado del hover fuera de la hoja de estilos, donde no se puede
 * ni inspeccionar ni sobreescribir.
 *
 * Un enlace externo se abre en otra pestaña y no pasa por el router: se decide
 * por el propio href, para que ningún sitio de uso pueda olvidarse el
 * `rel="noopener"`.
 */
export default function ButtonLink({
  href,
  children,
  variant = "outline",
  size = "sm",
  className = "",
}: ButtonLinkProps) {
  const classes = [
    "inline-flex items-center text-sm font-mono rounded border transition-colors",
    sizeClasses[size],
    variantClasses[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href.startsWith("http")) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        style={variantStyles[variant]}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} style={variantStyles[variant]}>
      {children}
    </Link>
  );
}
