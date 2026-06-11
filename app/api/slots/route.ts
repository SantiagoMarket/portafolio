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

  if (!process.env.N8N_WEBHOOK_SLOTS_URL) {
    console.error("[GET /api/slots] N8N_WEBHOOK_SLOTS_URL no configurada");
    return Response.json({ error: "Configuración incompleta" }, { status: 503 });
  }

  try {
    const res = await fetch(process.env.N8N_WEBHOOK_SLOTS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });

    if (!res.ok) {
      console.error("[GET /api/slots] n8n status:", res.status);
      return Response.json({ error: "Error al obtener disponibilidad" }, { status: 503 });
    }

    const data = await res.json();
    console.log("[GET /api/slots] n8n raw:", JSON.stringify(data).slice(0, 300));

    // n8n puede devolver array [{slots}] o el objeto directo {slots}
    const payload = Array.isArray(data) ? data[0] : data;
    const daySlots: Array<{ startFormatted: string; available: boolean }> =
      payload?.slots?.[date] ?? [];

    const slots = daySlots.filter((s) => s.available).map((s) => s.startFormatted);

    return Response.json({ slots });
  } catch (err) {
    console.error("[GET /api/slots]", err);
    return Response.json({ error: "Error de conexión" }, { status: 503 });
  }
}
