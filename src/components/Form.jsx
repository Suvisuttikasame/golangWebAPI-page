// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import { useLocationParam } from "../hooks/useLocationParam";
import { useEffect } from "react";
import Spinner from "./Spinner";
import Message from "./Message";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCity } from "../contexts/CityProvider";
import { useNavigate } from "react-router-dom";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}
const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
function Form() {
  const navigate = useNavigate();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [emoji, setEmoji] = useState("");
  const [errorLocation, setErrorLocation] = useState("");
  const [lat, lng] = useLocationParam();
  const { createNewCity, isLoading } = useCity();

  useEffect(
    function () {
      if (!lat && !lng) return;
      async function fetchCityByLocation() {
        try {
          setIsLoadingLocation(true);
          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();
          if (!data.countryCode) {
            throw new Error("no city is selected");
          }
          setCityName(data.city || data.locality || "");
          setCountry(data.countryName);
          setEmoji(convertToEmoji(data.countryCode));
          setErrorLocation("");
        } catch (error) {
          setErrorLocation(error.message);
        } finally {
          setIsLoadingLocation(false);
        }
      }
      fetchCityByLocation();
    },
    [lat, lng]
  );

  async function handleSubmit(e) {
    e.preventDefault();
    const newCity = {
      cityName: cityName,
      country: country,
      emoji: emoji,
      date: date,
      notes: notes,
      position: {
        lat: Number(lat),
        lng: Number(lng),
      },
    };
    await createNewCity(newCity);
    navigate("/app/cities");
  }

  if (isLoadingLocation) return <Spinner />;
  if (!lat && !lng)
    return <Message message={"Please click location on the map"} />;
  if (errorLocation) return <Message message={errorLocation} />;
  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
