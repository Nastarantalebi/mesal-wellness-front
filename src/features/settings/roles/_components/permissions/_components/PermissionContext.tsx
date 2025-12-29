import { createContext, useContext, useState } from "react";

type PermissionContextType = {
  activeIds: number[];
  setActiveIds: React.Dispatch<React.SetStateAction<number[]>>;
};

const PermissionContext = createContext<PermissionContextType | null>(null);

export const PermissionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [activeIds, setActiveIds] = useState<number[]>([]);

  return (
    <PermissionContext.Provider value={{ activeIds, setActiveIds }}>
      {children}
    </PermissionContext.Provider>
  );
};

export const usePermissions = () => {
  const ctx = useContext(PermissionContext);
  if (!ctx)
    throw new Error("usePermissions must be used inside PermissionProvider");
  return ctx;
};
