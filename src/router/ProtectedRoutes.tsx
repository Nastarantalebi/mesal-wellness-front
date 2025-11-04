import { useNavigate } from "react-router-dom";
import { useEffect, useState, type ReactNode } from "react";
import Cookies from "js-cookie";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  // const { mutateAsync } = useRefresh();

  useEffect(() => {
    const accessToken = Cookies.get("access_token");
    // const refreshToken = Cookies.get("refresh_token");

    if (!accessToken) {
      // if (!accessToken && !refreshToken) {
      navigate("/login");
      // } else if (!accessToken && refreshToken) {
      //   mutateAsync({ refresh: refreshToken });
    } else {
      setIsAuthChecked(true);
    }
  }, [navigate]);

  return isAuthChecked ? children : null;
}

export default ProtectedRoute;
