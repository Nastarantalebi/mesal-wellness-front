import LoadingSpin from "@/components/Loading";
import { useState, useEffect } from "react";

interface TProps {
  children: React.ReactNode;
}

export default function ProtectedRoutes({ children }: TProps) {
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    setCheckingAuth(false);
  }, []);

  if (checkingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpin />
      </div>
    );
  }

  return <>{children}</>;
}
