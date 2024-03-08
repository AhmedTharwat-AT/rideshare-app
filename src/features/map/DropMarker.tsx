import { Marker, Tooltip, useMap } from "react-leaflet";
import "../../lrm/leaflet-routing-machine.min.js";
import "../../styles/routing.css";
import L from "leaflet";
import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

interface marker {
  pick?: L.Marker;
  drop?: L.Marker;
}

function DropMarker() {
  const map = useMap();
  const markerRef = useRef<string | null>(null);
  const [searchParams] = useSearchParams();
  const drop = searchParams.get("drop") || "";
  const pick = searchParams.get("pick") || "";

  useEffect(() => {
    if (!markerRef.current && !drop) return;
    if (!markerRef.current && drop) {
      const { lat, lng } = JSON.parse(drop).coords;
      if (pick) {
        const pickCoords = JSON.parse(pick).coords;
        map.fitBounds([
          [lat, lng],
          [pickCoords.lat, pickCoords.lng],
        ]);
      } else {
        map.fitBounds([
          [lat, lng],
          [lat, lng],
        ]);
      }
      markerRef.current = "added";
    }
    if (markerRef.current && !drop) {
      markerRef.current = "";
    }
  }, [drop]);

  // || (pick && drop)
  if (!drop) return null;

  return (
    <Marker position={JSON.parse(drop).coords}>
      <Tooltip permanent>to : {JSON.parse(drop).label}</Tooltip>
    </Marker>
  );
}

export default DropMarker;
