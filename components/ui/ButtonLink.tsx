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
  outline: "text-burg border-burg hover:bg-burg-xl",
  solid: "bg-burg border-burg text-white",
};

/**
 * El botón de borde borgoña: control con `border` a secas, no divisor de sección.
 */
export default function ButtonLink({
  href,
  children,
  variant = "outline",
  size = "sm",
  className = "",
}: ButtonLinkProps) {
  const classes = [
    "inline-flex items-center text-body font-sans rounded border transition-colors",
    sizeClasses[size],
    variantClasses[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
