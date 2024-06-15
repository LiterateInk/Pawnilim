import { oauth2_authorize, oauth2_token, login_check, get_user_profile } from "../src";

const username = "";
const password = "";

void async function main () {
  const code = await oauth2_authorize({ username, password });
  const { access_token } = await oauth2_token(code);
  const { token } = await login_check(access_token);

  const profile = await get_user_profile(token, username);
  console.log(profile);
}();
