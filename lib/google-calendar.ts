import { google } from "googleapis";

function getCalendarClient() {
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_CLIENT_EMAIL,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });

  return google.calendar({ version: "v3", auth });
}

const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID!;

export async function getFreeBusy(
  dateStart: string,
  dateEnd: string
): Promise<Array<{ start: string; end: string }>> {
  const calendar = getCalendarClient();

  const res = await calendar.freebusy.query({
    requestBody: {
      timeMin: dateStart,
      timeMax: dateEnd,
      items: [{ id: CALENDAR_ID }],
    },
  });

  const busy = res.data.calendars?.[CALENDAR_ID]?.busy ?? [];
  return busy.filter(
    (b): b is { start: string; end: string } =>
      typeof b.start === "string" && typeof b.end === "string"
  );
}

export async function createEvent(params: {
  title: string;
  start: string;
  end: string;
  guestEmail: string;
  guestName: string;
  description: string;
}): Promise<{ eventId: string; meetLink: string }> {
  const calendar = getCalendarClient();

  const res = await calendar.events.insert({
    calendarId: CALENDAR_ID,
    requestBody: {
      summary: params.title,
      description: params.description,
      start: { dateTime: params.start, timeZone: "America/Bogota" },
      end: { dateTime: params.end, timeZone: "America/Bogota" },
    },
  });

  const eventId = res.data.id!;
  const eventLink = res.data.htmlLink ?? "";

  return { eventId, meetLink: eventLink };
}
