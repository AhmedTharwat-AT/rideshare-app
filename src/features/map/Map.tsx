import {
  MapContainer,
  Marker,
  TileLayer,
  Popup,
  ZoomControl,
} from "react-leaflet";

import UserMarker from "./UserMarker";

import { LatLngExpression, LatLngBoundsExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import PickMarker from "./PickMarker";
import DropMarker from "./DropMarker";
import RoutePath from "./RoutePath";

const position = [51.505, -0.09] as LatLngExpression;

//ksa bounds
const maxBounds: LatLngBoundsExpression = [
  [15.189, 34.494], // Southwest coordinates
  [32.154, 55.666], // Northeast coordinates
];

function Map() {
  return (
    <div className="h-full w-full">
      <MapContainer
        zoom={8}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> '
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />

        {/* need to delay user marker */}
        {/* <UserMarker /> */}
        <PickMarker />
        <DropMarker />
        <RoutePath />
        <ZoomControl position="bottomright" />
      </MapContainer>
    </div>
  );
}

export default Map;
