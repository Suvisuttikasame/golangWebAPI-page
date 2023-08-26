import { createContext, useContext } from "react";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const CityContext = createContext();
function CityProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setcurrentCity] = useState({});
  const BASE_URL = "http://127.0.0.1:3000";

  useEffect(function () {
    async function getCities() {
      try {
        setIsLoading(true);
        const fData = await fetch(`${BASE_URL}/cities`);
        const data = await fData.json();
        setCities(data);
      } catch (error) {
        throw new Error(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    getCities();
  }, []);

  async function getCityById(id) {
    try {
      setIsLoading(true);
      const fData = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await fData.json();
      setcurrentCity(data);
    } catch (error) {
      throw new Error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function createNewCity(newCity) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setCities((city) => [...city, data]);
    } catch (error) {
      throw new Error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CityContext.Provider
      value={{ cities, isLoading, getCityById, currentCity, createNewCity }}
    >
      {children}
    </CityContext.Provider>
  );
}

function useCity() {
  const cityContext = useContext(CityContext);
  return cityContext;
}

CityProvider.propTypes = {
  children: PropTypes.object,
};
export { CityProvider, useCity };
