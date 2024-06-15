import { get_events_by_calendar_id, login_check, oauth2_authorize, oauth2_token } from "../src";

const username = "";
const password = "";

const CALENDAR_ID = "";

void async function main () {
  const code = await oauth2_authorize({ username, password });
  const { access_token } = await oauth2_token(code);
  const { token } = await login_check(access_token);

  const events = await get_events_by_calendar_id(token, {
    calendar_id: CALENDAR_ID,
    dstart: new Date("2024-05-27"),
    dend: new Date("2024-06-30")
  });

  console.log(events);
}();
