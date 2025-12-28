import { useState } from "react";
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

  // آرایه برای نگهداری idهای فعال
  const [activeIds, setActiveIds] = useState<number[]>([]);
  console.log("", activeIds);
  const handleToggle = (id: number, isOn: boolean) => {
    setActiveIds((prev) =>
      isOn ? [...prev, id] : prev.filter((item) => item !== id)
    );
  };

  return (
    <div className="flex flex-row flex-wrap gap-3">
      {data?.permissions[label]?.map((item) => (
        <AccessSwitch
          key={item.id}
          label={item.label}
          defaultChecked={false}
          onChange={(isOn) => handleToggle(item.id, isOn)}
        />
      ))}
    </div>
  );
};

export default PermissionContent;
