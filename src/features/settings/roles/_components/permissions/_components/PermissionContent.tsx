import { useMemo } from "react";
import useGetData from "@/services/useGetData";
import { queryKey, url } from "../_fixtures/data";
import type { RootPermissions } from "../_types/type";
import AccessSwitch from "@/components/Form/FormSwitch/ReactSwitch";

type TProps = {
  label: string;
  setActiveIds: React.Dispatch<React.SetStateAction<number[]>>;
  activeIds: number[];
};

const PermissionContent = ({ label, setActiveIds, activeIds }: TProps) => {
  const { data } = useGetData<RootPermissions>({
    url: url,
    queryKey: queryKey,
  });
  // گروه‌بندی پرمیشن‌ها بر اساس module_name
  const groupedPermissions = useMemo(() => {
    const perms = data?.permissions[label] || [];
    return perms.reduce<Record<string, typeof perms>>((acc, item) => {
      if (!acc[item.module_name]) acc[item.module_name] = [];
      acc[item.module_name].push(item);
      return acc;
    }, {});
  }, [data, label]);

  // IDs مربوط به تب فعلی
  const currentTabIds = useMemo(
    () =>
      Object.values(groupedPermissions)
        .flat()
        .map((p) => p.id),
    [groupedPermissions]
  );

  // فعال/غیرفعال کردن همه پرمیشن‌ها در تب فعلی
  const toggleAll = (isOn: boolean) => {
    setActiveIds((prev) => {
      if (isOn) {
        // اضافه کردن آیتم‌های تب فعلی بدون حذف قبلی
        return Array.from(new Set([...prev, ...currentTabIds]));
      } else {
        // حذف فقط آیتم‌های این تب
        return prev.filter((id) => !currentTabIds.includes(id));
      }
    });
  };

  // فعال/غیرفعال کردن یک ماژول
  const toggleModule = (moduleName: string, isOn: boolean) => {
    const moduleIds = groupedPermissions[moduleName].map((p) => p.id);
    setActiveIds((prev) => {
      if (isOn) {
        return Array.from(new Set([...prev, ...moduleIds]));
      } else {
        return prev.filter((id) => !moduleIds.includes(id));
      }
    });
  };

  // بررسی وضعیت ماژول و سراسری
  const isModuleAllSelected = (moduleName: string) =>
    groupedPermissions[moduleName].every((p) => activeIds.includes(p.id));
  const isAllSelected = currentTabIds.every((id) => activeIds.includes(id));

  // بروزرسانی خودکار سوییچ‌ها وقتی کاربر یک پرمیشن تکی تغییر می‌دهد
  const handleTogglePermission = (id: number, isOn: boolean) => {
    setActiveIds((prev) =>
      isOn
        ? Array.from(new Set([...prev, id]))
        : prev.filter((item) => item !== id)
    );
  };

  return (
    <div className="space-y-6">
      {/* گزینه انتخاب همه سراسری */}
      <div className="mb-4">
        <AccessSwitch
          label="انتخاب همه"
          checked={isAllSelected}
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
              checked={isModuleAllSelected(moduleName)}
              onChange={(isOn) => toggleModule(moduleName, isOn)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {perms.map((item) => (
              <AccessSwitch
                key={item.id}
                label={item.label}
                checked={activeIds.includes(item.id)}
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
