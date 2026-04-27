/* eslint-disable prefer-const */
import { POST } from "../../services/axios/axios";
import { API_ROUTES } from "../api-routes";
import { PostCreateRecipeReq, PostCreateRecipeRes } from "./post-create-recipe.type";

export const postCreateRecipe = async (body: PostCreateRecipeReq): Promise<PostCreateRecipeRes> => {
  const formData = new FormData();
  for (let key in body) {
    const value = body[key as keyof PostCreateRecipeReq];
    if (value === undefined) continue;
    if (Array.isArray(value)) {
      formData.append(key, JSON.stringify(value));
    } else if (typeof value === "number") {
      formData.append(key, String(value));
    } else {
      formData.append(key, value);
    }
  }

  return await POST(API_ROUTES.CREATE_RECIPE, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
