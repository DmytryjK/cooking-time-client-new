import { IngredientsType, Recipe } from "../../types/type";

export type PutUpdateRecipeReq = {
  categoryId?: string;
  title?: string;
  description?: string;
  ingredients?: IngredientsType[];
  previewImage?: File | string;
  mainImage?: File | string;
  cookingTimeInMinutes?: number;
};
export type PutUpdateRecipeRes = Recipe;
