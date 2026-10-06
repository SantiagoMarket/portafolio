"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

const readReducedMotion = () => window.matchMedia(REDUCED_MOTION).matches;

/**
 * El único momento animado del mapa: una señal recorre cada línea una vez,
 * cuando la tipografía ya cargó (si no, las etiquetas saltarían a mitad del
 * recorrido). Con `prefers-reduced-motion` no corre nunca.
 *
 * `reducedMotion` es `false` en el servidor (no hay ventana) y en el cliente
 * sigue a la preferencia del sistema, también si cambia con la página abierta.
 */
export default function useSignalRun() {
  const [run, setRun] = useState(false);
  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, readReducedMotion, () => false);

  useEffect(() => {
    if (reducedMotion) return;

    let cancelled = false;
    let frame = 0;
    const go = () => {
      if (cancelled) return;
      frame = requestAnimationFrame(() => setRun(true));
    };
    if (document.fonts?.ready) document.fonts.ready.then(go);
    else go();

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
  }, [reducedMotion]);

  return { run: run && !reducedMotion, reducedMotion };
}
