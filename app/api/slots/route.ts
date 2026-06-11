import { type NextRequest } from "next/server";
import { z } from "zod";

const querySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato inválido: YYYY-MM-DD"),
});

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const parsed = querySchema.safeParse({ date: searchParams.get("date") });

  if (!parsed.success) {
    return Response.json({ error: "Parámetros inválidos" }, { status: 400 });
  }

  const { date } = parsed.data;

  try {
    const res = await fetch(process.env.N8N_WEBHOOK_SLOTS_URL!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });

    if (!res.ok) {
      return Response.json({ error: "Error al obtener disponibilidad" }, { status: 503 });
    }

    // n8n retorna: [{ available: [...], slots: { "YYYY-MM-DD": [{ startFormatted, available, ... }] }, summary }]
    const data = await res.json();
    const daySlots: Array<{ startFormatted: string; available: boolean }> =
      data[0]?.slots?.[date] ?? [];

    const slots = daySlots.filter((s) => s.available).map((s) => s.startFormatted);

    return Response.json({ slots });
  } catch (err) {
    console.error("[GET /api/slots]", err);
    return Response.json({ error: "Error de conexión" }, { status: 503 });
  }
}
