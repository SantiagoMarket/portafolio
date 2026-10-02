---
tipo: identidad
area: [Identidad]
estado: cerrado
version: v1
fecha_actualizacion: 2026-10-02
---

# Stack de Diseño

## Resumen

El sitio sigue en **Next.js 16 + Tailwind v4**. El problema del portafolio es de diseño, no de framework, así que no se migra: se cambia solo la capa visual.

## Decisión por opción

| Opción | Veredicto | Por qué |
|---|---|---|
| Next.js 16 (actual) | Se queda | `/agenda` usa Google Calendar, Resend y API routes: necesita servidor. Migrar obliga a reescribir el booking. |
| Astro 5 | Descartado | Cero JS y buen Lighthouse, pero el booking dejaría de ser trivial. Migrar cuesta más de lo que gana. |
| Tailwind v4 | Se queda | Ya instalado; los tokens viven en `@theme`. |
| shadcn/ui | Solo si hace falta | Útil para tabs, dialog o accordion; innecesario si la dirección es puro layout. |
| Motion (ex Framer Motion) | No | Aportaba sobre todo a V4, ya descartada. |

Fuente: `redesign/index.html`, sección "Frameworks — qué conviene para este sitio"; skill `/diseno` original ("No migrar de framework por un problema de diseño").

## Maquetas del rediseño

V5, V6 y V7 son páginas HTML estáticas con CSS y JS inline, Google Fonts por `<link>` y sin build. Lo fijó el encargo de la comparativa, no una preferencia de stack. Los iconos de V6 y V7 son Phosphor por CDN (cdn.jsdelivr.net). Las rutas `/agenda` y las fichas de proyecto existen solo en la app Next; en las maquetas apuntan a anclas, `mailto` o `#`.

Fuente: `redesign/v5-impeccable/PRODUCT.md` (Stack); `redesign/v7-combinada/PRODUCT.md` (Stack); `redesign/v6-taste/PROCESO.md` (Adaptaciones de stack).

## Conexiones relacionadas

- [[Identidad-Visual]]: los tokens que viven en este stack
- [[V7-Combinada]]: la dirección que habría que portar a Next + Tailwind

## Historial de cambios

- v1 (2026-10-02): nota creada a partir de la bitácora del rediseño y los PRODUCT.md.
