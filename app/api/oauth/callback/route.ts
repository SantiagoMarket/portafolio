import { type NextRequest } from "next/server";
import { google } from "googleapis";

const REDIRECT_URI = "https://www.soysantiago.com/api/oauth/callback";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const error = request.nextUrl.searchParams.get("error");

  if (error) {
    return new Response(`<h2>Error: ${error}</h2>`, {
      status: 400,
      headers: { "Content-Type": "text/html" },
    });
  }

  if (!code) {
    return new Response("<h2>No se recibió el código de Google.</h2>", {
      status: 400,
      headers: { "Content-Type": "text/html" },
    });
  }

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_OAUTH_CLIENT_ID,
    process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    REDIRECT_URI
  );

  try {
    const { tokens } = await oauth2Client.getToken(code);

    if (!tokens.refresh_token) {
      return new Response(
        `<html><body style="font-family:monospace;padding:2rem">
          <h2>⚠ No se generó refresh_token</h2>
          <p>Esto pasa cuando ya habías autorizado la app antes.</p>
          <p>Ve a <a href="https://myaccount.google.com/permissions">myaccount.google.com/permissions</a>, revoca el acceso a la app, y vuelve a visitar <a href="/api/oauth/start">/api/oauth/start</a>.</p>
        </body></html>`,
        { status: 400, headers: { "Content-Type": "text/html; charset=utf-8" } }
      );
    }

    return new Response(
      `<html><body style="font-family:monospace;padding:2rem;max-width:600px">
        <h2>✓ Refresh token obtenido</h2>
        <p>Copia este valor y agrégalo en Vercel como <strong>GOOGLE_OAUTH_REFRESH_TOKEN</strong> y en tu <code>.env.local</code>:</p>
        <textarea
          onclick="this.select()"
          style="width:100%;height:80px;font-family:monospace;font-size:12px;padding:8px"
          readonly
        >${tokens.refresh_token}</textarea>
        <p style="color:#888;font-size:13px">Cuando lo hayas guardado, avísale a Claude para que borre estas rutas del código.</p>
      </body></html>`,
      { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } }
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return new Response(`<h2>Error: ${msg}</h2>`, {
      status: 500,
      headers: { "Content-Type": "text/html" },
    });
  }
}
