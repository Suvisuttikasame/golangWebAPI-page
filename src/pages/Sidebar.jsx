import Logo from "../components/Logo";
import AppNav from "./AppNav";
import styles from "../components/Sidebar.module.css";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyright {new Date().getFullYear} by Worldwise.Inc
        </p>
      </footer>
    </div>
  );
}

export default Sidebar;
