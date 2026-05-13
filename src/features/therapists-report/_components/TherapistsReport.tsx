import CustomTable from "../../../components/Tabulator";
import useGetData from "../../../services/useGetData";
import { url } from "../_fixtures/data";
import TherapistsReportForm from "./TherapistsReportForm";
import type { TSummary } from "../_types/types";
import TherapistsReportSummary from "./TherapistsReportSummary";
import { useState } from "react";
import Modal from "@/components/Headless/Dialog/Modal";

function TherapistsReport() {
  const [formValues, setFormValues] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const query = formValues && new URLSearchParams(formValues).toString();
  const baseUrl = query ? `${url}?${query}` : url;
  const { data, isFetching, refetch } = useGetData<any>({
    url: baseUrl,
    queryKey: baseUrl,
  });
  const summary: TSummary = data?.summary;
  return (
    <>
      <div className="flex items-center pt-2 gap-3 mb-3">
        <div className="h-8 w-1 rounded-full bg-blue-600" />
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          گزارش جامع درمانگران
        </h1>
      </div>

      {summary && <TherapistsReportSummary summary={summary} />}
      <CustomTable
        filter={() => setOpen(true)}
        refetch={refetch}
        showActions={false}
        isLoading={isFetching}
        title=" "
        columns={data?.columns}
        data={data?.data}
        dataPagination={data?.paginate}
      />
      <Modal
        close={() => setOpen(false)}
        open={open}
        title=""
        size="xxl"
        cancelBtn={false}>
        <TherapistsReportForm
          setOpen={setOpen}
          setFormValues={setFormValues}
          formValues={formValues}
        />
      </Modal>
    </>
  );
}

export default TherapistsReport;
