interface Props {
  meetLink: string;
  date: string;
  time: string;
  duration: 30 | 45;
}

const MONTH_NAMES = [
  "enero","febrero","marzo","abril","mayo","junio",
  "julio","agosto","septiembre","octubre","noviembre","diciembre",
];

function formatDate(date: string, time: string): string {
  const [y, m, d] = date.split("-");
  return `${d} de ${MONTH_NAMES[Number(m) - 1]} de ${y} a las ${time}`;
}

export default function ConfirmationView({ meetLink, date, time, duration }: Props) {
  const gcalUrl = meetLink
    ? `https://calendar.google.com/calendar/r/eventedit?add=${encodeURIComponent(meetLink)}`
    : null;

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
          {formatDate(date, time)} · {duration} min
        </p>
      </div>

      <a
        href={meetLink}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full py-3 text-sm font-mono font-bold rounded-lg text-center transition-colors"
        style={{ backgroundColor: "var(--burg)", color: "white" }}
      >
        Unirse a Google Meet →
      </a>

      {gcalUrl && (
        <a
          href={gcalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm underline"
          style={{ color: "var(--text-4)" }}
        >
          Agregar a Google Calendar
        </a>
      )}

      <p className="text-sm" style={{ color: "var(--text-4)" }}>
        Revisa tu email — el invite de Google Calendar llegará en los próximos minutos.
      </p>
    </div>
  );
}
