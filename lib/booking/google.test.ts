import { describe, expect, it } from "vitest";
import {
  GoogleConfigError,
  buildCreateEventRequest,
  requireGoogleEnv,
} from "./google";

describe("Google Calendar adapter", () => {
  it("Env Google incompleto → error explícito (el route debe 503, sin evento ni mail)", () => {
    expect(() => requireGoogleEnv({})).toThrow(GoogleConfigError);
    expect(() =>
      requireGoogleEnv({
        GOOGLE_OAUTH_CLIENT_ID: "id",
        GOOGLE_OAUTH_CLIENT_SECRET: "secret",
      }),
    ).toThrow(/incompleta/i);
  });

  it("createEvent pide conferenceData + attendee email", () => {
    const params = buildCreateEventRequest({
      start: new Date("2026-09-18T14:00:00.000Z"),
      end: new Date("2026-09-18T14:45:00.000Z"),
      attendeeEmail: "invitado@example.com",
      name: "Ana",
      notes: "Acme — demo",
    });

    expect(params.conferenceDataVersion).toBe(1);
    expect(params.requestBody.conferenceData?.createRequest).toEqual(
      expect.objectContaining({
        conferenceSolutionKey: { type: "hangoutsMeet" },
      }),
    );
    expect(params.requestBody.conferenceData?.createRequest?.requestId).toEqual(
      expect.any(String),
    );
    expect(params.requestBody.attendees).toEqual([
      { email: "invitado@example.com" },
    ]);
  });
});
