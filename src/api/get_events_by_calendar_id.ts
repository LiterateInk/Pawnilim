import { DEV_ENDPOINT, PROD_ENDPOINT } from "~/utils/constants";

interface Event {
  /** Same calendarID provided in request parameters. */
  calendarId: string

  title: string

  /**
   * @example
   * "2024-01-23" // if allDay is true
   * "2024-05-28T14:00:00.000+02:00" // if allDay is false
   */
  startDate: string

  /**
   * @example
   * "2024-01-23" // if allDay is true
   * "2024-05-28T14:00:00.000+02:00" // if allDay is false
   */
  endDate: string

  allDay: boolean
  location: string | null
  exDate: string
  description: string | null
  organizer: string | null
  url: string | null

  /**
   * Empty string if no recurrence.
   * @example "FREQ=WEEKLY;BYDAY=TU,FR"
   */
  rRule: string

  /**
   * In webmail or other.
   * @example "https://webmail.unilim.fr/cal/index.html#?date=20240527"
   */
  link: string
}

/**
 * Get events by calendar ID.
 *
 * GET /api/agenda_widget/events/
 *
 * Located at `src/Controller/AgendaWidgetController.php` in the `getEvents` method.
 *
 * Requires to be authenticated with granted `ROLE_USER`.
 */
export const get_events_by_calendar_id = async (token: string, data: {
  calendar_id: string,
  dstart: Date,
  dend: Date
}, useDevEndpoint = false) => {
  // Should be in "YYYY-MM-DD" format.
  const start = data.dstart.toISOString().split("T")[0];
  const end = data.dend.toISOString().split("T")[0];

  const response = await fetch(`${useDevEndpoint ? DEV_ENDPOINT : PROD_ENDPOINT}/api/agenda_widget/events/?calendars_id[0]=${data.calendar_id}&dend=${end}&dstart=${start}`, {
    method: "GET",
    headers: { "Authorization": "Bearer " + token }
  });


  const json = await response.json() as Event[] | { code: number, message: string };
  if ("code" in json) {
    throw new Error(json.message);
  }

  return json;
};
