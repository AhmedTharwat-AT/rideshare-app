import { PiSpinnerGap } from "react-icons/pi";

function Spinner() {
  return (
    <div className="w-full h-screen flex items-center">
      <PiSpinnerGap className="mx-auto text-2xl animate-spin" />
    </div>
  );
}

export default Spinner;
