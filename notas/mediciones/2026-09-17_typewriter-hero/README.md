# Ronda 2026-09-17_typewriter-hero

Primera ronda. No hay medición previa en `notas/mediciones/` para comparar números; la línea base es HEAD (`04d8ce4`) sin `lib/typewriter.ts`.

## Qué se midió

Criterio de fin del plan: al cargar `/`, el H1 visible teclea `SYSTEMS` y luego `INTEGRATOR` carácter a carácter; al terminar coincide con `roleTitleLines`.

Controles opuestos del plan: H1 accesible completo desde el inicio; borgoña sólo en `INTEGRATOR`; caret que no se lea como letra extra (`INTEGRATORI`); `prefers-reduced-motion: reduce` → título de golpe; cercas `./ver-proyectos` / badges / LinkedIn.

## Veredicto contra el criterio

**PARCIAL.** El criterio de fin (tipeo + coincidencia con `roleTitleLines` + comando de tests) **cumple**. El control opuesto del caret visual **no cumple**: en `shot-reduced.png` se lee `INTEGRATORI`. Ese rojo **no bloquea** el criterio principal (el texto y el `aria-label` terminan en `SYSTEMS` / `INTEGRATOR`, no en `INTEGRATORI`).

No GO. No deploy.

## Comando que reproduce

```bash
npx vitest run lib/typewriter.test.ts
```

Suite completa (regresiones):

```bash
npx vitest run
```

Browser (dev en `http://localhost:3005`):

```bash
node notas/mediciones/2026-09-17_typewriter-hero/evidencia/capture-typewriter.mjs
```

Salida cruda: `evidencia/vitest-typewriter.txt`, `evidencia/vitest-all.txt`, `evidencia/browser-samples.json`, `evidencia/unique-frames.txt`.

## Juez (esta ronda es la primera)

Un juez que declararía verde la ronda anterior (HEAD sin typewriter) **no sirve**. Este juez marca roja esa línea base porque:

- `lib/typewriter.test.ts` **no existía**. Los 5 `it(...)` nombran las frases `SYSTEMS` e `INTEGRATOR` y hacen `import { typewriterFrame } from "./typewriter"`.
- Si se revierte `lib/typewriter.ts`, ese import revienta y `npx vitest run lib/typewriter.test.ts` no pasa.
- En HEAD el Hero pintaba las dos líneas de golpe (`roleTitleLines[0]` + `roleTitleLines[1]`), sin frames intermedios.

## Corridas

| Corrida | Resultado |
|---|---|
| `npx vitest run lib/typewriter.test.ts` (sesión) | 1 file, 5 tests, pass, 545 ms |
| `npx vitest run lib/typewriter.test.ts` (archivo) | 1 file, 5 tests, pass, 509 ms — `evidencia/vitest-typewriter.txt` |
| `npx vitest run` | 6 files, 45 tests, pass, 491–928 ms — `evidencia/vitest-all.txt` |

Helper determinista: dos corridas del mismo set, no un modelo. Browser: una captura CDP con 18 frames únicos de tipeo.

## Hallazgos

| Caso | Estado | Evidencia |
|---|---|---|
| Tipeo `SYSTEMS` luego `INTEGRATOR` char a char | 🟢 | `unique-frames.txt` t=971…2170; no es solo el estado final |
| Al terminar coincide con `roleTitleLines` | 🟢 | frame t=2170 `SYSTEMS\nINTEGRATOR`; tests 5/5 |
| H1 accesible `SYSTEMS INTEGRATOR` desde el inicio | 🟢 | SSR `aria-label="SYSTEMS INTEGRATOR"` en `ssr-h1.txt`; todos los samples del browser |
| Borgoña sólo en `INTEGRATOR` | 🟢 | `burgText` vacío mientras corre línea 1; `shot-end.png` SYSTEMS negro / INTEGRATOR borgoña |
| Caret no se lee como letra extra (`INTEGRATORI`) | 🔴 visual / 🟢 DOM | DOM: `innerText` final sin I extra; caret `aria-hidden` vacío. Visual: `shot-reduced.png` se lee `INTEGRATORI`. `shot-end.png` pilló el blink apagado. |
| `reducedMotion: true` → título completo de golpe | 🟢 helper | test que nombra `SYSTEMS` e `INTEGRATOR` con `reducedMotion: true` |
| Browser `prefers-reduced-motion: reduce` | 🟢 tipeo / ⚠️ flash | 2 unique frames: vacío → completo a t=242; **sin** S/SY/SYS. Flash vacío de hidratación (~242 ms) antes del useEffect |
| Cerca `./ver-proyectos` | 🟢 | Hero.tsx L48; visible en `shot-end.png`. Diff de Hero sólo reemplazó el H1 por `TypedHeading` |
| Cerca badges / LinkedIn | 🟢 | copy intacto en Hero.tsx |

## Tabla de integridad (HEAD vs esta ronda)

| Control | HEAD (sin typewriter) | Esta ronda |
|---|---|---|
| `lib/typewriter.ts` + tests que nombran `SYSTEMS`/`INTEGRATOR` | no existían → juez rojo | 5/5 |
| `npx vitest run` | n/a esta ronda | 45/45, sin archivos extra en rojo |
| H1 teclea | no: título estático completo | 18 frames char a char |
| `aria-label` desde t=0 | H1 sin aria-label (texto visible completo) | `SYSTEMS INTEGRATOR` desde SSR |
| Caret `INTEGRATORI` | caret ya iba después de INTEGRATOR | 🔴 visual en reduced; DOM sin letra extra |
| `./ver-proyectos` | presente | presente |

## Regresiones (lado que no se estaba mirando)

Ninguna en Vitest (45/45). CTA, badges y LinkedIn no se tocaron. whoami sigue estático. El caret visual `INTEGRATORI` **ya era posible en HEAD** (mismo `.caret` de 11px borgoña pegado al título); esta ronda lo deja medido en rojo, no lo introduce como regresión nueva del copy.

## Recomendación

**PARCIAL.** Criterio de fin verde. Caret visual rojo; no bloquea el tipeo.

**Una siguiente acción:** si Victor quiere cerrar el control `INTEGRATORI`, el implementador tiene que hacer que el caret no se lea como letra (evidencia: `evidencia/shot-reduced.png`); el medidor no lo arregla.
