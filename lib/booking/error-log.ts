/**
 * Lo único que se loguea de un error. Los errores de googleapis arrastran la
 * config de la petición (con el refresh token); volcar el objeto entero lo deja
 * en texto plano en los logs de Vercel. El mensaje basta para diagnosticar.
 */
export function safeErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message || err.name;
  return "error desconocido";
}
