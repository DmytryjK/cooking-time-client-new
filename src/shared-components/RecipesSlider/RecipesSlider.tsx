import { FC, memo } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { PrevButton, NextButton, usePrevNextButtons } from "./components/SliderArrowBtns";
import RecipeListItem from "../RecipeListItem/RecipeListItem";
import type { Recipe } from "../../types/type";
import { useToggleFavorite } from "../../queries/post-toggle-favorite/post-toggle-favorite.mutation";
import "./RecipesSlider.scss";

type PropType = {
  slides: Recipe[];
  options?: EmblaOptionsType;
};

const RecipesSlider: FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);
  const { mutateAsync: toggleFavorite } = useToggleFavorite();

  const handleAddFavorite = (recipeId: string, isFavorite: boolean) => {
    toggleFavorite({ recipeId, isFavorite: !isFavorite });
  };

  return (
    <div className="embla embla-recipes">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container embla__container-recipes">
          {slides.map((item, index) => {
            return (
              <RecipeListItem
                key={`recently-viewed-${item.id}`}
                recipe={item}
                addToFavorite={handleAddFavorite}
                index={index}
                className="embla__slide embla__slide-recipes"
              />
            );
          })}
        </div>
      </div>
      <div className="embla__controls embla-recipes__controls">
        <div className="embla__buttons embla-recipes__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </div>
  );
};

export default memo(RecipesSlider);
