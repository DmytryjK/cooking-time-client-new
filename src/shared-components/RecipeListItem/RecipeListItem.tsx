import LazyLoad from "react-lazy-load";
import { useRef, Dispatch, SetStateAction, memo } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { NavLink, useNavigate } from "react-router-dom";
import { easeOut, LazyMotion, m, domMax } from "framer-motion";
import RemoveRecipeByAdmin from "./RemoveRecipeByAdmin/RemoveRecipeByAdmin";
import { ImageType, Recipe } from "../../types/type";
import { useAppSelector } from "../../hooks/hooks";
import { Star } from "../Star/Star";
import { PAGE_ROUTES } from "../../config/page-routes";
import { cn } from "../../utils/cn";
import "./RecipeListItem.scss";

interface RecipeListItemProps {
  recipe: Recipe;
  addToFavorite: HandleAddToFavorite;
  index: number;
  setIsCardAnimateEnd?: Dispatch<SetStateAction<boolean>>;
  className?: string;
}

type HandleAddToFavorite = (recipeId: string, isFavorite: boolean) => void;

const RecipeListItem = ({ recipe, addToFavorite, index, setIsCardAnimateEnd, className }: RecipeListItemProps) => {
  const { ingredients, id, title, cookingTimeInMinutes, images, isFavorite, category, avgRating } = recipe;
  const previewImg = images?.find((img) => img.type === ImageType.preview);
  const { id: uid, role } = useAppSelector((state) => state.authentication.user) || {};
  const isAdmin = role === "admin";
  const navigate = useNavigate();
  const noderef = useRef(null);
  const [emblaRef] = useEmblaCarousel({ dragFree: true, duration: 1 });
  const hours = Math.floor(cookingTimeInMinutes / 60);
  const minutes = cookingTimeInMinutes % 60;

  return (
    <LazyMotion features={domMax} strict>
      <m.div
        className={cn("recipe-card", className)}
        ref={noderef}
        initial={{ opacity: 0.5, y: 15, scale: 0.96, display: "none" }}
        layout
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
          display: "block",
          transition: {
            duration: 0.25,
            delay: index * 0.05,
            ease: easeOut,
          },
        }}
        exit={{
          opacity: 0,
          y: 0,
          scale: 0.8,
          transition: {
            duration: 0.4,
            delay: 0,
            ease: easeOut,
            transitionEnd: {
              display: "none",
            },
          },
        }}
        onAnimationStart={() => setIsCardAnimateEnd && setIsCardAnimateEnd(false)}
      >
        {isAdmin && <RemoveRecipeByAdmin id={id} />}
        <div className="recipe-card__wrapper">
          <NavLink className="recipe-card__img-wrapper" to={`${PAGE_ROUTES.RECIPE}/${id}`}>
            <LazyLoad width={290} height={290}>
              <img
                className="recipe-card__image"
                width={290}
                height={290}
                src={previewImg?.imageUrl || ""}
                alt={title}
              />
            </LazyLoad>
          </NavLink>
          <div className="recipe-card__content-text">
            <h2 className="recipe-card__title" title={title}>
              <NavLink to={`${PAGE_ROUTES.RECIPE}/${id}`}>{title}</NavLink>
            </h2>
            <div className="recipe-card__inner-wrapper">
              <div className="flex items-end justify-between gap-2">
                <span className={cn(cookingTimeInMinutes && "recipe-card__timer")}>
                  {hours > 0 && `${hours} год`} {minutes > 0 && `${minutes} хв`}
                </span>
                <span className="flex items-end gap-0.5">
                  <span className="font-medium text-md leading-none">{avgRating}</span>
                  <Star fill={avgRating / 5} />
                </span>
              </div>

              <div className="recipe-card__product-tags-slider embla" ref={emblaRef}>
                <ul className="recipe-card__product-tags product-tags embla__container">
                  {ingredients?.map((item) => (
                    <li
                      key={item.id}
                      className={`product-tags__item embla__slide select-none ${item.matched ? "matched" : ""}`}
                    >
                      {item.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="recipe-card__current-category">{category.name}</div>
        </div>
        <button
          className={isFavorite ? "recipe-card__favorite-btn active" : "recipe-card__favorite-btn"}
          type="button"
          aria-label="додати в обране"
          onClick={() => {
            uid ? addToFavorite(id, recipe.isFavorite) : navigate("/favorites");
          }}
        />
      </m.div>
    </LazyMotion>
  );
};

export default memo(RecipeListItem);
