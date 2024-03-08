import { useEffect, useState } from "react";

import { CircleMarker, useMap } from "react-leaflet";
import { LatLngExpression } from "leaflet";

function UserMarker() {
  const [userLocation, setUserLocation] = useState<LatLngExpression>();
  const map = useMap();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          map.setView({ lat: latitude, lng: longitude }, 16);
          setUserLocation([latitude, longitude]);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }, []);

  if (!userLocation) return null;

  return (
    // center={[23.8859, 45.0792]}
    <CircleMarker
      center={userLocation}
      radius={5}
      pathOptions={{ color: "darkblue" }}
    />
  );
}

export default UserMarker;
