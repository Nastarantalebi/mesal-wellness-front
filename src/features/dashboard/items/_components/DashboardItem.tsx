import useGetData from "@/services/useGetData";
import type { TDashboard } from "../_types/type";
import StatisticsCard from "./widget/StatisticsCard";
import CustomerTable from "./widget/CustomerTable";
import DailyBoard from "./widget/DailyBoard";
import LoadingSpin from "@/components/Loading";
import DailyBoardTherapist from "./widget/DailyBoardTherapist";

const DashboardItem = () => {
  const { data, isFetching } = useGetData<TDashboard>({
    url: "basics/dashboard/getData",
    queryKey: "DASHBOARD_QUERY_KEY",
  });

  return (
    <>
      {isFetching ? (
        <LoadingSpin />
      ) : (
        <div className="grid grid-cols-12 gap-5">
          {data?.data?.widgets?.tiles && (
            <StatisticsCard
              titleText="آمار وب‌سایت"
              items={data.data.widgets.tiles}
            />
          )}
          <DailyBoard />
          <DailyBoardTherapist />
          {data?.data?.widgets?.lists["رزروهای اخیر"] && (
            <CustomerTable listData={data.data.widgets.lists["رزروهای اخیر"]} />
          )}
          {data?.data?.widgets?.lists["مشتریان اخیر"] && (
            <CustomerTable listData={data.data.widgets.lists["مشتریان اخیر"]} />
          )}
        </div>
      )}
    </>
  );
};

export default DashboardItem;
