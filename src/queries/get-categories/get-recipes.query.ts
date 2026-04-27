import { useCustomQuery } from "../../services/tanstack-queries/use-custom-query";
import { getCategories } from "../../api/get-categories/get-categories";
import { GetCategoriesProps } from "./get-recipes.type";

export const useGetCategories = ({ onSuccess, onError }: GetCategoriesProps) =>
  useCustomQuery({
    queryFn: getCategories,
    queryKey: ["get-categories"],
    staleTime: 30 * 60 * 1000,
    onSuccess,
    onError,
  });
