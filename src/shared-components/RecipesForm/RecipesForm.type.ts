import { Dispatch, SetStateAction } from "react";
import { Recipe, UploadFileType } from "../../types/type";

export interface RecipesFormProps {
  method: "POST" | "UPDATE";
  recipe?: Recipe;
  onSuccess?: () => void;
}

export type UseRecipesFormProps = RecipesFormProps;

export interface LoadedPhotoType {
  id: string;
  src: string;
  srcForRemove?: string;
  uploadFile?: UploadFileType | any;
}

export interface LoadedPhotos {
  main?: LoadedPhotoType;
  preview?: LoadedPhotoType;
}

export type LoadedPhotoContextType = {
  loadedPhotosInfo: LoadedPhotos | undefined;
  setLoadedPhotosInfo: Dispatch<SetStateAction<LoadedPhotos | undefined>>;
};
