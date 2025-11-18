import { useNavigate } from "react-router-dom";
import CustomTable from "../../../components/Tabulator";
import useGetData from "../../../services/useGetData";
import { queryKey, url } from "../_fixtures/data";
import useDeleteData from "@/services/useDeleteData";

function ResourceAvailabilities() {
  const navigate = useNavigate();
  const { data } = useGetData<any>({
    queryKey: queryKey,
    url: url,
  });
  const { mutate: Delete } = useDeleteData({
    queryKey: queryKey,
    url: url,
  });

  return (
    <CustomTable
      title="مکان‌های در دسترس"
      columns={data?.columns}
      data={data?.data}
      dataPagination={data?.paginate}
      onAdd={() => navigate("create")}
      onEdit={(record) => navigate("create", { state: { record } })}
      onDelete={(record) => Delete(record.id)}
    />
  );
}

export default ResourceAvailabilities;
