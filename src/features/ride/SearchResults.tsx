import { SearchResult } from "leaflet-geosearch/dist/providers/provider.js";
import { Dispatch, SetStateAction } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import MiniSpinner from "../../components/MiniSpinner";

interface Props {
  results: SearchResult<any>[] | undefined;
  onClick: (result: SearchResult) => void;
  loading: boolean;
  setShowResults: Dispatch<SetStateAction<boolean>>;
}

function SearchResults({ results, onClick, loading, setShowResults }: Props) {
  const { ref } = useOutsideClick(() => setShowResults(false));

  return (
    <div
      ref={ref}
      className="absolute top-full z-50 bg-gray-100 text-sm flex flex-col gap-1 overflow-y-auto w-full left-0 px-2 py-3 max-h-52 "
    >
      {loading ? (
        <MiniSpinner />
      ) : results ? (
        results?.map((result) => (
          <span
            key={result.y}
            className="hover:bg-red-100 cursor-pointer"
            onClick={() => onClick(result)}
          >
            {result.label}
          </span>
        ))
      ) : (
        <p>no data found</p>
      )}
    </div>
  );
}

export default SearchResults;
