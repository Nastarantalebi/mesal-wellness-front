import { queryKey, url } from "../_fixtures/data";
import useDeleteData from "@/services/useDeleteData";
import useGetData from "@/services/useGetData";
import CustomTable from "@/components/Tabulator";
import ResourceAvailabilitiesForm from "./ResourceAvailabilitiesForm";
import { useState } from "react";

function ResourceAvailabilities() {
  const { data } = useGetData<any>({
    queryKey: queryKey,
    url: url,
  });
  const { mutate: Delete } = useDeleteData({
    queryKey: queryKey,
    url: url,
  });
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [showForm, setShowForm] = useState<any>(null);
  return (
    <>
      {showForm && (
        <ResourceAvailabilitiesForm
          selectedRecord={selectedRecord}
          setShowForm={setShowForm}
        />
      )}
      <CustomTable
        title="مکان‌های دردسترس"
        onAdd={() => {
          setShowForm(true);
          setSelectedRecord(null);
        }}
        columns={data?.columns}
        data={data?.data}
        dataPagination={data?.paginate}
        onEdit={(record) => {
          setSelectedRecord(record);
          setShowForm(true);
        }}
        onDelete={(record) => Delete(record.id)}
      />
    </>
  );
}

export default ResourceAvailabilities;
