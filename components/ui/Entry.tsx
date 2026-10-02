type EntryProps = {
  title: string;
  org?: string;
  period?: string;
  bullets?: string[];
  /** Conservado por compatibilidad de llamadas; la lista se separa con espacio. */
  first?: boolean;
};

/**
 * Una entrada de CV: encabezado y lista. Separación con espacio, no con reglas.
 */
export default function Entry({ title, org, period, bullets }: EntryProps) {
  return (
    <div className="py-6">
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1.5 mb-3">
        <h3 className="font-sans font-bold text-title text-text-1">{title}</h3>
        {org && <span className="font-sans font-bold text-body text-burg-s">{org}</span>}
        {period && (
          <time className="basis-full font-mono text-meta text-text-3">{period}</time>
        )}
      </div>

      {bullets && bullets.length > 0 && (
        <ul className="grid gap-2 measure">
          {bullets.map((item) => (
            <li
              key={item}
              className="font-sans text-body leading-relaxed pl-[18px] relative text-text-2"
            >
              <span className="absolute left-0.5 top-[9px] w-1.5 h-1.5 rounded-full bg-burg" />
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
