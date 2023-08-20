import styles from "./CityItem.module.css";
import PropTypes from "prop-types";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({ emoji, cityName, date }) {
  return (
    <li className={styles.cityItem} onClick={() => {}}>
      <span className={styles.emoji}>{emoji}</span>
      <h3 className={styles.name}>{cityName}</h3>
      <time className={styles.date}>{formatDate(date)}</time>
      <button className={styles.deleteBtn}>&times;</button>
    </li>
  );
}

CityItem.propTypes = {
  emoji: PropTypes.string,
  cityName: PropTypes.string,
  date: PropTypes.string,
};

export default CityItem;
