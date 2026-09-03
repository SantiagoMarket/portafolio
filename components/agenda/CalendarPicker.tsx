"use client";

import { useState, useEffect } from "react";
import { readSlots, slotsRequestKey, type SlotsResult } from "@/lib/slots";

interface Props {
  duration: 30 | 45;
  onSelect: (date: string, time: string) => void;
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function toDateString(date: Date): string {
  return date.toISOString().split("T")[0];
}

const WEEKDAYS = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sá", "Do"];
const MONTH_NAMES = [
  "Enero","Febrero","Marzo","Abril","Mayo","Junio",
  "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre",
];

export default function CalendarPicker({ duration, onSelect }: Props) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [result, setResult] = useState<SlotsResult | null>(null);

  const requestKey = slotsRequestKey(selectedDate, duration);

  // El estado de carga no se guarda: se deduce de si `result` corresponde a la
  // petición actual. Así el efecto no fija estado en su cuerpo —lo que
  // encadenaba renders— y una respuesta que llega tarde no pisa a la nueva.
  useEffect(() => {
    if (!selectedDate || !requestKey) return;
    let cancelled = false;

    fetch(`/api/slots?date=${selectedDate}&duration=${duration}`)
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        setResult({
          key: requestKey,
          slots: Array.isArray(data.slots) ? data.slots : null,
        });
      })
      .catch(() => {
        if (!cancelled) setResult({ key: requestKey, slots: null });
      });

    return () => {
      cancelled = true;
    };
  }, [selectedDate, duration, requestKey]);

  const { loading: loadingSlots, error: slotsError, slots } = readSlots(
    result,
    requestKey,
  );

  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();
  // Ajustar para semana lunes-domingo (JS: 0=Dom → mover Dom al final)
  const startOffset = (firstDayOfMonth + 6) % 7;
  const daysInMonth = getDaysInMonth(viewYear, viewMonth);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
    setSelectedDate(null);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
    setSelectedDate(null);
  };

  const todayStr = toDateString(today);

  return (
    <div className="flex flex-col gap-6">
      {/* Cabecera del mes */}
      <div className="flex items-center justify-between">
        <button
          onClick={prevMonth}
          className="p-2 rounded transition-colors"
          style={{ color: "var(--text-3)" }}
          aria-label="Mes anterior"
        >
          ←
        </button>
        <span className="font-mono font-bold" style={{ color: "var(--text-1)" }}>
          {MONTH_NAMES[viewMonth]} {viewYear}
        </span>
        <button
          onClick={nextMonth}
          className="p-2 rounded transition-colors"
          style={{ color: "var(--text-3)" }}
          aria-label="Mes siguiente"
        >
          →
        </button>
      </div>

      {/* Grid días */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {WEEKDAYS.map((d) => (
          <span key={d} className="text-xs font-mono pb-1" style={{ color: "var(--text-4)" }}>
            {d}
          </span>
        ))}

        {Array.from({ length: startOffset }).map((_, i) => (
          <span key={`e-${i}`} />
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const date = new Date(viewYear, viewMonth, day);
          const dateStr = toDateString(date);
          const isPast = dateStr < todayStr;
          const isWeekend = date.getDay() === 0 || date.getDay() === 6;
          const isDisabled = isPast || isWeekend;
          const isSelected = selectedDate === dateStr;

          return (
            <button
              key={day}
              disabled={isDisabled}
              onClick={() => setSelectedDate(dateStr)}
              className="aspect-square rounded text-sm transition-colors"
              style={{
                color: isDisabled
                  ? "var(--text-4)"
                  : isSelected
                  ? "white"
                  : "var(--text-2)",
                backgroundColor: isSelected ? "var(--burg)" : "transparent",
                cursor: isDisabled ? "not-allowed" : "pointer",
                opacity: isDisabled ? 0.4 : 1,
              }}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Slots de hora */}
      {selectedDate && (
        <div>
          <p className="text-sm font-mono mb-3" style={{ color: "var(--text-3)" }}>
            Horas disponibles
          </p>
          {loadingSlots && (
            <p className="text-sm" style={{ color: "var(--text-4)" }}>Cargando...</p>
          )}
          {slotsError && (
            <p className="text-sm" style={{ color: "var(--burg)" }}>
              Error al cargar horarios. Intenta de nuevo.
            </p>
          )}
          {!loadingSlots && !slotsError && slots.length === 0 && (
            <p className="text-sm" style={{ color: "var(--text-4)" }}>
              No hay horarios disponibles para este día.
            </p>
          )}
          {!loadingSlots && slots.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {slots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => onSelect(selectedDate, slot)}
                  // El hover invierte el botón —se rellena de borgoña— en vez
                  // de aclararlo, así que no es el mismo que ButtonLink. Lo que
                  // sí cambia es que el efecto vive en la hoja de estilos y no
                  // en dos manejadores que mutaban `style` a mano.
                  className="py-3 text-sm font-mono rounded border transition-colors text-[var(--burg)] border-[var(--burg)] bg-transparent hover:bg-[var(--burg)] hover:text-white"
                >
                  {slot}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
