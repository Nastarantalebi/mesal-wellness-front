import { Navigate, useLocation } from "react-router-dom";
import { getAllowedPaths, isAllowedByException } from "@/utils/getAllowedPaths";
import { useAuthStore } from "@/features/auth/store/authStore";
import type { JSX } from "react";
interface TProps {
  children: JSX.Element;
}

const RouteGuard = ({ children }: TProps) => {
  const location = useLocation();
  const sidebar = useAuthStore((s) => s.sidebar?.menus);
  const allowedPaths = getAllowedPaths(sidebar);

  const pathname = location.pathname;

  const isAllowed =
    allowedPaths.has(pathname) || isAllowedByException(pathname);

  if (!isAllowed) {
    return <Navigate to="/403" replace />;
  }

  return children;
};

export default RouteGuard;
