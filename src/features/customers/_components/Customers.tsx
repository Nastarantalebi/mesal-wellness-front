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
    view: boolean;
    booking: boolean;
  }>({
    view: false,
    booking: false,
  });
  const [openForm, setOpenForm] = useState<boolean>(false);
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
          setOpenForm(true);
          setSelectedRecord(null);
        }}
        onEdit={(record) => {
          setSelectedRecord(record);
          setOpenForm(true);
        }}
        onVisit={(record) => {
          setSelectedRecord(record);
          setOpen({ view: true, booking: false });
        }}
        singleActionColumns={[
          {
            field: "customer_booking",
            icon: <BookImageIcon className="w-4 h-4" />,
            title: "رزروها",
            onClick: (record) => {
              setOpen({ view: false, booking: true });
              setSelectedRecord(record);
            },
          },
        ]}
        onDelete={(record) => Delete(record.id)}
      />
      <Modal
        close={() => setOpenForm(false)}
        open={openForm}
        size="xxl"
        cancelBtn={false}
        title={
          selectedRecord ? `ویرایش مشتری ${full_name}` : "افزودن مشتری جدید"
        }>
        <CustomersForm setOpen={setOpenForm} selectedRecord={selectedRecord} />
      </Modal>
      <Modal
        title={`آمار و جزییات ${full_name}`}
        open={open.view}
        cancelBtn={false}
        size="xxl"
        close={() => {
          setSelectedRecord(null);
          setOpen({ view: false, booking: false });
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
          setOpen({ view: false, booking: false });
        }}>
        <CustomerBooking id={selectedRecord && selectedRecord.id} />
      </Modal>
    </>
  );
}

export default Customers;
