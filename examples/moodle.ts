import { get_moodle_courses, login_check, oauth2_authorize, oauth2_token } from "../src";

const username = "";
const password = "";

void async function main () {
  const code = await oauth2_authorize({ username, password });
  const { access_token } = await oauth2_token(code);
  const { token } = await login_check(access_token);

  const courses = await get_moodle_courses(token, true);
  console.log(courses);
}();
