import type { TabItem } from "@/components/Headless/Tab/CustomTab";
import useGetData from "@/services/useGetData";
import type { TGroups } from "../_types/type";
import PermissionContent from "../_components/PermissionContent";
import { useState } from "react";

export const useTabItems = (): TabItem[] => {
  const { data } = useGetData<TGroups>({
    url: "basics/acl/permissions/groups",
    queryKey: "tabitems",
  });
  const [activeIds, setActiveIds] = useState<number[]>([]);
  if (!data?.data) return [];
  const tabItems: TabItem[] = data.data.map((item) => ({
    key: item.value,
    title: item.label,
    content: (
      <PermissionContent
        label={item.label}
        setActiveIds={setActiveIds}
        activeIds={activeIds}
      />
    ),
  }));

  return tabItems;
};
