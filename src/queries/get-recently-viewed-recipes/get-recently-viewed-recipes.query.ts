import { useCustomQuery } from "../../services/tanstack-queries/use-custom-query";
import { GetRecentlyViewedRecipesProps } from "./get-recently-viewed-recipes.type";
import { getRecentlyViewedRecipes } from "../../api/get-recently-viewed-recipes/get-recently-viewed-recipes";
import { useAppSelector } from "../../hooks/hooks";

export const useGetRecentlyViewedRecipes = ({ onSuccess, onError }: GetRecentlyViewedRecipesProps) => {
  const { user } = useAppSelector((state) => state.authentication);
  return useCustomQuery({
    queryFn: getRecentlyViewedRecipes,
    queryKey: ["get-recently-viewed-recipes"],
    onSuccess,
    onError,
    gcTime: 0,
    enabled: !!user,
  });
};
