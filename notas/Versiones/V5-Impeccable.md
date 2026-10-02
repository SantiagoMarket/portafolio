---
tipo: version
area: [Rediseno]
estado: cerrado
version: v1
fecha_actualizacion: 2026-10-02
---

# V5 · Impeccable

## Resumen

Rediseño hecho siguiendo la metodología de la skill impeccable en modo *Experience*: el trabajo lidera desde el primer viewport. Se sirve en el **puerto 4002** (`redesign/v5-impeccable/`, entrada de `redesign/serve.js`).

## Dirección: "El Plano de la Red"

- El portafolio es el plano esquemático de una red de transporte (Beck, Vignelli, TransMilenio): cada proyecto es una línea numerada, cada herramienta una estación, y las herramientas compartidas son transbordos. El mecanismo es verdadero con los datos: los transbordos son las herramientas que de verdad se repiten entre proyectos.
- Retador fusionado: la rotulación de las busetas bogotanas. Dona el compromiso total de color y los titulares condensados en mayúsculas.
- El borgoña deja de ser acento: es **campo** en cabecera y contacto. El contenido se lee sobre papel blanco frío `#F8F7F8` con tinta `#1A1418`.
- Tipografía: **Big Shoulders Display 800** (solo titulares y números de línea) + **Overpass** (todo lo que se lee como frase).
- Rejilla asimétrica 5fr + 7fr. Sistema plano: sin sombras proyectadas.
- Las líneas se distinguen por trazo (continuo, doble, discontinuo, punteado), nunca por un segundo color.
- Un solo gesto de movimiento, "la señal": un pulso blanco recorre las líneas al cargar y al aislar una. Nada con `prefers-reduced-motion`.

## Rechazos explícitos

Hero centrado sobre una rejilla de tarjetas iguales; estética de terminal; franja de cifras en el hero; eyebrow sobre el H1.

## Resultado de la revisión

Critique 21/28 (Nielsen), "authored, not interchangeable". El veredicto final quedó en `fix`, con dos regresiones menores abiertas: el mapa móvil cortado y las líneas 1/2 y 3/4, que solo difieren en tono.

Fuente: `redesign/v5-impeccable/DESIGN.md`; `redesign/v5-impeccable/PROCESO.md` (Direction contract, Qué regla decidió qué, Finish review); `redesign/serve.js`.

## Conexiones relacionadas

- [[V7-Combinada]]: hereda el mundo del plano de rutas
- [[V6-Taste]]: la otra skill de la comparativa
- [[Conflictos-Impeccable-vs-Taste]]: dónde chocan las reglas de impeccable con taste

## Historial de cambios

- v1 (2026-10-02): nota creada a partir de DESIGN.md, PROCESO.md y PRODUCT.md de V5.
