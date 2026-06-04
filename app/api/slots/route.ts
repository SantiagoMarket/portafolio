import { type NextRequest } from "next/server";
import { z } from "zod";
import { getFreeBusy } from "@/lib/google-calendar";
import { computeAvailableSlots } from "@/lib/availability";

const querySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato inválido: YYYY-MM-DD"),
  duration: z.enum(["30", "45"]),
});

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const parsed = querySchema.safeParse({
    date: searchParams.get("date"),
    duration: searchParams.get("duration"),
  });

  if (!parsed.success) {
    return Response.json({ error: "Parámetros inválidos" }, { status: 400 });
  }

  const { date, duration } = parsed.data;
  const durationMinutes = Number(duration);

  // Día completo en UTC para FreeBusy (Bogotá UTC-5 → rango 14:00Z–23:59Z del día anterior al 14:00Z del día)
  const dayStart = new Date(`${date}T14:00:00Z`); // 9:00 Bogotá
  const dayEnd = new Date(`${date}T23:00:00Z`);   // 18:00 Bogotá

  try {
    const busy = await getFreeBusy(dayStart.toISOString(), dayEnd.toISOString());
    const slots = computeAvailableSlots(date, durationMinutes, busy);
    return Response.json({ slots });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[GET /api/slots]", err);
    return Response.json({ error: "Error de conexión con Google Calendar", debug: msg }, { status: 503 });
  }
}
