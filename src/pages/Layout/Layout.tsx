import { useEffect, useState, Suspense } from "react";
import { useLocation, Outlet, useLoaderData } from "react-router-dom";
import Header from "../../shared-components/Header/Header";
import Footer from "../../shared-components/Footer/Footer";
import LazyLoaderPage from "../../shared-components/Loader/LazyLoaderPage/LazyLoaderPage";
import "./Layout.scss";
import { useAppDispatch } from "../../hooks/hooks";
import { setTokens, setUser } from "../../store/reducers/AuthenticationSlice";
import Cookies from "js-cookie";
import type { layoutLoader } from "../../router";
import type { User } from "../../types/type";

const Layout = () => {
  const dispatch = useAppDispatch();
  const user = useLoaderData() as Awaited<ReturnType<typeof layoutLoader>>;
  const [isSearchActive, setIsSearchActive] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (token) dispatch(setTokens(token));
    if (user) dispatch(setUser(user as User));
  }, [user]);

  useEffect(() => {
    if (pathname === "/" || pathname === "/favorites") {
      setIsSearchActive(true);
    } else {
      setIsSearchActive(false);
    }
  }, [pathname]);
  return (
    <div className={`layout ${isSearchActive ? "" : "search-disable"}`}>
      <Header />
      <Suspense fallback={<LazyLoaderPage />}>
        <Outlet />
      </Suspense>
      <Footer />
    </div>
  );
};

export default Layout;
