import { oauth2_authorize, oauth2_token, get_moodle_courses, login_check } from "../src";

const username = "";
const password = "";

void async function main () {
  const code = await oauth2_authorize({ username, password }, true);
  const { access_token } = await oauth2_token(code, true);
  const { token } = await login_check(access_token, true);
  const courses = await get_moodle_courses(token, true);
  console.log(courses);
}();
