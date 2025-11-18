import { useNavigate } from "react-router-dom";
import CustomTable from "../../../components/Tabulator";
import useGetData from "../../../services/useGetData";
import { queryKey, url } from "../_fixtures/data";
import useDeleteData from "@/services/useDeleteData";
import useCreateData from "@/services/useCreateData";

function Customers() {
  const navigate = useNavigate();
  const { data, refetch } = useGetData<any>({
    queryKey: queryKey,
    url: url,
  });
  const { mutate: Delete } = useDeleteData({
    queryKey: queryKey,
    url: url,
  });
  const { mutate } = useCreateData({
    url: "wellness/customers/import",
    onSuccess: () => refetch(),
  });

  return (
    <CustomTable
      title="مشتریان"
      onImport={(file) => {
        const formData = new FormData();
        formData.append("file", file);
        mutate(formData);
      }}
      columns={data?.columns}
      data={data?.data}
      dataPagination={data?.paginate}
      onAdd={() => navigate("create")}
      onEdit={(record) => navigate("create", { state: { record } })}
      onDelete={(record) => Delete(record.id)}
    />
  );
}

export default Customers;
