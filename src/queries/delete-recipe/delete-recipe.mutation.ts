import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRecipe } from "../../api/delete-recipe/delete-recipe";

export const useDeleteRecipe = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteRecipe(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-recipes"] });
    },
    onError: (error) => {
      alert(`some error ${error.message}`);
    },
  });
};
