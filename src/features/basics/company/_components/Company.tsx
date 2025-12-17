import { useNavigate } from "react-router-dom";
import useGetData from "@/services/useGetData";
import CustomTable from "@/components/Tabulator";
import { queryKey, url } from "../_fixtures/data";
import useDeleteData from "@/services/useDeleteData";

function Company() {
  const navigate = useNavigate();
  const { data, isFetching, refetch } = useGetData<any>({
    queryKey: queryKey,
    url: url,
  });
  const { mutate: Delete } = useDeleteData({
    queryKey: queryKey,
    url: url,
  });

  return (
    <CustomTable
      isLoading={isFetching}
      refetch={refetch}
      title="شرکت‌های طرف قرارداد"
      columns={data?.columns}
      data={data?.data}
      dataPagination={data?.paginate}
      onAdd={() => navigate("create")}
      onDelete={(record) => Delete(record.id)}
      onEdit={(record) => navigate("create", { state: { record } })}
    />
  );
}

export default Company;
