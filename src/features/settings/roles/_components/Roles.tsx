import useGetData from "@/services/useGetData";
import { queryKey, url } from "../_fixtures/data";
import CustomTable from "@/components/Tabulator";
import { useState } from "react";
import Modal from "@/components/Headless/Dialog/Modal";
import RolesForm from "./RolesForm";
import useDeleteData from "@/services/useDeleteData";
import { LayoutGridIcon, ShieldIcon } from "lucide-react";
import WidgetsForm from "./WidgetsForm";
import PermissionsForm from "./PermissionsForm";
export type TModal = {
  general: boolean;
  permission: boolean;
  widget: boolean;
};
const Roles = () => {
  const { data, refetch, isFetching } = useGetData<any>({
    url,
    queryKey,
  });
  const { mutate: Delete } = useDeleteData({
    url,
    queryKey,
  });
  const [openModal, setOpenModal] = useState<TModal>({
    general: false,
    permission: false,
    widget: false,
  });
  const toggleModal = (
    key: "general" | "permission" | "widget",
    value: boolean
  ) => {
    setOpenModal((prev) => ({ ...prev, [key]: value }));
  };

  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  return (
    <>
      <CustomTable
        refetch={refetch}
        isLoading={isFetching}
        title="مدیریت نقش‌ها"
        addText="افزودن نقش جدید"
        columns={data?.columns}
        data={data?.data}
        dataPagination={data?.paginate}
        onAdd={() => {
          toggleModal("general", true);
          setSelectedRecord(null);
        }}
        onEdit={(record) => {
          toggleModal("general", true);
          setSelectedRecord(record);
        }}
        onDelete={(record) => Delete(record.id)}
        customActions={[
          {
            icon: <ShieldIcon className="w-4 h-4" />,
            title: "دسترسی‌ها",
            onClick: () => {
              toggleModal("permission", true);
            },
          },
          {
            icon: <LayoutGridIcon className="w-4 h-4" />,
            title: "ویجت‌ها",
            onClick: () => {
              toggleModal("widget", true);
            },
          },
        ]}
      />
      <Modal
        close={() => toggleModal("general", false)}
        open={openModal.general}
        size="md"
        cancelBtn={false}
        title={
          selectedRecord
            ? "ویرایش" + " " + selectedRecord?.display_name
            : "ایجاد نقش جدید"
        }>
        <RolesForm
          setOpenModal={(value: boolean) => toggleModal("general", value)}
          id={selectedRecord?.id}
        />
      </Modal>
      <Modal
        close={() => toggleModal("widget", false)}
        open={openModal.widget}
        size="md"
        cancelBtn={false}
        title="ویجت‌ها">
        <WidgetsForm
          id={selectedRecord?.id}
          setOpenModal={(value: boolean) => toggleModal("widget", value)}
        />
      </Modal>
      <Modal
        close={() => toggleModal("permission", false)}
        open={openModal.permission}
        size="md"
        cancelBtn={false}
        title="دسترسی‌ها">
        <PermissionsForm
          id={selectedRecord?.id}
          setOpenModal={(value: boolean) => toggleModal("permission", value)}
        />
      </Modal>
    </>
  );
};

export default Roles;
