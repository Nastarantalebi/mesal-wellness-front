import useGetData from "@/services/useGetData";
import StatisticsCard from "./widget/StatisticsCard";
import CustomerTable from "./widget/CustomerTable";
import DailyBoard from "./widget/DailyBoard";
import LoadingSpin from "@/components/Loading";
import type { ApiResponseGetData } from "../_types/type";
import PieCahrtWidget from "./widget/PieCahrtWidget";
import LineCahrtWidget from "./widget/LineCahrtWidget";

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
          <PieCahrtWidget data={widgetData?.pie_chart} />
          <LineCahrtWidget data={widgetData?.line_chart} />
          {widgetData?.list?.map((item, index) => (
            <CustomerTable listData={item} key={index} />
          ))}
          {widgetData?.table?.map((item, index) => (
            <DailyBoard data={item} key={index} />
          ))}
        </div>
      )}
    </>
  );
};

export default DashboardItem;
