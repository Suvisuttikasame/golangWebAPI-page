import CountryItem from "./CountryItem";
import Spinner from "./Spinner";
import Message from "./Message";
import styles from "./CountryList.module.css";
import PropTypes from "prop-types";

function CountryList({ cities, isLoading }) {
  const countries = cities.reduce((arr, cur) => {
    if (!arr.map((e) => e.country).includes(cur.country)) {
      return [...arr, { country: cur.country, emoji: cur.emoji }];
    } else {
      return arr;
    }
  }, []);
  if (isLoading) return <Spinner />;
  if (cities.length === 0)
    return <Message message="Please choose your cities" />;
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => {
        return <CountryItem country={country} key={country.country} />;
      })}
    </ul>
  );
}

CountryList.propTypes = {
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

export default CountryList;
