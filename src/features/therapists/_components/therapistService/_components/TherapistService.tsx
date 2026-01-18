import useGetData from "@/services/useGetData";
import CustomTable from "@/components/Tabulator";
import { queryKey, url } from "../_fixtures/data";
import useDeleteData from "@/services/useDeleteData";
import TherapistServiceForm from "./TherapistServiceForm";
import { useState } from "react";
type TProps = {
  id: number;
};
function TherapistService({ id }: TProps) {
  const { data, isFetching, refetch } = useGetData<any>({
    queryKey: [queryKey, String(id)],
    url: `/wellness/therapist-services?therapist_id=${id}`,
    enabled: !!id,
  });
  const { mutate: Delete } = useDeleteData({
    queryKey: queryKey,
    url: url,
    onSuccess: () => refetch(),
  });
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [showForm, setShowForm] = useState<any>(null);
  return (
    <>
      {showForm && (
        <TherapistServiceForm
          selectedRecord={selectedRecord}
          setShowForm={setShowForm}
          therapistId={id}
          refetch={refetch}
        />
      )}
      <CustomTable
        isLoading={isFetching}
        refetch={refetch}
        title="خدمات ماساژیست"
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

export default TherapistService;
