import { preferences_by_properties } from "~/api/preferences_by_properties";

const TOKEN = "";

void async function main () {
  const userApplications = await preferences_by_properties(TOKEN, "userApplications");
  const userInterface = await preferences_by_properties(TOKEN, "userInterface");
  const userShortWidgets = await preferences_by_properties(TOKEN, "userShortWidgets");
  const userWidgets = await preferences_by_properties(TOKEN, "userWidgets");

  console.log(userApplications);
  console.log("--");
  console.log(userInterface);
  console.log("--");
  console.log(userShortWidgets);
  console.log("--");
  console.log(userWidgets);
}();
