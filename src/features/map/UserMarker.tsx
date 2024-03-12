import { useEffect, useState } from "react";

import { CircleMarker, useMap } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import { useSearchParams } from "react-router-dom";

function UserMarker() {
  const [userLocation, setUserLocation] = useState<LatLngExpression>();
  const [searchParams, setSearchParams] = useSearchParams();
  const map = useMap();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;

          map.setView({ lat: latitude, lng: longitude }, 16);
          setUserLocation([latitude, longitude]);
          searchParams.set("coords", JSON.stringify([latitude, longitude]));
          setSearchParams(searchParams, { replace: true });
        },
        (err) => {
          console.log("user denied getting their location !", err.message);
          map.setView({ lat: 30.24, lng: 31.149 }, 10);
          searchParams.set("coords", JSON.stringify([30.24, 31.149]));
          setSearchParams(searchParams, { replace: true });
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
