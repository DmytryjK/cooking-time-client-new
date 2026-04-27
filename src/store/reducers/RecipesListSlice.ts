import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Recipe, TagsType, Loading } from "../../types/type";

type PayloadActionFilter = {
  searchInput: string;
  searchTags: TagsType[];
  searchCategories: string[];
};

export interface SearchedConstruction {
  userSearchTag: string;
}

type InitialStateRecipes = {
  recipes: Recipe[];
  filteredRecipes: Recipe[];
  searchedTagFilled: SearchedConstruction[];
  recipe: Recipe | null;
  loadingRecipe: Loading;
  loadingRecipes: Loading;
  loadingForm: Loading;
  removeRecipeLoading: Loading;
  error: null | unknown;
  removeRecipeError: null | unknown;
  searchedNameOfDishes: string;
};

const initialState: InitialStateRecipes = {
  recipes: [],
  filteredRecipes: [],
  searchedTagFilled: [],
  recipe: null,
  loadingRecipe: "idle",
  loadingRecipes: "idle",
  loadingForm: "idle",
  removeRecipeLoading: "idle",
  error: null,
  removeRecipeError: null,
  searchedNameOfDishes: "",
};

export const recepieListSlice = createSlice({
  name: "recepiesList",
  initialState,
  reducers: {
    setCurrentRecipes: (state, action: PayloadAction<Recipe[]>) => {
      state.recipes = action.payload;
    },
    setCurrentFilteredRecipes: (state, action: PayloadAction<Recipe[]>) => {
      state.filteredRecipes = action.payload;
    },
    addNewRecipe: (state, action: PayloadAction<Recipe>) => {
      state.recipes.push(action.payload);
    },
    localRemoveRecipe: (state, action: PayloadAction<string | number>) => {
      state.recipes = state.recipes.filter((recipe) => recipe.id !== action.payload);
      state.filteredRecipes = state.filteredRecipes.filter((recipe) => recipe.id !== action.payload);
    },
    removeSearchedTagFilled: (state, action: PayloadAction<string>) => {
      const tagText = action.payload;
      state.searchedTagFilled = state.searchedTagFilled.filter((item) => item.userSearchTag !== tagText);
    },
    resetSearchedTagFilled: (state) => {
      state.searchedTagFilled = [];
    },
  },
});

export const {
  addNewRecipe,
  setCurrentRecipes,
  setCurrentFilteredRecipes,
  localRemoveRecipe,
  removeSearchedTagFilled,
  resetSearchedTagFilled,
} = recepieListSlice.actions;

export default recepieListSlice.reducer;
