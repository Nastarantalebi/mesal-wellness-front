import type { TabItem } from "@/components/Headless/Tab/CustomTab";
import ChangePassword from "../_components/ChangePassword";
import ProfileInfo from "../_components/ProfileInfo";

const useTabItems = () => {
  const tabItems: TabItem[] = [
    {
      key: "1",
      title: "اطلاعات کابری",
      content: <ProfileInfo />,
    },
    {
      key: "2",
      title: "بازنشانی رمز عبور",
      content: <ChangePassword />,
    },
  ];
  return { tabItems };
};
export default useTabItems;
