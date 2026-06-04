import { type NextRequest } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { getFreeBusy, createEvent } from "@/lib/google-calendar";
import { computeAvailableSlots, slotToISO } from "@/lib/availability";

const bodySchema = z.object({
  nombre: z.string().min(2).max(100),
  email: z.string().email(),
  empresa: z.string().min(1).max(100),
  motivo: z.string().min(10).max(500),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^\d{2}:\d{2}$/),
  duration: z.union([z.literal(30), z.literal(45)]),
});

const resend = new Resend(process.env.RESEND_API_KEY);

function formatDate(date: string, time: string): string {
  const [y, m, d] = date.split("-");
  const months = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
  return `${d} de ${months[Number(m) - 1]} de ${y} a las ${time}`;
}

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

  const { nombre, email, empresa, motivo, date, time, duration } = parsed.data;

  // Race condition check: verificar que el slot sigue disponible
  const dayStart = new Date(`${date}T14:00:00Z`);
  const dayEnd = new Date(`${date}T23:00:00Z`);

  let busy: Array<{ start: string; end: string }>;
  try {
    busy = await getFreeBusy(dayStart.toISOString(), dayEnd.toISOString());
  } catch (err) {
    console.error("[POST /api/book] getFreeBusy", err);
    return Response.json({ error: "Error de conexión con Google Calendar" }, { status: 503 });
  }

  const availableSlots = computeAvailableSlots(date, duration, busy);
  if (!availableSlots.includes(time)) {
    return Response.json({ error: "Este horario ya no está disponible, elige otro" }, { status: 409 });
  }

  // Crear evento con Meet
  const { start, end } = slotToISO(date, time, duration);
  let eventId: string;
  let meetLink: string;
  try {
    ({ eventId, meetLink } = await createEvent({
      title: `Llamada — ${nombre} / ${empresa}`,
      start,
      end,
      guestEmail: email,
      guestName: nombre,
      description: `Motivo: ${motivo}\n\nEmpresa: ${empresa}\nDuración: ${duration} min`,
    }));
  } catch (err) {
    console.error("[POST /api/book] createEvent", err);
    return Response.json({ error: "Error al crear el evento" }, { status: 503 });
  }

  const fechaFormateada = formatDate(date, time);
  const from = process.env.RESEND_FROM_EMAIL!;

  // Emails — si fallan, el evento ya fue creado (el invite de Google llega igual)
  try {
    await Promise.all([
      resend.emails.send({
        from,
        to: email,
        subject: `Llamada confirmada — ${fechaFormateada}`,
        html: `
          <p>Hola ${nombre},</p>
          <p>Tu llamada con Santiago Cubillos está confirmada.</p>
          <ul>
            <li><strong>Fecha:</strong> ${fechaFormateada}</li>
            <li><strong>Duración:</strong> ${duration} minutos</li>
            <li><strong>Google Meet:</strong> <a href="${meetLink}">${meetLink}</a></li>
          </ul>
          <p>Revisa tu email — el invite de Google Calendar llegará en los próximos minutos.</p>
        `,
      }),
      resend.emails.send({
        from,
        to: process.env.BOOKING_NOTIFY_EMAIL!,
        subject: `Nueva llamada agendada — ${nombre} (${empresa})`,
        html: `
          <p><strong>Nombre:</strong> ${nombre}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Empresa:</strong> ${empresa}</p>
          <p><strong>Fecha:</strong> ${fechaFormateada} (${duration} min)</p>
          <p><strong>Motivo:</strong> ${motivo}</p>
          <p><strong>Meet:</strong> <a href="${meetLink}">${meetLink}</a></p>
        `,
      }),
    ]);
  } catch (err) {
    console.error("[POST /api/book] resend", err);
    // No retornar error — el evento ya fue creado
  }

  return Response.json({ success: true, meetLink, eventId });
}
