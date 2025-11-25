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
import { RefreshCcwIcon } from "lucide-react";

function Booking() {
  const navigate = useNavigate();
  const { data, isFetching } = useGetData<any>({
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
  const id = selectedRecord && selectedRecord.id;
  const { data: dataById, isFetching: isFetchingById } = useGetById<TDataById>({
    url: url,
    queryKey: [queryKey, String(id)],
    id: id,
  });
  return (
    <>
      <CustomTable
        isLoading={isFetching}
        title="رزرو نوبت"
        columns={data?.columns}
        data={data?.data}
        dataPagination={data?.paginate}
        onAdd={() => navigate("create")}
        onEdit={(record) => navigate("create", { state: { record } })}
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
        ]}
      />
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
