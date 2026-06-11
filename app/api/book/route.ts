import { type NextRequest } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

const bodySchema = z.object({
  nombre: z.string().min(2).max(100),
  email: z.string().email(),
  empresa: z.string().min(1).max(100),
  motivo: z.string().min(10).max(500),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^\d{2}:\d{2}$/),
});

const resend = new Resend(process.env.RESEND_API_KEY);

const MONTHS = [
  "enero","febrero","marzo","abril","mayo","junio",
  "julio","agosto","septiembre","octubre","noviembre","diciembre",
];

function formatDate(date: string, time: string): string {
  const [y, m, d] = date.split("-");
  return `${d} de ${MONTHS[Number(m) - 1]} de ${y} a las ${time}`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function guestEmail(nombre: string, fecha: string): string {
  const n = escapeHtml(nombre);
  const f = escapeHtml(fecha);
  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Llamada confirmada · Santiago</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=DM+Sans:wght@300;400;500&display=swap');
  * { box-sizing: border-box; }
  body { margin: 0; padding: 0; background: #0E1012; font-family: 'DM Sans', Arial, sans-serif; font-weight: 300; -webkit-font-smoothing: antialiased; }
  .mono { font-family: 'Space Mono', 'Courier New', monospace; }
  a { color: #C4405A; text-decoration: none; }
  @media only screen and (max-width: 600px) {
    .wrapper { width: 100% !important; }
    .pad { padding: 24px !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:#0E1012;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0E1012;">
  <tr><td align="center" style="padding:32px 16px 48px;">
    <table class="wrapper" width="560" cellpadding="0" cellspacing="0" style="width:560px;">

      <!-- Header -->
      <tr><td style="background:#111314;border-bottom:1px solid #252A2E;padding:16px 32px;">
        <span class="mono" style="font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#E8E4DF;">
          <span style="color:#7A0B24;">Santiago</span> &middot; Automation
        </span>
      </td></tr>

      <!-- Hero -->
      <tr><td class="pad" style="background:#111314;padding:48px 32px 40px;border-left:3px solid #7A0B24;">
        <p class="mono" style="margin:0 0 20px;font-size:8px;letter-spacing:0.22em;text-transform:uppercase;color:#C4405A;">
          // Confirmaci&oacute;n de agenda
        </p>
        <h1 style="margin:0 0 8px;font-size:28px;font-weight:500;line-height:1.2;color:#E8E4DF;letter-spacing:-0.01em;">
          Tu llamada est&aacute;<br><span style="color:#7A0B24;">confirmada</span>, ${n}.
        </h1>
        <p style="margin:20px 0 0;font-size:14px;line-height:1.75;color:#A09A93;max-width:400px;">
          Agendaste una sesi&oacute;n conmigo. A continuaci&oacute;n tienes los detalles.
        </p>
      </td></tr>

      <!-- Detail card -->
      <tr><td style="background:#1D1714;padding:0 32px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #2E2720;margin:24px 0;">
          <tr><td class="mono" style="background:#251F1A;border-bottom:1px solid #2E2720;padding:12px 24px;font-size:8px;letter-spacing:0.2em;text-transform:uppercase;color:#C4405A;">
            // Detalles de la sesi&oacute;n
          </td></tr>
          <tr><td style="padding:20px 24px 16px;">
            <p class="mono" style="margin:0 0 4px;font-size:7px;letter-spacing:0.18em;text-transform:uppercase;color:#7A7570;">Fecha &amp; Hora</p>
            <p style="margin:0;font-size:18px;font-weight:500;color:#E8E4DF;">
              ${f} <span style="font-size:11px;color:#7A7570;font-weight:300;">&middot; COT (Bogot&aacute;)</span>
            </p>
          </td></tr>
          <tr><td style="padding:0 24px;"><div style="height:1px;background:#2E2720;"></div></td></tr>
          <tr><td style="padding:14px 24px 20px;">
            <p class="mono" style="margin:0;font-size:8px;letter-spacing:0.06em;color:#4A4F54;line-height:1.8;">
              El link de Google Meet llegar&aacute; en el invite de Google Calendar.<br>
              Si necesitas cancelar, escr&iacute;beme al +57 304 416 1693.
            </p>
          </td></tr>
        </table>
      </td></tr>

      <!-- Body -->
      <tr><td style="background:#1D1714;padding:0 32px 40px;">
        <p style="margin:0;font-size:13px;line-height:1.8;color:#A09A93;">
          En nuestra sesi&oacute;n vamos a explorar c&oacute;mo la automatizaci&oacute;n puede transformar tus procesos de forma pr&aacute;ctica y con retorno real desde el primer mes.
        </p>
      </td></tr>

      <!-- CTA -->
      <tr><td style="background:#111314;border-top:1px solid #252A2E;padding:24px 32px;">
        <p style="margin:0 0 6px;font-size:13px;color:#A09A93;">&iquest;Tienes alguna pregunta antes de la sesi&oacute;n?</p>
        <a href="https://wa.me/573044161693" style="font-size:13px;color:#C4405A;">+57 304 416 1693 &rarr;</a>
      </td></tr>

      <!-- Footer -->
      <tr><td style="background:#0E1012;border-top:1px solid #1E2226;padding:20px 32px;">
        <p class="mono" style="margin:0;font-size:8px;letter-spacing:0.1em;text-transform:uppercase;color:#4A4F54;">
          &copy; 2026 Santiago &middot; Automation Integrator<br>Santiago de Cali, Colombia
        </p>
      </td></tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;
}

function hostEmail(nombre: string, emailAddr: string, empresa: string, motivo: string, fecha: string): string {
  const n = escapeHtml(nombre);
  const e = escapeHtml(emailAddr);
  const emp = escapeHtml(empresa);
  const mot = escapeHtml(motivo);
  const f = escapeHtml(fecha);
  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><title>Nueva llamada</title></head>
<body style="margin:0;padding:32px;background:#0E1012;font-family:Arial,sans-serif;">
  <table width="520" cellpadding="0" cellspacing="0" style="background:#111314;border:1px solid #252A2E;border-left:3px solid #7A0B24;">
    <tr><td style="padding:12px 24px;border-bottom:1px solid #252A2E;">
      <span style="font-family:'Courier New',monospace;font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:#C4405A;">
        // Nueva llamada agendada
      </span>
    </td></tr>
    <tr><td style="padding:24px;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding:8px 20px 8px 0;font-family:'Courier New',monospace;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:#7A7570;white-space:nowrap;vertical-align:top;">Nombre</td>
          <td style="padding:8px 0;font-size:14px;color:#E8E4DF;">${n}</td>
        </tr>
        <tr>
          <td style="padding:8px 20px 8px 0;font-family:'Courier New',monospace;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:#7A7570;white-space:nowrap;vertical-align:top;">Email</td>
          <td style="padding:8px 0;font-size:14px;"><a href="mailto:${e}" style="color:#C4405A;">${e}</a></td>
        </tr>
        <tr>
          <td style="padding:8px 20px 8px 0;font-family:'Courier New',monospace;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:#7A7570;white-space:nowrap;vertical-align:top;">Empresa</td>
          <td style="padding:8px 0;font-size:14px;color:#E8E4DF;">${emp}</td>
        </tr>
        <tr>
          <td style="padding:8px 20px 8px 0;font-family:'Courier New',monospace;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:#7A7570;white-space:nowrap;vertical-align:top;">Fecha</td>
          <td style="padding:8px 0;font-size:14px;color:#E8E4DF;">${f} &middot; COT</td>
        </tr>
        <tr>
          <td style="padding:8px 20px 8px 0;font-family:'Courier New',monospace;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:#7A7570;white-space:nowrap;vertical-align:top;">Motivo</td>
          <td style="padding:8px 0;font-size:14px;color:#A09A93;line-height:1.6;">${mot}</td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
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
  } catch (err) {
    console.error("[POST /api/book] n8n", err);
    return Response.json({ error: "Error de conexión" }, { status: 503 });
  }

  // Correos — si Resend falla, el evento ya fue creado en n8n
  const fecha = formatDate(date, time);
  try {
    await Promise.all([
      resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL!,
        to: email,
        subject: `Llamada confirmada — ${fecha}`,
        html: guestEmail(nombre, fecha),
      }),
      resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL!,
        to: process.env.BOOKING_NOTIFY_EMAIL!,
        subject: `Nueva llamada — ${nombre} (${empresa})`,
        html: hostEmail(nombre, email, empresa, motivo, fecha),
      }),
    ]);
  } catch (err) {
    console.error("[POST /api/book] resend", err);
  }

  return Response.json({ success: true });
}
