import {
  BUFFER_MINUTES,
  DURATION_MINUTES,
  SLOT_INTERVAL_MINUTES,
  WORK_END_MINUTES,
  WORK_START_MINUTES,
} from "./config";
import { addMinutes, cotWallToUtc, minutesToHm } from "./time";

export type BusyInterval = { start: Date; end: Date };

export function isWeekendCivil(civilDate: string): boolean {
  const noon = cotWallToUtc(civilDate, "12:00");
  const weekday = noon.getUTCDay();
  return weekday === 0 || weekday === 6;
}

export function candidateSlotStarts(): string[] {
  const lastStart = WORK_END_MINUTES - DURATION_MINUTES;
  const starts: string[] = [];
  for (
    let minutes = WORK_START_MINUTES;
    minutes <= lastStart;
    minutes += SLOT_INTERVAL_MINUTES
  ) {
    starts.push(minutesToHm(minutes));
  }
  return starts;
}

export function intervalsOverlap(
  aStart: Date,
  aEnd: Date,
  bStart: Date,
  bEnd: Date,
): boolean {
  return aStart < bEnd && aEnd > bStart;
}

export function slotWindow(
  civilDate: string,
  hm: string,
): { start: Date; end: Date } {
  const start = cotWallToUtc(civilDate, hm);
  const end = addMinutes(start, DURATION_MINUTES);
  return { start, end };
}

export function isSlotFree(
  civilDate: string,
  hm: string,
  busy: BusyInterval[],
): boolean {
  const { start, end } = slotWindow(civilDate, hm);
  return !busy.some((interval) =>
    intervalsOverlap(
      start,
      end,
      interval.start,
      addMinutes(interval.end, BUFFER_MINUTES),
    ),
  );
}

export function availableSlots(
  civilDate: string,
  busy: BusyInterval[],
): string[] {
  if (isWeekendCivil(civilDate)) return [];
  return candidateSlotStarts().filter((hm) => isSlotFree(civilDate, hm, busy));
}
