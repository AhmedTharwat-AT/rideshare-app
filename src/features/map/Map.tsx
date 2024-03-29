import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";

import UserMarker from "./UserMarker";

import { LatLngExpression, LatLngBoundsExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import PickMarker from "./PickMarker";
import DropMarker from "./DropMarker";
import RoutePath from "./RoutePath";
import DriversMarkers from "./DriversMarkers";

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
        center={{ lat: 30.24, lng: 31.149 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> '
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />

        {/* need to delay user marker */}
        <UserMarker />
        <DriversMarkers />
        <PickMarker />
        <DropMarker />
        <RoutePath />
        <ZoomControl position="bottomright" />
      </MapContainer>
    </div>
  );
}

export default Map;
