import { useMemo, useState } from "react";
import useGetData from "@/services/useGetData";
import { queryKey, url } from "../_fixtures/data";
import AccessSwitch from "@/components/Form/FormSwitch/ReactSwitch";
import { ChevronDown, ChevronUp } from "lucide-react";
import LoadingSpin from "@/components/Loading";
import { useWidgets } from "./WidgetsContext";
import type { Rootwidgets } from "../_types/type";

type TProps = {
  label: string;
};
const WidgetsContent = ({ label }: TProps) => {
  const { activeIds, setActiveIds } = useWidgets();
  const { data, isLoading } = useGetData<Rootwidgets>({
    url,
    queryKey,
  });

  const [isAllOpen, setIsAllOpen] = useState(true);
  const [openModules, setOpenModules] = useState<Record<string, boolean>>({});

  const groupedWidgets = useMemo(() => {
    const perms = data?.permissions[label] || [];
    return perms.reduce<Record<string, typeof perms>>((acc, item) => {
      if (!acc[item.module_name]) acc[item.module_name] = [];
      acc[item.module_name].push(item);
      return acc;
    }, {});
  }, [data, label]);

  const currentTabIds = useMemo(
    () =>
      Object.values(groupedWidgets)
        .flat()
        .map((p) => p.id),
    [groupedWidgets]
  );

  const isAllSelected = currentTabIds.every((id) => activeIds.includes(id));

  const toggleAll = (isOn: boolean) => {
    setActiveIds((prev) =>
      isOn
        ? Array.from(new Set([...prev, ...currentTabIds]))
        : prev.filter((id) => !currentTabIds.includes(id))
    );

    // UX: وقتی خاموش شد همه بسته شن
    if (!isOn) {
      setIsAllOpen(false);
      setOpenModules({});
    }
  };

  const toggleModule = (moduleName: string, isOn: boolean) => {
    const moduleIds = groupedWidgets[moduleName].map((p) => p.id);
    setActiveIds((prev) =>
      isOn
        ? Array.from(new Set([...prev, ...moduleIds]))
        : prev.filter((id) => !moduleIds.includes(id))
    );
  };

  const toggleOpenAll = () => {
    const next = !isAllOpen;
    setIsAllOpen(next);

    const newState: Record<string, boolean> = {};
    Object.keys(groupedWidgets).forEach((m) => (newState[m] = next));
    setOpenModules(newState);
  };

  const toggleOpenModule = (moduleName: string) => {
    setOpenModules((prev) => ({
      ...prev,
      [moduleName]: !prev[moduleName],
    }));
  };

  if (isLoading) return <LoadingSpin />;

  return (
    <div className="space-y-4">
      {/* 🔥 اکاردیون انتخاب همه */}
      <div className="border rounded-md">
        <div
          className="flex justify-between items-center p-3 bg-gray-200 cursor-pointer"
          onClick={toggleOpenAll}>
          <div className="flex items-center gap-2">
            {isAllOpen ? <ChevronUp /> : <ChevronDown />}
            <span className="font-semibold">همه دسترسی‌ها</span>
          </div>

          <div onClick={(e) => e.stopPropagation()}>
            <AccessSwitch checked={isAllSelected} onChange={toggleAll} />
          </div>
        </div>

        {/* محتوا */}
        {isAllOpen && (
          <div className="p-3 space-y-4">
            {Object.entries(groupedWidgets).map(([moduleName, perms]) => {
              const isOpen = openModules[moduleName];

              return (
                <div key={moduleName} className="border rounded-md">
                  <div
                    className="flex justify-between items-center p-3 bg-gray-100 cursor-pointer"
                    onClick={() => toggleOpenModule(moduleName)}>
                    <div className="flex items-center gap-2">
                      {isOpen ? <ChevronUp /> : <ChevronDown />}
                      <h3 className="font-semibold">{moduleName}</h3>
                    </div>

                    <div onClick={(e) => e.stopPropagation()}>
                      <AccessSwitch
                        checked={perms.every((p) => activeIds.includes(p.id))}
                        onChange={(isOn) => toggleModule(moduleName, isOn)}
                      />
                    </div>
                  </div>

                  {isOpen && (
                    <div className="p-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                      {perms.map((item) => (
                        <AccessSwitch
                          key={item.id}
                          label={item.label}
                          checked={activeIds.includes(item.id)}
                          onChange={(isOn) =>
                            setActiveIds((prev) =>
                              isOn
                                ? [...new Set([...prev, item.id])]
                                : prev.filter((i) => i !== item.id)
                            )
                          }
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default WidgetsContent;
