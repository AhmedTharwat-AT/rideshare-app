import { PiSpinnerGap } from "react-icons/pi";

function MiniSpinner() {
  return (
    <div className="w-full items-center flex">
      <PiSpinnerGap className="mx-auto animate-spin" />
    </div>
  );
}

export default MiniSpinner;
