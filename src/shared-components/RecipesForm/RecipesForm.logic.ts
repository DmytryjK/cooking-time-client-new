import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useCreateRecipe } from "../../queries/post-create-recipe/post-create-recipe.mutation";
import { useGenerateRecipeByUrl } from "../../queries/post-generate-recipe/post-generate-recipe.mutation";
import { useUpdateRecipe } from "../../queries/put-update-recipe/put-update-recipe.mutation";
import { Category } from "../../types/type";
import { LoadedPhotos, UseRecipesFormProps } from "./RecipesForm.type";
import nextId from "react-id-generator";
import { PutUpdateRecipeReq } from "../../api/put-update-recipe/put-update-recipe.type";
import { useGetCategories } from "../../queries/get-categories/get-recipes.query";
import { setAllIngredients } from "../../store/reducers/CreateRecipeFormSlice";

export const useRecipesForm = ({ recipe, onSuccess, method }: UseRecipesFormProps) => {
  const { id, title, category, cookingTimeInMinutes, description: recipeDescription, images } = recipe || {};
  const mainPhoto = images?.find((img) => img.type === "MAIN")?.imageUrl;
  const previewPhoto = images?.find((img) => img.type === "PREVIEW")?.imageUrl;
  const initialPhotosState = {
    ...(mainPhoto ? { main: { id: "main", src: mainPhoto } } : {}),
    ...(previewPhoto ? { preview: { id: "preview", src: previewPhoto } } : {}),
  };
  const { mutateAsync: createRecipe, isPending: isCreating } = useCreateRecipe({ onSuccess });
  const { mutateAsync: updateRecipe, isPending: isUpdating } = useUpdateRecipe({ onSuccess });
  const {
    mutateAsync: generateRecipeByUrl,
    data: generatedRecipe,
    isPending: isGeneratingRecipe,
  } = useGenerateRecipeByUrl();

  const [nameValue, setNameValue] = useState(title || "");
  const [categoryValue, setCategoryValue] = useState<Category | undefined>(() => category);
  const [timerValue, setTimerValue] = useState({
    hours: cookingTimeInMinutes ? Math.floor(cookingTimeInMinutes / 60) : 0,
    minutes: cookingTimeInMinutes ? cookingTimeInMinutes % 60 : 0,
  });
  const [description, setDescription] = useState(recipeDescription || "");
  const [loadedPhotosInfo, setLoadedPhotosInfo] = useState<LoadedPhotos | undefined>(initialPhotosState);

  const tags = useAppSelector((state) => state.createRecipeForm.tags);
  const { data: categories } = useGetCategories({});

  const dispatch = useAppDispatch();

  const handleChangeNameValue = (e: ChangeEvent<HTMLInputElement>) => {
    setNameValue(e.target.value);
  };

  useEffect(() => {
    if (!generatedRecipe) return;
    const { images, title, description, cookingTimeInMinutes, ingredients, suggestedCategoryName } =
      generatedRecipe.recipe;

    const category = categories?.find((cat) => cat.name === suggestedCategoryName);
    const mainImage = images.find((img) => img.type === "MAIN");
    const previewImage = images.find((img) => img.type === "PREVIEW");

    setNameValue(title);
    setDescription(description);
    setCategoryValue(category);
    setTimerValue({
      hours: cookingTimeInMinutes ? Math.floor(cookingTimeInMinutes / 60) : 0,
      minutes: cookingTimeInMinutes ? cookingTimeInMinutes % 60 : 0,
    });

    setLoadedPhotosInfo({
      main: { src: mainImage?.imageUrl || "", id: mainImage?.id || "" },
      preview: { src: previewImage?.imageUrl || "", id: previewImage?.id || "" },
    });
    dispatch(setAllIngredients(ingredients.map((ing) => ({ ...ing, id: nextId() }))));
  }, [generatedRecipe, categories]);

  const loadedPhotoContextValue = useMemo(
    () => ({
      loadedPhotosInfo,
      setLoadedPhotosInfo,
    }),
    [loadedPhotosInfo, setLoadedPhotosInfo],
  );

  const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!nameValue) {
      alert("Введіть назву страви");
      return;
    }
    if (!categoryValue) {
      alert("Виберіть категорію страви");
      return;
    }
    if (tags.length === 0) {
      alert("Додайте інгредієнти");
      return;
    }
    if (!timerValue.hours && !timerValue.minutes) {
      alert("Вкажіть час приготування страви");
      return;
    }
    if (!description) {
      alert("Опишіть процес приготування страви");
      return;
    }

    const recipeValues = {
      title: nameValue,
      ingredients: tags,
      description,
      categoryId: categoryValue.id,
      cookingTimeInMinutes: timerValue.hours * 60 + timerValue.minutes,
    };

    if (method === "POST") {
      if (!loadedPhotosInfo || !loadedPhotosInfo.main || !loadedPhotosInfo.preview) {
        alert("Завантажте 2 фото");
        return;
      }
      createRecipe({
        ...recipeValues,
        previewImage: loadedPhotosInfo.preview.uploadFile ?? loadedPhotosInfo.preview?.src,
        mainImage: loadedPhotosInfo.main.uploadFile ?? loadedPhotosInfo.main?.src,
      });
    }
    if (method === "UPDATE" && id) {
      const newMain = loadedPhotosInfo?.main?.uploadFile;
      const newPreview = loadedPhotosInfo?.preview?.uploadFile;

      const newRecipe: PutUpdateRecipeReq = {
        ...recipe,
        ...recipeValues,
        ...(newMain && { mainImage: newMain }),
        ...(newPreview && { previewImage: newPreview }),
      };

      updateRecipe({ id, body: newRecipe });
    }
  };

  return {
    handleSubmitForm,
    nameValue,
    handleChangeNameValue,
    categoryValue,
    setCategoryValue,
    isGeneratingRecipe,
    generateRecipeByUrl,
    categories,
    loadedPhotoContextValue,
    isCreating,
    isUpdating,
    description,
    setDescription,
    timerValue,
    setTimerValue,
  };
};
