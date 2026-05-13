import CustomTable from "../../../components/Tabulator";
import useGetData from "../../../services/useGetData";
import { url } from "../_fixtures/data";
import type { TSummary } from "../_types/types";
import ServicesReportSummary from "./ServicesReportSummary";
import ServicesReportForm from "./ServicesReportForm";

function ServicesReport() {
  const { data, isFetching } = useGetData<any>({
    url,
    queryKey: url,
  });

  const summary: TSummary = data?.summary;
  return (
    <>
      <ServicesReportForm />
      {summary && <ServicesReportSummary summary={summary} />}
      <CustomTable
        isLoading={isFetching}
        title="گزارش خدمات"
        columns={data?.columns}
        data={data?.data}
        dataPagination={data?.paginate}
      />
    </>
  );
}

export default ServicesReport;
