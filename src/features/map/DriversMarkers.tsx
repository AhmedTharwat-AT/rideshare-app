import { Marker } from "react-leaflet";
import useDriversMarkers from "./hooks/useDriversMarkers";
import carImg from "/assets/car.png";

import L from "leaflet";

function DriversMarkers() {
  const drivers = useDriversMarkers();

  if (!drivers) return null;

  return (
    <>
      {drivers.map((el, i) => {
        const iconCar = new L.DivIcon({
          iconSize: new L.Point(40, 40),
          html: `<img src="${carImg}" style="transform: rotate(${Math.round(
            Math.random() * 180
          )}deg);width:100% ; background-color:none" />`,
          className: "",
        });
        return <Marker key={i} position={el.coords} icon={iconCar} />;
      })}
    </>
  );
}

export default DriversMarkers;
