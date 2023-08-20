import CityItem from "./CityItem";
import Spinner from "./Spinner";
import styles from "./CityList.module.css";
import PropTypes from "prop-types";

function CityList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => {
        return (
          <CityItem
            emoji={city.emoji}
            cityName={city.cityName}
            date={city.date}
            key={city.cityName}
          />
        );
      })}
    </ul>
  );
}

CityList.propTypes = {
  cities: PropTypes.arrayOf(
    PropTypes.shape({
      cityName: PropTypes.string,
      country: PropTypes.string,
      date: PropTypes.string,
      notes: PropTypes.string,
      position: PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number,
      }),
      id: PropTypes.number,
    })
  ),
  isLoading: PropTypes.bool,
};

export default CityList;
