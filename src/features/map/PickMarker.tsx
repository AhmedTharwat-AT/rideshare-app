import { Marker, Popup, Tooltip, useMap } from "react-leaflet";
import "../../lrm/leaflet-routing-machine.min.js";
import "../../styles/routing.css";
import L from "leaflet";
import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

interface marker {
  pick?: L.Marker;
  drop?: L.Marker;
}

function PickMarker() {
  const map = useMap();
  const markerRef = useRef<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const pick = searchParams.get("pick") || "";
  const drop = searchParams.get("drop") || "";

  useEffect(() => {
    try {
      if (!markerRef.current && !pick) return;
      if (!markerRef.current && pick) {
        const [lat, lng] = JSON.parse(pick).coords;
        if (drop) {
          const dropCoords = JSON.parse(drop).coords;
          map.fitBounds([
            [lat, lng],
            [dropCoords.lat, dropCoords.lng],
          ]);
        } else {
          map.fitBounds([
            [lat, lng],
            [lat, lng],
          ]);
        }
        markerRef.current = "added";
      }
      if (markerRef.current && !pick) {
        markerRef.current = "";
      }
    } catch (err) {
      console.log(err);
      setSearchParams({});
    }
  }, [pick]);

  // || (pick && drop)
  if (!pick) return null;

  return (
    <Marker position={JSON.parse(pick).coords}>
      <Tooltip permanent>From : {JSON.parse(pick).label}</Tooltip>
    </Marker>
  );
}

export default PickMarker;
