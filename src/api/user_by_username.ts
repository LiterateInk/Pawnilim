import { DEV_ENDPOINT, PROD_ENDPOINT } from "~/utils/constants";

/**
 * Get user datas by username.
 *
 * GET /api/user/:username
 *
 * Located at `src/Controller/GetUserByUsernameController.php` in the `getProfile` method.
 *
 * Requires to be authenticated with granted `ROLE_USER` or `ROLE_ADMIN`.
 */
export const user_by_username = async (token: string, username: string, useDevEndpoint = false) => {
  const response = await fetch(`${useDevEndpoint ? DEV_ENDPOINT : PROD_ENDPOINT}/api/user/${username}`, {
    method: "GET",
    headers: { "Authorization": "Bearer " + token }
  });

  const json = await response.json() as {
    username: string
    /** Avatar image encoded in Base64. */
    avatar: string
    /** Can be an empty string if not mentioned. */
    gender: string
    lastname: string
    firstname: string
    contact: { mail: string }
    options: { unilimValidationCGU: boolean }
    yearRegistration: number
    signature: unknown | null // TODO
    routes: Array<{ name: string, url: string }>
    mercure: { url: string }
  } | { code: number, message: string };
  if ("code" in json) {
    throw new Error(json.message);
  }

  return json;
};
