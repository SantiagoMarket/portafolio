# Medición 2026-09-23 — diseño home

**Veredicto:** GO para prueba controlada  
(No es GO de producción. Victor decide deploy/GO.)

## Qué se midió

Criterio del `plan.md`:

1. `npx vitest run lib/design-contract.test.ts` en verde (9 tests).
2. `npx vitest run` sin regresiones.
3. Controles opuestos (tres familias, mono en hero/nav, display+hero/figure, border-b Nav, border-bottom `.proj-row`, paleta 1×, `sm:grid-cols-3`).
4. Cercas: sin tocar agenda, `app/proyectos`, `app/meet`, `app/tarjeta`, `components/agenda`, ProjectLayout, Chip, copy/datos.
5. Control de juez: el test actual debe marcar **roja** la ronda de partida (HEAD con Space Mono en body, `border-b` en secciones, hex duplicado).

## Comando exacto que reproduce

```bash
cd portafolio
npx vitest run lib/design-contract.test.ts
npx vitest run
```

Salidas crudas: `evidencia/vitest-design-contract.txt`, `evidencia/vitest-suite.txt`.

Control de juez vs partida (sin mutar working tree):

```powershell
# body HEAD → Space Mono (falla not.toMatch(/Space Mono/))
git show HEAD:app/globals.css | Select-String -Pattern 'body\s*\{' -Context 0,6

# hex HEAD → count 2 por color (falla toBe(1))
# border-b HEAD en Hero/About/Contact/Metrics (falla not.toContain("border-b"))
```

## Integridad

| Métrica | Partida (HEAD / ROJO) | Esta ronda |
|---|---|---|
| `design-contract.test.ts` | N/A al inicio; implementador: 8 failed \| 1 passed → luego verde | **9 passed / 9** |
| Suite `npx vitest run` | — | **75 passed / 75** (15 files) |
| Body tipografía | Space Mono 14px | DM Sans / `var(--font-sans)` 1rem / 1.6 |
| Hex paleta (#FAFAF8…#111314) | 2× cada uno | 1× cada uno |
| Secciones con `border-b` | Sí (Hero, About, Contact, Metrics, …) | No en secciones vigiladas |
| Controles (Nav `border-b`, `.proj-row` `border-bottom`) | — | Presentes |
| Métricas grid | `grid-cols-3` sin `grid-cols-1` | `grid-cols-1` + `sm:grid-cols-3` |
| Diff en cercas (agenda/proyectos/meet/tarjeta/agenda components) | — | **vacío** |
| ¿Juez daría verde a la partida? | Debe ser **no** | **no** (body Space Mono, border-b secciones, hex×2 fallan) |

## Hallazgos (caso → color)

| # | Caso | Resultado |
|---|---|---|
| 1 | Home sin tamaños sueltos (`text-[…]`, `text-xs`…`text-4xl`) | verde |
| 2 | Prosa con `measure`, sin `-mt-` | verde |
| 3 | Secciones sin reglas (`border-b/t/r`, `<hr`, dashed) | verde |
| 4 | Dos líneas de control: Nav `border-b` + `.proj-row { border-bottom }` | verde |
| 5 | Cuerpo DM Sans; mono en Hero o Nav; TypedHeading `font-display`+`text-hero`; Metrics `font-display`+`text-figure` | verde |
| 6 | Tres familias (Bebas, DM Sans, Space Mono); sin Inter/Geist (case-sensitive) | verde |
| 7 | Cada hex de paleta una sola vez; `:root` solo `var(--color-*)` | verde |
| 8 | Cifras `grid-cols-1` + `sm:grid-cols-3` | verde |
| 9 | Secciones sin fondo propio; body usa `--color-bg-alt` / `#FAFAF8` 1× | verde |
| C1 | Partida: body Space Mono | rojo (control juez) |
| C2 | Partida: `border-b` en secciones | rojo (control juez) |
| C3 | Partida: hex duplicado en `@theme`+`:root` | rojo (control juez) |

## Regresiones (lado no mirado / umbral opuesto)

Ninguna medida en esta corrida:

- Tres familias siguen; no aparece cuarta (`Inter`/`Geist` case-sensitive ausentes; el hit case-insensitive de PowerShell era `pointer`).
- `font-mono` sigue en Hero y Nav.
- Bebas no se fue: TypedHeading `font-display`+`text-hero`; Metrics `font-display`+`text-figure`.
- Líneas de control intactas (Nav + `.proj-row`).
- Paleta presente una vez.
- Desde `sm`, métricas en tres columnas.
- Suite completa 75/75; sin fallos fuera del contrato.

## Alcance / cercas

Diff de producción tocado (16 files): `app/globals.css`, Nav, secciones home (About/Contact/Education/Experience/Hackathons/Hero/Metrics/Projects/Stack), ButtonLink/Entry/ProjectRow/SectionHeading/TypedHeading.

**Fuera del diff (cercas OK):** `app/agenda/**`, `app/proyectos/**`, `app/meet/**`, `app/tarjeta/**`, `components/agenda/**`, ProjectLayout, Chip, copy/datos.

Nuevos (no producción de producto): `lib/design-contract.test.ts`, `notas/mediciones/2026-09-23_diseno-home/**`.

Sin commit. Sin deploy.

## Recomendación

**GO para prueba controlada** — criterio del plan verde, cercas cumplidas, controles opuestos verdes, juez no blanquearía la partida.

**Siguiente acción (una):** abrir la home en `npx next dev --port 4010` y revisar visualmente jerarquía (hero → cifras → títulos de sección) antes de que Victor decida GO.
