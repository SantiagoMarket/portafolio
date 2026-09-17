export const BOOKING_TIMEZONE = "America/Bogota";
export const DURATION_MINUTES = 45;
export const WORK_START_MINUTES = 9 * 60;
export const WORK_END_MINUTES = 17 * 60;
export const SLOT_INTERVAL_MINUTES = 60;
export const BUFFER_MINUTES = 0;
export const DEFAULT_CALENDAR_ID = "primary";

export function calendarIdFromEnv(
  env: NodeJS.Dict<string> = process.env,
): string {
  return env.GOOGLE_CALENDAR_ID || DEFAULT_CALENDAR_ID;
}
