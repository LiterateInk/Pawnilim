import { get_subscribed_by_username, login_check, oauth2_authorize, oauth2_token } from "../src";

const username = "";
const password = "";

void async function main () {
  const code = await oauth2_authorize({ username, password });
  const { access_token } = await oauth2_token(code);
  const { token } = await login_check(access_token);
  const subscribed = await get_subscribed_by_username(token);

  for (const item of subscribed) {
    console.log(`[${item.type}] ${item.name} (${item.id})`);
  }
}();
