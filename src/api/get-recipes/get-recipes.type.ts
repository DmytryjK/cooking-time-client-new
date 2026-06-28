import { Recipe } from "../../types/type";

export interface GetRecipesRes {
  recipes: Recipe[];
  totalCount: number;
  page: number;
  limit: number;
}
