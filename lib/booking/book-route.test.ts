import { NextRequest } from "next/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cotWallToUtc } from "./time";
import type { CalendarClient } from "./google";
import { getSlots } from "../../app/api/slots/route";
import { handleBook } from "../../app/api/book/route";

const FRIDAY = "2026-09-18";

const validBody = {
  nombre: "Ana Pérez",
  email: "ana@example.com",
  empresa: "Acme",
  motivo: "Quiero automatizar el agendamiento de citas",
  date: FRIDAY,
  time: "09:00",
};

function bookRequest(body: unknown) {
  return new NextRequest("http://localhost/api/book", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

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

const GOOGLE_KEYS = [
  "GOOGLE_OAUTH_CLIENT_ID",
  "GOOGLE_OAUTH_CLIENT_SECRET",
  "GOOGLE_OAUTH_REFRESH_TOKEN",
] as const;

describe("POST /api/book", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("Env Google incompleto → error explícito (el route debe 503, sin evento ni mail)", async () => {
    const saved: Record<string, string | undefined> = {};
    for (const key of GOOGLE_KEYS) {
      saved[key] = process.env[key];
      delete process.env[key];
    }
    const sendEmails = vi.fn();
    try {
      const slotsRes = await getSlots(slotsRequest(FRIDAY));
      expect(slotsRes.status).toBe(503);

      const bookRes = await handleBook(bookRequest(validBody), { sendEmails });
      expect(bookRes.status).toBe(503);
      expect(sendEmails).not.toHaveBeenCalled();
    } finally {
      for (const key of GOOGLE_KEYS) {
        if (saved[key] === undefined) delete process.env[key];
        else process.env[key] = saved[key];
      }
    }
  });

  it('Motivo "test" (4 caracteres) se agenda: sin mínimo 5 ni 10', async () => {
    const calendar = mockCalendar();
    const sendEmails = vi.fn();
    const res = await handleBook(
      bookRequest({ ...validBody, nombre: "test", empresa: "test", motivo: "test" }),
      { calendar, sendEmails },
    );
    expect(res.status).toBe(200);
    expect(calendar.createEvent).toHaveBeenCalledTimes(1);
  });

  it("Payload inválido de book → 400, sin Calendar", async () => {
    const calendar = mockCalendar();
    const sendEmails = vi.fn();
    const res = await handleBook(bookRequest({ nombre: "x" }), {
      calendar,
      sendEmails,
    });
    expect(res.status).toBe(400);
    expect(calendar.listBusy).not.toHaveBeenCalled();
    expect(calendar.createEvent).not.toHaveBeenCalled();
    expect(sendEmails).not.toHaveBeenCalled();
  });

  it("Book si el hueco ya está ocupado → 409, no segundo evento", async () => {
    const calendar = mockCalendar({
      listBusy: vi.fn(async () => [
        {
          start: cotWallToUtc(FRIDAY, "10:00"),
          end: cotWallToUtc(FRIDAY, "10:45"),
        },
      ]),
    });
    const sendEmails = vi.fn();
    const res = await handleBook(
      bookRequest({ ...validBody, time: "10:00" }),
      { calendar, sendEmails },
    );
    expect(res.status).toBe(409);
    expect(calendar.createEvent).not.toHaveBeenCalled();
    expect(sendEmails).not.toHaveBeenCalled();
  });

  it("Reserva ok y Resend falla: success true y evento ya creado", async () => {
    const calendar = mockCalendar();
    const sendEmails = vi.fn(async () => {
      throw new Error("resend down");
    });
    const res = await handleBook(bookRequest(validBody), {
      calendar,
      sendEmails,
    });
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ success: true });
    expect(calendar.createEvent).toHaveBeenCalledTimes(1);
  });
});
