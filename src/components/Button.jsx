import PropTypes from "prop-types";
import styles from "./Button.module.css";

function Button({ children, clickEvent, type }) {
  return (
    <button onClick={clickEvent} className={`${styles.btn} ${styles[type]}`}>
      {children}
    </button>
  );
}
Button.propTypes = {
  children: PropTypes.string,
  clickEvent: PropTypes.func,
  type: PropTypes.string,
};

export default Button;
