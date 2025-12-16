import CustomTabs from "@/components/Headless/Tab/CustomTab";
import TitlePage from "@/features/_components/TitlePage";
import useTabItems from "../_hooks/useTabItems";

const Profile = () => {
  const { tabItems } = useTabItems();
  return (
    <div className="mb-12">
      <TitlePage title="پروفایل" />
      <h3 className="text-xl sm:text-2xl text-center font-semibold text-gray-800 xl:my-4">
        پروفایل کاربر
      </h3>
      <CustomTabs items={tabItems} />
    </div>
  );
};

export default Profile;
