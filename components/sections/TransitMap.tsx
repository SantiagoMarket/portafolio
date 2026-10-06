"use client";

import { useMemo, useReducer, type CSSProperties } from "react";
import useSignalRun from "@/hooks/useSignalRun";
import { createMapReducer, initialMapState, isIsolating } from "@/lib/map-highlight";
import { mapCaption } from "@/lib/site-copy";
import {
  lineLabel,
  mapLabels,
  mapLines,
  mapRoundels,
  mapStations,
  mapViewBox,
  stationRadius,
} from "@/lib/transit-map";

const lineIds = mapLines.map((l) => l.slug);

/**
 * El mapa del hero. Las líneas del SVG y la leyenda comparten un solo estado:
 * pasar por cualquiera de las dos aísla la misma línea. Cada línea enlaza a su
 * entrada en la lista de proyectos.
 */
export default function TransitMap() {
  const { run, reducedMotion } = useSignalRun();
  const reducer = useMemo(() => createMapReducer(lineIds, reducedMotion), [reducedMotion]);
  const [state, dispatch] = useReducer(reducer, initialMapState);

  const handlers = (slug: string) => ({
    onMouseEnter: () => dispatch({ type: "enter", id: slug }),
    onFocus: () => dispatch({ type: "enter", id: slug }),
    onMouseLeave: () => dispatch({ type: "leave" }),
    onBlur: () => dispatch({ type: "leave" }),
  });

  const figureClass = ["map", isIsolating(state) && "is-isolating", run && "run"]
    .filter(Boolean)
    .join(" ");

  return (
    <figure className={figureClass} id="map">
      <div className="map-pan" tabIndex={0} role="region" aria-label="Mapa de sistemas (desplazable)">
        <svg viewBox={mapViewBox} role="group" aria-labelledby="map-cap">
          {mapLines.map((line) => {
            const lineClass = [
              "line",
              state.active === line.slug && "is-on",
              state.sending === line.slug && "is-sending",
            ]
              .filter(Boolean)
              .join(" ");
            const lnClass = line.style === "plain" ? "ln" : `ln ln--${line.style}`;
            return (
              <a
                key={line.slug}
                className={lineClass}
                href={`#${line.slug}`}
                data-line={line.number}
                aria-label={lineLabel(line)}
                {...handlers(line.slug)}
              >
                <path className={lnClass} d={line.d} />
                {line.style === "cased" && <path className="case" d={line.d} />}
                {/* La key cambia en cada entrada: remontar el trazo reinicia el pulso. */}
                <path
                  key={state.sending === line.slug ? state.pulseKey : 0}
                  className="pulse"
                  pathLength={100}
                  style={{ "--d": `${line.delay}ms` } as CSSProperties}
                  d={line.d}
                />
              </a>
            );
          })}

          <g aria-hidden="true">
            {mapStations.map((s) => (
              <circle
                key={`${s.cx}-${s.cy}`}
                className={s.hub ? "hub" : "st"}
                cx={s.cx}
                cy={s.cy}
                r={stationRadius(s)}
              />
            ))}
            {mapLabels.map((l) => (
              <text
                key={l.text}
                className={l.hub ? "lbl lbl--hub" : "lbl"}
                x={l.x}
                y={l.y}
                textAnchor={l.anchor}
              >
                {l.text}
              </text>
            ))}
            {mapRoundels.map((r) => (
              <g key={r.number} className="rd">
                <circle cx={r.cx} cy={r.cy} r={12} />
                <text x={r.cx} y={r.cy + 1}>
                  {r.number}
                </text>
              </g>
            ))}
          </g>
        </svg>
      </div>
      <figcaption id="map-cap">{mapCaption}</figcaption>
      <ol className="legend" aria-label="Proyectos del mapa">
        {mapLines.map((line) => (
          <li key={line.slug}>
            <a
              href={`#${line.slug}`}
              data-line={line.number}
              className={state.active === line.slug ? "is-on" : undefined}
              {...handlers(line.slug)}
            >
              <span className="roundel">{line.number}</span>
              <svg className="swatch" viewBox="0 0 28 10" aria-hidden="true">
                {line.swatch.map((s, i) => (
                  <path
                    key={i}
                    className={`sw-${s.tone}`}
                    d={s.round ? "M4 5h22" : "M2 5h24"}
                    strokeWidth={s.width}
                    strokeDasharray={s.dash}
                    strokeLinecap={s.round ? "round" : undefined}
                  />
                ))}
              </svg>
              <span>{line.shortName}</span>
            </a>
          </li>
        ))}
      </ol>
    </figure>
  );
}
