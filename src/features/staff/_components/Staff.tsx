import { queryKey, url } from "../_fixtures/data";
import useDeleteData from "@/services/useDeleteData";
import Modal from "@/components/Headless/Dialog/Modal";
import { useState } from "react";
import useGetData from "@/services/useGetData";
import CustomTable from "@/components/Tabulator";
import StaffForm from "./StaffForm";
import type { TRecord } from "../_types/types";

function Staff() {
  const { data, refetch, isFetching } = useGetData<any>({
    queryKey: queryKey,
    url: url,
  });
  const { mutate: Delete } = useDeleteData({
    queryKey: queryKey,
    url: url,
  });
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedRecord, setSelectedRecord] = useState<TRecord | null>(null);
  return (
    <>
      <CustomTable
        refetch={refetch}
        isLoading={isFetching}
        title="کارمندان"
        columns={data?.columns}
        data={data?.data}
        dataPagination={data?.paginate}
        onAdd={() => {
          setOpenModal(true);
          setSelectedRecord(null);
        }}
        onEdit={(record) => {
          setSelectedRecord(record);
          setOpenModal(true);
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
            ? "ویرایش کارمند" +
              " " +
              selectedRecord?.first_name +
              " " +
              selectedRecord?.last_name
            : "افزودن کارمند جدید"
        }>
        <StaffForm
          setOpenModal={setOpenModal}
          id={selectedRecord?.id}
        />
      </Modal>
    </>
  );
}

export default Staff;
