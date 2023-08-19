import { NavLink } from "react-router-dom";
import Logo from "./Logo.jsx";
import styles from "./PageNav.module.css";

function PageNav() {
  return (
    <div className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={styles.ctaLink}>
            Log in
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default PageNav;
