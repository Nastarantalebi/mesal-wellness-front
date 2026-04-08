import useGetData from "@/services/useGetData";
import CustomTable from "@/components/Tabulator";
import { queryKey, url } from "../_fixtures/data";
import useDeleteData from "@/services/useDeleteData";
import { useState } from "react";
import Modal from "@/components/Headless/Dialog/Modal";
import ResourceTypeForm from "./ResourcesTypeForm";

function ResourceType() {
  const { data, isFetching, refetch } = useGetData<any>({
    queryKey: queryKey,
    url: url,
  });
  const { mutate: Delete } = useDeleteData({
    queryKey: queryKey,
    url: url,
  });
  const [open, setOpen] = useState<boolean>(false);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  return (
    <>
      <CustomTable
        isLoading={isFetching}
        refetch={refetch}
        title="نوع مکان"
        columns={data?.columns}
        data={data?.data}
        dataPagination={data?.paginate}
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
          selectedRecord ? `ویرایش ${selectedRecord.name}` : "افزودن مکان جدید"
        }>
        <ResourceTypeForm setOpen={setOpen} id={selectedRecord?.id} />
      </Modal>
    </>
  );
}

export default ResourceType;
