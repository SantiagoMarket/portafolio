---
tipo: decision
area: [Rediseno]
estado: cerrado
version: v1
fecha_actualizacion: 2026-10-19
---

# Sección Videojuegos (Destello)

## Resumen

Sección `#videojuegos` entre Proyectos y Sobre mí, con Destello (HannaGames) como una fila más del plano de rutas. Modo de la skill `/diseno`: **refinamiento acotado**, preservando la identidad vigente (V7 en código: Big Shoulders Display + Overpass, un solo acento borgoña, radio 0, filas separadas por regla).

**Reading this as:** sección añadida a un portafolio de desarrollador para reclutadores que escanean, con el lenguaje "plano de rutas" ya existente, inclinada hacia reutilizar `.line-entry` y `.le-stack` sin piezas nuevas.

**Diales (taste):** VARIANCE 7, MOTION 5, DENSITY 4. Se igualan a los de V7 (redesign-preserve = match); la sección no añade movimiento.

**Locks:** Page Theme Lock (claro, como el resto de la home; el sitio no tiene tema oscuro), Color Consistency Lock (solo borgoña; el magenta del icono es arte del juego, no acento de UI), Shape Consistency Lock (radio 0; el icono es arte cuadrado a sangre, sin redondeo).

## Tabla de resolución

| Decisión | Regla | Skill |
|---|---|---|
| Fila en el flujo con regla superior, sin tarjeta ni sombra | §1 superficies: un ítem de lista no merece caja | propia |
| Reusar `.line-entry` (cabecera 5fr / cuerpo 7fr) y `.le-stack` para mecánicas | Refinamiento preserva; no inventar mundo nuevo | impeccable |
| Icono de 72px en el lugar del número de línea | §2 jerarquía: lo primero que se ve es el juego, luego título | propia |
| Icono con `next/image` 72x72 explícito, carga diferida | CLS < 0.1 (Core Web Vitals) | taste §14 |
| Sin eyebrow, sin numeración, sin bajada inventada bajo el h2 | Ban de kicker/eyebrow; no añadir copy sin pedirlo | impeccable craft-floor |
| Un solo enlace externo "Ver en HannaGames →", sin ficha interna | Brief; sin CTA duplicado | brief + taste §14 |
| "HannaGames · Puzle de luz · Android" con dos puntos medios | taste raciona a 1 por línea; gana el brief y el patrón `.sep` ya existente | brief (choque registrado) |
| Cero rayas largas/medias en el copy nuevo (cubierto por test) | Em-dash ban | taste §9.G |
| Nav de la home: `flex-wrap` + `nowrap` por enlace | Con 5 enlaces "Sobre mí" se partía en móvil (390px) | impeccable craft-floor (texto real en cada breakpoint) |

## Pre-Flight (taste §14, lo aplicable)

- [x] Design read declarado · [x] diales razonados · [x] modo refinamiento detectado
- [x] Cero `—`/`–` en lo nuevo · [x] Theme / Color / Shape locks
- [x] Sin eyebrow, sin numeración, sin puntos decorativos nuevos (los círculos de `.le-stack` son el sistema existente)
- [x] Cards omitidas · [x] imagen real (asset del juego) · [x] sin pills sobre imagen
- [x] CTA de una línea, contraste borgoña sobre papel heredado de `.ext`
- [x] Navegación en una línea en desktop; en móvil envuelve sin partir palabras
- [~] Dark mode: el sitio no tiene tema oscuro en código (la captura `--esquema dark` es idéntica a la clara); fuera de alcance
- N/A hero, bento, marquee, formularios, animaciones

## Verificación

- Tests: 20 archivos, 136 tests en verde (antes 19 / 130). `lib/games.test.ts` nuevo (6 tests). Contratos actualizados: orden de la home y lista de archivos de la home en `design-contract.test.ts` y `routes.test.ts`.
- `tsc --noEmit` y `next build` OK.
- Detector impeccable: 0 hallazgos en lo cambiado; 1 preexistente (`map.css`, `transition: width`).
- Capturas `capturar.py` desktop + móvil, claro y oscuro: sin overflow horizontal, sin errores de consola.

## Conexiones relacionadas

- [[V7-Combinada]], [[Criterio-de-Superficies]]

## Historial de cambios

- v1 (2026-10-19): sección creada.
