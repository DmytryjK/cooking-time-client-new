import { buildQuery } from "../../helpers/buildQuery";
import { getRecipes } from "../../api/get-recipes/get-recipes";
import { GetRecipesProps } from "./get-recipes.type";
import { keepPreviousData } from "@tanstack/react-query";
import { useAppDispatch } from "../../hooks/hooks";
import { setSearchLoading } from "../../store/reducers/FiltersSlice";
import { useCustomInfinityQuery } from "../../services/tanstack-queries/use-custom-infinity-query";

export const DEFAULT_PAGE = 1;

export const useGetRecipes = ({ onSuccess, onError, ...params }: GetRecipesProps) => {
  const { search } = params;
  const dispatch = useAppDispatch();
  if (search) dispatch(setSearchLoading(true));

  return useCustomInfinityQuery({
    queryFn: ({ pageParam }) => getRecipes(buildQuery({ ...params, page: pageParam as number })),
    queryKey: ["get-recipes", params],
    initialPageParam: DEFAULT_PAGE,
    getNextPageParam: (data) => (data.page * data.limit < data.totalCount ? data.page + 1 : undefined),
    staleTime: 10 * 60 * 1000,
    onSuccess,
    onError,
    onSettled: () => {
      dispatch(setSearchLoading(false));
    },
    placeholderData: keepPreviousData,
  });
};
