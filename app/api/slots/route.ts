import { type NextRequest } from "next/server";
import { z } from "zod";
import { availableSlots } from "@/lib/booking/availability";
import {
  GoogleConfigError,
  createGoogleCalendarClient,
  type CalendarClient,
} from "@/lib/booking/google";
import { cotDayBounds } from "@/lib/booking/time";

const querySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato inválido: YYYY-MM-DD"),
});

export async function GET(request: NextRequest) {
  return getSlots(request);
}

export async function getSlots(
  request: NextRequest,
  calendar?: CalendarClient,
) {
  const { searchParams } = request.nextUrl;
  const parsed = querySchema.safeParse({ date: searchParams.get("date") });

  if (!parsed.success) {
    return Response.json({ error: "Parámetros inválidos" }, { status: 400 });
  }

  const { date } = parsed.data;

  try {
    const client = calendar ?? createGoogleCalendarClient();
    const { start, end } = cotDayBounds(date);
    const busy = await client.listBusy(start, end);
    const slots = availableSlots(date, busy);
    return Response.json({ slots });
  } catch (err) {
    if (err instanceof GoogleConfigError) {
      console.error("[GET /api/slots]", err.message);
      return Response.json({ error: "Configuración incompleta" }, { status: 503 });
    }
    console.error("[GET /api/slots]", err);
    return Response.json({ error: "Error al obtener disponibilidad" }, { status: 503 });
  }
}
