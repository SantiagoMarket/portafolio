type ChipSize = "sm" | "md";

type ChipProps = {
  label: string;
  /** `sm` para distintivos junto a un título; `md` para listas de herramientas. */
  size?: ChipSize;
};

const sizeClasses: Record<ChipSize, string> = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
};

/**
 * La píldora borgoña del sistema. Existía sólo en tamaño `md` y el `sm` estaba
 * copiado a mano en tres archivos, así que un cambio de color de marca había
 * que perseguirlo por cuatro sitios.
 */
export default function Chip({ label, size = "md" }: ChipProps) {
  return (
    <span
      className={`inline-block font-mono rounded-full border ${sizeClasses[size]}`}
      style={{
        backgroundColor: "var(--burg-bg)",
        color: "var(--burg)",
        borderColor: "rgba(122, 11, 36, 0.2)",
      }}
    >
      {label}
    </span>
  );
}
