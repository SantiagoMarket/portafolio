import { NextRequest } from "next/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { CalendarClient } from "./google";
import { safeErrorMessage } from "./error-log";
import { getSlots } from "../../app/api/slots/route";
import { handleBook } from "../../app/api/book/route";

const SECRET = "1//0g-refresh-token-que-no-debe-salir";

/**
 * Así se ve un error de googleapis: el mensaje es inocuo, pero el objeto
 * arrastra la config de la petición con el refresh token dentro.
 */
function googleError() {
  return Object.assign(new Error("invalid_grant"), {
    config: { data: { refresh_token: SECRET, grant_type: "refresh_token" } },
    response: { data: { error: "invalid_grant" } },
  });
}

function failingCalendar(): CalendarClient {
  return {
    listBusy: vi.fn(async () => {
      throw googleError();
    }),
    createEvent: vi.fn(async () => ({ id: "evt-1" })),
  };
}

/** Todo lo que pasó por console.error, serializado como lo vería un log. */
function logged(spy: ReturnType<typeof vi.spyOn>) {
  return spy.mock.calls
    .flat()
    .map((arg: unknown) =>
      typeof arg === "string" ? arg : JSON.stringify(arg) ?? String(arg),
    )
    .join(" ");
}

describe("safeErrorMessage", () => {
  it("Error → solo su mensaje", () => {
    expect(safeErrorMessage(googleError())).toBe("invalid_grant");
  });

  it("Error sin mensaje → nombre del error", () => {
    expect(safeErrorMessage(new TypeError(""))).toBe("TypeError");
  });

  it("Algo que no es Error (objeto con secreto) → texto genérico, sin el objeto", () => {
    const msg = safeErrorMessage({ refresh_token: SECRET });
    expect(msg).toBe("error desconocido");
    expect(msg).not.toContain(SECRET);
  });
});

describe("los logs de las rutas no filtran el refresh token", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("GET /api/slots con Google fallando → 503 genérico y el token no aparece en el log", async () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    const res = await getSlots(
      new NextRequest("http://localhost/api/slots?date=2026-09-18"),
      failingCalendar(),
    );

    expect(res.status).toBe(503);
    const body = JSON.stringify(await res.json());
    expect(body).not.toContain(SECRET);
    expect(body).not.toContain("invalid_grant");
    expect(spy).toHaveBeenCalled();
    expect(logged(spy)).toContain("invalid_grant");
    expect(logged(spy)).not.toContain(SECRET);
  });

  it("POST /api/book con Google fallando → 503 genérico y el token no aparece en el log", async () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    const sendEmails = vi.fn();
    const res = await handleBook(
      new NextRequest("http://localhost/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: "Ana",
          email: "ana@example.com",
          empresa: "Acme",
          motivo: "Probar",
          date: "2026-09-18",
          time: "09:00",
        }),
      }),
      { calendar: failingCalendar(), sendEmails },
    );

    expect(res.status).toBe(503);
    expect(JSON.stringify(await res.json())).not.toContain(SECRET);
    expect(sendEmails).not.toHaveBeenCalled();
    expect(logged(spy)).not.toContain(SECRET);
  });

  it("POST /api/book con Resend fallando → éxito y el log no vuelca el objeto del error", async () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    const res = await handleBook(
      new NextRequest("http://localhost/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: "Ana",
          email: "ana@example.com",
          empresa: "Acme",
          motivo: "Probar",
          date: "2026-09-18",
          time: "09:00",
        }),
      }),
      {
        calendar: {
          listBusy: vi.fn(async () => []),
          createEvent: vi.fn(async () => ({ id: "evt-1" })),
        },
        sendEmails: vi.fn(async () => {
          throw Object.assign(new Error("resend down"), { apiKey: SECRET });
        }),
      },
    );

    expect(res.status).toBe(200);
    expect(logged(spy)).toContain("resend down");
    expect(logged(spy)).not.toContain(SECRET);
  });
});
