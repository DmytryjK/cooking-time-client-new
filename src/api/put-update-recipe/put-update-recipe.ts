/* eslint-disable prefer-const */
import { PUT } from "../../services/axios/axios";
import { Recipe } from "../../types/type";
import { API_ROUTES } from "../api-routes";
import { PutUpdateRecipeReq, PutUpdateRecipeRes } from "./put-update-recipe.type";

export const putUpdateRecipe = async (id: Recipe["id"], body: PutUpdateRecipeReq): Promise<PutUpdateRecipeRes> => {
  const formData = new FormData();
  for (let key in body) {
    const value = body[key as keyof PutUpdateRecipeReq];
    if (value === undefined) continue;
    if (Array.isArray(value)) {
      formData.append(key, JSON.stringify(value));
    } else if (typeof value === "number") {
      formData.append(key, String(value));
    } else {
      formData.append(key, value);
    }
  }

  return await PUT(API_ROUTES.UPDATE_RECIPE(id), formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
