import { useEffect, useState } from "react";
import { PAGE_ROUTES } from "../../config/page-routes";
import { NavLink, useLocation } from "react-router-dom";
import SearchForm from "./SearchForm/SearchForm";
import { removeUser, setUser } from "../../store/reducers/AuthenticationSlice";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import logo from "../../assets/icons/logo.svg";
import BurgerBtn from "./BurgerBtn/BurgerBtn";
import "./Header.scss";
import { useSignOut } from "../../queries/post-sign-out/post-sign-out.mutation";
import Cookies from "js-cookie";

const Header = () => {
  const { id: uid, email } = useAppSelector((state) => state.authentication.user) || {};
  const [isShouldRenderSearch, setIsShouldRenderSearch] = useState(true);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const { mutateAsync: logout } = useSignOut();

  const dispatch = useAppDispatch();
  const savedUser = localStorage.getItem("user");
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/" || pathname === "/favorites") {
      setIsShouldRenderSearch(true);
    } else {
      setIsShouldRenderSearch(false);
    }
  }, [pathname]);

  useEffect(() => {
    if (!uid && savedUser) {
      dispatch(setUser(JSON.parse(savedUser)));
    }
  }, [uid, savedUser, dispatch]);

  const handleLogout = () => {
    logout();
  };

  return (
    <header className={`header ${isShouldRenderSearch ? "" : "search-disabled"}`}>
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "header__logo active" : "header__logo")}
              onClick={() => setIsBurgerOpen(false)}
            >
              <img width={100} height={54} src={logo} alt="" />
            </NavLink>
            <nav className={`header__nav ${isBurgerOpen ? "mobile-active" : ""}`}>
              <ul className="header__nav-list">
                <li className="header__nav-item">
                  <NavLink
                    to="/"
                    className={({ isActive }) => (isActive ? "header__nav-link active" : "header__nav-link")}
                    onClick={() => setIsBurgerOpen(false)}
                  >
                    Головна
                  </NavLink>
                </li>
                <li className="header__nav-item">
                  <NavLink
                    to="/favorites"
                    className={({ isActive }) => (isActive ? "header__nav-link active" : "header__nav-link")}
                    onClick={() => setIsBurgerOpen(false)}
                  >
                    Обране
                  </NavLink>
                </li>
                <li className="header__nav-item">
                  <NavLink
                    to="/add-recipe"
                    className={({ isActive }) => (isActive ? "header__nav-link active" : "header__nav-link")}
                    onClick={() => setIsBurgerOpen(false)}
                  >
                    Додати рецепт
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
          <div className="header__right">
            {isShouldRenderSearch ? <SearchForm /> : null}
            {email && (
              <span className="header__right-username">
                Вітаємо,
                <strong>{email.substring(0, email.indexOf("@"))}</strong>
              </span>
            )}
            {uid ? (
              <button onClick={handleLogout} type="button" className="logout__btn">
                Вийти
              </button>
            ) : (
              <NavLink className="login__link" to={PAGE_ROUTES.LOGIN}>
                {" "}
                Увійти | Зареєструватись
              </NavLink>
            )}
            <BurgerBtn isBurgerOpen={isBurgerOpen} setIsBurgerOpen={setIsBurgerOpen} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
