type EntryProps = {
  title: string;
  org?: string;
  period?: string;
  bullets?: string[];
  /** La primera entrada lleva regla borgoña gruesa: marca dónde empieza la lista. */
  first?: boolean;
};

/**
 * Una entrada de CV no es una ficha: es un encabezado y una lista. La regla
 * superior separa igual que una caja y no encierra nada.
 */
export default function Entry({ title, org, period, bullets, first = false }: EntryProps) {
  return (
    <div
      className="py-[18px]"
      style={{
        borderTop: first ? "2px solid var(--burg)" : "1px solid var(--divider)",
      }}
    >
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1.5 mb-3">
        <h3 className="font-sans font-bold text-[17px]" style={{ color: "var(--text-1)" }}>
          {title}
        </h3>
        {org && (
          <span className="font-sans font-bold text-sm" style={{ color: "var(--burg-s)" }}>
            {org}
          </span>
        )}
        {period && (
          <time className="basis-full text-[11px]" style={{ color: "var(--text-4)" }}>
            {period}
          </time>
        )}
      </div>

      {bullets && bullets.length > 0 && (
        <ul className="grid gap-2 max-w-[70ch]">
          {bullets.map((item) => (
            <li
              key={item}
              className="font-sans text-sm leading-relaxed pl-[18px] relative"
              style={{ color: "var(--text-3)" }}
            >
              <span
                className="absolute left-0.5 top-[9px] w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: "var(--burg)" }}
              />
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
