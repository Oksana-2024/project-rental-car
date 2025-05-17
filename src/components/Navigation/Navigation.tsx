import { NavLink } from "react-router-dom";

import s from "./Navigation.module.css";

type ActiveStyleArgs = {
  isActive: boolean;
};

const activeStyle = ({ isActive }: ActiveStyleArgs) =>
  isActive ? s.active : s.link;
const Navigation = () => {
  return (
    <nav>
      <ul className={s.navList}>
        <li>
          <NavLink to="/" className={activeStyle}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/catalog" end className={activeStyle}>
            Catalog
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
