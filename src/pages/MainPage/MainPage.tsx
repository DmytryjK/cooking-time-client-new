import RecipeList from "./RecipeList/RecipeLIst";
import { useAppSelector } from "../../hooks/hooks";
import Filters from "../../shared-components/Filters/Filters";
import { useGetRecipes } from "../../queries/get-recipes/get-recipes.query";
import Loader from "../../shared-components/Loader/Loader";
import "./MainPage.scss";
import { useEffect } from "react";
import { throttle } from "../../utils/throttle";

const MainPage = () => {
  const searchValue = useAppSelector((state) => state.filters.searchInput);
  const tags = useAppSelector((state) => state.filters.searchTags);
  const searchCategories = useAppSelector((state) => state.filters.searchCategories);

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, isLoading, isError, status } =
    useGetRecipes({
      search: searchValue,
      ingredients: tags.map((tag) => tag.tagText),
      categories: searchCategories,
      limit: 12,
    });

  const recipes = data?.pages.flatMap((page) => page.recipes) ?? [];

  useEffect(() => {
    const handleScroll = throttle(() => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      if (scrollHeight - scrollTop - clientHeight < 300 && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }, 100);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <section className="main">
      <div className="container">
        <Filters title="Всі рецепти" currentPage="MAIN" isEmpty={status === "success" && recipes?.length === 0} />
        {isLoading ? <Loader /> : <RecipeList recipes={recipes} />}
        {isFetching && (
          <div className="mx-auto flex justify-center items-center my-4 font-semibold relative gap-1">
            <span className="animate-pulse">Завантаження рецептів...</span>{" "}
            <Loader className="static w-6 translate-x-0 translate-y-0" />
          </div>
        )}
        {isError && <div>Сталась помилка при завантаженні контенту.</div>}
      </div>
    </section>
  );
};

export default MainPage;
