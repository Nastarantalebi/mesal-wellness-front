import { createContext, useContext, useState } from "react";

type WidgetsContextType = {
  activeIds: number[];
  setActiveIds: React.Dispatch<React.SetStateAction<number[]>>;
};

const WidgetsContext = createContext<WidgetsContextType | null>(null);

export const WidgetsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [activeIds, setActiveIds] = useState<number[]>([]);

  return (
    <WidgetsContext.Provider value={{ activeIds, setActiveIds }}>
      {children}
    </WidgetsContext.Provider>
  );
};

export const useWidgets = () => {
  const ctx = useContext(WidgetsContext);
  if (!ctx) throw new Error("useWidgets must be used inside WidgetsProvider");
  return ctx;
};
