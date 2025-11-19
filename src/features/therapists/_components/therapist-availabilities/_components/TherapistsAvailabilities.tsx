import { queryKey, url } from "../_fixtures/data";
import useDeleteData from "@/services/useDeleteData";
import CustomTable from "@/components/Tabulator";
import useGetData from "@/services/useGetData";
import TherapistsAvailabilitiesForm from "./TherapistsAvailabilitiesForm";
import { useState } from "react";
type TProps = {
  id: number;
};
function TherapistsAvailabilities({ id }: TProps) {
  const { mutate: Delete } = useDeleteData({
    queryKey: queryKey,
    url: url,
  });
  const { data, isFetching } = useGetData<any>({
    queryKey: [queryKey, String(id)],
    url: `${url}?therapist_id=${id}`,
    enabled: !!id,
  });
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [showForm, setShowForm] = useState<any>(null);
  return (
    <>
      {showForm && (
        <TherapistsAvailabilitiesForm
          selectedRecord={selectedRecord}
          setShowForm={setShowForm}
           therapistId={id}
        />
      )}
      <CustomTable
        isLoading={isFetching}
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
