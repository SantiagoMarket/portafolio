---
tipo: leccion
area: [Rediseno]
estado: cerrado
version: v1
fecha_actualizacion: 2026-10-02
---

# Causa Estructural vs Síntoma

## Resumen

Antes de proponer un arreglo de diseño hay que preguntarse: **¿esto es la causa o es lo primero que vi?** Si el arreglo es cambiar una propiedad CSS y el problema es que la página "no funciona", casi siempre es un síntoma.

## Evidencia en el portafolio

Error cometido dos veces en este proyecto, y las dos veces lo corrigió el usuario:

| Versión | Diagnóstico equivocado (síntoma) | Causa real (estructura) |
|---|---|---|
| V2 · Bento | El gradiente | Multiplicación de superficies con el mismo peso |
| V4 · Flow | El scroll horizontal | Multiplicación de superficies (nodos) |

Cambiar el gradiente o el scroll no habría salvado a ninguna de las dos.

## Dónde buscar la causa

Cuántas superficies hay, qué jerarquía imponen y qué le exigen al visitante (leer, descubrir, desplazarse). V5 y V7 lo aplican con la regla de impeccable: "si una sombra difusa parece necesaria, el problema es de jerarquía".

Fuente: skill `/diseno` original (§6); memoria `proyecto_rediseno_portafolio.md` ("How to apply"); `redesign/v5-impeccable/DESIGN.md` (La Regla del Plano Impreso).

## Conexiones relacionadas

- [[Criterio-de-Superficies]]
- [[Direcciones-Descartadas]]

## Historial de cambios

- v1 (2026-10-02): nota creada.
