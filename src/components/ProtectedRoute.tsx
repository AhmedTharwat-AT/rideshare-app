import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [cookies] = useCookies(["token"]);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.token && pathname == "/login") {
      navigate("/");
    }
    if (!cookies.token && pathname == "/app") {
      navigate("/login");
    }
  }, [pathname, cookies.token]);

  return <>{children}</>;
}

export default ProtectedRoute;
