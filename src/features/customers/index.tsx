import { useNavigate } from "react-router-dom";
import CustomTable from "../../components/Tabulator";
import useGetData from "../../services/useGetData";
import { customersQuerykey, customersUrl } from "./fixtures";
import type { Tcustomers } from "./types";

function Customers() {
  const navigate = useNavigate();
  const { data } = useGetData<Tcustomers>({
    queryKey: customersQuerykey,
    url: customersUrl,
  });

  return (
    <CustomTable
      title="مشتریان"
      columns={data?.columns}
      data={data?.data}
      paginationSize={data?.paginate.total}
      onAdd={() => navigate("create")}
    />
  );
}

export default Customers;
