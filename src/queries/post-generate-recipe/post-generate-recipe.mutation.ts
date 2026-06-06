import { useMutation } from "@tanstack/react-query";
import { postGenerateRecipeByUrl } from "../../api/post-generate-recipe-by-url/post-generate-recipe-by-url";
import toast from "react-hot-toast";
import { getApiErrorMessage } from "../../utils/get-api-error-message";

export const useGenerateRecipeByUrl = () => {
  return useMutation({
    mutationFn: (url: string) => postGenerateRecipeByUrl(url),
    onSuccess: () => {
      toast.success("Рецепт згенеровано! Натисніть на кнопку «Додати рецепт» щоб зберегти", { duration: 6000 });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
};
