import { useLocation, useNavigate } from "react-router-dom";
import { getAllowedPaths, isAllowedByException } from "@/utils/getAllowedPaths";
import { useAuthStore } from "@/features/auth/store/authStore";
import { useEffect, type JSX } from "react";
import Forbidden from "@/features/_components/Forbidden";
import useSideBar from "@/features/_sideBar/useSideBar";
interface TProps {
  children: JSX.Element;
}

const RouteGuard = ({ children }: TProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: sidebar } = useSideBar();
  // const sidebar = useAuthStore((s) => s.sidebar?.menus);
  // const auth = useAuthStore((s) => s.auth);
  // const mobile = useAuthStore((s) => s.userData?.user.mobile);
  const clearAuth = useAuthStore((s) => s.clearAuth);
  // if (!auth) return <Navigate to="/login" replace />;
  // if (auth && !auth.organizations.length)
  //   return <Navigate to="/user-organizations" replace />;
  if (!sidebar) return null;
  const allowedPaths = getAllowedPaths(sidebar.data?.menus);
  const pathname = location.pathname;
  const isAllowed =
    allowedPaths.has(pathname) || isAllowedByException(pathname);
  useEffect(() => {
    const refreshAuth = async () => {
      // const res = await plainInstance.post("/refresh/");
      // if (mobile === res.data.user) return;
      clearAuth();
      navigate("/login");
    };
    refreshAuth();
  }, []);
  if (!isAllowed) {
    return <Forbidden />;
  }
  return children;
};

export default RouteGuard;
