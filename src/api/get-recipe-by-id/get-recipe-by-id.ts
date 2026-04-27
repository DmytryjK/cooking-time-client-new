import { API_ROUTES } from "../api-routes";
import { GET } from "../../services/axios/axios";
import { GetRecipeRes } from "./get-recipes.type";

export const getRecipeById = async (id: string) => {
  return await GET<GetRecipeRes>(API_ROUTES.GET_RECIPE_BY_ID(id));
};
