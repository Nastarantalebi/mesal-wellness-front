import CustomTable from "../../../components/Tabulator";
import useGetData from "../../../services/useGetData";
import { queryKey, url } from "../_fixtures/data";
import useDeleteData from "@/services/useDeleteData";
import useCreateData from "@/services/useCreateData";
import Modal from "@/components/Headless/Dialog/Modal";
import { useState } from "react";
import CustomersForm from "./CustomersForm";
import type { TRecord } from "../_types/types";

function Customers() {
  const { data, refetch, isFetching } = useGetData<any>({
    queryKey: queryKey,
    url: url,
  });
  const { mutate: Delete } = useDeleteData({
    queryKey: queryKey,
    url: url,
  });
  const { mutate } = useCreateData({
    url: "wellness/customers/import",
    onSuccess: () => refetch(),
  });
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedRecord, setSelectedRecord] = useState<TRecord | null>(null);
  return (
    <>
      <CustomTable
        refetch={refetch}
        isLoading={isFetching}
        title="مشتریان"
        onImport={(file) => {
          const formData = new FormData();
          formData.append("file", file);
          mutate(formData);
        }}
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
            ? `ویرایش مشتری ${selectedRecord?.full_name}`
            : "افزودن مشتری جدید"
        }>
        <CustomersForm
          setOpenModal={setOpenModal}
          selectedRecord={selectedRecord}
        />
      </Modal>
    </>
  );
}

export default Customers;
