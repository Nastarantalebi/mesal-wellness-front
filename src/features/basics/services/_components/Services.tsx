import useGetData from "@/services/useGetData";
import CustomTable from "@/components/Tabulator";
import { servicesQuerykey, servicesUrl } from "../_fixtures/data";
import useDeleteData from "@/services/useDeleteData";
import SevicesForm from "./SevicesForm";
import { useState } from "react";
import Modal from "@/components/Headless/Dialog/Modal";
function Services() {
  const { data, isFetching, refetch } = useGetData<any>({
    queryKey: servicesQuerykey,
    url: servicesUrl,
  });
  const { mutate: Delete } = useDeleteData({
    queryKey: servicesQuerykey,
    url: servicesUrl,
  });
  const [open, setOpen] = useState<boolean>(false);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  return (
    <>
      <CustomTable
        isLoading={isFetching}
        refetch={refetch}
        title="خدمات"
        columns={data?.columns}
        data={data?.data}
        dataPagination={data?.paginate && data?.paginate}
        onAdd={() => {
          setSelectedRecord(null);
          setOpen(true);
        }}
        onDelete={(record) => Delete(record.id)}
        onEdit={(record) => {
          setSelectedRecord(record);
          setOpen(true);
        }}
      />
      <Modal
        size="xxl"
        cancelBtn={false}
        close={() => setOpen(false)}
        open={open}
        title={
          selectedRecord ? `ویرایش ${selectedRecord.title}` : "افزودن خدمت جدید"
        }>
        <SevicesForm setOpen={setOpen} id={selectedRecord?.id} />
      </Modal>
    </>
  );
}

export default Services;
