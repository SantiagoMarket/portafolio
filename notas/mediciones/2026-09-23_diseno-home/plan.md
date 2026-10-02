# Plan: estandarizar tipo, ritmo y figura-fondo de la home

**Criterio de fin:** `npx vitest run lib/design-contract.test.ts` en verde, y la suite `npx vitest run` sin regresiones.
**Cercas:** no commit, no deploy, no GO. No cambiar copy, datos de proyectos, métricas, rutas, agenda, booking, secretos ni el orden de secciones. No convertir filas en tarjetas. No agregar ni quitar familias tipográficas. No migrar de Next.js ni de Tailwind. No rediseñar `app/proyectos/**`, `app/agenda/**`, `app/meet/**`, `app/tarjeta/**` ni los componentes de agenda; heredan el `body` y los alias de color.
**Origen:** revisión de la home (23 sep 2026). Dirección viva: V1 terminal, papel cálido y borgoña.

## Marcos que se aplican

No se instala un framework nuevo. Se usan estos criterios para decidir la estructura:

1. **Figura-fondo (Gestalt).** El ojo elige una figura y el resto tiene que retroceder. Hoy cada sección, cada entrada y cada métrica lleva regla, así que las líneas son figura y el papel desaparece.
2. **Proximidad (Gestalt) y Refactoring UI.** Lo que va junto se agrupa con espacio. Una línea solo si separa un control (nav fijo, fila que se abre) y no un párrafo.
3. **Tipografía práctica (Butterick) y escala cerrada.** Una medida (66ch), un interlineado de lectura (1.6), una rampa corta. Tres oficios, no tres voces en cada bloque.
4. **Every Layout (Stack).** Una cáscara de sección: mismo ancho, mismo padding, prosa en la misma medida. Sin márgenes negativos.
5. **Tokens en una sola capa de primitivos (Curtis / DTCG).** El hex vive una vez en `@theme`. `:root` solo alias `var(--color-*)` para el código que esta ronda no toca. La home usa utilidades de Tailwind, no `style={{ color: "var(--text-3)" }}`.

## Diagnóstico (causa, no síntoma)

La home ya tiene las tres familias de la identidad (Bebas Neue, DM Sans, Space Mono) y aun así se lee despareja: el `body` es Space Mono a 14px, la prosa salta a DM Sans en 15, 16 y 17px, los títulos mezclan Bebas a 22, 36, 44px y un clamp de 38–110px, y la meta usa 10, 11 y 13px. Encima, casi todo bloque cierra con `border-b`, el encabezado agrega una regla punteada, las métricas suman reglas verticales y las entradas del CV abren con otra línea. El síntoma es “muchos divisores” y “texto mal maquetado”. La causa es que la separación está dibujada, no espaciada, y que no hay rampa: cada bloque inventa su tamaño.

Jerarquía que tiene que quedar visible, en este orden: título del hero, cifras, títulos de sección. El resto es lectura o meta.

## Defectos a cerrar

1. Tamaños sueltos (`text-[11px]`, `text-[15px]`, `text-[17px]`, `text-[22px]`, `text-[44px]`, clamp en px, `text-xs` / `text-sm` / `text-4xl` en la home) → solo la rampa `text-meta` (12px, Space Mono), `text-body` (16px, DM Sans), `text-title` (18px, DM Sans), `text-section` (Bebas, títulos de sección), `text-figure` (Bebas, cifras), `text-hero` (Bebas, solo el h1).
2. El `body` está en Space Mono → el cuerpo por defecto es DM Sans 16px / 1.6. Mono queda en el prompt, la nav, las notas y las etiquetas.
3. Prosa con medidas distintas (54ch, 62ch, 64ch, 72ch) y `-mt-3.5` → una clase `measure` de 66ch, sin margen negativo.
4. Cada sección de la home lleva `border-b`; el encabezado lleva `<hr>` punteado; métricas llevan `border-r` y `border-b`; entradas, stack y contacto llevan regla por ítem → esas reglas salen. Quedan dos líneas: la de la nav (control fijo) y `border-bottom` de `.proj-row` (la fila se abre).
5. Fondos alternos por sección (`--bg`, `--bg-alt`, `--surface`) rayan la página → un solo fondo de página `#FAFAF8` en el `body`. Las secciones de la home no pintan fondo. Los tokens de color se conservan.
6. El mismo hex está en `@theme` y otra vez en `:root` → cada hex de la paleta aparece una sola vez, en `@theme`. `:root` referencia `var(--color-*)`.
7. Las tres cifras en `grid-cols-3` se aplastan en móvil → `grid-cols-1` y `sm:grid-cols-3`, sin reglas.

## Controles opuestos (la otra dirección del umbral)

| Caso | No debe romperse |
|---|---|
| Quitar familias para “simplificar” | `globals.css` sigue declarando Bebas Neue, DM Sans y Space Mono, y ninguna cuarta (Inter, Geist, etc.) |
| Quitar todo el mono | El prompt del hero o la nav sigue en `font-mono` |
| Quitar Bebas junto con los tamaños sueltos | `TypedHeading` sigue en `font-display` y `text-hero`; las cifras siguen en `font-display` y `text-figure` |
| Quitar todas las líneas, también las de control | La nav conserva `border-b`. `.proj-row` conserva un solo `border-bottom` |
| Unificar fondos borrando la paleta | `#FAFAF8`, `#FFFFFF`, `#F5F2EF`, `#7A0B24` y `#111314` siguen definidos una vez |
| Apilar métricas también en desktop | Desde `sm` siguen en tres columnas |
| Arreglar la home reescribiendo agenda o fichas | Esos archivos no entran en el diff de esta ronda |

## Cómo se verifica

- Test nuevo: `lib/design-contract.test.ts`. Lee el fuente de la home y falla con el nombre del defecto. Primero rojo, después el mínimo verde.
- Archivos que el test vigila: `app/globals.css`, `app/page.tsx`, `components/layout/Nav.tsx`, `components/ui/TypedHeading.tsx`, `components/ui/SectionHeading.tsx`, `components/ui/Entry.tsx`, `components/ui/ProjectRow.tsx`, `components/ui/ButtonLink.tsx`, `components/sections/Hero.tsx`, `Metrics.tsx`, `Hackathons.tsx`, `Projects.tsx`, `About.tsx`, `Experience.tsx`, `Education.tsx`, `Stack.tsx`, `Contact.tsx`.
- Suite: `npx vitest run`
- Comando del criterio: `npx vitest run lib/design-contract.test.ts`
- Servidor local para mirar la home, sin commit: `npx next dev --port 4010`
