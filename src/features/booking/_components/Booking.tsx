import { useNavigate } from "react-router-dom";
import CustomTable from "../../../components/Tabulator";
import useGetData from "../../../services/useGetData";
import { queryKey, url } from "../_fixtures/data";
import useDeleteData from "@/services/useDeleteData";
import { useState } from "react";
import Modal from "@/components/Headless/Dialog/Modal";
import BookingVisit from "./BookingVisit";
import useGetById from "@/services/useGetById";
import type { TDataById, TSelect } from "../_types/type";
import ChangeStatus from "./ChangeStatus";
import { FileIcon, RefreshCcwIcon } from "lucide-react";
import PersonalInfo from "./PersonalInfo";

function Booking() {
  const navigate = useNavigate();
  const { data, isFetching, refetch } = useGetData<any>({
    queryKey: queryKey,
    url: url,
  });
  const { mutate: Delete } = useDeleteData({
    queryKey: queryKey,
    url: url,
  });
  const [open, setOpen] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<TSelect | undefined>();
  const [openModalPersonal, setOpenModalPersonal] = useState<boolean>(false);
  const id = selectedRecord && selectedRecord.id;
  const { data: dataById, isFetching: isFetchingById } = useGetById<TDataById>({
    url: url,
    queryKey: [queryKey, String(id)],
    id: id,
  });
  return (
    <>
      <CustomTable
        refetch={refetch}
        isLoading={isFetching}
        title="لیست رزروها"
        columns={data?.columns}
        data={data?.data}
        dataPagination={data?.paginate}
        addText="افزودن رزرو جدید"
        onAdd={() => navigate("create")}
        // onEdit={(record) => navigate("create", { state: { record } })}
        onDelete={(record) => Delete(record.id)}
        onVisit={(record) => {
          setOpen(true);
          setSelectedRecord(record);
        }}
        customActions={[
          {
            title: "تغییر وضعیت",
            icon: <RefreshCcwIcon className="w-4 h-4" />,
            onClick: (record) => {
              setOpenStatus(true);
              setSelectedRecord(record);
            },
          },
          {
            title: "فرم اطلاعات مشتری",
            icon: <FileIcon className="w-4 h-4" />,
            onClick: (record) => {
              setOpenModalPersonal(true);
              setSelectedRecord(record);
              console.log(record);
            },
          },
        ]}
      />
      <Modal
        close={() => setOpenModalPersonal(false)}
        open={openModalPersonal}
        size="xxl"
        cancelBtn={false}
        title="فرم اطلاعات مشتری">
        <PersonalInfo selectedRecord={selectedRecord} />
      </Modal>
      <Modal close={() => setOpen(false)} open={open} size="xl" title="">
        <BookingVisit dataById={dataById} isFetchingById={isFetchingById} />
      </Modal>
      <Modal
        close={() => setOpenStatus(false)}
        open={openStatus}
        size="md"
        title={`تغییر وضعیت ${selectedRecord?.customer_name}`}
        cancelBtn={false}>
        <ChangeStatus
          selectedRecord={selectedRecord}
          setOpenStatus={setOpenStatus}
          status={dataById?.booking.status}
        />
      </Modal>
    </>
  );
}

export default Booking;
