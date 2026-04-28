import { createBrowserRouter, redirect } from "react-router-dom";
import {
  MainPage,
  AddRecipePage,
  AboutRecipePage,
  FavoritesPage,
  AuthorizationPage,
  GoogleAuthSuccessPage,
} from "./pages";
import Layout from "./pages/Layout/Layout";
import { Page404 } from "./pages";
import Cookies from "js-cookie";
import { getMe } from "./api/get-me/get-me";
import UnauthorizedLayout from "./pages/UnauthorizedLayout/UnauthorizedLayout";
import { PAGE_ROUTES } from "./config/page-routes";
import { Suspense } from "react";

export const layoutLoader = async () => {
  const token = Cookies.get("accessToken");
  if (!token) return null;
  try {
    return await getMe();
  } catch {
    return null;
  }
};

export const authLoader = async () => {
  const token = Cookies.get("accessToken");
  if (token) {
    throw redirect("/");
  }
  return null;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    loader: layoutLoader,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: "add-recipe",
        element: <AddRecipePage />,
      },
      {
        path: "favorites",
        element: <FavoritesPage />,
      },
      {
        path: "about-recipe/:id",
        element: <AboutRecipePage />,
      },
      {
        path: "*",
        element: <Page404 />,
      },
    ],
  },
  {
    path: "/auth",
    element: <UnauthorizedLayout />,
    loader: authLoader,
    children: [
      {
        path: "sign-up",
        element: <AuthorizationPage register />,
      },
      {
        path: "sign-in",
        element: <AuthorizationPage login />,
      },
      {
        path: "forgot-password",
        element: <AuthorizationPage forgotPassword />,
      },
      {
        path: "response",
        element: <AuthorizationPage authResponse />,
      },
      {
        path: "google-success",
        element: <GoogleAuthSuccessPage />,
      },
      {
        path: "*",
        element: <Page404 />,
      },
    ],
  },
]);
