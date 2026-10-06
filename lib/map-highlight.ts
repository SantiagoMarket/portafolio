/**
 * Qué línea del mapa está aislada. Pasar el ratón o el foco por una línea (o
 * por su entrada en la leyenda) la aísla y relanza su pulso; salir devuelve el
 * mapa completo.
 *
 * `pulseKey` sube en cada entrada para que el componente pueda reiniciar la
 * animación aunque se vuelva a la misma línea. `sending` se conserva al salir,
 * como en el diseño: el pulso termina su recorrido aunque el cursor se vaya.
 */
export type MapState = {
  active: string | null;
  sending: string | null;
  pulseKey: number;
};

export type MapAction = { type: "enter"; id: string } | { type: "leave" };

export const initialMapState: MapState = { active: null, sending: null, pulseKey: 0 };

export function createMapReducer(ids: readonly string[], reducedMotion: boolean) {
  return function reduce(state: MapState, action: MapAction): MapState {
    if (action.type === "leave") {
      return state.active === null ? state : { ...state, active: null };
    }
    // Un id que no es una línea (p. ej. un enlace de la leyenda mal cableado)
    // no debe apagar el resto del mapa.
    if (!ids.includes(action.id)) return state;
    if (reducedMotion) return { ...state, active: action.id };
    return { active: action.id, sending: action.id, pulseKey: state.pulseKey + 1 };
  };
}

export function isIsolating(state: MapState): boolean {
  return state.active !== null;
}
