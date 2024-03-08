import useFetchAddress from "./hooks/useFetchAddress";
import SearchResults from "./SearchResults";

interface Props {
  type: "pick" | "drop";
  afterIcon?: React.ReactNode;
}

function RideInput({ type, afterIcon }: Props) {
  const {
    data,
    isLoading,
    isError,
    address,
    showResults,
    handleInput,
    handleResultClick,
    clearInput,
    setShowResults,
  } = useFetchAddress(type);

  return (
    <>
      <input
        value={address}
        onChange={handleInput}
        placeholder="Enter location"
        className="grow bg-gray-100 px-2 focus:outline-none "
      />
      {address.length > 0 ? (
        <span className="cursor-pointer text-lg" onClick={clearInput}>
          &times;
        </span>
      ) : (
        afterIcon || null
      )}

      {showResults && (
        <SearchResults
          results={data}
          onClick={handleResultClick}
          loading={isLoading}
          setShowResults={setShowResults}
        />
      )}
    </>
  );
}

export default RideInput;
