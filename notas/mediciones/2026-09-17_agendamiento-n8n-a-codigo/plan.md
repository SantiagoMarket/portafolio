# Plan: migrar el link de agendamiento de n8n a código

**Criterio de fin:** `GET /api/slots?date=YYYY-MM-DD` y `POST /api/book` dejan de llamar a n8n; los huecos salen de Google Calendar en COT; una reserva crea evento + Meet y manda los dos correos de Resend. Comando: `npx vitest run lib/booking`. En local: elegir un día, ver horas, reservar un slot de prueba y ver el evento en Calendar. **No deploy. No GO.**
**Cercas:** no deploy; no secretos en git; no desactivar los workflows de n8n; no rediseñar `/agenda` ni `/meet`; no encender 30 min ni `DurationPicker`; no tocar Hero, métricas, typewriter, stack, fichas de proyecto ni copy de Contacto; no meter Supabase; Resend se queda; tests no crean eventos reales.
**Origen:** pedido de Victor, 17 sep 2026: migrar la automatización del link de agendamiento de n8n a full código.

## Qué hay hoy

El visitante agenda en `soysantiago.com/agenda` (y `/meet`). Next.js ya pinta el calendario, valida el formulario y manda los correos. **n8n solo hace Calendar:**

```
visitante → /agenda → GET /api/slots → n8n webhook slots → Google Calendar (busy)
visitante → form   → POST /api/book  → n8n webhook book  → Google Calendar (evento + Meet)
                                          ↘ Resend (invitado + host)  ← ya está en código
```

`googleapis` ya está en el `package.json`. `scripts/get-token.ts` ya existe. **OAuth en `.env.local` (17 sep, tarde):** `GOOGLE_OAUTH_CLIENT_ID`, `GOOGLE_OAUTH_CLIENT_SECRET`, `GOOGLE_OAUTH_REFRESH_TOKEN`, `GOOGLE_CALENDAR_ID=primary`. El secreto de junio se rotó. n8n quedó sin el secreto viejo. No pegar valores en git ni en notas.

Contrato actual hacia n8n (`app/api/book/route.ts`):

- `start_time` / `end_time` en ISO UTC, COT = UTC−5, duración fija 45 min
- `attendees`, `name`, `notes` = `empresa — motivo`, `status: "Lead"`
- slots: n8n devuelve `{ slots: { "YYYY-MM-DD": [{ startFormatted, available }] } }` (o un array con ese objeto); Next filtra `available` y manda `string[]` al picker

El front ya manda `duration` a las dos APIs. Las dos lo ignoran.

## Defectos a cerrar

1. `GET /api/slots` pega a `N8N_WEBHOOK_SLOTS_URL` → debe leer busy de Google y devolver horas libres del día pedido, en `HH:mm`, sin n8n.
2. `POST /api/book` pega a `N8N_WEBHOOK_BOOK_URL` → debe crear el evento en Calendar con Meet y el invitado; si el hueco ya no está, 409, no 200.
3. Un día COT no puede pedir slots con la fecha UTC: `CalendarPicker` usa `toISOString().split("T")[0]`. A partir de las 19:00 COT “hoy” se vuelve mañana.
4. Duración: el backend asume 45. El criterio de esta ronda es **45 min**, igual que `/agenda` y `/meet`.

## Controles opuestos (la otra dirección del umbral)

| Caso | No debe romperse |
|---|---|
| Fin de semana / pasado | el picker sigue sin dejar elegirlos; slots de un sábado = `[]`, no error |
| Día laboral lleno | `{ slots: [] }` con 200, no 503 |
| Google caído o env incompleto | 503, sin evento ni correo |
| Reserva ok y Resend falla | evento creado, `{ success: true }`, el fallo de mail se loguea (igual que hoy) |
| Payload inválido | 400, sin tocar Calendar |
| Dos POST al mismo hueco | el segundo no crea otro evento |
| Correos | mismos templates; no reescribir HTML salvo si Victor pide el link de Meet en el mail |
| `/agenda` y `/meet` | misma UX; dos rutas, un backend |

## Qué se toca y por qué

| Archivo | Por qué |
|---|---|
| `lib/booking/config.ts` (nuevo) | Horario, duración, timezone, calendar id: una sola puerta. Si vive en el route, el test no puede exigirlo. |
| `lib/booking/time.ts` (nuevo) | COT ↔ UTC. Hoy el `+5` está inline en `book/route.ts` y el picker usa UTC. |
| `lib/booking/availability.ts` (nuevo) | Candidatos − busy = huecos. Eso es n8n hoy; tiene que ser función pura. |
| `lib/booking/google.ts` (nuevo) | Cliente Calendar inyectable. Los tests no pegan a Google. |
| `lib/booking/*.test.ts` (nuevo) | Casos medidos: frases de arriba, las dos direcciones. |
| `app/api/slots/route.ts` | Saca n8n; pide un día; usa `availability`. |
| `app/api/book/route.ts` | Saca n8n; re-chequea free/busy; inserta con `conferenceData`; Resend igual. |
| `components/agenda/CalendarPicker.tsx` | Fecha civil COT, no UTC. Sin eso el backend correcto sirve el día equivocado. |

No se toca: Hero, Nav, proyectos, Contacto, `DurationPicker`, templates de mail (salvo decisión de Meet URL), `scripts/get-token.ts` (se corre, no se reescribe), workflows de n8n.

## Cómo se implementa (cuando Victor diga Ejecuta)

TDD. El principal no codea producción. Cada tanda: test rojo que nombra el caso → mínimo verde → medidor.

1. **Tanda A — reloj y huecos, sin Google.** Tests: 09:00 COT → `14:00Z`; 45 min; un busy 10:00–10:45 COT tumba ese slot y no el de 11:00; sábado → `[]`; 30 min no entra en esta ronda.
2. **Tanda B — adaptador Google mockeado.** `listBusy(day)` y `createEvent(...)` con conferenceData + attendee. Env faltante → error explícito, no crash.
3. **Tanda C — routes.** Slots y book dejan de leer `N8N_WEBHOOK_*`. Book: 409 si el hueco se ocupó. Suite `npx vitest run`.
4. **Tanda D — humo local (Victor).** Un slot real de prueba, evento + Meet + dos mails. El agente no declara GO. El deploy lo corre Victor.

## Cómo se verifica

- Tests focalizados que nombren los casos de arriba
- `npx vitest run lib/booking` y `npx vitest run`
- Ronda: `notas/mediciones/2026-09-17_agendamiento-n8n-a-codigo/`
- Humo: `/agenda` en local contra Calendar real, un evento de prueba
- Un juez que declarara verde “n8n sigue siendo el que crea el evento” tiene que fallar esta ronda

## Qué hace falta de Victor (bloquea o desambigua)

Sin esto se inventa el horario y se habla con el Calendar equivocado.

1. **OAuth de Google en `.env.local` y en Vercel** — hoy no está. Client ID, Client Secret, Refresh Token. El script es `npx tsx --env-file=.env.local scripts/get-token.ts`. Cuenta que espera el script: `santcubillos@gmail.com`.
2. **Reglas que hoy viven en n8n** (export del workflow o confirmar):
   - horario laboral (¿09:00–17:00 COT?)
   - buffer entre citas (¿0, 15?)
   - horizonte (¿14 días, 30?)
   - calendar id (`primary` u otro)
   - ¿Meet con `conferenceData` o n8n usa otro truco?
3. **¿n8n hace algo más que Calendar?** Sheet, Telegram, CRM, WhatsApp, recordatorio. Si sí, o se porta o se deja n8n solo para eso.
4. **Duración:** Contacto dice “30 o 45 min”; `/agenda` fija 45. Esta ronda congela 45. Si quieres las dos, es otra ronda.
5. **Meet en el mail de Resend** o solo en el invite de Calendar (hoy el HTML dice que llega en el invite; la pantalla de confirmación dice que llega en el correo).
6. **Cutover:** n8n se apaga **después** de GO, no en esta ronda.

Cuando esto esté, el siguiente turno es `Ejecuta` sobre este mismo plan.
