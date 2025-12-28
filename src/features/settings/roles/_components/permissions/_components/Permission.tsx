import CustomTabs from "@/components/Headless/Tab/CustomTab";
import { useTabItems } from "../_hooks/useTabItems";

const Permission = () => {
  const tabItems = useTabItems();
  return (
    <div>
      <CustomTabs items={tabItems} />
    </div>
  );
};

export default Permission;
