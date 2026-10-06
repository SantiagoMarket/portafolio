import type { Badge as BadgeData } from "@/lib/badges";

/** El distintivo de la ficha; el tono decide relleno, contorno o neutro. */
export default function Badge({ label, tone }: BadgeData) {
  return <span className={`badge badge--${tone}`}>{label}</span>;
}
