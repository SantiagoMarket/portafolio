/**
 * Script de una sola vez para obtener el refresh token de OAuth2.
 * Corre con: npx tsx --env-file=.env.local scripts/get-token.ts
 */
import { google } from "googleapis";
import * as http from "http";

const CLIENT_ID = process.env.GOOGLE_OAUTH_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_OAUTH_CLIENT_SECRET;

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error("Faltan GOOGLE_OAUTH_CLIENT_ID o GOOGLE_OAUTH_CLIENT_SECRET en .env.local");
  process.exit(1);
}

const PORT = 4321;
const REDIRECT_URI = `http://localhost:${PORT}`;

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const authUrl = oauth2Client.generateAuthUrl({
  access_type: "offline",
  scope: ["https://www.googleapis.com/auth/calendar"],
  prompt: "consent",
});

console.log("\n=== Generador de refresh token OAuth2 ===\n");
console.log("1. Abre este link en tu browser:\n");
console.log("   " + authUrl);
console.log("\n2. Autoriza con tu cuenta de Google (santcubillos@gmail.com)");
console.log("3. El refresh token aparecerá aquí automáticamente...\n");

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url!, `http://localhost:${PORT}`);
  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");

  if (error) {
    res.writeHead(400, { "Content-Type": "text/html; charset=utf-8" });
    res.end(`<h2>Error: ${error}</h2>`);
    server.close();
    console.error("Error en la autorización:", error);
    return;
  }

  if (!code) {
    res.writeHead(400);
    res.end("No se recibió el código.");
    return;
  }

  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end("<h2>✓ Autorizado. Puedes cerrar esta pestaña y volver a la terminal.</h2>");
  server.close();

  try {
    const { tokens } = await oauth2Client.getToken(code);

    if (!tokens.refresh_token) {
      console.error("No se generó refresh_token. Revoca el acceso en myaccount.google.com/permissions y vuelve a correr el script.");
      process.exit(1);
    }

    console.log("✓ Refresh token obtenido:\n");
    console.log("──────────────────────────────────────────");
    console.log(`GOOGLE_OAUTH_REFRESH_TOKEN=${tokens.refresh_token}`);
    console.log("──────────────────────────────────────────");
    console.log("\nPasos siguientes:");
    console.log("  1. Agrégalo a tu .env.local");
    console.log("  2. Agrégalo a Vercel como GOOGLE_OAUTH_REFRESH_TOKEN");
  } catch (err) {
    console.error("Error al obtener el token:", err);
  }
});

server.listen(PORT, () => {
  console.log(`Esperando callback en http://localhost:${PORT}...`);
});
