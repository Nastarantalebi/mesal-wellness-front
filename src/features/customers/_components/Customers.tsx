import { useNavigate } from "react-router-dom";
import CustomTable from "../../../components/Tabulator";
import useGetData from "../../../services/useGetData";
import type { TCustomers } from "../_types/types";
import { queryKey, url } from "../_fixtures/data";
import useDeleteData from "@/services/useDeleteData";

function Customers() {
  const navigate = useNavigate();
  const { data } = useGetData<TCustomers>({
    queryKey: queryKey,
    url: url,
  });
  const { mutate: Delete } = useDeleteData({
    queryKey: queryKey,
    url: url,
  });

  return (
    <CustomTable
      title="مشتریان"
      columns={data?.columns}
      data={data?.data}
      paginationSize={data?.paginate.total}
      onAdd={() => navigate("create")}
      onEdit={(record) => navigate("create", { state: { record } })}
      onDelete={(record) => Delete(record.id)}
    />
  );
}

export default Customers;
