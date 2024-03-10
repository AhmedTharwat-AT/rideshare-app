import { useSearchParams } from "react-router-dom";
import { CiTimer } from "react-icons/ci";
import { MdDriveEta } from "react-icons/md";

export default function RouteSummary() {
  const [searchParams] = useSearchParams();
  const distance = searchParams.get("distance") || "";
  const time = searchParams.get("time") || "";
  console.log(distance);
  if (!distance || !time) return null;

  return (
    <div className="flex gap-5 text-gray-700 justify-center">
      <p className="whitespace-nowrap text-xs flex items-center gap-2">
        <MdDriveEta /> {Math.round(Number(distance) / 1000)} km
      </p>
      <p className="whitespace-nowrap text-xs flex items-center gap-2">
        <CiTimer /> {Math.round(Number(time) / 60)} seconds
      </p>
    </div>
  );
}
