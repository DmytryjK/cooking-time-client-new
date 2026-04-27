import { API_ROUTES } from "../api-routes";
import { GET } from "../../services/axios/axios";
import { GetFavoriteRecipesRes } from "./get-favorite-recipes.type";

export const getFavoriteRecipes = async () => {
  return await GET<GetFavoriteRecipesRes>(API_ROUTES.GET_FAVORITE_RECIPES);
};
