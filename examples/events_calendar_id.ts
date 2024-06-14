import { get_events_by_calendar_id } from "~/api/get_events_by_calendar_id";

const CALENDAR_ID = "";
const TOKEN = "";

void async function () {
  const events = await get_events_by_calendar_id(TOKEN, {
    calendar_id: CALENDAR_ID,
    dstart: new Date("2024-05-27"),
    dend: new Date("2024-06-30")
  });

  console.log(events);
}();
