import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postCreateRecipe } from "../../api/post-create-recipe/post-create-recipe";
import { PostCreateRecipeReq } from "../../api/post-create-recipe/post-create-recipe.type";

export const useCreateRecipe = ({ onSuccess }: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: PostCreateRecipeReq) => postCreateRecipe(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-recipes"] });
      onSuccess?.();
    },
    onError: (error) => {
      alert(`some error ${error.message}`);
    },
  });
};
