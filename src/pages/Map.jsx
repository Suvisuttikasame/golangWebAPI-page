import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "../components/Map.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useCity } from "../contexts/CityProvider";
import { useState } from "react";
import { useEffect } from "react";
import Button from "../components/Button";
import { useGeolocation } from "../hooks/useGeolocation";
import PropTypes from "prop-types";

function Map() {
  const [searchParam] = useSearchParams();
  const lat = searchParam.get("lat");
  const lng = searchParam.get("lng");
  const { cities } = useCity();
  const {
    isLoading: isLoadingGeolocation,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();
  const [position, setPosition] = useState([51.505, -0.09]);
  useEffect(
    function () {
      if (lat && lng) setPosition([lat, lng]);
    },
    [lat, lng]
  );
  useEffect(
    function () {
      if (geolocationPosition)
        setPosition([geolocationPosition.lat, geolocationPosition.lng]);
    },
    [geolocationPosition]
  );
  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button type="position" clickEvent={getPosition}>
          {isLoadingGeolocation ? "Loading..." : "use Geolocation"}
        </Button>
      )}
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png" />
        {cities.map((city) => {
          return (
            <Marker
              position={[city.position.lat, city.position.lng]}
              key={city.cityName}
            >
              <Popup>
                <span>{city.emoji}</span> <span>{city.cityName}</span>
              </Popup>
            </Marker>
          );
        })}
        <MapSetView position={position} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function MapSetView({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) => {
      console.log(e);
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}

MapSetView.propTypes = {
  position: PropTypes.array,
};

export default Map;
