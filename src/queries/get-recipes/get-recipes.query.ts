import { buildQuery } from "../../helpers/buildQuery";
import { getRecipes } from "../../api/get-recipes/get-recipes";
import { useCustomQuery } from "../../services/tanstack-queries/use-custom-query";
import { GetRecipesProps } from "./get-recipes.type";
import { keepPreviousData } from "@tanstack/react-query";
import { useAppDispatch } from "../../hooks/hooks";
import { setSearchLoading } from "../../store/reducers/FiltersSlice";

export const useGetRecipes = ({ onSuccess, onError, ...params }: GetRecipesProps) => {
  const { search } = params;
  const dispatch = useAppDispatch();
  if (search) dispatch(setSearchLoading(true));

  return useCustomQuery({
    queryFn: () => getRecipes(buildQuery(params)),
    queryKey: ["get-recipes", params],
    staleTime: 10 * 60 * 1000,
    onSuccess,
    onError,
    onSettled: () => {
      dispatch(setSearchLoading(false));
    },
    placeholderData: keepPreviousData,
  });
};
