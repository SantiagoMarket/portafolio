---
tipo: version
area: [Rediseno]
estado: cerrado
version: v1
fecha_actualizacion: 2026-10-02
---

# V6 · Taste

## Resumen

Rediseño hecho con taste-skill v2 (más redesign-skill como consulta) en modo **Overhaul**: lenguaje visual nuevo, mismo contenido, mismo orden de secciones y mismas anclas. Se sirve en el **puerto 4003** (`redesign/v6-taste/`, entrada de `redesign/serve.js`).

## Dirección

- "Tailwind-modern" escrito como CSS nativo con tokens; paleta **zinc** fría más la familia borgoña como único acento.
- Tipografía: **Geist + Geist Mono**. Sin serif, sin Inter.
- Tema automático claro/oscuro por `prefers-color-scheme`.
- Hero asimétrico 7fr/5fr con imagen y como máximo 4 elementos de texto.
- Shape lock: contenedores e imágenes a 14px; todo lo interactivo en píldora.
- Hackathons como bento de 2 celdas; los 4 proyectos de cliente en tabs; stack en 6 grupos.
- Movimiento "Fluid CSS": entrada escalonada del hero, reveal con IntersectionObserver y transición entre tabs. Nada con reduced-motion.

## Diales

| Dial | Valor |
|---|---|
| DESIGN_VARIANCE | 6 |
| MOTION_INTENSITY | 5 |
| VISUAL_DENSITY | 4 |

## Qué retiró del sitio anterior

El motivo terminal (`$ whoami`, `exit 0`, cursor), el punto decorativo de la nav, la franja de ubicación en el hero, las rayas largas en el copy y las etiquetas en mayúsculas.

## Deuda

Las imágenes son de Picsum en escala de grises, sin relación con los proyectos. Faltan las reales: retrato o captura de un flujo, y capturas de los proyectos.

Fuente: `redesign/v6-taste/PROCESO.md` (Reading this as, Diales, Reglas que decidieron cosas, Supuestos); `redesign/serve.js`.

## Conexiones relacionadas

- [[V5-Impeccable]]: la otra skill de la comparativa
- [[V7-Combinada]]: toma de V6 los diales y las reglas del hero
- [[Conflictos-Impeccable-vs-Taste]]

## Historial de cambios

- v1 (2026-10-02): nota creada a partir del PROCESO.md de V6.
