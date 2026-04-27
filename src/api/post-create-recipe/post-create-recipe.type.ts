import { IngredientsType, Recipe } from "../../types/type";

export type PostCreateRecipeReq = {
  categoryId: string;
  title: string;
  description?: string;
  ingredients: IngredientsType[];
  previewImage: File;
  mainImage: File;
  cookingTimeInMinutes: number;
};
export type PostCreateRecipeRes = Recipe;
