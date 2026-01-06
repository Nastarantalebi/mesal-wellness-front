import useGetData from "@/services/useGetData";
import { queryKey, url } from "../_fixtures/data";
import CustomTabs from "@/components/Headless/Tab/CustomTab";
import { useTabItems } from "../_hooks/useTabItems";
import { PermissionsProvider } from "./PermissionsContext";
import type { TPermissions } from "../_types/type";

const Permissions = () => {
  const { data } = useGetData<TPermissions>({
    url: url,
    queryKey: queryKey,
  });
  const tabItems = useTabItems(data);
  return (
    <PermissionsProvider>
      <CustomTabs items={tabItems} />
    </PermissionsProvider>
  );
};

export default Permissions;
