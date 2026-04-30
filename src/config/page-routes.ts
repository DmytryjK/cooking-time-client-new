import { CONFIG } from "./config";

export const PAGE_ROUTES = {
  //auth
  LOGIN: "/auth/sign-in",
  LOGOUT: "auth/sign-out",
  REGISTER: "/auth/sign-up",
  FORGOT_PASSWORD: "/auth/forgot-password",
  AUTH_RESPONSE: "/auth/response",
  GOOGLE_URL: `${CONFIG.API_BASE_URL}/auth/google/callback`,
  GOOGLE_AUTH_SUCCESS: "/auth/google-success",

  ROOT: "/",
  FAVORITES: "/favorites",
  ADD_RECIPE: "/add-recipe",
  RECIPE: "/about-recipe",
};
