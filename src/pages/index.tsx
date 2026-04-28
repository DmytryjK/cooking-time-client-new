import { lazy } from "react";
import AuthorizationPage from "./AuthorizationPage/AuthorizationPage";

const AddRecipePage = lazy(() => import("./AddRecipePage/AddRecipePage"));
const MainPage = lazy(() => import("./MainPage/MainPage"));
const AboutRecipePage = lazy(() => import("./AboutRecipePage/AboutRecipePage"));
const FavoritesPage = lazy(() => import("./FavoritesPage/FavoritesPage"));
const Page404 = lazy(() => import("./Page404/Page404"));
const GoogleAuthSuccessPage = lazy(() => import("./GoogleAuthSuccessPage/GoogleAuthSuccessPage"));

export { AddRecipePage, MainPage, AboutRecipePage, FavoritesPage, AuthorizationPage, Page404, GoogleAuthSuccessPage };
