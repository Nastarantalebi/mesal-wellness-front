import { useState, useMemo } from "react";
import useGetData from "@/services/useGetData";
import { queryKey, url } from "../_fixtures/data";
import type { RootPermissions } from "../_types/type";
import AccessSwitch from "@/components/Form/FormSwitch/ReactSwitch";

type TProps = {
  label: string;
};

const PermissionContent = ({ label }: TProps) => {
  const { data } = useGetData<RootPermissions>({
    url: url,
    queryKey: queryKey,
  });

  const [activeIds, setActiveIds] = useState<number[]>([]);

  const handleToggle = (id: number, isOn: boolean) => {
    setActiveIds((prev) =>
      isOn ? [...prev, id] : prev.filter((item) => item !== id)
    );
  };
  console.log(activeIds);
  // گروه‌بندی بر اساس module_name
  const groupedPermissions = useMemo(() => {
    const perms = data?.permissions[label] || [];
    return perms.reduce<Record<string, typeof perms>>((acc, item) => {
      if (!acc[item.module_name]) acc[item.module_name] = [];
      acc[item.module_name].push(item);
      return acc;
    }, {});
  }, [data, label]);

  return (
    <div className="space-y-6">
      {Object.entries(groupedPermissions).map(([moduleName, perms]) => (
        <div key={moduleName}>
          <h3 className="font-semibold mb-2">{moduleName}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {perms.map((item) => (
              <AccessSwitch
                key={item.id}
                label={item.label}
                defaultChecked={false}
                onChange={(isOn) => handleToggle(item.id, isOn)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PermissionContent;
