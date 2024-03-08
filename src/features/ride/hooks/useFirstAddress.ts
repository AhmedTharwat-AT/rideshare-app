import { OpenStreetMapProvider } from "leaflet-geosearch";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce";

const provider = new OpenStreetMapProvider();

function useFirstAddress() {
  const [searchParams] = useSearchParams();
  const param = searchParams.get("pick")
    ? JSON.parse(searchParams.get("pick") as string).label
    : "";
  const [firstAdd, setFirstAdd] = useState<string>(param);
  const [showFirst, setShowFirst] = useState(false);
  const [disableFirst, setDisableFirst] = useState(true);

  const [delayedAdd] = useDebounce(firstAdd, 1000);

  async function addressRequest(value: string) {
    const results = await provider.search({ query: value });
    console.log("results : ", results);
    console.log("value : ", value);
    if (results && results.length > 0) {
      setShowFirst(true);
      return results;
    } else {
      setShowFirst(false);
      return [];
    }
  }

  const {
    data: firstResults,
    isLoading: loadingFirstResult,
    isError: firstError,
  } = useQuery({
    queryKey: ["firstResult", delayedAdd],
    queryFn: () => addressRequest(delayedAdd),
    enabled: delayedAdd.length > 3 && !disableFirst,
    staleTime: 60000,
  });

  function handlePick(e: React.ChangeEvent<HTMLInputElement>) {
    setFirstAdd(e.target.value);
    //disable fetching new results
    setDisableFirst(false);
    if (!e.target.value && firstResults && showFirst) setShowFirst(false);
  }

  return {
    firstResults,
    loadingFirstResult,
    firstError,
    firstAdd,
    setFirstAdd,
    showFirst,
    handlePick,
    setShowFirst,
    setDisableFirst,
  };
}

export default useFirstAddress;
