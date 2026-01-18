import type { TabItem } from "@/components/Headless/Tab/CustomTab";
import type { TPermissions } from "../_types/type";
import PermissionsContent from "../_components/PermissionsContent";

export const useTabItems = (data: TPermissions | undefined): TabItem[] => {
  if (!data?.data.permissions) return [];
  const tabItems: TabItem[] = Object.entries(data.data.permissions).map(
    ([key, permissions], index) => ({
      key: `tab-${index}`,
      title: key,
      content: <PermissionsContent permissions={permissions} />,
    })
  );

  return tabItems;
};
