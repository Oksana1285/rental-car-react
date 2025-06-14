import { NavLink, useLocation } from "react-router-dom";
import clsx from "clsx";
import style from "./NavList.module.css";

const NavList = () => {
  const location = useLocation();

  const getLocation = (to) => {
    return to === location.pathname
      ? clsx(style.navLink, style.active)
      : style.navLink;
  };

  return (
    <>
      <ul className={style.navMobileList}>
        <li>
          <NavLink className={style.navLink} to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/catalog" className={`${getLocation("/catalog")}`}>
            Catalog
          </NavLink>
        </li>
        <li>
          <NavLink to="/favorite" className={`${getLocation("/favorite")}`}>
            Favorite
          </NavLink>
        </li>
      </ul>
    </>
  );
};

export default NavList;
