/**
 * Estado derivado de la carga de horarios del calendario.
 *
 * Vive aquí y no dentro del componente por dos razones. La primera es que se
 * puede probar sin montar React. La segunda es la que motivó extraerlo: el
 * componente marcaba «cargando» con tres `setState` síncronos en el cuerpo de
 * un `useEffect`, lo que encadena renders y además dejaba una carrera abierta
 * —al cambiar de día rápido, la respuesta vieja podía pisar a la nueva.
 *
 * La solución es no guardar el estado de carga: se deduce de si la respuesta
 * que hay en memoria corresponde a la petición que se está mirando.
 */
export type SlotsResult = {
  /** Identifica la petición que produjo estos datos. */
  key: string;
  /** `null` es el fallo: la petición terminó y no trajo horarios utilizables. */
  slots: string[] | null;
};

export type SlotsView = {
  loading: boolean;
  error: boolean;
  slots: string[];
};

/**
 * La duración entra en la clave porque cambiarla con un día ya elegido debe
 * volver a pedir: los huecos de 30 y de 45 minutos no son los mismos.
 */
export function slotsRequestKey(
  date: string | null,
  duration: number,
): string | null {
  return date ? `${date}|${duration}` : null;
}

export function readSlots(
  result: SlotsResult | null,
  key: string | null,
): SlotsView {
  // Sin día elegido no hay nada que mostrar ni nada que esperar.
  if (key === null) {
    return { loading: false, error: false, slots: [] };
  }
  // La respuesta que hay es de otra petición: seguimos esperando la actual.
  if (result === null || result.key !== key) {
    return { loading: true, error: false, slots: [] };
  }
  if (result.slots === null) {
    return { loading: false, error: true, slots: [] };
  }
  return { loading: false, error: false, slots: result.slots };
}
