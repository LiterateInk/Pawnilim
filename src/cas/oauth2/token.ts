import { BIOME_DEV_ENDPOINT, BIOME_PROD_ENDPOINT, OAUTH2_CODE_CHALLENGE } from "~/utils/constants";

export const oauth2_token = async (code: string, useDevEndpoint = false) => {
  const redirectURI = (useDevEndpoint ? BIOME_DEV_ENDPOINT : BIOME_PROD_ENDPOINT) + "/authentication/callback";
  const clientID = useDevEndpoint ? "biome-dev" : "biome-prod";

  const response = await fetch("https://cas.unilim.fr/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      client_id: clientID,
      redirect_uri: redirectURI,
      code_verifier: OAUTH2_CODE_CHALLENGE
    })
  });

  const json = await response.json() as {
    refresh_token: string
    access_token: string
    id_token: string
    token_type: "Bearer"
    expires_in: number
  };

  return json;
};
