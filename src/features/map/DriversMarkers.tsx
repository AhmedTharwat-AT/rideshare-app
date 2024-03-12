import { Marker, useMap } from "react-leaflet";
import useDriversMarkers from "./hooks/useDriversMarkers";

function DriversMarkers() {
  const map = useMap();
  const drivers = useDriversMarkers();
  if (!drivers) return null;
  return drivers.map((el) => <Marker position={el.coords} />);
}

export default DriversMarkers;
