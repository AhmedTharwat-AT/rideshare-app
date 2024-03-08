import { Link } from "react-router-dom";
import "../../../node_modules/leaflet-geosearch/dist/geosearch.css";

import { DiOpensource } from "react-icons/di";
import { SiSquare } from "react-icons/si";
import { FaLocationArrow } from "react-icons/fa";
import RideInput from "./RideInput";

function RideForm() {
  return (
    <div className="w-full">
      <div className="space-y-3 relative">
        <div className="bg-gray-100 gap-2 flex p-3 justify-between items-center rounded-md relative z-10">
          <DiOpensource className="w-4" />
          <RideInput type="pick" afterIcon={<FaLocationArrow />} />
        </div>

        <span className="block w-[2px] h-16 bg-gray-100 absolute ltr:left-[18px] top-0 z-0 rtl:right-[18px]"></span>

        <div className="bg-gray-100 gap-2 flex p-3 justify-between items-center rounded-md  relative z-[9]">
          <SiSquare className="text-xs w-4" />
          <RideInput type="drop" />
        </div>

        <Link
          to="/ride"
          className="bg-gray-100 inline-block py-2 px-5 rounded-md !mt-10 hover:bg-gray-200 transition-all duration-150 font-medium"
        >
          See prices
        </Link>
      </div>
    </div>
  );
}

export default RideForm;
