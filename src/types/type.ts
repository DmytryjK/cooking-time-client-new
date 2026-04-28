export type IngredientsType = {
  id: string | number;
  amount: string;
  name: string;
  unit: string;
  matched?: boolean;
};

export interface Category {
  id: string;
  name: string;
}

export enum ImageType {
  preview = "PREVIEW",
  main = "MAIN",
}

export type ImageDto = {
  id: string;
  createdAt: string;
  imageUrl: string;
  publicId: string;
  type: ImageType;
};
export interface Recipe {
  id: string;
  images: ImageDto[];
  userId: string | null;
  title: string;
  cookingTimeInMinutes: number;
  ingredients: IngredientsType[];
  isFavorite: boolean;
  description?: string;
  category: Category;
}

export interface RecipesFromServer {
  [key: string]: Recipe;
}

export interface Recipes {
  recipes: Recipe[];
  fetchedRecepieInfo?: Recipe | null;
}

export interface PostState {
  loading: "idle" | "pending" | "succeeded" | "failed";
  loadingForm?: "idle" | "pending" | "succeeded" | "failed";
  error: null | unknown;
}

export interface TagsType {
  id: number | string;
  tagText: string;
}

export interface ObjectForFiltered {
  recipes: Recipe[];
  tags: string[];
}

export interface UploadFileType {
  lastModified?: number;
  lastModifiedDate?: Date;
  name?: string;
  size?: number;
  type?: string;
  webkitRelativePath?: string;
}

export interface AuthStore {
  user: User | null;
  accessToken: string | null;
}

export interface User {
  id: string;
  email: string;
  isEmailVerified: null | boolean;
  role: "user" | "admin";
}

export type Loading = "idle" | "pending" | "succeeded" | "failed";
