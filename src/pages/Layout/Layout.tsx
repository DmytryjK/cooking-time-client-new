import { useEffect, useState, Suspense } from "react";
import { useLocation, Outlet, useLoaderData, ScrollRestoration } from "react-router-dom";
import Header from "../../shared-components/Header/Header";
import Footer from "../../shared-components/Footer/Footer";
import LazyLoaderPage from "../../shared-components/Loader/LazyLoaderPage/LazyLoaderPage";
import "./Layout.scss";
import { useAppDispatch } from "../../hooks/hooks";
import { setTokens, setUser } from "../../store/reducers/AuthenticationSlice";
import Cookies from "js-cookie";
import type { layoutLoader } from "../../router";
import type { User } from "../../types/type";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  const dispatch = useAppDispatch();
  const user = useLoaderData() as Awaited<ReturnType<typeof layoutLoader>>;

  const { pathname } = useLocation();
  const isSearchActive = pathname === "/" || pathname === "/favorites";

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (token) dispatch(setTokens(token));
    if (user) dispatch(setUser(user as User));
  }, [user]);

  return (
    <div className={`layout ${isSearchActive ? "" : "search-disable"}`}>
      <Header isSearchActive={isSearchActive} />
      <Suspense fallback={<LazyLoaderPage />}>
        <Outlet />
      </Suspense>
      <Footer />
      <Toaster position="top-right" />
      <ScrollRestoration />
    </div>
  );
};

export default Layout;
