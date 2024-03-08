import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useMap } from "react-leaflet";
import L from "leaflet";

function RoutePath() {
  const map = useMap();
  const routeAdded = useRef<L.Routing.Control>();
  const [searchParams] = useSearchParams();
  const pick = searchParams.get("pick") || "";
  const drop = searchParams.get("drop") || "";

  useEffect(() => {
    if (pick && drop && !routeAdded.current) {
      const pickCoords = JSON.parse(pick).coords;
      const dropCoords = JSON.parse(drop).coords;
      const plan = L.Routing.plan(
        [
          new L.LatLng(pickCoords.lat, pickCoords.lng),
          new L.LatLng(dropCoords.lat, dropCoords.lng),
        ],
        {
          addWaypoints: false,
          draggableWaypoints: false,
        }
      );

      const route = L.Routing.control({
        plan,
        lineOptions: {
          addWaypoints: false,
          missingRouteTolerance: 200,
          extendToWaypoints: false,
        },
        show: false,
      }).addTo(map);

      // route.on("routeselected", (e) => {
      //   console.log(e);
      // });
      routeAdded.current = route;
    } else if ((!pick || !drop) && routeAdded.current) {
      //remove the route if one address is removed
      routeAdded.current.remove();
    }
  }, [pick, drop]);

  return null;
}

export default RoutePath;
