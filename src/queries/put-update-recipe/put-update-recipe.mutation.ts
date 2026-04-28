import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putUpdateRecipe } from "../../api/put-update-recipe/put-update-recipe";
import { PutUpdateRecipeReq } from "../../api/put-update-recipe/put-update-recipe.type";
import { Recipe } from "../../types/type";
import toast from "react-hot-toast";

export const useUpdateRecipe = ({ onSuccess }: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: Recipe["id"]; body: PutUpdateRecipeReq }) => putUpdateRecipe(id, body),
    onSuccess: (recipe) => {
      queryClient.invalidateQueries({ queryKey: ["get-recipes"] });
      queryClient.invalidateQueries({ queryKey: [`get-recipe-${recipe.id}`] });
      toast.success("Рецепт успішно оновлено!");
      onSuccess?.();
    },
    onError: (error) => {
      toast.error("Щось пішло не так. Спробуйте ще!");
    },
  });
};
