import useGetData from "@/services/useGetData";
import type { TDashboard } from "../_types/type";
import StatisticsCard from "../../layout/StatisticsCard";

const DashboardItem = () => {
  const { data } = useGetData<TDashboard>({
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
