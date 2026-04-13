import useGetData from "@/services/useGetData";
import CustomTable from "@/components/Tabulator";
import { servicesQuerykey, servicesUrl } from "../_fixtures/data";
import useDeleteData from "@/services/useDeleteData";
import SevicesForm from "./SevicesForm";
import { useState } from "react";
import Modal from "@/components/Headless/Dialog/Modal";
import ServiceInfo from "./ServiceInfo";
function Services() {
  const { data, isFetching, refetch } = useGetData<any>({
    queryKey: servicesQuerykey,
    url: servicesUrl,
  });
  const { mutate: Delete } = useDeleteData({
    queryKey: servicesQuerykey,
    url: servicesUrl,
  });
  const [open, setOpen] = useState<{ form: boolean; view: boolean }>({
    form: false,
    view: false,
  });
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
          setOpen({ form: true, view: false });
        }}
        onDelete={(record) => Delete(record.id)}
        onEdit={(record) => {
          setSelectedRecord(record);
          setOpen({ form: true, view: false });
        }}
        onVisit={(record) => {
          setSelectedRecord(record);
          setOpen({ form: false, view: true });
        }}
      />
      <Modal
        size="xxl"
        cancelBtn={false}
        close={() => setOpen({ form: false, view: false })}
        open={open.form}
        title={
          selectedRecord ? `ویرایش ${selectedRecord.title}` : "افزودن خدمت جدید"
        }>
        <SevicesForm setOpen={setOpen} id={selectedRecord?.id} />
      </Modal>

      <Modal
        title={selectedRecord && `آمار و جزییات ${selectedRecord?.title}`}
        open={open.view}
        cancelBtn={false}
        size="xxl"
        close={() => {
          setOpen({ form: false, view: false });
          setSelectedRecord(null);
        }}>
        <ServiceInfo id={selectedRecord && selectedRecord.id} />
      </Modal>
    </>
  );
}

export default Services;
