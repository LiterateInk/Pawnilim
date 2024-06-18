import { CAS_HOST } from "~/utils/constants";
import { findValueBetween } from "~/utils/finder";

/**
 * authenticates to `https://cas.unilim.fr/` using the given `username` and `password`.
 * @returns the "lemonldap" cookie that is a token for further authenticated requests.
 */
export const cas_login = async (username: string, password: string): Promise<string> => {
  let response: Response;

  // 1. request the login page
  response = await fetch(CAS_HOST);

  // 2. read the html content.
  const html = await response.text();

  // 3. find the token that allows to send the login request.
  const loginToken = findValueBetween(html, "name=\"token\" value=\"", "\" />");

  // 4. send the login request.
  response = await fetch(CAS_HOST, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      "url": "aHR0cHM6Ly9jYXMudW5pbGltLmZyL2Nhcw==", // -> btoa("https://cas.unilim.fr/cas")
      "timezone": "2",
      "skin": "unilim",
      "token": loginToken,
      "user": username,
      "password": password
    }),
    // prevent redirections to any random page
    // since we need to read the "set-cookie" from THIS response.
    redirect: "manual"
  });

  // 5. read the "lemonldap" cookie from the response.
  const lemon_ldap = response.headers.get("set-cookie")?.split(";")[0].split("=")[1];
  if (!lemon_ldap) throw new Error("Bad authentication.");

  // 6. return the cookie content.
  return lemon_ldap;
};
