import { createContext, useContext, useState } from "react";

type PermissionsContextType = {
  activeIds: number[];
  setActiveIds: React.Dispatch<React.SetStateAction<number[]>>;
};

const PermissionsContext = createContext<PermissionsContextType | null>(null);

export const PermissionsProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [activeIds, setActiveIds] = useState<number[]>([]);

  return (
    <PermissionsContext.Provider value={{ activeIds, setActiveIds }}>
      {children}
    </PermissionsContext.Provider>
  );
};

export const usePermissions = () => {
  const ctx = useContext(PermissionsContext);
  if (!ctx)
    throw new Error("usePermissions must be used inside PermissionProvider");
  return ctx;
};
