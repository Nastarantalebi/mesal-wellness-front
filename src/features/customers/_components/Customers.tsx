import { queryKey, url } from "../_fixtures/data";
import useDeleteData from "@/services/useDeleteData";
import useCreateData from "@/services/useCreateData";
import Modal from "@/components/Headless/Dialog/Modal";
import { useState } from "react";
import CustomersForm from "./CustomersForm";
import useGetData from "@/services/useGetData";
import CustomTable from "@/components/Tabulator";
import CustomersInfo from "./CustomersInfo";
import { BookImageIcon } from "lucide-react";
import CustomerBooking from "./CustomerBooking";

function Customers() {
  const { data, refetch, isFetching } = useGetData<any>({
    queryKey: queryKey,
    url: url,
  });
  const { mutate: Delete } = useDeleteData({
    queryKey: queryKey,
    url: url,
  });
  const { mutate } = useCreateData({
    url: "wellness/customers/import",
    onSuccess: () => refetch(),
  });
  const [open, setOpen] = useState<{
    form: boolean;
    view: boolean;
    booking: boolean;
  }>({
    form: false,
    view: false,
    booking: false,
  });
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const full_name = [
    selectedRecord?.first_name,
    selectedRecord?.last_name,
  ].join(" ");
  return (
    <>
      <CustomTable
        refetch={refetch}
        isLoading={isFetching}
        title="مشتریان"
        onImport={(file) => {
          const formData = new FormData();
          formData.append("file", file);
          mutate(formData);
        }}
        columns={data?.columns}
        data={data?.data}
        dataPagination={data?.paginate}
        onAdd={() => {
          setOpen({ form: true, view: false, booking: false });
          setSelectedRecord(null);
        }}
        onEdit={(record) => {
          setSelectedRecord(record);
          setOpen({ form: true, view: false, booking: false });
        }}
        onVisit={(record) => {
          setSelectedRecord(record);
          setOpen({ form: false, view: true, booking: false });
        }}
        singleActionColumns={[
          {
            field: "customer_booking",
            icon: <BookImageIcon className="w-4 h-4" />,
            title: "رزروها",
            onClick: (record) => {
              setOpen({ form: false, view: false, booking: true });
              setSelectedRecord(record);
            },
          },
        ]}
        onDelete={(record) => Delete(record.id)}
      />
      <Modal
        close={() => setOpen({ form: false, view: false, booking: false })}
        open={open.form}
        size="xxl"
        cancelBtn={false}
        title={
          selectedRecord ? `ویرایش مشتری ${full_name}` : "افزودن مشتری جدید"
        }>
        <CustomersForm setOpen={setOpen} selectedRecord={selectedRecord} />
      </Modal>
      <Modal
        title={`آمار و جزییات ${full_name}`}
        open={open.view}
        cancelBtn={false}
        size="xxl"
        close={() => {
          setSelectedRecord(null);
          setOpen({ form: false, view: false, booking: false });
        }}>
        <CustomersInfo id={selectedRecord && selectedRecord.id} />
      </Modal>
      <Modal
        title={`رزروهای ${full_name}`}
        open={open.booking}
        cancelBtn={false}
        size="xxl"
        close={() => {
          setSelectedRecord(null);
          setOpen({ form: false, view: false, booking: false });
        }}>
        <CustomerBooking id={selectedRecord && selectedRecord.id} />
      </Modal>
    </>
  );
}

export default Customers;
