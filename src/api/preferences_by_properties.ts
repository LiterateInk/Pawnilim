import { DEV_ENDPOINT, PROD_ENDPOINT } from "~/utils/constants"

export type PreferencesProperty = (
  | "userApplications" 
  | "userWidgets" 
  | "userInterface" 
  | "userShortWidgets"
)

/**
 * Get preferences by property.
 * 
 * GET /api/preferences/:property
 * 
 * Located at `src/Controller/PreferenceController.php` in the `Preferences` method.
 * 
 * Requires to be authenticated with granted `ROLE_USER`.
 */
export const preferences_by_properties = async (token: string, property: PreferencesProperty, useDevEndpoint = false) => {
  const response = await fetch(`${useDevEndpoint ? DEV_ENDPOINT : PROD_ENDPOINT}/api/preferences/${property}`, {
    method: "GET",
    headers: { "Authorization": "Bearer " + token }
  });

  // TODO: return type
  const json = await response.json() as any | { code: number, message: string }
  if ("code" in json) {
    throw new Error(json.message);  
  }

  return json
};
