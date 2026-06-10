import Modal from "@/components/Headless/Dialog/Modal";
import CustomTable from "@/components/Tabulator";
import { useState } from "react";
import BookingReportForm from "./BookingReportForm";
import useGetData from "@/services/useGetData";
import { url } from "../_fixtures/data";
import type { TSummary } from "../_types/types";
import BookingReportSummary from "./BookingReportSummary";

const BookingReport = () => {
  const [formValues, setFormValues] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const query = formValues && new URLSearchParams(formValues).toString();
  const baseUrl = query ? `${url}?${query}` : url;
  const { data, isFetching, refetch } = useGetData<any>({
    url: baseUrl,
    queryKey: baseUrl,
  });
  console.log("data:", data);

  const summary: TSummary = data?.summary;

  return (
    <>
      <div className="flex items-center pt-2 gap-3 mb-3">
        <div className="h-8 w-1 rounded-full bg-blue-600" />
        <h1 className="text-xl font-bold tracking-tight text-gray-900">
          گزارش جامع رزروها
        </h1>
      </div>

      {summary && <BookingReportSummary summary={summary} />}
      <CustomTable
        filter={() => setOpen(true)}
        refetch={refetch}
        showActions={false}
        isLoading={isFetching}
        title="گزارش جامع رزروها"
        columns={data?.columns}
        data={data?.data}
        dataPagination={data?.paginate}
      />
      <Modal
        close={() => setOpen(false)}
        open={open}
        title="فیلتر داده‌ها"
        size="xxl"
        cancelBtn={false}
      >
        <BookingReportForm
          setOpen={setOpen}
          setFormValues={setFormValues}
          formValues={formValues}
        />
      </Modal>
    </>
  );
};

export default BookingReport;
