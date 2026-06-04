"use client";

import { useState } from "react";
import Nav from "@/components/layout/Nav";
import DurationPicker from "@/components/agenda/DurationPicker";
import CalendarPicker from "@/components/agenda/CalendarPicker";
import BookingForm from "@/components/agenda/BookingForm";
import ConfirmationView from "@/components/agenda/ConfirmationView";

type Step = "duration" | "calendar" | "form" | "confirmed";

interface BookingState {
  duration: 30 | 45 | null;
  date: string | null;
  time: string | null;
  meetLink: string | null;
}

const STEP_LABELS: Record<Exclude<Step, "confirmed">, string> = {
  duration: "Elige la duración",
  calendar: "Elige fecha y hora",
  form: "Tus datos",
};

export default function AgendaPage() {
  const [step, setStep] = useState<Step>("duration");
  const [booking, setBooking] = useState<BookingState>({
    duration: null,
    date: null,
    time: null,
    meetLink: null,
  });

  function handleDurationSelect(duration: 30 | 45) {
    setBooking((b) => ({ ...b, duration }));
    setStep("calendar");
  }

  function handleSlotSelect(date: string, time: string) {
    setBooking((b) => ({ ...b, date, time }));
    setStep("form");
  }

  function handleConfirmed(meetLink: string) {
    setBooking((b) => ({ ...b, meetLink }));
    setStep("confirmed");
  }

  const stepNumber = { duration: 1, calendar: 2, form: 3, confirmed: 3 }[step];

  return (
    <>
      <Nav />
      <main className="min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
        <div className="max-w-xl mx-auto px-6 py-16">

          {/* Encabezado */}
          <div className="mb-10">
            <p className="text-sm font-mono mb-2" style={{ color: "var(--burg)" }}>
              soysantiago.com/agenda
            </p>
            <h1 className="font-display text-4xl mb-3" style={{ color: "var(--text-1)" }}>
              Agenda una llamada
            </h1>
            <p className="text-base" style={{ color: "var(--text-3)" }}>
              30 o 45 min · Google Meet · Gratis
            </p>
          </div>

          {/* Indicador de pasos */}
          {step !== "confirmed" && (
            <div className="flex items-center gap-2 mb-8">
              {([1, 2, 3] as const).map((n) => (
                <div key={n} className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold"
                    style={{
                      backgroundColor: n <= stepNumber ? "var(--burg)" : "var(--divider)",
                      color: n <= stepNumber ? "white" : "var(--text-4)",
                    }}
                  >
                    {n}
                  </div>
                  {n < 3 && (
                    <div
                      className="w-8 h-px"
                      style={{ backgroundColor: n < stepNumber ? "var(--burg)" : "var(--divider)" }}
                    />
                  )}
                </div>
              ))}
              <span className="ml-2 text-sm" style={{ color: "var(--text-4)" }}>
                {step !== "confirmed" && STEP_LABELS[step]}
              </span>
            </div>
          )}

          {/* Contenido por paso */}
          <div
            className="rounded-xl border p-6"
            style={{ borderColor: "var(--divider)", backgroundColor: "var(--bg-alt)" }}
          >
            {step === "duration" && (
              <DurationPicker
                selected={booking.duration}
                onSelect={handleDurationSelect}
              />
            )}

            {step === "calendar" && booking.duration && (
              <>
                <div className="flex items-center gap-3 mb-6">
                  <button
                    onClick={() => setStep("duration")}
                    className="text-sm"
                    style={{ color: "var(--text-4)" }}
                  >
                    ← Cambiar duración
                  </button>
                  <span
                    className="text-sm font-mono px-3 py-1 rounded-full"
                    style={{ backgroundColor: "var(--burg-xl)", color: "var(--burg)" }}
                  >
                    {booking.duration} min
                  </span>
                </div>
                <CalendarPicker
                  duration={booking.duration}
                  onSelect={handleSlotSelect}
                />
              </>
            )}

            {step === "form" && booking.duration && booking.date && booking.time && (
              <BookingForm
                date={booking.date}
                time={booking.time}
                duration={booking.duration}
                onSuccess={handleConfirmed}
                onBack={() => setStep("calendar")}
              />
            )}

            {step === "confirmed" && booking.meetLink && booking.date && booking.time && booking.duration && (
              <ConfirmationView
                meetLink={booking.meetLink}
                date={booking.date}
                time={booking.time}
                duration={booking.duration}
              />
            )}
          </div>
        </div>
      </main>
    </>
  );
}
