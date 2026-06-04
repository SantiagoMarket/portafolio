"use client";

import { useState } from "react";

interface Props {
  date: string;
  time: string;
  duration: 30 | 45;
  onSuccess: (meetLink: string) => void;
  onBack: () => void;
}

interface FormState {
  nombre: string;
  email: string;
  empresa: string;
  motivo: string;
}

const MONTH_NAMES = [
  "enero","febrero","marzo","abril","mayo","junio",
  "julio","agosto","septiembre","octubre","noviembre","diciembre",
];

function formatDate(date: string, time: string): string {
  const [y, m, d] = date.split("-");
  return `${d} de ${MONTH_NAMES[Number(m) - 1]} de ${y} a las ${time}`;
}

export default function BookingForm({ date, time, duration, onSuccess, onBack }: Props) {
  const [form, setForm] = useState<FormState>({ nombre: "", email: "", empresa: "", motivo: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const valid =
    form.nombre.trim().length >= 2 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
    form.empresa.trim().length >= 1 &&
    form.motivo.trim().length >= 5;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, date, time, duration }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Error al confirmar la reserva");
        return;
      }
      onSuccess(data.meetLink);
    } catch {
      setError("Error de conexión. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  const inputStyle = {
    backgroundColor: "var(--bg)",
    borderColor: "var(--divider)",
    color: "var(--text-1)",
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Resumen de la reserva */}
      <div
        className="px-4 py-3 rounded-lg text-sm font-mono"
        style={{ backgroundColor: "var(--burg-xl)", color: "var(--burg)" }}
      >
        {formatDate(date, time)} · {duration} min · Google Meet
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-sm mb-1" style={{ color: "var(--text-3)" }}>
            Nombre
          </label>
          <input
            type="text"
            value={form.nombre}
            onChange={(e) => setForm((f) => ({ ...f, nombre: e.target.value }))}
            placeholder="Tu nombre completo"
            className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none"
            style={inputStyle}
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1" style={{ color: "var(--text-3)" }}>
            Email
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            placeholder="tu@empresa.com"
            className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none"
            style={inputStyle}
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1" style={{ color: "var(--text-3)" }}>
            Empresa
          </label>
          <input
            type="text"
            value={form.empresa}
            onChange={(e) => setForm((f) => ({ ...f, empresa: e.target.value }))}
            placeholder="Nombre de la empresa"
            className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none"
            style={inputStyle}
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1" style={{ color: "var(--text-3)" }}>
            Motivo de la llamada
          </label>
          <textarea
            value={form.motivo}
            onChange={(e) => setForm((f) => ({ ...f, motivo: e.target.value }))}
            placeholder="¿En qué rol estás pensando? ¿Qué quieres conversar?"
            rows={4}
            className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none resize-none"
            aria-describedby="motivo-hint"
            style={inputStyle}
            required
          />
          {form.motivo.trim().length > 0 && form.motivo.trim().length < 5 && (
            <p id="motivo-hint" className="text-xs mt-1" style={{ color: "var(--text-4)" }}>
              Mínimo 5 caracteres
            </p>
          )}
        </div>
      </div>

      {error && (
        <p className="text-sm" style={{ color: "var(--burg)" }}>
          {error}
        </p>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 py-3 text-sm rounded-lg border transition-colors"
          style={{ borderColor: "var(--divider)", color: "var(--text-3)" }}
        >
          ← Cambiar horario
        </button>
        <button
          type="submit"
          disabled={!valid || loading}
          className="flex-1 py-3 text-sm font-mono font-bold rounded-lg transition-colors"
          style={{
            backgroundColor: valid && !loading ? "var(--burg)" : "var(--divider)",
            color: "white",
            cursor: valid && !loading ? "pointer" : "not-allowed",
          }}
        >
          {loading ? "Confirmando..." : "Confirmar llamada →"}
        </button>
      </div>
    </form>
  );
}
