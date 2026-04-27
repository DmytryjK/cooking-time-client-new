import { PATCH } from "../../services/axios/axios";
import { API_ROUTES } from "../api-routes";
import { PostToggleFavoriteReq, PostToggleFavoriteRes } from "./post-toggle-favorite.type";

export const postToggleFavorite = async (body: PostToggleFavoriteReq): Promise<PostToggleFavoriteRes> => {
  return await PATCH<PostToggleFavoriteRes>(API_ROUTES.TOGGLE_FAVORITE, body);
};
