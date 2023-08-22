import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import PageNotfound from "./pages/PageNotfound";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import CityList from "./components/CityList";
import City from "./components/City";
import CountryList from "./components/CountryList";
import Form from "./components/Form";
import { useEffect, useState } from "react";

function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />}>
          <Route index element={<Navigate to="cities" />} />
          <Route
            path="cities"
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route path="cities/:id" element={<City />} />
          <Route
            path="countries"
            element={<CountryList cities={cities} isLoading={isLoading} />}
          />
          <Route path="form" element={<Form />} />
        </Route>
        <Route path="*" element={<PageNotfound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
