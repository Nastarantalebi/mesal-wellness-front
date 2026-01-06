import { createContext, useContext, useState } from "react";

type RolesPermissionContextType = {
  activeIds: number[];
  setActiveIds: React.Dispatch<React.SetStateAction<number[]>>;
};

const PermissionContext = createContext<RolesPermissionContextType | null>(
  null
);

export const RolesPermissionProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [activeIds, setActiveIds] = useState<number[]>([]);

  return (
    <PermissionContext.Provider value={{ activeIds, setActiveIds }}>
      {children}
    </PermissionContext.Provider>
  );
};

export const useRolesPermissions = () => {
  const ctx = useContext(PermissionContext);
  if (!ctx)
    throw new Error("usePermissions must be used inside PermissionProvider");
  return ctx;
};
