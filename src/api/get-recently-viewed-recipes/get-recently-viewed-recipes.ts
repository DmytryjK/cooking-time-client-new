import { API_ROUTES } from "../api-routes";
import { GET } from "../../services/axios/axios";
import { GetRecipesRes } from "./get-recently-viewed-recipes.type";

export const getRecentlyViewedRecipes = async () => {
  return await GET<GetRecipesRes>(API_ROUTES.GET_RECENTLYT_VIEWED_RECIPES);
};
