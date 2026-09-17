import { BOOKING_TIMEZONE } from "./config";

/** COT es UTC−5 sin DST. 09:00 COT = 14:00Z. */
export function cotWallToUtc(civilDate: string, hm: string): Date {
  const [year, month, day] = civilDate.split("-").map(Number);
  const [hour, minute] = hm.split(":").map(Number);
  return new Date(Date.UTC(year, month - 1, day, hour + 5, minute, 0, 0));
}

export function addMinutes(instant: Date, minutes: number): Date {
  return new Date(instant.getTime() + minutes * 60 * 1000);
}

export function civilDateInTimeZone(instant: Date, timeZone: string): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(instant);
  const value = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value;
  return `${value("year")}-${value("month")}-${value("day")}`;
}

export function civilDateInBogota(instant: Date): string {
  return civilDateInTimeZone(instant, BOOKING_TIMEZONE);
}

export function cotDayBounds(civilDate: string): { start: Date; end: Date } {
  const start = cotWallToUtc(civilDate, "00:00");
  const end = addMinutes(start, 24 * 60);
  return { start, end };
}

export function minutesToHm(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}
