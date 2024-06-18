import { cas_login, get_subscribed_by_username, login_check, cas_oauth2_authorize, cas_oauth2_token } from "../src";
import { credentials } from "./_credentials";

void async function main () {
  const cas_token = await cas_login(credentials.username, credentials.password);
  const code = await cas_oauth2_authorize(cas_token);
  const { access_token } = await cas_oauth2_token(code);
  const { token } = await login_check(access_token);
  const subscribed = await get_subscribed_by_username(token);

  for (const item of subscribed) {
    console.log(`[${item.type}] ${item.name} (${item.id})`);
  }
}();
