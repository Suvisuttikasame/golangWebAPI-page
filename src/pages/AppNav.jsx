import { NavLink, Outlet } from "react-router-dom";
import styles from "../components/AppNav.module.css";
function AppNav() {
  return (
    <>
      <div className={styles.nav}>
        <ul>
          <li>
            <NavLink to="countries">Countries</NavLink>
          </li>
          <li>
            <NavLink to="cities">Cities</NavLink>
          </li>
        </ul>
      </div>
      <Outlet />
    </>
  );
}

export default AppNav;
