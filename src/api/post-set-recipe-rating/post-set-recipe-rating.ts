/* eslint-disable prefer-const */
import { POST } from "../../services/axios/axios";
import { API_ROUTES } from "../api-routes";
import { PostSetRecipeRatingReq, PostSetRecipeRatingRes } from "./post-set-recipe-rating.type";

export const postSetRecipeRating = async (
  recipeId: string,
  body: PostSetRecipeRatingReq,
): Promise<PostSetRecipeRatingRes> => {
  return POST(API_ROUTES.SET_RECIPE_RATING(recipeId), body);
};
