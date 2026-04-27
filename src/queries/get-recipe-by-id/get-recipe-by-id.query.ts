/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useCustomQuery } from "../../services/tanstack-queries/use-custom-query";
import { GetRecipeByIdProps } from "./get-recipe-by-id.type";
import { getRecipeById } from "../../api/get-recipe-by-id/get-recipe-by-id";

export const useGetRecipeById = ({ id, onSuccess, onError }: GetRecipeByIdProps) =>
  useCustomQuery({
    queryFn: () => getRecipeById(id!),
    queryKey: [`get-recipe-${id}`],
    staleTime: 10 * 60 * 1000,
    onSuccess,
    onError,
    enabled: !!id,
  });
