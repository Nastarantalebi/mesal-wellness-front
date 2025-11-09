import { useNavigate } from "react-router-dom";
import type { TFacilities } from "../_types/types";
import useGetData from "@/services/useGetData";
import CustomTable from "@/components/Tabulator";
import { queryKey, url } from "../_fixtures/data";
import useDeleteData from "@/services/useDeleteData";

function Facilities() {
  const navigate = useNavigate();
  const { data } = useGetData<TFacilities>({
    queryKey: queryKey,
    url: url,
  });
  const { mutate: Delete } = useDeleteData({
    queryKey: queryKey,
    url: url,
  });

  return (
    <CustomTable
      title="خدمات"
      columns={data?.columns}
      data={data?.data}
      paginationSize={data?.paginate.total}
      onAdd={() => navigate("create")}
      onDelete={(record) => Delete(record.id)}
      onEdit={(record) => navigate("create", { state: { record } })}
    />
  );
}

export default Facilities;
