interface Props {
  date: string;
  time: string;
}

const MONTH_NAMES = [
  "enero","febrero","marzo","abril","mayo","junio",
  "julio","agosto","septiembre","octubre","noviembre","diciembre",
];

function formatDate(date: string, time: string): string {
  const [y, m, d] = date.split("-");
  return `${d} de ${MONTH_NAMES[Number(m) - 1]} de ${y} a las ${time}`;
}

export default function ConfirmationView({ date, time }: Props) {
  return (
    <div className="flex flex-col items-center text-center gap-6 py-4">
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
        style={{ backgroundColor: "var(--burg-xl)" }}
        aria-hidden
      >
        ✓
      </div>

      <div>
        <h2 className="font-display text-2xl mb-2" style={{ color: "var(--text-1)" }}>
          ¡Llamada confirmada!
        </h2>
        <p className="text-base" style={{ color: "var(--text-3)" }}>
          {formatDate(date, time)} · 45 min
        </p>
      </div>

      <p className="text-sm" style={{ color: "var(--text-4)" }}>
        Revisa tu correo — recibirás la confirmación con el link de Google Meet y los detalles de la llamada.
      </p>
    </div>
  );
}
