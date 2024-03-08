import { useRef } from "react";
import { BottomSheet, BottomSheetRef } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";

function AvailableRides() {
  const sheetRef = useRef<BottomSheetRef | null>(null);

  return (
    <BottomSheet
      open
      ref={sheetRef}
      blocking={false}
      onSpringStart={async (event) => {
        console.log(event);
        console.log(sheetRef.current);
      }}
      defaultSnap={({ maxHeight }) => 0.5 * maxHeight}
      snapPoints={({ maxHeight }) => [50, 0.5 * maxHeight, maxHeight]}
      className=" bg-red-400 [&_div[data-rsbs-header]]:cursor-grab "
    >
      <h1>hey there</h1>
    </BottomSheet>
  );
}

export default AvailableRides;
