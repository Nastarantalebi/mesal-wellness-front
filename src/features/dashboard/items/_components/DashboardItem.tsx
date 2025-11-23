import useGetData from "@/services/useGetData";
import type { TRequest } from "../_types/type";
import StatisticsCard from "../../layout/StatisticsCard";

const DashboardItem = () => {
  const { data } = useGetData<TRequest>({
    url: "basics/dashboard/getData",
    queryKey: "DASHBOARD_QUERY_KEY",
  });

  return (
    <div>
      {data?.widgets.tiles && (
        <StatisticsCard titleText="آمار وب‌سایت" items={data.widgets.tiles} />
      )}
    </div>
  );
};

export default DashboardItem;
