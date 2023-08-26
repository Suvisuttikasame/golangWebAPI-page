import { useNavigate } from "react-router-dom";
import styles from "./CityItem.module.css";
import PropTypes from "prop-types";
import { useCity } from "../contexts/CityProvider";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({ emoji, cityName, date, id, lat, lng }) {
  const navigate = useNavigate();
  const { currentCity } = useCity();
  return (
    <li
      className={`${styles.cityItem} ${
        currentCity.cityName === cityName ? styles["cityItem--active"] : ""
      }`}
      onClick={() => {
        navigate(`${id}?lat=${lat}&lng=${lng}`);
      }}
    >
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
  id: PropTypes.number,
  lat: PropTypes.number,
  lng: PropTypes.number,
};

export default CityItem;
