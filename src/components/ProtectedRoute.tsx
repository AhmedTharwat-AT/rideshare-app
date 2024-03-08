import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [cookies] = useCookies(["token"]);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.token && pathname == "/login") {
      navigate("/", { state: { from: "/protectedRoute" } });
    }
    if (!cookies.token && pathname == "/app") {
      navigate("/login", { state: { from: "/protectedRoute" } });
    }
  }, [pathname, cookies.token]);

  return <>{children}</>;
}

export default ProtectedRoute;
