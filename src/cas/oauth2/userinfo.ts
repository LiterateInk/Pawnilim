export const oauth2_userinfo = async (access_token: string) => {
  const response = await fetch("https://cas.unilim.fr/oauth2/userinfo", {
    headers: { "Authorization": "Bearer " + access_token }
  });

  const json = await response.json() as {
    family_name: string
    given_name: string
    name: string
    sub: string
  };

  return json;
};
