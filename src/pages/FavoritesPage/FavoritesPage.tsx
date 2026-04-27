import FavoriteRecipeList from "./components/FavoriteRecipeList/FavoriteRecipeList";
import Filters from "../../shared-components/Filters/Filters";
import { useAppSelector } from "../../hooks/hooks";
import { useGetFavoriteRecipes } from "../../queries/get-favorite-recipes/get-favorite-recipes.query";
import UnauthorizedFavoriteList from "./components/UnauthorizedFavoriteList/UnauthorizedFavoriteList";
import "./FavoritesPage.scss";
import Loader from "../../shared-components/Loader/Loader";

const FavoritesPage = () => {
  const { user } = useAppSelector((state) => state.authentication);
  const { data: favoriteRecipes, isFetching } = useGetFavoriteRecipes({});

  return (
    <section className="favorites">
      <div className="container">
        {user && favoriteRecipes && (
          <Filters isEmpty={favoriteRecipes.length > 0} title="Мої обрані" currentPage="FAVORITES" />
        )}
        {user ? <FavoriteRecipeList favoriteRecipes={favoriteRecipes} /> : <UnauthorizedFavoriteList />}
        {isFetching && <Loader />}
      </div>
    </section>
  );
};

export default FavoritesPage;
