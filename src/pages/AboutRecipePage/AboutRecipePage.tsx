import { LazyMotion, AnimatePresence, domAnimation } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PopUp from "../../shared-components/PopUp/PopUp";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import EditRecipeForm from "./components/EditRecipeForm/EditRecipeForm";
import { Recipe } from "../../types/type";
import RecentlyViewed from "./components/RecentlyViewed/RecentlyViewed";
import RecipeContent from "./components/RecipeContent/RecipeContent";
import "./AboutRecipePage.scss";
import Loader from "../../shared-components/Loader/Loader";
import { useGetRecipeById } from "../../queries/get-recipe-by-id/get-recipe-by-id.query";
import { useGetRecentlyViewedRecipes } from "../../queries/get-recently-viewed-recipes/get-recently-viewed-recipes.query";

const AboutRecipePage = () => {
  const recipeId = useParams();
  const { id: uid } = useAppSelector((state) => state.authentication.user) || {};
  const dispatch = useAppDispatch();
  const [isEditActive, setIsEditActive] = useState<boolean>(false);
  const [currentRecipeToEdit, setCurrentRecipeToEdit] = useState<Recipe | null>(null);
  const [attentionWindowOpen, setAttentionWindowOpen] = useState<boolean>(false);
  const { data: recipe, isSuccess, isPending, error } = useGetRecipeById({ id: recipeId.id });
  const { data: recentlyRecipes } = useGetRecentlyViewedRecipes({});

  const handleEditRecipe = useCallback(
    (fetchedRecepieInfo: Recipe) => {
      setIsEditActive(true);
      setCurrentRecipeToEdit(fetchedRecepieInfo);
    },
    [recipe?.id],
  );

  const handleBtnPopUpAction = useCallback(() => {
    setAttentionWindowOpen(false);
    setIsEditActive(false);
  }, []);

  return (
    <LazyMotion features={domAnimation} strict>
      <section className="about-recipe">
        <div className="container">
          <PopUp
            isPopUpShow={attentionWindowOpen}
            setIsPopUpShow={setAttentionWindowOpen}
            text="Ви впевнені, що хочете повернутись назад?"
            subtext="Якщо Ви закриєте редактор, то зміни не буде збережено."
            additionalBtnText="Скасувати редагування"
            additionalBtnAction={handleBtnPopUpAction}
            setIsEditActive={setIsEditActive}
          />

          <main className="recipe-page">
            {isEditActive && currentRecipeToEdit && (
              <EditRecipeForm
                key="editRecipe"
                recipe={currentRecipeToEdit}
                setIsAttentionOpen={setAttentionWindowOpen}
                setIsEditActive={setIsEditActive}
              />
            )}
            <AnimatePresence>
              {recipe && isSuccess && !isEditActive && (
                <RecipeContent key={`content-${recipe.id}`} recipe={recipe} handleEditRecipe={handleEditRecipe} />
              )}
            </AnimatePresence>
            {isPending && <Loader />}
            {error ? "щось пішло не так(" : ""}
          </main>
          {recentlyRecipes && recentlyRecipes.length > 0 && <RecentlyViewed recentlyRecipes={recentlyRecipes} />}
        </div>
      </section>
    </LazyMotion>
  );
};

export default AboutRecipePage;
