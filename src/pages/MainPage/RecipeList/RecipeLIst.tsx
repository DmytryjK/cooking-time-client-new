import { useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import RecipeListItem from "../../../shared-components/RecipeListItem/RecipeListItem";
import type { Recipe } from "../../../types/type";
import "./RecipeLIst.scss";
import { useToggleFavorite } from "../../../queries/post-toggle-favorite/post-toggle-favorite.mutation";

const RecipeList = ({ recipes }: { recipes?: Recipe[] }) => {
  const { mutateAsync: toggleFavorite } = useToggleFavorite();

  const handleAddFavorite = useCallback((recipeId: string, isfavorite: boolean) => {
    toggleFavorite({ recipeId, isFavorite: !isfavorite });
  }, []);

  return (
    <div className="recipe-list-main">
      <ul className=" recipe-list">
        <AnimatePresence>
          {recipes?.map((item, index) => (
            <li className="recipe-list__item" key={item.id}>
              <RecipeListItem recipe={item} addToFavorite={handleAddFavorite} index={index} />
            </li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
};

export default RecipeList;
