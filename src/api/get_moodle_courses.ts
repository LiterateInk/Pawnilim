import { DEV_ENDPOINT, PROD_ENDPOINT } from "~/utils/constants";

/**
 * GET /api/moodle/courses
 * 
 * Located at `src/Controller/MoodleController.php` in the `getCourses` method.
 * 
 * Requires to be authenticated with granted `ROLE_USER`.
 */
export const get_moodle_courses = async (token: string, useDevEndpoint = false) => {
  const response = await fetch(`${useDevEndpoint ? DEV_ENDPOINT : PROD_ENDPOINT}/api/moodle/courses`, {
    method: "GET",
    headers: { "Authorization": "Bearer " + token }
  });

  return response.text();
};
