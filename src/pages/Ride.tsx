import { useState } from "react";

import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";

function Ride() {
  const [open, setOpen] = useState(true);

  return (
    <>
      <button onClick={() => setOpen((s) => !s)}>sheet toggle</button>
      <BottomSheet
        blocking={false}
        open={open}
        onSpringStart={async (event) => {
          console.log(event.type);
        }}
        snapPoints={({ minHeight, maxHeight }) => [
          minHeight,
          0.5 * maxHeight,
          maxHeight,
        ]}
        className=" bg-red-400 [&_div[data-rsbs-header]]:cursor-grab "
      >
        <h1>hey there</h1>
      </BottomSheet>
    </>
  );
}

export default Ride;
