import { DiOpensource } from "react-icons/di";
import { SiSquare } from "react-icons/si";
import { FaLocationArrow } from "react-icons/fa";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function RideForm() {
  const axiosPrivate = useAxiosPrivate();

  async function handleClick() {
    try {
      const data = await axiosPrivate.get("https://httpstat.us/401");
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="w-full">
      <div className="space-y-3 relative">
        <div className="bg-gray-100 gap-2 flex p-3 justify-between items-center rounded-md relative z-10">
          <DiOpensource className="w-4" />
          <input
            placeholder="Enter location"
            className="grow bg-gray-100 px-2 focus:outline-none "
          />
          <FaLocationArrow />
        </div>

        <span className="block w-[2px] h-16 bg-gray-100 absolute left-[18px] top-0 z-0"></span>

        <div className="bg-gray-100 gap-2 flex p-3 justify-between items-center rounded-md  relative z-10">
          <SiSquare className="text-xs w-4" />
          <input
            placeholder="Enter destination"
            className="grow bg-gray-100 px-2 focus:outline-none"
          />
        </div>

        <button
          onClick={handleClick}
          className="bg-gray-100 py-2 px-5 rounded-md !mt-10 hover:bg-gray-200 transition-all duration-150 font-medium"
        >
          See prices
        </button>
      </div>
    </div>
  );
}

export default RideForm;
