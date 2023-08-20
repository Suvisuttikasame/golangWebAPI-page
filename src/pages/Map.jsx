import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "../components/Map.module.css";
function Map() {
  const [searchParam, setSearchParam] = useSearchParams();
  const navigate = useNavigate();
  console.log(searchParam.get("lat"), searchParam.get("lng"));
  return (
    <div
      className={styles.mapContainer}
      onClick={() => {
        navigate("form");
      }}
    >
      Map
    </div>
  );
}

export default Map;
