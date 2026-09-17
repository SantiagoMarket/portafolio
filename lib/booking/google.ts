import { randomUUID } from "node:crypto";
import { google } from "googleapis";
import { BOOKING_TIMEZONE, calendarIdFromEnv } from "./config";
import type { BusyInterval } from "./availability";

export class GoogleConfigError extends Error {
  constructor(message = "Configuración de Google incompleta") {
    super(message);
    this.name = "GoogleConfigError";
  }
}

export type GoogleEnv = {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
  calendarId: string;
};

export type CreateEventInput = {
  start: Date;
  end: Date;
  attendeeEmail: string;
  name: string;
  notes: string;
};

export type CreateEventRequest = {
  calendarId: string;
  conferenceDataVersion: 1;
  requestBody: {
    summary: string;
    description: string;
    start: { dateTime: string; timeZone: string };
    end: { dateTime: string; timeZone: string };
    attendees: { email: string }[];
    conferenceData: {
      createRequest: {
        requestId: string;
        conferenceSolutionKey: { type: "hangoutsMeet" };
      };
    };
  };
};

export type CalendarClient = {
  listBusy(timeMin: Date, timeMax: Date): Promise<BusyInterval[]>;
  createEvent(input: CreateEventInput): Promise<{ id: string }>;
};

export function requireGoogleEnv(
  env: NodeJS.Dict<string> = process.env,
): GoogleEnv {
  const clientId = env.GOOGLE_OAUTH_CLIENT_ID;
  const clientSecret = env.GOOGLE_OAUTH_CLIENT_SECRET;
  const refreshToken = env.GOOGLE_OAUTH_REFRESH_TOKEN;
  if (!clientId || !clientSecret || !refreshToken) {
    throw new GoogleConfigError();
  }
  return {
    clientId,
    clientSecret,
    refreshToken,
    calendarId: calendarIdFromEnv(env),
  };
}

export function buildCreateEventRequest(
  input: CreateEventInput,
  calendarId = calendarIdFromEnv(),
): CreateEventRequest {
  return {
    calendarId,
    conferenceDataVersion: 1,
    requestBody: {
      summary: `Llamada con ${input.name}`,
      description: input.notes,
      start: {
        dateTime: input.start.toISOString(),
        timeZone: BOOKING_TIMEZONE,
      },
      end: {
        dateTime: input.end.toISOString(),
        timeZone: BOOKING_TIMEZONE,
      },
      attendees: [{ email: input.attendeeEmail }],
      conferenceData: {
        createRequest: {
          requestId: randomUUID(),
          conferenceSolutionKey: { type: "hangoutsMeet" },
        },
      },
    },
  };
}

export function parseFreeBusy(
  busy: Array<{ start?: string | null; end?: string | null }> | undefined,
): BusyInterval[] {
  if (!busy) return [];
  const intervals: BusyInterval[] = [];
  for (const item of busy) {
    if (!item.start || !item.end) continue;
    intervals.push({ start: new Date(item.start), end: new Date(item.end) });
  }
  return intervals;
}

export function createGoogleCalendarClient(
  env: NodeJS.Dict<string> = process.env,
): CalendarClient {
  const cfg = requireGoogleEnv(env);
  const oauth2 = new google.auth.OAuth2(cfg.clientId, cfg.clientSecret);
  oauth2.setCredentials({ refresh_token: cfg.refreshToken });
  const calendar = google.calendar({ version: "v3", auth: oauth2 });

  return {
    async listBusy(timeMin, timeMax) {
      const res = await calendar.freebusy.query({
        requestBody: {
          timeMin: timeMin.toISOString(),
          timeMax: timeMax.toISOString(),
          timeZone: BOOKING_TIMEZONE,
          items: [{ id: cfg.calendarId }],
        },
      });
      return parseFreeBusy(res.data.calendars?.[cfg.calendarId]?.busy);
    },
    async createEvent(input) {
      const params = buildCreateEventRequest(input, cfg.calendarId);
      const res = await calendar.events.insert(params);
      return { id: res.data.id ?? "" };
    },
  };
}
