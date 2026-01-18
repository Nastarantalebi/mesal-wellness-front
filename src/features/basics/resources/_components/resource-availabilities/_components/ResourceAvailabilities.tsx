import { queryKey, url } from "../_fixtures/data";
import useDeleteData from "@/services/useDeleteData";
import useGetData from "@/services/useGetData";
import CustomTable from "@/components/Tabulator";
import ResourceAvailabilitiesForm from "./ResourceAvailabilitiesForm";
import { useState } from "react";

function ResourceAvailabilities({ id }: { id: number }) {
  const { data, isFetching, refetch } = useGetData<any>({
    queryKey: [queryKey, String(id)],
    url: `/wellness/resource/availabilities?resource_id=${id}`,
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
        <ResourceAvailabilitiesForm
          selectedRecord={selectedRecord}
          setShowForm={setShowForm}
          resourceId={id}
          refetch={refetch}
        />
      )}
      <CustomTable
        isLoading={isFetching}
        refetch={refetch}
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
