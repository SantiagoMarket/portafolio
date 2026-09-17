# Plan: typewriter del H1 SYSTEMS / INTEGRATOR

**Criterio de fin:** al cargar `/`, el H1 visible teclea `SYSTEMS` y luego `INTEGRATOR` carácter a carácter; al terminar coincide con `roleTitleLines`. Comando: `npx vitest run lib/typewriter.test.ts`. En browser: al entrar a `/` se ve el tipeo; con `prefers-reduced-motion: reduce` el título completo aparece de golpe.
**Cercas:** no deploy; no secretos; no cambiar título, copy, métricas, proyectos, `./ver-proyectos`, LinkedIn ni el resto del Hero; no migrar de Next/Tailwind; no animar whoami, badges ni botones; `roleTitleLines` sigue siendo la fuente del texto.
**Origen:** pedido de Victor, 17 sep 2026: animación de tecleo al ingresar a la página.

## Defectos a cerrar
1. Al entrar, el H1 no teclea → debe ir revelando `SYSTEMS` y en la segunda línea `INTEGRATOR`.
2. El texto animado no sale de `roleTitleLines` → un cambio de título no deja la animación con un string suelto.
3. `prefers-reduced-motion: reduce` → título completo desde el primer frame, sin tipeo.

## Controles opuestos (la otra dirección del umbral)
| Caso | No debe romperse |
|---|---|
| Lector de pantalla / SEO | el H1 accesible dice `SYSTEMS INTEGRATOR` desde el inicio, no un título a medias |
| Fin de la animación | el texto visible es exactamente las dos líneas, con borgoña sólo en `INTEGRATOR` |
| Caret | sigue al último carácter tipeado; no se pega de forma que se lea una letra de más (`INTEGRATORI`) |

## Cómo se verifica
- Tests focalizados que nombren `SYSTEMS`, `INTEGRATOR` y reduced-motion
- `npx vitest run`
- Ronda: `notas/mediciones/2026-09-17_typewriter-hero/`
- Comando que reproduce: `npx vitest run lib/typewriter.test.ts`
- Browser: cargar `/` y ver el tipeo; no declarar GO
