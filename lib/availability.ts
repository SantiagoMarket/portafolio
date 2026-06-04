// Horario base: lunes-viernes 9:00–18:00 hora Bogotá (UTC-5)
const WORK_START_HOUR = 9;
const WORK_END_HOUR = 18;
const BUFFER_MINUTES = 15;

function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function fromMinutes(totalMinutes: number): string {
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function overlaps(
  slotStart: number,
  slotEnd: number,
  busyStart: number,
  busyEnd: number
): boolean {
  return slotStart < busyEnd && slotEnd > busyStart;
}

export function computeAvailableSlots(
  date: string,
  durationMinutes: number,
  busyPeriods: Array<{ start: string; end: string }>
): string[] {
  // Convert busy periods to minute offsets from midnight Bogotá
  const busyRanges = busyPeriods.map((b) => {
    const startDate = new Date(b.start);
    const endDate = new Date(b.end);
    // Bogotá = UTC-5
    const startMin = (startDate.getUTCHours() - 5 + 24) % 24 * 60 + startDate.getUTCMinutes();
    const endMin = (endDate.getUTCHours() - 5 + 24) % 24 * 60 + endDate.getUTCMinutes();
    return { start: startMin, end: endMin };
  });

  const slots: string[] = [];
  const workStart = WORK_START_HOUR * 60;
  const workEnd = WORK_END_HOUR * 60;
  const step = durationMinutes + BUFFER_MINUTES;

  for (let slotStart = workStart; slotStart + durationMinutes <= workEnd; slotStart += step) {
    const slotEnd = slotStart + durationMinutes;
    const isFree = busyRanges.every(
      (busy) => !overlaps(slotStart, slotEnd, busy.start, busy.end)
    );
    if (isFree) slots.push(fromMinutes(slotStart));
  }

  return slots;
}

export function slotToISO(date: string, time: string, durationMinutes: number) {
  // date: YYYY-MM-DD, time: HH:MM, Bogotá = UTC-5
  const [h, m] = time.split(":").map(Number);
  const startUTC = new Date(`${date}T${String(h + 5).padStart(2, "0")}:${String(m).padStart(2, "0")}:00Z`);
  const endUTC = new Date(startUTC.getTime() + durationMinutes * 60 * 1000);
  return { start: startUTC.toISOString(), end: endUTC.toISOString() };
}
