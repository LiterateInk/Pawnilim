import { oauth2_authorize, oauth2_token, oauth2_userinfo } from "../src";

const username = "";
const password = "";

void async function main () {
  const code = await oauth2_authorize({ username, password });
  const { access_token } = await oauth2_token(code);
  const { email, name, sub } = await oauth2_userinfo(access_token);

  console.log("Logged to", sub, "with email", email, "and name", name);
}();
