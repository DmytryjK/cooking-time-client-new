import RecipeList from "./RecipeList/RecipeLIst";
import { useAppSelector } from "../../hooks/hooks";
import Filters from "../../shared-components/Filters/Filters";
import { useGetRecipes } from "../../queries/get-recipes/get-recipes.query";
import Loader from "../../shared-components/Loader/Loader";
import "./MainPage.scss";

const MainPage = () => {
  const searchValue = useAppSelector((state) => state.filters.searchInput);
  const tags = useAppSelector((state) => state.filters.searchTags);
  const searchCategories = useAppSelector((state) => state.filters.searchCategories);

  const {
    data: recipes,
    isLoading,
    isError,
    isSuccess,
  } = useGetRecipes({
    search: searchValue,
    ingredients: tags.map((tag) => tag.tagText),
    categories: searchCategories,
  });

  return (
    <section className="main">
      <div className="container">
        <Filters title="Всі рецепти" currentPage="MAIN" isEmpty={isSuccess && recipes.length === 0} />
        {isLoading ? <Loader /> : <RecipeList recipes={recipes} />}
        {isError && <div>Сталась помилка при завантаженні контенту.</div>}
      </div>
    </section>
  );
};

export default MainPage;
