type ChipProps = {
  label: string;
};

export default function Chip({ label }: ChipProps) {
  return (
    <span
      className="inline-block px-3 py-1 text-sm font-mono rounded-full border"
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
