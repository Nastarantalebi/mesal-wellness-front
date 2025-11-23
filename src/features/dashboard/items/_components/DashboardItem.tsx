import useGetData from "@/services/useGetData";
import type { TDashboard } from "../_types/type";
import StatisticsCard from "../../layout/StatisticsCard";
import CustomerTable from "../../layout/CustomerTable";

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
    </div>
  );
};

export default DashboardItem;
