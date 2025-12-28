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
  console.log(activeIds);
  // گروه‌بندی پرمیشن‌ها بر اساس module_name
  const groupedPermissions = useMemo(() => {
    const perms = data?.permissions[label] || [];
    return perms.reduce<Record<string, typeof perms>>((acc, item) => {
      if (!acc[item.module_name]) acc[item.module_name] = [];
      acc[item.module_name].push(item);
      return acc;
    }, {});
  }, [data, label]);

  // فعال/غیرفعال کردن یک ماژول
  const toggleModule = (moduleName: string, isOn: boolean) => {
    const ids = groupedPermissions[moduleName].map((p) => p.id);
    setActiveIds((prev) =>
      isOn
        ? Array.from(new Set([...prev, ...ids]))
        : prev.filter((id) => !ids.includes(id))
    );
  };

  // فعال/غیرفعال کردن همه پرمیشن‌ها
  const toggleAll = (isOn: boolean) => {
    const allIds = Object.values(groupedPermissions)
      .flat()
      .map((p) => p.id);
    setActiveIds(isOn ? allIds : []);
  };

  // بررسی وضعیت ماژول و سراسری
  const isModuleAllSelected = (moduleName: string) =>
    groupedPermissions[moduleName].every((p) => activeIds.includes(p.id));
  const isAllSelected = Object.values(groupedPermissions)
    .flat()
    .every((p) => activeIds.includes(p.id));

  // بروزرسانی خودکار سوییچ‌ها وقتی کاربر یک پرمیشن تکی تغییر می‌دهد
  const handleTogglePermission = (id: number, isOn: boolean) => {
    setActiveIds((prev) =>
      isOn ? [...prev, id] : prev.filter((item) => item !== id)
    );
  };

  return (
    <div className="space-y-6">
      {/* گزینه انتخاب همه سراسری */}
      <div className="mb-4">
        <AccessSwitch
          label="انتخاب همه"
          checked={isAllSelected} // ✅ controlled
          onChange={toggleAll}
        />
      </div>

      {Object.entries(groupedPermissions).map(([moduleName, perms]) => (
        <div key={moduleName} className="border p-3 rounded-md space-y-2">
          {/* گزینه انتخاب همه برای هر ماژول */}
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">{moduleName}</h3>
            <AccessSwitch
              label="انتخاب همه"
              checked={isModuleAllSelected(moduleName)} // ✅ controlled
              onChange={(isOn) => toggleModule(moduleName, isOn)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {perms.map((item) => (
              <AccessSwitch
                key={item.id}
                label={item.label}
                checked={activeIds.includes(item.id)} // ✅ controlled
                onChange={(isOn) => handleTogglePermission(item.id, isOn)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PermissionContent;
