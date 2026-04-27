import { FC, memo, useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../../../hooks/hooks";
import EmptyFavoriteList from "../EmptyFavoriteList/EmptyFavoriteList";
import UnauthorizedFavoriteList from "../UnauthorizedFavoriteList/UnauthorizedFavoriteList";
import RecipeListItem from "../../../../shared-components/RecipeListItem/RecipeListItem";
import type { Recipe } from "../../../../types/type";
import "./FavoriteRecipeList.scss";
import { GetFavoriteRecipesRes } from "../../../../api/get-favorite-recipes/get-favorite-recipes.type";
import { useToggleFavorite } from "../../../../queries/post-toggle-favorite/post-toggle-favorite.mutation";

interface FavoriteRecipeListProps {
  favoriteRecipes?: GetFavoriteRecipesRes;
}

const FavoriteRecipeList: FC<FavoriteRecipeListProps> = ({ favoriteRecipes }) => {
  const { mutateAsync: toggleFavorite } = useToggleFavorite();

  const handleAddFavorite = useCallback((recipeId: string, isfavorite: boolean) => {
    toggleFavorite({ recipeId, isFavorite: !isfavorite });
  }, []);
  // const favoriteRecipes = useAppSelector((state) => state.favoriteRecipes.favoriteRecipes);
  // const loadingFavorites = useAppSelector((state) => state.favoriteRecipes.loadingRecipesById);
  // const loadingRecipeIdToFirebase = useAppSelector((state) => state.favoriteRecipes.loadingRecipeIdToFirebase);
  // const { data: favoriteRecipes } = useFavoriteRecipes();
  // const error = useAppSelector((state) => state.favoriteRecipes.error);
  const { id: uid } = useAppSelector((state) => state.authentication.user) || {};
  const [animateOnLoading, setAnimateOnLoading] = useState(false);
  const [isCardAnimateEnd, setIsCardAnimateEnd] = useState(true);
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   if (uid && loadingFavorites === "idle") {
  //     dispatch(fetchFavoritesRecipes(uid)).then((result) => {
  //       dispatch(setCurrentFilteredFavoriteRecipes(result.payload as Recipe[]));
  //     });
  //   }
  // }, [uid, favoriteRecipes, loadingFavorites]);

  // useEffect(() => {
  //   if (uid) {
  //     dispatch(setCurrentFilteredFavoriteRecipes(favoriteRecipes));
  //   }
  // }, [uid, favoriteRecipes, loadingFavorites, loadingRecipeIdToFirebase]);

  // const registerAttention = () => {
  //   return <UnauthorizedFavoriteList />;
  // };

  const renderItems = () => {
    return favoriteRecipes?.map((item, index) => {
      return (
        <li className="recipe-list__item" key={`favorite-recipes-${item.id}`}>
          <RecipeListItem
            recipe={item}
            addToFavorite={handleAddFavorite}
            index={index}
            setIsCardAnimateEnd={setIsCardAnimateEnd}
          />
        </li>
      );
    });
  };

  return (
    <div className="recipe-list-favorites">
      <ul className="recipe-list">
        <AnimatePresence onExitComplete={() => setIsCardAnimateEnd(true)}>
          {favoriteRecipes?.length === 0 && isCardAnimateEnd && <EmptyFavoriteList key="empty-favorite-item" />}
          {renderItems()}
        </AnimatePresence>
      </ul>
    </div>
  );
};

export default memo(FavoriteRecipeList);
