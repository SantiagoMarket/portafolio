---
tipo: leccion
area: [Rediseno]
estado: cerrado
version: v1
fecha_actualizacion: 2026-10-02
---

# Criterio de Superficies

## Resumen

> Una superficie (tarjeta, panel, ficha, nodo) solo se justifica si contiene **algo manipulable** o **algo que está fuera del flujo de lectura**. Todo lo demás va en el flujo, separado con reglas y espacio, no con cajas.

Salió de la muerte de V2 (bento) y V4 (flow), que compartían causa raíz: multiplicaban superficies con el mismo peso visual.

## Evidencia en el portafolio

- **V2:** cada proyecto, métrica y bloque de texto en su propia ficha del mismo tamaño. Si todo pesa lo mismo, nada destaca.
- **V4:** decenas de nodos conectados compitiendo en la misma pantalla.
- **V1:** los cinco proyectos pasaron de cinco tarjetas a **filas con `border-bottom` y un `<details>`**. Misma información, sin multiplicar cajas.
- **V7:** radio 0, sin tarjetas y sin sombras. Los detalles de cada proyecto se abren con un `<details>` nativo ("Ver la ruta").

## Heurística

Más de ~3 superficies visibles a la vez que no cumplen el criterio = saturación. Se quitan cajas, no se rediseñan.

Fuente: `redesign/index.html` (nota "El criterio que salió de esto"); memoria `proyecto_rediseno_portafolio.md`; skill `/diseno` original (§1, §2, §5); `redesign/v7-combinada/DESIGN.md`.

## Conexiones relacionadas

- [[Direcciones-Descartadas]]
- [[V1-Terminal]]
- [[Causa-Estructural-vs-Sintoma]]

## Historial de cambios

- v1 (2026-10-02): nota creada.
