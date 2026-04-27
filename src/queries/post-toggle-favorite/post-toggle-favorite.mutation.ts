import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postToggleFavorite } from "../../api/post-toggle-favorite/post-toggle-favorite";
import { PostToggleFavoriteReq } from "../../api/post-toggle-favorite/post-toggle-favorite.type";
import { Recipe } from "../../types/type";
import { useAppSelector } from "../../hooks/hooks";

export const useToggleFavorite = () => {
  const queryClient = useQueryClient();
  const { searchInput, searchCategories, searchTags } = useAppSelector((state) => state.filters);
  return useMutation({
    mutationFn: (body: PostToggleFavoriteReq) => postToggleFavorite(body),
    onSuccess: (recipe) => {
      queryClient.setQueryData(
        ["get-recipes", { search: searchInput, ingredients: searchTags, categories: searchCategories }],
        (prev: Recipe[] | undefined) => (prev ? prev.map((item) => (item.id === recipe.id ? recipe : item)) : prev),
      );

      queryClient.setQueryData(["get-favorite-recipes"], (prev: Recipe[] | undefined) => {
        if (!prev) return prev;
        if (recipe.isFavorite) {
          return [...prev, recipe];
        } else {
          return prev.filter((prevItem) => recipe.id !== prevItem.id);
        }
      });

      queryClient.setQueryData([`get-recipe-${recipe.id}`], (prev: Recipe | undefined) => {
        if (!prev) return prev;
        return { ...prev, isFavorite: recipe.isFavorite };
      });
    },
    onError: (error) => {
      alert(`some error ${error.message}`);
    },
  });
};
