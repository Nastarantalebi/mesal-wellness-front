import type { TabItem } from "@/components/Headless/Tab/CustomTab";
import useGetData from "@/services/useGetData";
import type { TGroups } from "../_types/type";
import RolesPermissionContent from "../_components/RolesPermissionContent";

export const useTabItems = (): TabItem[] => {
  const { data } = useGetData<TGroups>({
    url: "basics/acl/permissions/groups",
    queryKey: "basics/acl/permissions/groups",
  });
  if (!data?.data) return [];
  const tabItems: TabItem[] = data.data.map((item) => ({
    key: item.value,
    title: item.label,
    content: <RolesPermissionContent label={item.label} />,
  }));

  return tabItems;
};
