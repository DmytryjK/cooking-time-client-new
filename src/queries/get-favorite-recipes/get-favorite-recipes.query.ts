import { useCustomQuery } from "../../services/tanstack-queries/use-custom-query";
import { GetFavoriteRecipesProps } from "./get-favorite-recipes.type";
import { getFavoriteRecipes } from "../../api/get-favorite-recipes/get-favorite-recipes";
import { useAppSelector } from "../../hooks/hooks";

export const useGetFavoriteRecipes = ({ onSuccess, onError }: GetFavoriteRecipesProps) => {
  const { user } = useAppSelector((state) => state.authentication);
  return useCustomQuery({
    queryFn: () => getFavoriteRecipes(),
    queryKey: ["get-favorite-recipes"],
    staleTime: 10 * 60 * 1000,
    onSuccess,
    onError,
    enabled: !!user,
  });
};
