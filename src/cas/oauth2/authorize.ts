import { BIOME_DEV_ENDPOINT, BIOME_PROD_ENDPOINT, OAUTH2_CODE_CHALLENGE, OAUTH2_CODE_CHALLENGE_METHOD, OAUTH2_STATE } from "~/utils/constants";
import { findValueBetween } from "~/utils/finder";

/**
 * Does all the steps to authorize a user
 * using `/oauth2/authorize` endpoint.
 *
 * @returns The `code` to exchange for an access token
 * using `/oauth2/token` endpoint.
 */
export const oauth2_authorize = async (data: {
  username: string
  password: string
}, useDevEndpoint = false): Promise<string> => {
  let response: Response;
  let uri: URL;

  const redirectURI = (useDevEndpoint ? BIOME_DEV_ENDPOINT : BIOME_PROD_ENDPOINT) + "/authentication/callback";
  const clientID = useDevEndpoint ? "biome-dev" : "biome-prod";

  uri = new URL("https://cas.unilim.fr/oauth2/authorize");
  uri.searchParams.set("redirect_uri", redirectURI);
  uri.searchParams.set("client_id", clientID);
  uri.searchParams.set("response_type", "code");
  uri.searchParams.set("scope", "openid profile email");
  uri.searchParams.set("code_challenge_method", OAUTH2_CODE_CHALLENGE_METHOD);
  uri.searchParams.set("code_challenge", OAUTH2_CODE_CHALLENGE);
  uri.searchParams.set("state", OAUTH2_STATE);

  response = await fetch(uri);
  const html = await response.text();

  // Token that allows to login.
  const loginToken = findValueBetween(html, "name=\"token\" value=\"", "\" />");

  response = await fetch(uri, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      "url": "aHR0cHM6Ly9jYXMudW5pbGltLmZyL29hdXRoMg==", // -> btoa("https://cas.unilim.fr/oauth2")
      "timezone": "2",
      "skin": "unilim",
      "token": loginToken,
      "user": data.username,
      "password": data.password
    })
  });

  uri = new URL(response.url);
  if (uri.searchParams.get("state") !== OAUTH2_STATE)
    throw new Error("Invalid state");

  return uri.searchParams.get("code") as string;
};

