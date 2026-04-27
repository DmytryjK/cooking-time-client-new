import { API_ROUTES } from "../api-routes";
import { GET_PUBLIC } from "../../services/axios/axios";
import { GetCategoriesRes } from "./get-categories.type";

export const getCategories = async () => {
  return await GET_PUBLIC<GetCategoriesRes>(API_ROUTES.GET_CATEGORIES);
};
