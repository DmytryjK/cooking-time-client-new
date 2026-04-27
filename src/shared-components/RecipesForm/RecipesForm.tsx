import { useState, useEffect, createContext, Dispatch, SetStateAction, useMemo } from "react";
import ReactQuill from "react-quill";
import ImageCompress from "quill-image-compress";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import Ingredients from "./components/Ingredients/Ingredients";
import UploadPhotos from "./components/UploadPhotos/UploadPhotos";
import CustomSelect from "../CustomSelect/CustomSelect";
import { UploadFileType, Loading, Category, Recipe } from "../../types/type";
import { clearAllTags } from "../../store/reducers/CreateRecipeFormSlice";

import { useGetCategories } from "../../queries/get-categories/get-recipes.query";
import { useCreateRecipe } from "../../queries/post-create-recipe/post-create-recipe.mutation";
import "./RecipesForm.scss";
import "react-quill/dist/quill.snow.css";
import { useUpdateRecipe } from "../../queries/put-update-recipe/put-update-recipe.mutation";
import { PutUpdateRecipeReq } from "../../api/put-update-recipe/put-update-recipe.type";

type Props = {
  method: "POST" | "UPDATE";
  recipe?: Recipe;
  onSuccess?: () => void;
};

type LoadedPhotoType = {
  id: string;
  src: string;
  srcForRemove?: string;
  uploadFile?: UploadFileType | any;
};

export interface LoadedPhotos {
  main?: LoadedPhotoType;
  preview?: LoadedPhotoType;
}

type LoadedPhotoContextType = {
  loadedPhotosInfo: LoadedPhotos | undefined;
  setLoadedPhotosInfo: Dispatch<SetStateAction<LoadedPhotos | undefined>>;
};

export const LoadedPhotoContext = createContext<LoadedPhotoContextType>({
  loadedPhotosInfo: undefined,
  setLoadedPhotosInfo: () => undefined,
});

ReactQuill.Quill.register("modules/imageCompress", ImageCompress);

const RecipesForm = ({ recipe, method, onSuccess }: Props) => {
  const {
    id,
    title,
    category,
    cookingTimeInMinutes,
    description: recipeDescription,
    images,
    ingredients,
  } = recipe || {};
  const mainPhoto = images?.find((img) => img.type === "MAIN")?.imageUrl;
  const previewPhoto = images?.find((img) => img.type === "PREVIEW")?.imageUrl;
  const initialPhotosState = {
    ...(mainPhoto ? { main: { id: "main", src: mainPhoto } } : {}),
    ...(previewPhoto ? { preview: { id: "preview", src: previewPhoto } } : {}),
  };

  const { mutateAsync: createRecipe, isPending: isCreating } = useCreateRecipe({ onSuccess });
  const { mutateAsync: updateRecipe, isPending: isUpdating } = useUpdateRecipe({ onSuccess });

  const { loadingForm } = useAppSelector((state) => state.recipes);
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
  const user = useAppSelector((state) => state.authentication.user) || {};

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (loadingForm === "succeeded" && method === "POST") {
      setNameValue("");
      setCategoryValue(undefined);
      dispatch(clearAllTags());
      setLoadedPhotosInfo(undefined);
      setDescription("");
      setTimerValue({ hours: 0, minutes: 0 });
    }
  }, [loadingForm]);

  const handleSubmitForm = async (method: string) => {
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

    if (method === "POST") {
      if (!loadedPhotosInfo || !loadedPhotosInfo.main || !loadedPhotosInfo.preview) {
        alert("Завантажте 2 фото");
        return;
      }
      createRecipe(
        {
          title: nameValue,
          ingredients: tags,
          description,
          categoryId: categoryValue.id,
          cookingTimeInMinutes: +timerValue.hours * 60 + +timerValue.minutes,
          previewImage: loadedPhotosInfo.preview.uploadFile,
          mainImage: loadedPhotosInfo.main.uploadFile,
        },
        user,
      );
    }
    if (method === "UPDATE" && id) {
      const newMain = loadedPhotosInfo?.main?.uploadFile;
      const newPreview = loadedPhotosInfo?.preview?.uploadFile;

      const newRecipe: PutUpdateRecipeReq = {
        ...recipe,
        title: nameValue,
        ingredients: tags,
        description,
        categoryId: categoryValue.id,
        cookingTimeInMinutes: +timerValue.hours * 60 + +timerValue.minutes,
        ...(newMain && { mainImage: newMain }),
        ...(newPreview && { previewImage: newPreview }),
      };

      updateRecipe({ id, body: newRecipe });
    }
  };

  const options = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote"],
    ["link", "image"],
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],
    ["clean"],
  ];

  return (
    <form
      className="form add-recepie__form"
      onKeyDown={(e) => e.code === "Enter" && e.preventDefault()}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmitForm(method);
      }}
    >
      <div className="form__fields-wrapper">
        <label className="form__name-label form__label">
          <span>Назва страви</span>
          <input
            className="form__name-recepie form__input"
            type="text"
            name="Назва страви"
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value)}
          />
        </label>
        <div className="form__field-category">
          <label className="form__name-label form__label">
            <span>Категорія</span>
          </label>
          <CustomSelect
            value={categoryValue}
            initialCheckedValue={categoryValue}
            setValue={setCategoryValue}
            fieldValues={categories || []}
            selectTitle="Оберіть категорію"
            getLabel={(cat) => cat.name}
          />
        </div>
      </div>
      <div className="form__fields-wrapper">
        <Ingredients localingredients={ingredients} />
        <fieldset className="form__timer-fiedls timer">
          <legend className="form__label">Час приготування</legend>
          <div className="timer__wrapper">
            <label className="timer__label-hours">
              <input
                className="timer__input-hours form__input"
                type="number"
                name="години"
                value={timerValue.hours}
                placeholder="00"
                onChange={(e) => {
                  let { value } = e.target;
                  if (+value < 0) {
                    value = "0";
                  }
                  setTimerValue((prev) => {
                    return {
                      minutes: prev?.minutes || 0,
                      hours: +value,
                    };
                  });
                }}
              />
              <span>годин</span>
            </label>
            <label className="timer__label-minutes">
              <input
                className="timer__input-minutes form__input"
                type="number"
                name="хвилини"
                value={timerValue.minutes}
                placeholder="00"
                onChange={(e) => {
                  let { value } = e.target;
                  if (+value > 59) {
                    value = "59";
                  } else if (+value < 0) {
                    value = "0";
                  }
                  setTimerValue((prev) => {
                    return {
                      hours: prev?.hours || 0,
                      minutes: +value,
                    };
                  });
                }}
              />
              <span>хвилин</span>
            </label>
          </div>
        </fieldset>
      </div>
      <div className="form__fields-wrapper">
        <LoadedPhotoContext.Provider
          value={useMemo(() => {
            return {
              loadedPhotosInfo,
              setLoadedPhotosInfo,
            };
          }, [loadedPhotosInfo, setLoadedPhotosInfo])}
        >
          <UploadPhotos />
        </LoadedPhotoContext.Provider>
      </div>
      <div className="form__fields-wrapper form-descr">
        <span className="form-descr__title form__label">Процес приготування</span>
        <ReactQuill
          className="form-descr__editor"
          placeholder="Опишіть процес приготування..."
          theme="snow"
          modules={{
            toolbar: {
              container: options,
            },
            imageCompress: {
              quality: 0.6,
              maxWidth: 400,
              maxHeight: 300,
              imageType: "image/jpeg",
              debug: true,
              suppressErrorLogging: false,
              insertIntoEditor: undefined,
            },
          }}
          value={description}
          onChange={setDescription}
        />
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
