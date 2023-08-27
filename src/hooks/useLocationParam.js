import { useSearchParams } from "react-router-dom";

export function useLocationParam() {
  const [searchParam] = useSearchParams();
  const lat = searchParam.get("lat");
  const lng = searchParam.get("lng");
  return [lat, lng];
}
