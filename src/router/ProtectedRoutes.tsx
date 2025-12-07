import LoadingSpin from "@/components/Loading";
import { plainInstance } from "@/libs/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface TProps {
  children: React.ReactNode;
}

export default function ProtectedRoutes({ children }: TProps) {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const refreshRes = await plainInstance.post("/refresh/", null);
        if (refreshRes.status === 200) {
          setAuthorized(true);
        } else {
          navigate("/login", { replace: true });
        }
      } catch (err: any) {
        navigate("/login", { replace: true });
      } finally {
        setCheckingAuth(false);
      }
    };

    checkAuth();
  }, []);

  if (checkingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpin />
      </div>
    );
  }

  if (!authorized) return null;

  return <>{children}</>;
}
