import { cas_login, cas_oauth2_authorize, cas_oauth2_token, cas_oauth2_userinfo } from "../src";
import { credentials } from "./_credentials";

void async function main () {
  const cas_token = await cas_login(credentials.username, credentials.password);
  const code = await cas_oauth2_authorize(cas_token);
  const { access_token } = await cas_oauth2_token(code);
  const { email, name, sub } = await cas_oauth2_userinfo(access_token);

  console.log("Logged to", sub, "with email", email, "and name", name);
}();
