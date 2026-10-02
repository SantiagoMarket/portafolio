type SectionHeadingProps = {
  title: string;
  /** Anotación a la derecha: dice qué esperar de la sección. */
  note?: string;
};

/**
 * Título de sección y nota opcional. Separación con espacio, no con regla.
 */
export default function SectionHeading({ title, note }: SectionHeadingProps) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-3.5 gap-y-1 mb-8">
      <h2 className="font-display text-section leading-none tracking-wide text-burg">
        {title}
      </h2>
      {note && (
        <em className="not-italic font-mono text-meta text-text-3">{note}</em>
      )}
    </div>
  );
}
