import CustomTabs from "@/components/Headless/Tab/CustomTab";
import { useTabItems } from "../_hooks/useTabItems";
import Button from "@/components/Button";
import useCreateData from "@/services/useCreateData";
import { queryKey } from "../_fixtures/data";
import { usePermissions } from "./PermissionContext";
type TProps = {
  id: number;
  setOpenModal: (value: boolean) => void;
};
const Permission = ({ id, setOpenModal }: TProps) => {
  const { mutate, isPending } = useCreateData({
    url: "basics/acl/roles/permissions",
    queryKey: queryKey + "permissions",
  });
  const tabItems = useTabItems();
  const { activeIds } = usePermissions();
  const handleSubmit = () => {
    mutate(
      { id, permissions: activeIds },
      {
        onSuccess: () => setOpenModal(false),
      }
    );
  };

  return (
    <div>
      <CustomTabs items={tabItems} />
      <div className="text-left">
        <Button
          type="submit"
          variant="primary"
          className="mt-4 py-3.5"
          disabled={activeIds.length === 0}
          isPending={isPending}
          onClick={handleSubmit}>
          ثبت اطلاعات
        </Button>
      </div>
    </div>
  );
};

export default Permission;
