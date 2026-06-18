import { createContext } from "react";

import { useAppSelector } from "../../hooks/hooks";
import Ingredients from "./components/Ingredients/Ingredients";
import UploadPhotos from "./components/UploadPhotos/UploadPhotos";
import CustomSelect from "../CustomSelect/CustomSelect";
import AutoGenerationRecipe from "./components/AutoGenerationRecipe/AutoGenerationRecipe";
import CookingTime from "./components/CookingTime/CookingTime";
import { LoadedPhotoContextType, RecipesFormProps } from "./RecipesForm.type";
import RecipeDescriptionArea from "./components/RecipeDescriptionArea/RecipeDescriptionArea";
import { useRecipesForm } from "./RecipesForm.logic";
import "./RecipesForm.scss";

export const LoadedPhotoContext = createContext<LoadedPhotoContextType>({
  loadedPhotosInfo: undefined,
  setLoadedPhotosInfo: () => undefined,
});

const RecipesForm = ({ recipe, method, onSuccess }: RecipesFormProps) => {
  const { user } = useAppSelector((state) => state.authentication);
  const isGenerateBtnActive = method === "POST" && user;
  const { ingredients } = recipe || {};

  const {
    handleSubmitForm,
    nameValue,
    handleChangeNameValue,
    categoryValue,
    setCategoryValue,
    isGeneratingRecipe,
    timerValue,
    setTimerValue,
    description,
    setDescription,
    generateRecipeByUrl,
    categories,
    loadedPhotoContextValue,
    isCreating,
    isUpdating,
  } = useRecipesForm({ recipe, method, onSuccess });

  return (
    <form
      className="form add-recepie__form"
      onKeyDown={(e) => e.code === "Enter" && e.preventDefault()}
      onSubmit={handleSubmitForm}
    >
      <div className="form__fields-wrapper">
        {isGenerateBtnActive && (
          <AutoGenerationRecipe isGeneratingRecipe={isGeneratingRecipe} generateRecipeByUrl={generateRecipeByUrl} />
        )}
        <label className="form__name-label form__label">
          <span>Назва страви</span>
          <input
            className="form__name-recepie form__input"
            type="text"
            name="Назва страви"
            value={nameValue}
            onChange={handleChangeNameValue}
          />
        </label>
        <div className="form__field-category">
          <label className="form__name-label form__label">
            <span>Категорія</span>
          </label>
          <CustomSelect
            controlled
            value={categoryValue}
            setValue={setCategoryValue}
            fieldValues={categories || []}
            selectTitle="Оберіть категорію"
            getLabel={(cat) => cat.name}
          />
        </div>
      </div>
      <div className="form__fields-wrapper">
        <Ingredients localingredients={ingredients} />
        <CookingTime
          timerValue={timerValue}
          onChange={({ hours, minutes }: { hours: number; minutes: number }) => setTimerValue({ minutes, hours })}
        />
      </div>
      <div className="form__fields-wrapper">
        <LoadedPhotoContext.Provider value={loadedPhotoContextValue}>
          <UploadPhotos />
        </LoadedPhotoContext.Provider>
      </div>
      <div className="form__fields-wrapper form-descr">
        <RecipeDescriptionArea value={description} onChange={setDescription} />
      </div>
      <button className={`form__submit addRecipe-btn ${isCreating || isUpdating ? "loading" : ""}`} type="submit">
        {method === "POST" ? "Додати рецепт" : "Оновити рецепт"}
        {isCreating || isUpdating ? (
          <span className="addRecipe-btn__loading-dots">
            <span className="addRecipe-btn__loading-dot" />
            <span className="addRecipe-btn__loading-dot" />
            <span className="addRecipe-btn__loading-dot" />
          </span>
        ) : (
          ""
        )}
      </button>
    </form>
  );
};

export default RecipesForm;
