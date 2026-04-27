export const API_ROUTES = {
  HEALTH: "/health",

  SIGN_IN: "/auth/sign-in",
  SIGN_UP: "/auth/sign-up",
  SIGN_OUT: "/auth/sign-out",
  FORGOT_PASSWORD: "/auth/forgot-password",
  REFRESH: "/auth/refresh",

  GET_ME: "/users/me",

  GET_RECIPES: (query: string) => `/recipes?${query}`,
  GET_FAVORITE_RECIPES: "/recipes/favorites",
  GET_RECIPE_BY_ID: (id: string) => `/recipes/${id}`,
  CREATE_RECIPE: "/recipes/new",
  UPDATE_RECIPE: (id: string) => `/recipes/update/${id}`,
  DELETE_RECIPE: (id: string) => `/recipes/${id}`,
  GET_RECENTLYT_VIEWED_RECIPES: "/recipes/recently-viewed-recipes",

  TOGGLE_FAVORITE: "/users/favorites",

  GET_CATEGORIES: "/categories",
};
