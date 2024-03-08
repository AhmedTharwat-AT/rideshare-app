import { OpenStreetMapProvider } from "leaflet-geosearch";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { SearchResult } from "leaflet-geosearch/dist/providers/provider.js";

const provider = new OpenStreetMapProvider();

function useFetchAddress(type: "pick" | "drop") {
  const [searchParams, setSearchParams] = useSearchParams();
  const param = searchParams.get(type)
    ? JSON.parse(searchParams.get(type) as string).label
    : "";
  const [address, setAddress] = useState<string>(param);
  const [showResults, setShowResults] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const [delayedAdd] = useDebounce(address, 1000);

  async function addressRequest(value: string) {
    const results = await provider.search({ query: value });
    return results?.length > 0 ? results : [];
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: [type, delayedAdd],
    queryFn: () => addressRequest(delayedAdd),
    enabled: delayedAdd.length > 3 && !disabled,
    staleTime: 60000,
  });

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setAddress(e.target.value);
    //disable fetching new results
    setDisabled(false);
    if (!e.target.value && data && showResults) setShowResults(false);
    if (e.target.value.length > 3) setShowResults(true);
  }

  function handleResultClick(result: SearchResult) {
    const { lat, lon: lng } = result.raw;
    setAddress(result.label);
    setDisabled(true);
    setShowResults(false);
    searchParams.set(
      type,
      JSON.stringify({ label: result.label, coords: { lat, lng } })
    );
    setSearchParams(searchParams);
  }

  function clearInput() {
    setAddress("");
    setShowResults(false);
    searchParams.delete(type);
    setSearchParams(searchParams);
  }

  return {
    data,
    isLoading,
    isError,
    address,
    showResults,
    handleInput,
    handleResultClick,
    clearInput,
    setShowResults,
  };
}

export default useFetchAddress;
