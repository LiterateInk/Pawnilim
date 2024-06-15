import { oauth2_authorize, oauth2_token, login_check, get_user_profile } from "../src";
import { credentials } from "./_credentials";

void async function main () {
  const code = await oauth2_authorize(credentials);
  const { access_token } = await oauth2_token(code);
  const { token } = await login_check(access_token);

  const profile = await get_user_profile(token, credentials.username);
  console.log(profile);
}();
