import { OpenStreetMapProvider } from "leaflet-geosearch";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce";

const provider = new OpenStreetMapProvider();

function useSecondAddress() {
  const [searchParams] = useSearchParams();
  const [secondAdd, setSecondAdd] = useState(() =>
    searchParams.get("drop")
      ? JSON.parse(searchParams.get("drop") as string).label
      : ""
  );
  const [showSecond, setShowSecond] = useState(false);
  const [disableSecond, setDisableSecond] = useState(true);

  const [delayedAdd] = useDebounce(secondAdd, 1000);

  async function addressRequest(value: string) {
    const results = await provider.search({ query: value });
    if (results && results.length > 0) {
      setShowSecond(true);
      return results;
    } else {
      setShowSecond(false);
      return [];
    }
  }
  const {
    data: secondResults,
    isLoading: loadingSecondResult,
    isError: secondError,
  } = useQuery({
    queryKey: ["secondResults", delayedAdd],
    queryFn: () => addressRequest(delayedAdd),
    enabled: delayedAdd.length > 3 && !disableSecond,
    staleTime: 60000 * 60,
  });

  function handleDrop(e: React.ChangeEvent<HTMLInputElement>) {
    setSecondAdd(e.target.value);
    setDisableSecond(false);
    if (!e.target.value && secondResults && showSecond) setShowSecond(false);
  }

  return {
    secondResults,
    loadingSecondResult,
    secondError,
    secondAdd,
    setSecondAdd,
    showSecond,
    handleDrop,
    setShowSecond,
    setDisableSecond,
  };
}

export default useSecondAddress;
