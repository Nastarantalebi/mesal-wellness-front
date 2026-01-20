import useGetData from "@/services/useGetData";
import StatisticsCard from "./widget/StatisticsCard";
import CustomerTable from "./widget/CustomerTable";
import DailyBoard from "./widget/DailyBoard";
import LoadingSpin from "@/components/Loading";
import type { ApiResponseGetData } from "../_types/type";

const DashboardItem = () => {
  const { data, isFetching } = useGetData<ApiResponseGetData>({
    url: "basics/dashboard/getData",
    queryKey: "DASHBOARD_QUERY_KEY",
  });
  const widgetData = data?.data?.widgets;
  return (
    <>
      {isFetching ? (
        <LoadingSpin />
      ) : (
        <div className="grid grid-cols-12 gap-5">
          <StatisticsCard items={widgetData?.number} />
          {widgetData?.list?.map((item, index) => (
            <CustomerTable listData={item} key={index} />
          ))}
          <DailyBoard />
          {/* <DailyBoardTherapist /> */}
        </div>
      )}
    </>
  );
};

export default DashboardItem;
