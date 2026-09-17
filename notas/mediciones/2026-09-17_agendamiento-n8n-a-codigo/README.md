# Agendamiento n8n → código

**Fecha:** 2026-09-17
**Set:** tests en `lib/booking/*.test.ts` + juez de source en `app/api/slots/route.ts` y `app/api/book/route.ts`
**Veredicto:** PARCIAL — criterio de tests cerrado; falta humo local (tanda D). No es GO.

## Qué se midió

GET `/api/slots` y POST `/api/book` dejan de llamar n8n; huecos en COT; reserva con conferenceData+attendee; correos Resend siguen en código. Las dos direcciones: n8n ausente vs controles (templates, DurationPicker apagado, Hero/Contacto, tests sin Google/Resend reales).

## Qué dio

- Juez n8n: las dos routes actuales **no** contienen `N8N_WEBHOOK` ni `fetch(`; HEAD sí pegaba a n8n. Un juez que declarara verde “n8n sigue creando el evento” falla esta ronda.
- `npx vitest run lib/booking`: 6 files / 16 tests passed.
- `npx vitest run`: 13 files / 64 tests passed.
- Humo contra Calendar real: **no se corrió** (tanda D de Victor).

## Cómo se repite

Desde `portafolio/`:

```
npx vitest run lib/booking
npx vitest run
Select-String -Path app/api/slots/route.ts,app/api/book/route.ts -Pattern "N8N_WEBHOOK|n8n"
```

Salidas crudas: `evidencia/vitest-booking.txt`, `evidencia/vitest-all.txt`, `evidencia/routes-n8n.txt`.

## Integridad

| Medición | Ronda anterior (plan, HEAD) | Ésta |
|---|---|---|
| n8n en `slots` + `book` | SÍ: `N8N_WEBHOOK_SLOTS_URL` / `N8N_WEBHOOK_BOOK_URL` + `fetch` | NO: cero matches |
| Tests `lib/booking` | no existían | 16/16 passed |
| Suite completa | n/a (no corrida de esta ronda) | 64/64 passed |
| Criterio que se cerraba | n8n crea el evento | n8n ausente en routes; Calendar mockeado crea evento |
| Control opuesto | n/a | templates mail siguen; DurationPicker no importado; Hero/Contacto sin diff; tests con mock, no red |

El juez `expect(src).not.toMatch(/N8N_WEBHOOK/)` marcaría **roja** la ronda HEAD (sí tenía n8n) y **verde** ésta. Sirve.

## Hallazgos

- 🟢 Routes `app/api/slots/route.ts` y `app/api/book/route.ts`: sin `N8N_WEBHOOK`, sin `fetch` a n8n (`evidencia/routes-n8n.txt`).
- 🟢 `09:00 COT → 14:00Z` — `lib/booking/time.test.ts`
- 🟢 busy `10:00` tumba `10:00` no `11:00` — `lib/booking/availability.test.ts`
- 🟢 sábado `[]` — availability + GET `/api/slots`
- 🟢 `409` si ocupado — `lib/booking/book-route.test.ts`
- 🟢 env incompleto `503` — google + book-route (slots y book)
- 🟢 payload inválido `400` — book-route
- 🟢 conferenceData + attendee — `lib/booking/google.test.ts`
- 🟢 fecha civil COT vs `toISOString` UTC — time.test + CalendarPicker.test; picker usa `civilDateInBogota`, no `toISOString()`
- 🟢 Resend falla → `{ success: true }` y evento ya creado — book-route
- 🟢 Día laboral lleno → `{ slots: [] }` 200, no 503
- 🔴 Humo local Calendar real + Meet + dos mails: no medido (tanda D). El criterio de negocio del plan pide ver el evento en Calendar; eso no está cerrado.

## Regresiones (lado que no se miraba)

Ninguna medida en git:

- `components/sections/Hero.tsx` y `components/sections/Contact.tsx`: diff vacío vs HEAD.
- `DurationPicker`: archivo existe, **cero imports** en `app/` ni `components/`; `/agenda` y `/meet` siguen con `duration={45}`.
- Templates `guestEmail` / `hostEmail` siguen en `app/api/book/route.ts` (Meet en el invite de Calendar, no reescrito).
- Tests de booking inyectan `CalendarClient` y `sendEmails`; no importan `Resend` ni pegan a `googleapis` de red.
- Suite completa 64/64: los 48 tests de fuera de `lib/booking` siguen verdes.

## Alcance

Esta ronda **no** crea eventos reales, **no** manda mails reales, **no** apaga workflows de n8n, **no** despliega, **no** es GO. `.env.local` tiene nombres `GOOGLE_OAUTH_*`, `GOOGLE_CALENDAR_ID` y Resend (valores no copiados aquí). Falta que Victor abra `/agenda` en local, reserve un slot de prueba y confirme evento + Meet + dos correos.
