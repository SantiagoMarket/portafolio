---
tipo: indice
area: [General]
estado: cerrado
version: v1
fecha_actualizacion: 2026-10-02
---

# Portafolio — Índice

Vault de diseño del portafolio: identidad, producto, direcciones del rediseño (V1 a V7) y lecciones aprendidas. Es el conocimiento de diseño **específico de este proyecto**, que salió de la skill genérica `/diseno`. Solo guarda avance terminado. El esquema de nota está en este mismo archivo.

## Esquema de nota atómica

**Front-matter:**
```yaml
tipo: version          # identidad | version | decision | leccion | indice
area: [Rediseno]       # Identidad | Producto | Rediseno | General
estado: cerrado        # propuesto | en-discusion | en-proceso | cerrado | archivado
version: v1
fecha_actualizacion: 2026-10-02
```

**Valores de `estado`:**
- `propuesto`: existe como placeholder o idea inicial, sin contenido concreto
- `en-discusion`: hay contenido parcial pero la decisión no está tomada
- `en-proceso`: se está trabajando activamente
- `cerrado`: decisión tomada y documentada
- `archivado`: superado por una decisión posterior, conservado solo por trazabilidad (vive en `Archivo/`)

**Secciones por tipo:**
- Identidad → Resumen / Tablas / Conexiones relacionadas / Historial de cambios
- Versión → Resumen / Dirección y decisiones / Fuente / Conexiones relacionadas / Historial de cambios
- Decisión → Resumen / Tabla de resolución / Conexiones relacionadas / Historial de cambios
- Lección → Resumen / Evidencia en el portafolio / Conexiones relacionadas / Historial de cambios

Cada dato cita su archivo de origen (ruta relativa a `OneDrive/Portafolio/`).

## Estructura actual

- **Identidad/** (3 notas): [[Identidad-Visual]], [[Stack-de-Diseno]], [[Producto-y-Publico]]
- **Versiones/** (5 notas): [[Direcciones-Descartadas]], [[V5-Impeccable]], [[V6-Taste]], [[V7-Combinada]], [[Conflictos-Impeccable-vs-Taste]]
- **Lecciones/** (3 notas): [[Criterio-de-Superficies]], [[Escanear-no-Leer]], [[Causa-Estructural-vs-Sintoma]]
- **Archivo/** (1 nota): [[00-Archivo]], con [[V1-Terminal]]
- **mediciones/**: rondas de medición con plan, README y evidencia (ver tabla abajo)

## Estado de las direcciones del rediseño

| Versión | Estado | Puerto (`redesign/serve.js`) | Nota |
|---|---|---|---|
| V1 · Terminal | `archivado`, carpeta borrada el 2026-10-02 | (era 4001) | [[V1-Terminal]] |
| V2 · Bento | descartada, archivos borrados el 2026-09-02 | — | [[Direcciones-Descartadas]] |
| V3 · Editorial | descartada el 2026-09-02, archivos borrados | — | [[Direcciones-Descartadas]] |
| V4 · Flow | descartada, archivos borrados el 2026-09-02 | — | [[Direcciones-Descartadas]] |
| V5 · Impeccable | en pie | 4002 | [[V5-Impeccable]] |
| V6 · Taste | en pie | 4003 | [[V6-Taste]] |
| V7 · Combinada | **dirección vigente** | 4004 | [[V7-Combinada]] |

La bitácora del rediseño se sirve en el puerto 4000 (`redesign/index.html`). Se levanta todo con `node serve.js` desde `redesign/`.

## Mediciones

| Ronda | Tema |
|---|---|
| [[mediciones/2026-09-17_agendamiento-n8n-a-codigo/README\|2026-09-17 agendamiento n8n a código]] | Paso del agendamiento de n8n a código |
| [[mediciones/2026-09-17_typewriter-hero/README\|2026-09-17 typewriter hero]] | Efecto de tecleo del H1 del hero |
| [[mediciones/2026-09-23_diseno-home/README\|2026-09-23 diseño home]] | Contrato de diseño de la home |
| [[mediciones/2026-09-23_profundidad-home/README\|2026-09-23 profundidad home]] | Profundidad de la home |

## Historial de cambios

- v1 (2026-10-02): vault creado con 11 notas atómicas y el archivo de V1, a partir de la skill `/diseno` original, la memoria del proyecto, la bitácora `redesign/index.html` y los PROCESO/DESIGN/PRODUCT de V5, V6 y V7. Se enlaza la carpeta `mediciones/` existente.
