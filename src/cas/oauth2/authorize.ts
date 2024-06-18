import { BIOME_DEV_ENDPOINT, BIOME_PROD_ENDPOINT, CAS_HOST, OAUTH2_CODE_CHALLENGE, OAUTH2_CODE_CHALLENGE_METHOD, OAUTH2_STATE } from "~/utils/constants";

/**
 * Does all the steps to authorize a user
 * using `/oauth2/authorize` endpoint.
 *
 * @param cas_token Token that can be found using `cas_login` function.
 *
 * @returns The `code` to exchange for an access token
 * using `/oauth2/token` endpoint.
 */
export const cas_oauth2_authorize = async (cas_token: string, useBiomeDevEndpoint = false): Promise<string> => {
  let response: Response;
  let uri: URL;

  const redirectURI = (useBiomeDevEndpoint ? BIOME_DEV_ENDPOINT : BIOME_PROD_ENDPOINT) + "/authentication/callback";
  const clientID = useBiomeDevEndpoint ? "biome-dev" : "biome-prod";

  uri = new URL(CAS_HOST + "/oauth2/authorize");
  uri.searchParams.set("redirect_uri", redirectURI);
  uri.searchParams.set("client_id", clientID);
  uri.searchParams.set("response_type", "code");
  uri.searchParams.set("scope", "openid profile email");
  uri.searchParams.set("code_challenge_method", OAUTH2_CODE_CHALLENGE_METHOD);
  uri.searchParams.set("code_challenge", OAUTH2_CODE_CHALLENGE);
  uri.searchParams.set("state", OAUTH2_STATE);

  response = await fetch(uri, {
    headers: { "Cookie": "lemonldap=" + cas_token }
  });

  uri = new URL(response.url);
  if (uri.searchParams.get("state") !== OAUTH2_STATE)
    throw new Error("Invalid state");

  return uri.searchParams.get("code") as string;
};

