import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { NextRequest } from "next/server";
import { describe, expect, it, vi } from "vitest";
import { availableSlots, slotWindow } from "./availability";
import type { CalendarClient } from "./google";
import { getSlots } from "../../app/api/slots/route";

const FRIDAY = "2026-09-18";
const SATURDAY = "2026-09-19";

function slotsRequest(date: string) {
  return new NextRequest(`http://localhost/api/slots?date=${date}`);
}

function mockCalendar(
  overrides: Partial<CalendarClient> = {},
): CalendarClient {
  return {
    listBusy: vi.fn(async () => []),
    createEvent: vi.fn(async () => ({ id: "evt-1" })),
    ...overrides,
  };
}

describe("GET /api/slots", () => {
  it("Día laboral lleno → [] con éxito, no error", async () => {
    const candidates = availableSlots(FRIDAY, []);
    const busy = candidates.map((hm) => slotWindow(FRIDAY, hm));
    const calendar = mockCalendar({
      listBusy: vi.fn(async () => busy),
    });

    const res = await getSlots(slotsRequest(FRIDAY), calendar);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ slots: [] });
  });

  it("Sábado → slots []", async () => {
    const calendar = mockCalendar();
    const res = await getSlots(slotsRequest(SATURDAY), calendar);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ slots: [] });
    expect(calendar.createEvent).not.toHaveBeenCalled();
  });
});

describe("routes sin n8n", () => {
  it("GET /api/slots y POST /api/book NO leen N8N_WEBHOOK_SLOTS_URL ni N8N_WEBHOOK_BOOK_URL", () => {
    const slotsSrc = readFileSync(
      resolve("app/api/slots/route.ts"),
      "utf8",
    );
    const bookSrc = readFileSync(resolve("app/api/book/route.ts"), "utf8");
    expect(slotsSrc).not.toMatch(/N8N_WEBHOOK_SLOTS_URL/);
    expect(slotsSrc).not.toMatch(/N8N_WEBHOOK/);
    expect(bookSrc).not.toMatch(/N8N_WEBHOOK_BOOK_URL/);
    expect(bookSrc).not.toMatch(/N8N_WEBHOOK/);
  });
});
