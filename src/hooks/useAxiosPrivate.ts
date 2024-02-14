import { useCookies } from "react-cookie";
import { axiosPrivate } from "../services/axios";
import { useEffect } from "react";
// import useRefreshToken from "./useRefreshToken";

const useAxiosPrivate = () => {
  // const refresh = useRefreshToken();
  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        console.log("req :", config);
        // if (!config.headers["Authorization"]) {
        //   config.headers["Authorization"] = `Bearer ${cookies?.token}`;
        // }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        console.log("res :", error);

        // const prevRequest = error?.config;
        // if (error?.response?.status === 403 && !prevRequest?.sent) {
        //   prevRequest.sent = true;
        //   // const newAccessToken = await refresh();
        //   // prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        //   return axiosPrivate(prevRequest);
        // }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [cookies?.token]);

  return axiosPrivate;
};

export default useAxiosPrivate;
