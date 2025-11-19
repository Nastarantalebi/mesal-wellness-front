import { queryKey, url } from "../_fixtures/data";
import useDeleteData from "@/services/useDeleteData";
import CustomTable from "@/components/Tabulator";
import useGetData from "@/services/useGetData";
import TherapistsAvailabilitiesForm from "./TherapistsAvailabilitiesForm";
import { useState } from "react";

function TherapistsAvailabilities() {
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
        <TherapistsAvailabilitiesForm
          selectedRecord={selectedRecord}
          setShowForm={setShowForm}
        />
      )}
      <CustomTable
        title="درمانگر در دسترس"
        columns={data?.columns}
        data={data?.data}
        dataPagination={data?.paginate}
        onAdd={() => {
          setShowForm(true);
          setSelectedRecord(null);
        }}
        onDelete={(record) => Delete(record.id)}
        onEdit={(record) => {
          setSelectedRecord(record);
          setShowForm(true);
        }}
      />
    </>
  );
}

export default TherapistsAvailabilities;
