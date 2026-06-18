import { useState } from "react";
import { cn } from "../../../../utils/cn";
import { UseMutateAsyncFunction } from "@tanstack/react-query";
import { GeneratedRecipeByLLM } from "../../../../types/type";

interface AutoGenerationRecipeProps {
  isGeneratingRecipe: boolean;
  generateRecipeByUrl: UseMutateAsyncFunction<GeneratedRecipeByLLM, Error, string, unknown>;
}

const AutoGenerationRecipe = ({ isGeneratingRecipe, generateRecipeByUrl }: AutoGenerationRecipeProps) => {
  const [videoUrl, setVideoUrl] = useState("");
  return (
    <div
      className="relative mb-2 w-full max-w-[508px] overflow-hidden rounded-xl border bg-gradient-to-br from-accent-light via-light to-white p-5"
      role="region"
      aria-labelledby="ai-recipe-suggestion-title"
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/10" aria-hidden />
      <div className="pointer-events-none absolute -bottom-6 left-1/3 h-20 w-20 rounded-full bg-accent/5" aria-hidden />

      <div className="relative flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-ingredients">AI-генерація рецепта</span>
        </div>

        <div>
          <h2 id="ai-recipe-suggestion-title" className="text-lg font-semibold leading-snug text-text">
            Заповніть рецепт з відео
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed text-ingredients">
            Вставте посилання на TikTok або Instagram — форма заповниться автоматично.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-md border border-border-input/80 bg-light/80 px-2.5 py-1 text-xs font-medium text-text">
              TikTok
            </span>
            <span className="rounded-md border border-border-input/80 bg-light/80 px-2.5 py-1 text-xs font-medium text-text">
              Instagram
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <label className="flex min-w-0 flex-1 flex-col gap-2">
            <span className="text-sm font-semibold text-accent">Посилання на відео</span>
            <input
              className="form__input"
              type="url"
              name="videoUrl"
              placeholder="https://www.tiktok.com/..."
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              disabled={isGeneratingRecipe}
            />
          </label>
          <button
            type="button"
            className={cn(
              "relative shrink-0 rounded-lg bg-accent px-5 py-4 text-sm font-semibold text-light transition-colors hover:bg-accent-second focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:min-w-[200px]",
              (isGeneratingRecipe || !videoUrl.trim()) && "pointer-events-none opacity-70",
            )}
            disabled={isGeneratingRecipe || !videoUrl.trim()}
            onClick={() => generateRecipeByUrl(videoUrl)}
          >
            {isGeneratingRecipe ? (
              <span className="addRecipe-btn__loading-dots absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="addRecipe-btn__loading-dot" />
                <span className="addRecipe-btn__loading-dot" />
                <span className="addRecipe-btn__loading-dot" />
              </span>
            ) : null}
            <span className={cn(isGeneratingRecipe && "opacity-0")}>Заповнити форму</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AutoGenerationRecipe;
