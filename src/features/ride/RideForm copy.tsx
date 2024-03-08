import { useState, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { useDebouncedCallback } from "use-debounce";
import { useQuery } from "react-query";
import { SearchResult } from "leaflet-geosearch/dist/providers/provider.js";
import "../../../node_modules/leaflet-geosearch/dist/geosearch.css";

import { DiOpensource } from "react-icons/di";
import { SiSquare } from "react-icons/si";
import { FaLocationArrow } from "react-icons/fa";
import SearchResults from "./SearchResults";

const provider = new OpenStreetMapProvider();

function RideForm() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [firstAdd, setFirstAdd] = useState(() =>
    searchParams.get("pick")
      ? JSON.parse(searchParams.get("pick") as string).label
      : ""
  );
  const [secondAdd, setSecondAdd] = useState(() =>
    searchParams.get("drop")
      ? JSON.parse(searchParams.get("drop") as string).label
      : ""
  );
  const firstAddRef = useRef<HTMLInputElement>(null);
  const secondAddRef = useRef<HTMLInputElement>(null);
  // const {data:firstResult }=useQuery({queryKey:['firstResult',firstAdd],queryFn:})
  const [firstResults, setFirstResults] = useState<SearchResult[]>([]);
  const [secondResults, setSecondResults] = useState<SearchResult[]>([]);

  const debouncedFirst = useDebouncedCallback(async (value) => {
    const results = await provider.search({ query: value });
    setFirstResults(results);
  }, 300);
  const debouncedSecond = useDebouncedCallback(async (value) => {
    const results = await provider.search({ query: value });
    setSecondResults(results);
  }, 300);

  function handlePick(e: React.ChangeEvent<HTMLInputElement>) {
    setFirstAdd(e.target.value);
    if (!e.target.value && firstResults.length > 0) setFirstResults([]);
    if (e.target.value.length <= 3) return;
    debouncedFirst(e.target.value);
  }

  function handleDrop(e: React.ChangeEvent<HTMLInputElement>) {
    setSecondAdd(e.target.value);
    if (!e.target.value && secondResults.length > 0) setSecondResults([]);
    if (e.target.value.length <= 3) return;
    debouncedSecond(e.target.value);
  }

  function handleFirstResultClick(result: SearchResult) {
    const { lat, lon: lng } = result.raw;
    setFirstAdd(result.label);
    setFirstResults([]);
    searchParams.set(
      "pick",
      JSON.stringify({ label: result.label, coords: { lat, lng } })
    );
    setSearchParams(searchParams);
    if (!secondAdd && secondAddRef.current) secondAddRef.current.focus();
  }
  function handleSecondResultClick(result: SearchResult) {
    const { lat, lon: lng } = result.raw;
    setSecondAdd(result.label);
    setSecondResults([]);
    searchParams.set(
      "drop",
      JSON.stringify({ label: result.label, coords: { lat, lng } })
    );
    setSearchParams(searchParams);
    if (!firstAdd && firstAddRef.current) firstAddRef.current.focus();
  }

  return (
    <div className="w-full">
      <div className="space-y-3 relative">
        <div className="bg-gray-100 gap-2 flex p-3 justify-between items-center rounded-md relative z-10">
          <DiOpensource className="w-4" />
          <input
            ref={firstAddRef}
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
                setFirstResults([]);
                searchParams.delete("pick");
                setSearchParams(searchParams);
              }}
            >
              &times;
            </span>
          ) : (
            <FaLocationArrow />
          )}
          <SearchResults
            results={firstResults}
            onClick={handleFirstResultClick}
          />
        </div>

        <span className="block w-[2px] h-16 bg-gray-100 absolute ltr:left-[18px] top-0 z-0 rtl:right-[18px]"></span>

        <div className="bg-gray-100 gap-2 flex p-3 justify-between items-center rounded-md  relative z-[9]">
          <SiSquare className="text-xs w-4" />
          <input
            ref={secondAddRef}
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
                setSecondResults([]);
                searchParams.delete("drop");
                setSearchParams(searchParams);
              }}
            >
              &times;
            </span>
          )}
          <SearchResults
            results={secondResults}
            onClick={handleSecondResultClick}
          />
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
