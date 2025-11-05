import { useNavigate } from "react-router-dom";
import type { TServiceCategory } from "../_types/types";
import useGetData from "@/services/useGetData";
import CustomTable from "@/components/Tabulator";
import { queryKey, url } from "../_fixtures/data";

function ServiceCategory() {
  const navigate = useNavigate();
  const { data } = useGetData<TServiceCategory>({
    category: "medical",
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
    />
  );
}

export default ServiceCategory;
