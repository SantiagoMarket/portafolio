---
tipo: version
area: [Rediseno]
estado: cerrado
version: v1
fecha_actualizacion: 2026-10-02
---

# V7 · Combinada (dirección vigente)

## Resumen

La dirección vigente del rediseño. Combina impeccable y taste-skill; cuando las dos chocan, gana la regla más estricta. Se sirve en el **puerto 4004** (`redesign/v7-combinada/`, entrada de `redesign/serve.js`). Conserva el contenido, las anclas y el borgoña; el look de terminal de V1 se usa como anti-referencia.

## Mundo visual: el plano de rutas

- La página **es** una línea de transporte. Un trazado borgoña nace en el primer viewport y recorre en horizontal la ruta real de un lead (WhatsApp, Webhook, Make, GoHighLevel, Etiqueta, Seguimiento). Luego dobla en una curva de 36px y baja por el margen izquierdo de toda la página.
- Cada sección es una estación; el contacto es la terminal, una barra donde la línea termina.
- Cada proyecto abre su propia ruta vertical ("Ver la ruta", `<details>` nativo) con estaciones reales. Prueba, no adjetivo.

## Decisiones clave

| Tema | Decisión |
|---|---|
| Tipografía | **Barlow Semi Condensed** 500/600 (display, letra de señalética) + **Barlow** 400/500/600 (cuerpo 17px, 1.6). Sin mono, sin itálicas, sin mayúsculas sostenidas. Numerales tabulares. |
| Escala | H1 de 3 a 4.5rem como máximo, en 2 líneas ("Systems / Integrator", la 2ª en borgoña) |
| Color | Un solo acento: borgoña `#7A0B24` (oscuro: `#C4405A`). Neutros con un leve tinte hacia el borgoña; sin crema, sin negro ni blanco puros. Un único campo `#F0D6DC` (oscuro `#2A1218`) en Proyecto propio. |
| Tema | Claro como composición principal (escena: reclutador de día); oscuro compuesto aparte y servido por `prefers-color-scheme`, forzable con `data-theme`. |
| Forma | **Radio 0** en todo; los únicos círculos son estaciones. Sin tarjetas, sin sombras. |
| Hero | H1 + frase de 16 palabras + 2 acciones ("Agenda una llamada" sólido, "Ver proyectos" texto). Sin franja de métricas, sin eyebrows, sin numeración 01/02. |
| Movimiento | Momento firmado: un vagón recorre la ruta del hero y enciende cada estación. Las estaciones de sección se llenan al llegar (IntersectionObserver, sin listener de scroll). Nada espacial con reduced-motion. |
| Copy | Cero rayas largas y medias; como máximo un punto medio por línea. |
| Diales taste | VARIANCE 7, MOTION 5, DENSITY 4 |

## Pendiente conocido

- Imágenes provisionales: Picsum en duotono para los dos hackathons y el retrato como hueco marcado. Hay que reemplazarlas por capturas reales.
- La revisión final fue en un solo contexto: no hubo finish reviewer ni critique dual.
- La acción de cierre apunta a `#`; en el sitio real es `/agenda`.

Fuente: `redesign/v7-combinada/DESIGN.md`; `redesign/v7-combinada/PROCESO.md` (§1 a §4, §8, §9); `redesign/v7-combinada/PRODUCT.md`.

## Conexiones relacionadas

- [[Conflictos-Impeccable-vs-Taste]]: cómo se resolvió cada choque entre las dos skills
- [[V5-Impeccable]] y [[V6-Taste]]: de dónde sale cada parte
- [[Identidad-Visual]] y [[Stack-de-Diseno]]
- [[Criterio-de-Superficies]]: V7 lo cumple sin una sola tarjeta

## Historial de cambios

- v1 (2026-10-02): nota creada a partir de DESIGN.md, PROCESO.md y PRODUCT.md de V7.
