import { GeneratedRecipeByLLM } from "../../types/type";

export interface PostGenerateRecipeByUrlProps {
  onSuccess?: (data: GeneratedRecipeByLLM) => void;
  onError?: () => void;
}
