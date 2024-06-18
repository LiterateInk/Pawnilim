export const CAS_HOST = "https://cas.unilim.fr";

export const PROD_ENDPOINT = "https://apis.unilim.fr";
export const DEV_ENDPOINT = "https://apis-dev.unilim.fr";
export const BIOME_PROD_ENDPOINT = "https://biome.unilim.fr";
export const BIOME_DEV_ENDPOINT = "https://biome-dev.unilim.fr";

export const OAUTH2_CODE_CHALLENGE_METHOD = "plain";
export const OAUTH2_CODE_CHALLENGE = Math.random().toString(36).substring(2);
export const OAUTH2_STATE = Math.random().toString(36).substring(2);

export const CAS_EXTERNAL_SERVICES = {
  IUT_COMMUNITY_MOODLE: "https://community-iut.unilim.fr/login/index.php?authCAS=CAS",
  COMMUNITIES_MOODLE: "https://communities.unilim.fr/login/index.php?authCAS=CAS",
  GRADING: "https://inscription.unilim.fr/gestion/etudiant/rvn/"
} as const;
