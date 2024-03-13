import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { AxiosInstance } from "axios";
import checkWithinRadius from "../../../utils/helpers";

async function getDrivers(coords: [number, number], axios: AxiosInstance) {
  const res = await axios.get("/driver");
  if (res.data) {
    const results = res.data.filter((el: any) =>
      checkWithinRadius(el.coords, coords, 10)
    );
    return results;
  }
  return null;
}

function useDriversMarkers() {
  const axiosPrivate = useAxiosPrivate();
  const [searchParams] = useSearchParams();
  const userCoords: [number, number] = searchParams.get("coords")
    ? JSON.parse(searchParams.get("coords") as string)
    : null;
  const pickCoords: [number, number] = searchParams.get("pick")
    ? JSON.parse(searchParams.get("pick") as string).coords
    : null;

  let result: any[] = [];

  const { data: nearUser, isLoading: loadsUser } = useQuery({
    queryKey: ["drivers", userCoords],
    queryFn: () => getDrivers(userCoords, axiosPrivate),
    enabled: Boolean(userCoords),
  });
  const { data: nearPick, isLoading: loadsPick } = useQuery({
    queryKey: ["drivers", pickCoords],
    queryFn: () => getDrivers(pickCoords, axiosPrivate),
    enabled: Boolean(pickCoords),
  });

  if (loadsPick || loadsUser) return null;

  if (nearUser && !nearPick) {
    result = [...nearUser];
  } else if (!nearUser && nearPick) {
    result = [...nearPick];
  } else if (nearPick && nearUser) {
    result = [...nearUser, ...nearPick];
  } else {
    result = [];
  }

  return result;
}

export default useDriversMarkers;
