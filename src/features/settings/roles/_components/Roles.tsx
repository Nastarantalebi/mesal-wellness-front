import useGetData from "@/services/useGetData";
import { queryKey, url } from "../_fixtures/data";
import CustomTable from "@/components/Tabulator";
import { useState } from "react";
import Modal from "@/components/Headless/Dialog/Modal";
import RolesForm from "./RolesForm";

const Roles = () => {
  const { data, refetch, isFetching } = useGetData<any>({
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
        title="مدیریت نقش‌ها"
        addText="افزودن نقش جدید"
        columns={data?.columns}
        data={data?.data}
        dataPagination={data?.paginate}
        onAdd={() => {
          console.log("object");
          setOpenModal(true);
          setSelectedRecord(null);
        }}
        onEdit={(record) => {
          console.log(record);
          setOpenModal(true);
          setSelectedRecord(record);
        }}
      />
      <Modal
        close={() => setOpenModal(false)}
        open={openModal}
        size="xxl"
        cancelBtn={false}
        title={
          selectedRecord
            ? `ویرایش نقش ${
                selectedRecord?.first_name + " " + selectedRecord?.last_name
              }`
            : "افزودن نقش جدید"
        }>
        <RolesForm
          setOpenModal={setOpenModal}
          selectedRecord={selectedRecord}
        />
      </Modal>
    </>
  );
};

export default Roles;
