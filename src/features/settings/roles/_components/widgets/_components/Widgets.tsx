import CustomTabs from "@/components/Headless/Tab/CustomTab";
import { useTabItems } from "../_hooks/useTabItems";
import Button from "@/components/Button";
import useCreateData from "@/services/useCreateData";
import { queryKey } from "../_fixtures/data";
import useGetById from "@/services/useGetById";
import type { TGetById } from "../_types/type";
import { useEffect } from "react";
import LoadingSpin from "@/components/Loading";
import { useWidgets } from "./WidgetsContext";
type TProps = {
  id: number;
  setOpenModal: (value: boolean) => void;
};
const Widgets = ({ id, setOpenModal }: TProps) => {
  const { data, isLoading } = useGetById<TGetById>({
    queryKey: ["role-widgets", String(id)],
    url: `/basics/acl/roles/${id}/widgets/`,
    enabled: !!id,
  });
  const { activeIds, setActiveIds } = useWidgets();
  useEffect(() => {
    if (data?.data) {
      const initialIds = data.data.map((item) => item.id);
      setActiveIds(initialIds);
    }
  }, [data, setActiveIds]);
  const { mutate, isPending } = useCreateData({
    url: "basics/roles/widgets",
    queryKey: queryKey + "widgets",
  });
  const tabItems = useTabItems();
  const handleSubmit = () => {
    mutate(
      { id, widgets: activeIds },
      {
        onSuccess: () => setOpenModal(false),
      }
    );
  };
  if (isLoading) return <LoadingSpin />;
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

export default Widgets;
