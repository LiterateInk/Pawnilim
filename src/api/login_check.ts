import { DEV_ENDPOINT, PROD_ENDPOINT } from "~/utils/constants";

/**
 * @returns A token to use for the API (`apis.unilim.fr`), you should still
 * use the access_token for the CAS API (`cas.unilim.fr`) and this request.
 */
export const login_check = async (access_token: string, useDevEndpoint = false) => {
  const response = await fetch(`${useDevEndpoint ? DEV_ENDPOINT : PROD_ENDPOINT}/api/login_check`, {
    method: "POST",
    headers: { "X-Auth-Token": access_token }
  });

  const json = await response.json() as { token: string } | { code: number, message: string };
  if ("code" in json) {
    throw new Error(json.message);
  }

  return json;
};
