import { Recipe } from "../../types/type";

export type PostToggleFavoriteReq = {
  recipeId: string;
  isFavorite: boolean;
};
export type PostToggleFavoriteRes = Recipe;
