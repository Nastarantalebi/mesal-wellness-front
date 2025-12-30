import useGetData from "@/services/useGetData";
import { queryKey, url } from "../_fixtures/data";
import CustomTable from "@/components/Tabulator";
import { useState } from "react";
import Modal from "@/components/Headless/Dialog/Modal";
import useDeleteData from "@/services/useDeleteData";
import MenusForm from "./MenusForm";
export type TModal = {
  general: boolean;
  permission: boolean;
  widget: boolean;
};
const Menus = () => {
  const { data, refetch, isFetching } = useGetData<any>({
    url,
    queryKey,
  });
  const { mutate: Delete } = useDeleteData({
    url,
    queryKey,
  });
  const [openModal, setOpenModal] = useState<boolean>(false);

  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  return (
    <>
      <CustomTable
        refetch={refetch}
        isLoading={isFetching}
        title="مدیریت منوها"
        addText="افزودن منو جدید"
        columns={data?.columns}
        data={data?.data}
        dataPagination={data?.paginate}
        onAdd={() => {
          setOpenModal(true);
          setSelectedRecord(null);
        }}
        onEdit={(record) => {
          setOpenModal(true);
          setSelectedRecord(record);
        }}
        onDelete={(record) => Delete(record.id)}
      />
      <Modal
        close={() => setOpenModal(false)}
        open={openModal}
        size="xxl"
        cancelBtn={false}
        title={
          selectedRecord
            ? "ویرایش" + " " + selectedRecord?.display_name
            : "ایجاد منو جدید"
        }>
        <MenusForm setOpenModal={setOpenModal} id={selectedRecord?.id} />
      </Modal>
    </>
  );
};

export default Menus;
