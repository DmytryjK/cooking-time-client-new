import { DELETE } from "../../services/axios/axios";
import { API_ROUTES } from "../api-routes";
import { DeleteRecipeRes } from "./delete-recipe.type";

export const deleteRecipe = async (id: string): Promise<DeleteRecipeRes> => {
  return await DELETE<DeleteRecipeRes>(API_ROUTES.DELETE_RECIPE(id));
};
