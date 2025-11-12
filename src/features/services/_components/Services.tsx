import { useNavigate } from "react-router-dom";
import useGetData from "@/services/useGetData";
import CustomTable from "@/components/Tabulator";
import { servicesQuerykey, servicesUrl } from "../_fixtures/data";
import useDeleteData from "@/services/useDeleteData";
function Services() {
  const navigate = useNavigate();
  const { data } = useGetData<any>({
    queryKey: servicesQuerykey,
    url: servicesUrl,
  });
  const { mutate: Delete } = useDeleteData({
    queryKey: servicesQuerykey,
    url: servicesUrl,
  });

  return (
    <CustomTable
      title="خدمات"
      columns={data?.columns}
      data={data?.data}
      paginationSize={data?.paginate && data.paginate.total}
      onAdd={() => navigate("create")}
      onDelete={(record) => Delete(record.id)}
      onEdit={(record) => {
        navigate("/services/create", { state: { record } });
      }}
    />
  );
}

export default Services;
