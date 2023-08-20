import CityItem from "./CityItem";
import Spinner from "./Spinner";
import styles from "./CityList.module.css";
import PropTypes from "prop-types";
import Message from "./Message";

function CityList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;
  if (cities.length === 0)
    return <Message message="Please choose your cities" />;
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => {
        return (
          <CityItem
            emoji={city.emoji}
            cityName={city.cityName}
            date={city.date}
            id={city.id}
            lat={city.position.lat}
            lng={city.position.lng}
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
