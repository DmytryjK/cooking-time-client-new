import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import LazyLoaderPage from "../../shared-components/Loader/LazyLoaderPage/LazyLoaderPage";

const UnauthorizedLayout = () => {
  return (
    <Suspense fallback={<LazyLoaderPage />}>
      <Outlet />
    </Suspense>
  );
};

export default UnauthorizedLayout;
