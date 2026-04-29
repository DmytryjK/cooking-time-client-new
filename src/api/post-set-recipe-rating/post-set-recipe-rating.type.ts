import { Recipe } from "../../types/type";

export type PostSetRecipeRatingReq = {
  rating: number;
};
export type PostSetRecipeRatingRes = {
  avgRating: Recipe["avgRating"];
  ratingsCount: Recipe["ratingsCount"];
  recipeId: Recipe["id"];
  userRating: Recipe["userRating"];
};
