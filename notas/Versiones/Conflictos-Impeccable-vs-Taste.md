---
tipo: decision
area: [Rediseno]
estado: cerrado
version: v1
fecha_actualizacion: 2026-10-02
---

# Conflictos Impeccable vs Taste

## Resumen

Choques entre las reglas de impeccable y las de taste-skill, y cómo los resolvió [[V7-Combinada]]. Criterio general: **gana la regla más estricta**, salvo cuando el brief del usuario o la marca fijan otra cosa.

## Tabla de resolución

| # | Choque | Impeccable | Taste | Resolución en V7 |
|---|---|---|---|---|
| 1 | Eyebrows | Prohibidos siempre | Máximo 1 cada 3 secciones | Cero |
| 2 | Hero partido | El split hero es plantilla | Fuerza split o asimetría si VARIANCE > 4 | Ni centrado ni split: texto arriba a la izquierda y la ruta a todo el ancho debajo |
| 3 | Reveal al hacer scroll | Prohibido el mismo fade por sección; contenido visible por defecto | MOTION > 4 exige reveal | Se revela el **estado** de la estación, no el contenido; un solo momento firmado |
| 4 | Tamaño de display | Máximo 6rem | 4.5rem solo con 3 a 5 palabras | 4.5rem |
| 5 | Imágenes | Real o nada; lo sintético se etiqueta | Mínimo 2 o 3; Picsum antes que huecos | 2 Picsum en duotono con leyenda "Imagen provisional" y retrato como hueco marcado |
| 6 | Leyendas bajo imagen | Etiquetar lo sintético | Prohibidas las decorativas | Leyenda funcional, fuera de la imagen |
| 7 | SVG y diagramas | Medio de primera | SVG decorativo hecho a mano desaconsejado | El trazado es CSS que organiza contenido real; cero ilustración |
| 8 | Claro/oscuro | Elegir por escena | Ambos obligatorios | Claro como principal; oscuro compuesto por `prefers-color-scheme` |
| 9 | Google Fonts | Servir desde el proyecto | Nunca `<link>` en producción | Gana el brief: `<link>`, documentado como excepción |
| 10 | Color a escala de página | Campos que poseen regiones | Theme Lock: sin secciones invertidas | Un único campo tintado de la misma familia |
| 11 | Rojo de marca | "Acento rojo" es un look saturado de IA | Ban de `#9a2436` (oxblood) | Se conserva el borgoña: la marca gana en ambas |
| 12 | Sombras | Elevación con offset y blur | Sombras tintadas | Ninguna; el menú lleva un borde de 2px |
| 13 | Stack | Sin preferencia | React/Next + Tailwind + Motion | Gana el brief: HTML estático |

Fuente: `redesign/v7-combinada/PROCESO.md`, §5 "Choques y resolución (gana la más estricta)".

## Choques previos en V6 (taste-skill v2 vs redesign-skill)

Serif en headers, grain contra el flat design, "no reescribir desde cero" y variar el radio: en los cuatro gana taste-skill v2 (sin serif, sin grain, Overhaul greenfield, Shape Lock). Fuente: `redesign/v6-taste/PROCESO.md`, Choques 3.

## Conexiones relacionadas

- [[V5-Impeccable]]
- [[V6-Taste]]
- [[Identidad-Visual]]: el choque 11 en detalle

## Historial de cambios

- v1 (2026-10-02): nota creada a partir del PROCESO.md de V7 (§5) y de V6.
