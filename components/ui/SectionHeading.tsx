type SectionHeadingProps = {
  title: string;
  /** Anotación a la derecha de la regla: dice qué esperar de la sección. */
  note?: string;
};

/**
 * El encabezado no es una caja: es un título, una regla que ocupa el resto del
 * ancho y una nota al final. La regla separa sin encerrar.
 */
export default function SectionHeading({ title, note }: SectionHeadingProps) {
  return (
    <div className="flex items-baseline gap-3.5 mb-7">
      <h2
        className="font-display text-4xl leading-none tracking-wide"
        style={{ color: "var(--burg)" }}
      >
        {title}
      </h2>
      <hr
        className="flex-1 border-0 border-t border-dashed"
        style={{ borderColor: "var(--divider)" }}
      />
      {note && (
        <em className="not-italic font-mono text-[11px]" style={{ color: "var(--text-4)" }}>
          {note}
        </em>
      )}
    </div>
  );
}
