import useTabItems from "../_hooks/useTabItems";
import CustomTabs from "@/components/Headless/Tab/CustomTab";

function TabList() {
  const { tabItems } = useTabItems();
  return <CustomTabs items={tabItems} title="نوبت‌های رزرو شده" />;
}

export default TabList;
