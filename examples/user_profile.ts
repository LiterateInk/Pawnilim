import { cas_oauth2_authorize, cas_oauth2_token, login_check, get_user_profile, cas_login } from "../src";
import { credentials } from "./_credentials";

void async function main () {
  const cas_token = await cas_login(credentials.username, credentials.password);
  const code = await cas_oauth2_authorize(cas_token);
  const { access_token } = await cas_oauth2_token(code);
  const { token } = await login_check(access_token);

  const profile = await get_user_profile(token, credentials.username);
  console.log(profile);
}();
