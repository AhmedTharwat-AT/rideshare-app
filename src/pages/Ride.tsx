import { useState } from "react";

import Map from "../features/map/Map";
import RideNav from "../features/ride/RideNav";
import RideForm from "../features/ride/RideForm";
import MapProvider from "../context/MapContext";

function Ride() {
  const [expandMap, setExpandMap] = useState(false);

  // function handleExpandMap() {
  //   if (!sheetRef?.current) return;
  //   sheetRef.current.snapTo(({ minHeight }) => {
  //     console.log(minHeight);
  //     return minHeight;
  //   });
  // }

  return (
    <section>
      <MapProvider>
        <RideNav />
        <div className="min-h-screen lg:container">
          <div className="flex md:flex-row flex-col-reverse md:justify-center justify-end h-screen items-center gap-2">
            <div className="md:w-96 w-full flex px-7 py-4">
              <RideForm />
            </div>
            <div className="h-1/2 md:h-full w-full md:py-8 md:px-5">
              <Map />
            </div>
          </div>
        </div>
      </MapProvider>
    </section>
  );
}

export default Ride;
