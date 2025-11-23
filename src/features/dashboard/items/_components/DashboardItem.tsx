import useGetData from "@/services/useGetData";
import type { TDashboard } from "../_types/type";
import StatisticsCard from "../../layout/StatisticsCard";
import CustomerTable from "../../layout/CustomerTable";

const DashboardItem = () => {
  const { data } = useGetData<TDashboard>({
    url: "basics/dashboard/getData",
    queryKey: "DASHBOARD_QUERY_KEY",
  });
  const tableKeys = ["رزروهای اخیر", "مشتریان اخیر"];
  return (
    <div className="space-y-6">
      {data?.widgets.tiles && (
        <StatisticsCard titleText="آمار وب‌سایت" items={data.widgets.tiles} />
      )}

      {data?.widgets.lists &&
        tableKeys.map((key) => {
          const listData = data.widgets.lists[key];
          return listData ? (
            <CustomerTable
              key={key}
              listData={listData}
            />
          ) : null;
        })}
    </div>
  );
};

export default DashboardItem;
