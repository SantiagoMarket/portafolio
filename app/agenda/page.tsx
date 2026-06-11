"use client";

import { useState } from "react";
import Nav from "@/components/layout/Nav";
import CalendarPicker from "@/components/agenda/CalendarPicker";
import BookingForm from "@/components/agenda/BookingForm";
import ConfirmationView from "@/components/agenda/ConfirmationView";

type Step = "calendar" | "form" | "confirmed";

interface BookingState {
  date: string | null;
  time: string | null;
}

const STEP_LABELS: Record<Exclude<Step, "confirmed">, string> = {
  calendar: "Elige fecha y hora",
  form: "Tus datos",
};

export default function AgendaPage() {
  const [step, setStep] = useState<Step>("calendar");
  const [booking, setBooking] = useState<BookingState>({
    date: null,
    time: null,
  });

  function handleSlotSelect(date: string, time: string) {
    setBooking((b) => ({ ...b, date, time }));
    setStep("form");
  }

  function handleConfirmed() {
    setStep("confirmed");
  }

  const stepNumber = { calendar: 1, form: 2, confirmed: 2 }[step];

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
              45 min · Google Meet · Gratis
            </p>
          </div>

          {/* Indicador de pasos */}
          {step !== "confirmed" && (
            <div className="flex items-center gap-2 mb-8">
              {([1, 2] as const).map((n) => (
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
                  {n < 2 && (
                    <div
                      className="w-8 h-px"
                      style={{ backgroundColor: n < stepNumber ? "var(--burg)" : "var(--divider)" }}
                    />
                  )}
                </div>
              ))}
              <span className="ml-2 text-sm" style={{ color: "var(--text-4)" }}>
                {STEP_LABELS[step as Exclude<Step, "confirmed">]}
              </span>
            </div>
          )}

          {/* Contenido por paso */}
          <div
            className="rounded-xl border p-6"
            style={{ borderColor: "var(--divider)", backgroundColor: "var(--bg-alt)" }}
          >
            {step === "calendar" && (
              <CalendarPicker duration={45} onSelect={handleSlotSelect} />
            )}

            {step === "form" && booking.date && booking.time && (
              <BookingForm
                date={booking.date}
                time={booking.time}
                duration={45}
                onSuccess={handleConfirmed}
                onBack={() => setStep("calendar")}
              />
            )}

            {step === "confirmed" && booking.date && booking.time && (
              <ConfirmationView
                date={booking.date}
                time={booking.time}
              />
            )}
          </div>
        </div>
      </main>
    </>
  );
}
