export interface GetRecipesProps {
  onSuccess?: () => void;
  onError?: () => void;
  search?: string;
  ingredients?: string[];
  categories?: string[];
}
