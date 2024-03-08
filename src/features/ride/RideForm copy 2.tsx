import { Link, useSearchParams } from "react-router-dom";

import { SearchResult } from "leaflet-geosearch/dist/providers/provider.js";
import "../../../node_modules/leaflet-geosearch/dist/geosearch.css";

import { DiOpensource } from "react-icons/di";
import { SiSquare } from "react-icons/si";
import { FaLocationArrow } from "react-icons/fa";
import SearchResults from "./SearchResults";
import useFirstAddress from "./hooks/useFirstAddress";
import useSecondAddress from "./hooks/useSecondAddress";
import useFetchAddress from "./hooks/useFetchAddress";

function RideForm() {
  const [searchParams, setSearchParams] = useSearchParams();
  // const firstAddRef = useRef<HTMLInputElement>(null);
  // const secondAddRef = useRef<HTMLInputElement>(null);
  const {
    firstResults,
    loadingFirstResult,
    firstError,
    firstAdd,
    setFirstAdd,
    showFirst,
    handlePick,
    setShowFirst,
    setDisableFirst,
  } = useFirstAddress();

  // const {
  //   secondResults,
  //   loadingSecondResult,
  //   secondError,
  //   secondAdd,
  //   setSecondAdd,
  //   showSecond,
  //   handleDrop,
  //   setShowSecond,
  //   setDisableSecond,
  // } = useSecondAddress();
  const {
    data: secondResults,
    isLoading: loadingSecondResult,
    isError: secondError,
    address: secondAdd,
    setAddress: setSecondAdd,
    showAddress: showSecond,
    handleInput: handleDrop,
    setShowAddress: setShowSecond,
    setDisabled: setDisableSecond,
  } = useFetchAddress("drop");

  function handleFirstResultClick(result: SearchResult) {
    const { lat, lon: lng } = result.raw;
    setFirstAdd(result.label);
    setDisableFirst(true);
    setShowFirst(false);
    searchParams.set(
      "pick",
      JSON.stringify({ label: result.label, coords: { lat, lng } })
    );
    setSearchParams(searchParams);
    // if (!secondAdd && secondAddRef.current) secondAddRef.current.focus();
  }
  function handleSecondResultClick(result: SearchResult) {
    const { lat, lon: lng } = result.raw;
    setSecondAdd(result.label);
    setDisableSecond(true);
    setShowSecond(false);
    searchParams.set(
      "drop",
      JSON.stringify({ label: result.label, coords: { lat, lng } })
    );
    setSearchParams(searchParams);
  }

  return (
    <div className="w-full">
      <div className="space-y-3 relative">
        <div className="bg-gray-100 gap-2 flex p-3 justify-between items-center rounded-md relative z-10">
          <DiOpensource className="w-4" />
          <input
            value={firstAdd}
            onChange={handlePick}
            placeholder="Enter location"
            className="grow bg-gray-100 px-2 focus:outline-none "
          />
          {firstAdd.length > 0 ? (
            <span
              className="cursor-pointer text-lg"
              onClick={() => {
                setFirstAdd("");
                setShowFirst(false);
                searchParams.delete("pick");
                setSearchParams(searchParams);
              }}
            >
              &times;
            </span>
          ) : (
            <FaLocationArrow />
          )}

          {showFirst && (
            <SearchResults
              results={firstResults}
              onClick={handleFirstResultClick}
              loading={loadingFirstResult}
            />
          )}
        </div>

        <span className="block w-[2px] h-16 bg-gray-100 absolute ltr:left-[18px] top-0 z-0 rtl:right-[18px]"></span>

        <div className="bg-gray-100 gap-2 flex p-3 justify-between items-center rounded-md  relative z-[9]">
          <SiSquare className="text-xs w-4" />
          <input
            value={secondAdd}
            onChange={handleDrop}
            placeholder="Enter destination"
            className="grow bg-gray-100 px-2 focus:outline-none"
          />
          {secondAdd.length > 0 && (
            <span
              className="cursor-pointer text-lg"
              onClick={() => {
                setSecondAdd("");
                setShowSecond(false);
                searchParams.delete("drop");
                setSearchParams(searchParams);
              }}
            >
              &times;
            </span>
          )}
          {showSecond && (
            <SearchResults
              results={secondResults}
              onClick={handleSecondResultClick}
              loading={loadingSecondResult}
            />
          )}
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
