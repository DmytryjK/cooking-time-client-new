import { API_ROUTES } from "../api-routes";
import { GET } from "../../services/axios/axios";
import { GetRecipesRes } from "./get-recipes.type";

export const getRecipes = async (query: string) => {
  return await GET<GetRecipesRes>(API_ROUTES.GET_RECIPES(query));
};
