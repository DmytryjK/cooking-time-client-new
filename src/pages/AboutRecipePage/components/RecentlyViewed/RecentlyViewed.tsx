import { EmblaOptionsType } from "embla-carousel";
import RecipesSlider from "../../../../shared-components/RecipesSlider/RecipesSlider";
import { Recipe } from "../../../../types/type";
import "./RecentlyViewed.scss";

const RecentlyViewed = ({ recentlyRecipes }: { recentlyRecipes?: Recipe[] }) => {
  const OPTIONS: EmblaOptionsType = {
    align: "start",
    duration: 20,
    skipSnaps: true,
  };

  return (
    <section className="recently-views">
      <h2 className="recently-views__title">Нещодавно переглянуті</h2>
      {recentlyRecipes && recentlyRecipes.length > 0 && <RecipesSlider slides={recentlyRecipes} options={OPTIONS} />}
    </section>
  );
};

export default RecentlyViewed;
