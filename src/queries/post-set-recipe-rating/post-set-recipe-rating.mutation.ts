import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Recipe } from "../../types/type";
import { useAppSelector } from "../../hooks/hooks";
import { PostSetRecipeRatingReq } from "../../api/post-set-recipe-rating/post-set-recipe-rating.type";
import { postSetRecipeRating } from "../../api/post-set-recipe-rating/post-set-recipe-rating";

export const useSetRecipeRating = () => {
  const queryClient = useQueryClient();
  const { searchInput, searchCategories, searchTags } = useAppSelector((state) => state.filters);
  return useMutation({
    mutationFn: ({ recipeId, body }: { recipeId: string; body: PostSetRecipeRatingReq }) =>
      postSetRecipeRating(recipeId, body),
    onSuccess: ({ recipeId, avgRating, ratingsCount, userRating }) => {
      queryClient.setQueryData(
        ["get-recipes", { search: searchInput, ingredients: searchTags, categories: searchCategories }],
        (prev: Recipe[] | undefined) =>
          prev ? prev.map((item) => (item.id === recipeId ? { ...item, avgRating, ratingsCount } : item)) : prev,
      );
      queryClient.setQueryData([`get-recipe-${recipeId}`], (prev: Recipe | undefined) => {
        if (!prev) return prev;
        return { ...prev, avgRating, ratingsCount, userRating };
      });
      queryClient.setQueryData(["get-favorite-recipes"], (prev: Recipe[] | undefined) => {
        if (!prev) return prev;
        return prev ? prev.map((item) => (item.id === recipeId ? { ...item, avgRating, ratingsCount } : item)) : prev;
      });
    },
    onError: (error) => {
      alert(`some error ${error.message}`);
    },
  });
};
