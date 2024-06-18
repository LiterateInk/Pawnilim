import { CAS_HOST, CAS_EXTERNAL_SERVICES } from "~/utils/constants";

/**
 * @param cas_token token that can be found using `cas_login` function.
 * @param service_url the service URL to authenticate to.
 * @returns the URL to authenticate to said service.
 */
export const cas_service = async (cas_token: string, service_url: typeof CAS_EXTERNAL_SERVICES[keyof typeof CAS_EXTERNAL_SERVICES]): Promise<string> => {
  const uri = new URL(CAS_HOST + "/cas/login");
  uri.searchParams.set("service", service_url);
  uri.searchParams.set("gateway", "true");

  const response = await fetch(uri.href, {
    headers: { "Cookie": "lemonldap=" + cas_token },
    // prevent redirects since we want to
    // return the redirection url.
    redirect: "manual"
  });

  const redirection = response.headers.get("location");
  if (!redirection) throw new Error("No redirection found.");

  return redirection;
};
