type Duration = 30 | 45;

interface Props {
  selected: Duration | null;
  onSelect: (d: Duration) => void;
}

const options: { value: Duration; label: string; description: string }[] = [
  { value: 30, label: "30 min", description: "Screening rápido" },
  { value: 45, label: "45 min", description: "Conversación completa" },
];

export default function DurationPicker({ selected, onSelect }: Props) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      {options.map(({ value, label, description }) => {
        const isSelected = selected === value;
        return (
          <button
            key={value}
            onClick={() => onSelect(value)}
            className="flex-1 text-left px-6 py-5 rounded-lg border-2 transition-colors"
            style={{
              borderColor: isSelected ? "var(--burg)" : "var(--divider)",
              backgroundColor: isSelected ? "var(--burg-xl)" : "var(--bg)",
            }}
          >
            <span
              className="block text-xl font-mono font-bold"
              style={{ color: isSelected ? "var(--burg)" : "var(--text-1)" }}
            >
              {label}
            </span>
            <span className="block text-sm mt-1" style={{ color: "var(--text-4)" }}>
              {description}
            </span>
          </button>
        );
      })}
    </div>
  );
}
