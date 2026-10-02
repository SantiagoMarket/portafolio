# Medición: 2026-09-23_profundidad-home

**Veredicto:** GO para prueba controlada (no GO de producción). Victor decide.

## Criterio (del plan)

1. `npx vitest run lib/design-contract.test.ts` en verde.
2. `npx vitest run` sin regresiones.
3. Juez debe declarar **roja** la home plana de `2026-09-23_diseno-home` (body `--color-bg-alt`, sin wrapper `bg-bg`, `--text-hero` mín. 2.5rem = `--text-figure`, secciones `py-16`).

## Cómo se reproduce

```bash
cd portafolio
npx vitest run lib/design-contract.test.ts
npx vitest run
```

Evidencia cruda:

- `evidencia/vitest-design-contract.txt`
- `evidencia/vitest-suite.txt`

## Resultados

| Corrida | Resultado |
|---|---|
| `lib/design-contract.test.ts` | 1 file, **12/12** passed |
| suite completa `npx vitest run` | 15 files, **78/78** passed |

### Hallazgos (dirección pedida)

| Caso | Turno / aserción | Resultado |
|---|---|---|
| Body en surface | `las secciones… no pintan su propio fondo` → `var(--color-surface)`, no `bg-alt` | verde |
| Hoja blanca única (Hero+Metrics) | `la apertura es una sola hoja blanca` → un solo `bg-bg`, sin shadow/rounded/border | verde |
| Hero > cifras | `el titulo del hero supera a las cifras` → clamp mín. 3rem > figure 2.5rem | verde |
| Relato con aire | `el relato se separa con aire…` → `py-24`, sin `py-16`, sin fondo propio | verde |

### Controles opuestos

| Control | Resultado |
|---|---|
| Secciones sin fondo propio (`bg-*` / `backgroundColor`) | verde |
| Sin `border-b` / `<hr` / dashed en secciones, Metrics, Entry, SectionHeading | verde |
| `page.tsx`: un solo `bg-bg`, sin rounded/shadow/border | verde |
| Orden Hero → Metrics → Hackathons | verde |
| Tres familias (Bebas / DM Sans / Space Mono), measure, mono en hero o nav | verde |
| Nav `border-b`; `.proj-row` `border-bottom` | verde |
| Hex de paleta una sola vez; cifras `grid-cols-1` + `sm:grid-cols-3` | verde |

### Control de juez vs ronda plana previa

Si el estado de `2026-09-23_diseno-home` se midiera con el test actual:

| Defecto plano previo | Qué falla hoy | ¿Juez daría verde? |
|---|---|---|
| `body` en `var(--color-bg-alt)` | exige `var(--color-surface)` y prohíbe `bg-alt` en body | **no** |
| sin wrapper `bg-bg` en `page.tsx` | exige exactamente 1 `bg-bg` | **no** |
| `--text-hero` mín. 2.5rem = `--text-figure` | exige mín. hero > figure | **no** |
| secciones en `py-16` | exige `py-24` y prohíbe `py-16` | **no** |

**¿El juez habría dado verde a la ronda plana anterior?** No. Control válido.

## Cercas (diff)

`git diff --stat` (working tree vs HEAD): solo home + UI compartida de home.

- Tocados: `app/globals.css`, `app/page.tsx`, `components/layout/Nav.tsx`, `components/sections/*` (home), `components/ui/{ButtonLink,Entry,ProjectRow,SectionHeading,TypedHeading}.tsx`, más untracked `lib/design-contract.test.ts` y notas.
- **No** tocados: agenda, `app/proyectos`, `app/meet`, `app/tarjeta`, `components/agenda`, ProjectLayout, Chip, copy/datos.

## Regresiones

Ninguna en la suite (78/78). Ninguna cerca rota en el diff de nombres.

## Integridad vs ronda previa

| | 2026-09-23_diseno-home (plana) | esta ronda |
|---|---|---|
| Body | `--color-bg-alt` / un solo tono | `--color-surface` |
| Apertura | sin hoja `bg-bg` | un wrapper `bg-bg` Hero+Metrics |
| Hero vs figure | empatan a 2.5rem | 3rem mín. > 2.5rem |
| Relato | `py-16` | `py-24` |
| Juez actual sobre ese estado | — | rojo (correcto) |
| design-contract | (ronda previa) | 12/12 |
| suite | — | 78/78 |

## Recomendación

**GO para prueba controlada** en http://localhost:4010. No es GO de producción. No deploy. No commit por el medidor.

**Siguiente acción:** Victor mira la home en el puerto 4010 (hoja blanca vs papel rehundido + título > cifras) y decide si cierra o pide otra ronda.
