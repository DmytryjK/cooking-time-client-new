import { MouseEvent, useState } from "react";
import { Star } from "../../../../../shared-components/Star/Star";
import { useSetRecipeRating } from "../../../../../queries/post-set-recipe-rating/post-set-recipe-rating.mutation";

const getMappedRating = (rating: number) => {
  return Array.from({ length: 5 }).map((_, index) => {
    const diff = rating - index;
    if (diff >= 1) return { fill: 1 };
    if (diff > 0) return { fill: diff };
    return { fill: 0 };
  });
};

const getRatingsLabel = (count: number): string => {
  if (count % 100 >= 11 && count % 100 <= 19) return "оцінок";

  switch (count % 10) {
    case 1:
      return "оцінка";
    case 2:
    case 3:
    case 4:
      return "оцінки";
    default:
      return "оцінок";
  }
};

export const RecipeRating = ({
  recipeId,
  ratingsCount,
  avgRating,
  userRating,
  interactive,
}: {
  recipeId: string;
  ratingsCount: number;
  avgRating: number;
  userRating?: number;
  interactive?: boolean;
}) => {
  const [savedRating, setSavedRating] = useState(userRating ?? 0);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const { mutateAsync: setRecipeRating } = useSetRecipeRating();

  const displayRating = hoverRating ?? savedRating;

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = x / rect.width;
    setHoverRating(Math.max(1, Math.ceil(percent * 5)));
  };

  const handleMouseLeave = () => {
    setHoverRating(null);
  };

  const handleSetRating = () => {
    if (!displayRating) return;
    setSavedRating(displayRating);
    setRecipeRating({ recipeId, body: { rating: displayRating } });
  };

  return (
    <div className="mt-2 w-full gap-y-20 flex justify-between flex-col flex-wrap">
      {interactive ? (
        <div className="flex gap-2 items-center">
          <span>Ваша оцінка:</span>
          <div className="flex" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onClick={handleSetRating}>
            {getMappedRating(displayRating).map((rt, index) => (
              <Star key={index} fill={rt.fill} className="cursor-pointer shrink-0" />
            ))}
          </div>
          <div className="w-3 pt-0.5">
            <span>{displayRating}</span>
          </div>
        </div>
      ) : (
        <div className="flex gap-2 justify-center">
          <div className="flex">
            <Star fill={avgRating / 5} />
          </div>
          {avgRating} ({ratingsCount} {getRatingsLabel(ratingsCount)})
        </div>
      )}
    </div>
  );
};
