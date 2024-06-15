import { DEV_ENDPOINT, PROD_ENDPOINT } from "~/utils/constants";

interface Subscribed {
  /**
   * @example
   * "calendar:Default:SOME-UUID-HERE" // when it's a calendar
   */
  id: string
  name: string
  type: "agenda"
}

/**
 * Get calendars and todo lists by username.
 *
 * GET /api/agenda_widget/subscribed
 *
 * Located at `src/Controller/AgendaWidgetController.php` in the `getSubscribed` method.
 *
 * Requires to be authenticated with granted `ROLE_USER`.
 *
 * Requests O365 if email not containing "etu".
 * Requests BlueMind otherwise.
 */
export const get_subscribed_by_username = async (token: string, useDevEndpoint = false) => {
  const response = await fetch(`${useDevEndpoint ? DEV_ENDPOINT : PROD_ENDPOINT}/api/agenda_widget/subscribed`, {
    method: "GET",
    headers: { "Authorization": "Bearer " + token }
  });

  const json = await response.json() as Subscribed[] | { code: number, message: string };
  if ("code" in json) {
    throw new Error(json.message);
  }

  return json;
};
