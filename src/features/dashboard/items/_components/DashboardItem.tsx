import useGetData from "@/services/useGetData";
import type { TDashboard } from "../_types/type";
import StatisticsCard from "./widget/StatisticsCard";
import CustomerTable from "./widget/CustomerTable";
import DailyBoard from "./widget/DailyBoard";

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
      {data?.widgets.lists["رزروهای اخیر"] && (
        <CustomerTable listData={data.widgets.lists["رزروهای اخیر"]} />
      )}
      {data?.widgets.lists["مشتریان اخیر"] && (
        <CustomerTable listData={data.widgets.lists["مشتریان اخیر"]} />
      )}
      <DailyBoard/>
    </div>
  );
};

export default DashboardItem;
