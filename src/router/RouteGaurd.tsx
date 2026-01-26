import { Navigate, useLocation } from "react-router-dom";
import { getAllowedPaths, isAllowedByException } from "@/utils/getAllowedPaths";
import { useAuthStore } from "@/features/auth/store/authStore";
import type { JSX } from "react";
import Forbidden from "@/features/_components/Forbidden";
interface TProps {
  children: JSX.Element;
}

const RouteGuard = ({ children }: TProps) => {
  const location = useLocation();
  const sidebar = useAuthStore((s) => s.sidebar?.menus);
  const auth = useAuthStore((s) => s.auth);
  if (!auth) return <Navigate to="/login" replace />;
  if (!sidebar) return null;
  const allowedPaths = getAllowedPaths(sidebar);
  const pathname = location.pathname;
  const isAllowed =
    allowedPaths.has(pathname) || isAllowedByException(pathname);
  if (!isAllowed) {
    return <Forbidden />;
  }
  return children;
};

export default RouteGuard;
