import { type NextRequest } from "next/server";
import { z } from "zod";

const bodySchema = z.object({
  nombre: z.string().min(2).max(100),
  email: z.string().email(),
  empresa: z.string().min(1).max(100),
  motivo: z.string().min(10).max(500),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^\d{2}:\d{2}$/),
});

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Cuerpo inválido" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "Datos inválidos", details: parsed.error.flatten() }, { status: 400 });
  }

  const { nombre, email, empresa, motivo, date, time } = parsed.data;

  // Convertir hora COT (UTC-5) a ISO UTC para n8n
  const [h, m] = time.split(":").map(Number);
  const [y, mo, d] = date.split("-").map(Number);
  const startUTC = new Date(Date.UTC(y, mo - 1, d, h + 5, m, 0));
  const endUTC = new Date(startUTC.getTime() + 45 * 60 * 1000);

  const payload = {
    start_time: startUTC.toISOString(),
    end_time: endUTC.toISOString(),
    attendees: [email],
    name: nombre,
    phone: "",
    notes: `${empresa} — ${motivo}`,
    status: "Lead",
  };

  try {
    const res = await fetch(process.env.N8N_WEBHOOK_BOOK_URL!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      return Response.json({ error: "Error al confirmar la reserva" }, { status: 503 });
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error("[POST /api/book]", err);
    return Response.json({ error: "Error de conexión" }, { status: 503 });
  }
}
