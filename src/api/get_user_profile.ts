import { DEV_ENDPOINT, PROD_ENDPOINT } from "~/utils/constants";

/**
 * Get user profile.
 *
 * GET /api/user_profile/:username
 *
 * Located at `src/Controller/GetUserProfileController.php` in the `getUserProfile` method.
 *
 * Requires to be authenticated with granted `ROLE_USER` or `ROLE_ADMIN`.
 */
export const get_user_profile = async (token: string, username: string, useDevEndpoint = false) => {
  const response = await fetch(`${useDevEndpoint ? DEV_ENDPOINT : PROD_ENDPOINT}/api/user_profile/${username}`, {
    method: "GET",
    headers: { "Authorization": "Bearer " + token }
  });

  // TODO: Typings
  const json = await response.json() as any[] | { code: number, message: string };
  if ("code" in json) {
    throw new Error(json.message);
  }

  return json;
};
