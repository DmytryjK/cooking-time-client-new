import { API_ROUTES } from "../api-routes";
import { POST } from "../../services/axios/axios";
import { PostGenerateRecipeByUrlRes } from "./post-generate-recipe-by-url.type";

const GENERATE_RECIPE_TIMEOUT_MS = 80_000;

export const postGenerateRecipeByUrl = async (url: string) => {
  return await POST<PostGenerateRecipeByUrlRes>(
    API_ROUTES.POST_GENERATED_RECIPE_BY_URL,
    { url },
    { timeout: GENERATE_RECIPE_TIMEOUT_MS },
  );
};
