import { useNavigate } from "react-router-dom";
import type { TServices } from "../_types/types";
import useGetData from "@/services/useGetData";
import CustomTable from "@/components/Tabulator";
import { servicesQuerykey, servicesUrl } from "../_fixtures/data";

function Services() {
  const navigate = useNavigate();
  const { data } = useGetData<TServices>({
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
      onDelete={(record) => console.log(record)}
      onEdit={(record) => console.log(record)}
    />
  );
}

export default Services;
