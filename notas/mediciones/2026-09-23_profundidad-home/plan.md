# Plan: una hoja levantada, el resto en papel rehundido

**Criterio de fin:** `npx vitest run lib/design-contract.test.ts` en verde, y `npx vitest run` sin regresiones.
**Cercas:** las de `2026-09-23_diseno-home`. No commit, no deploy, no GO. No cambiar copy, datos, rutas, orden de secciones, agenda ni fichas. No tarjetas en proyectos. No familias nuevas. No volver a poner `border-b` por sección ni regla punteada. No pintar un fondo distinto en cada sección.
**Origen:** la home en el puerto 4010 se lee plana. La ronda anterior dejó un solo tono (`#FAFAF8`) en toda la página.

## Marcos

No se instala un paquete. Se toma el criterio y se descarta lo que choca con la dirección V1.

1. **Refactoring UI (Wathan / Schoger), profundidad.** Lo claro se siente más cerca; lo más cálido y oscuro, más lejos. La profundidad sale del tono, no de una sombra en cada bloque. Pocos niveles.
2. **Material 3, superficies tonales.** El rol de superficie no va atado a una sombra. Un contenedor contra el fondo de página; no un nivel nuevo por cada bloque. La elevación se reserva a lo que de verdad está delante (la barra).
3. **Tonal layering.** Hojas de papel apiladas, sin línea de 1px entre secciones. Se descarta su patrón de un contenedor por sección: eso vuelve a rayar la página.
4. **Separación de superficies, en este orden:** espacio, cambio de fondo, sombra, solape, borde al final. Aquí bastan el espacio y un solo cambio de fondo.
5. **Figura-fondo.** Una región es la figura (apertura). El relato de abajo es el fondo. Contraste de tono y de tamaño, no de cajas.
6. **Principio de superficies ya fijado.** Una zona con fondo solo si contiene algo manipulable o está fuera del flujo de lectura. La apertura tiene el título, las cifras y los botones. El CV no.

## Diagnóstico

El síntoma es “se ve plano”. La causa no es la falta de sombra ni de divisores. La ronda anterior igualó el fondo de todas las regiones, y el blanco `#FFFFFF` contra `#FAFAF8` casi no se distingue. Sin un escalón de tono, el título, las cifras y las secciones viven en el mismo plano.

## Defectos a cerrar

1. El `body` usa `--color-bg-alt` (`#FAFAF8`) → pasa a `--color-surface` (`#F5F2EF`), el papel más cálido, más lejos.
2. Hero y cifras no tienen un plano propio → en `app/page.tsx`, un solo wrapper `bg-bg` (`#FFFFFF`) a todo el ancho, sin `rounded`, sin `shadow`, sin `border`, alrededor de `<Hero />` y `<Metrics />` y de nada más. Hoja clara sobre papel oscuro: se siente levantada.
3. En móvil el título y las cifras empatan a 40px → el mínimo de `--text-hero` queda por encima de `--text-figure` (`clamp(3rem, 8vw, 5.25rem)` contra `2.5rem`).
4. Las secciones del relato siguen a `py-16` → `py-24` en hackathons, proyectos, sobre mí, experiencia, formación, stack y contacto. El grupo se separa por aire.

## Controles opuestos

| Caso | No debe romperse |
|---|---|
| Dar profundidad con una banda por sección | Los archivos de sección siguen sin `backgroundColor`, `bg-bg`, `bg-surface`, `bg-bg-alt`, `bg-burg` |
| Volver a los divisores | Sigue prohibido `border-b` / `<hr` / `border-dashed` en secciones, métricas, entradas y encabezados |
| Convertir la hoja en tarjeta | El wrapper no tiene `rounded`, `shadow` ni `border`. `page.tsx` tiene un solo `bg-bg` |
| Achicar el título para “calmar” | `--text-hero` sigue en `TypedHeading` y su mínimo en rem es mayor que `--text-figure` |
| Soltar la rampa o las familias | El contrato anterior sigue: tres familias, `measure`, mono en hero o nav, `border-b` en la nav, `border-bottom` en `.proj-row`, hex una vez, cifras `grid-cols-1` y `sm:grid-cols-3` |
| Reordenar | Hero, luego Metrics, luego Hackathons, en ese orden |

## Cómo se verifica

- Se actualiza `lib/design-contract.test.ts`. La aserción vieja de que el `body` usa `--color-bg-alt` se reemplaza: ahora el `body` usa `--color-surface`. El token `#FAFAF8` sigue definido una vez.
- Tests nuevos, con estos nombres:
  - `la apertura es una sola hoja blanca`
  - `el titulo del hero supera a las cifras`
  - `el relato se separa con aire y no con otro tono`
- Comando: `npx vitest run lib/design-contract.test.ts` y luego `npx vitest run`.
- Mirar en http://localhost:4010. Sin commit.
