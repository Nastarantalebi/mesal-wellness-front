import { useNavigate } from "react-router-dom";
import CustomTable from "../../../components/Tabulator";
import useGetData from "../../../services/useGetData";
import { queryKey, url } from "../_fixtures/data";
import useDeleteData from "@/services/useDeleteData";
import { useState } from "react";
import Modal from "@/components/Headless/Dialog/Modal";
import BookingVisit from "./BookingVisit";
import useGetById from "@/services/useGetById";
import type { TDataById } from "../_types/type";

function Booking() {
  const navigate = useNavigate();
  const { data } = useGetData<any>({
    queryKey: queryKey,
    url: url,
  });
  const { mutate: Delete } = useDeleteData({
    queryKey: queryKey,
    url: url,
  });
  const [open, setOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<number | null>(null);

  const { data: dataById ,isFetching:isFetchingById} = useGetById<TDataById>({
    url: url,
    queryKey: [queryKey, String(selectedRecord)],
    id: selectedRecord,
  });
  return (
    <>
      <CustomTable
        title="رزرو نوبت"
        columns={data?.columns}
        data={data?.data}
        paginationSize={data?.paginate.total}
        onAdd={() => navigate("create")}
        onEdit={(record) => navigate("create", { state: { record } })}
        onDelete={(record) => Delete(record.id)}
        onVisit={(record) => {
          setOpen(true), setSelectedRecord(record.id);
        }}
      />
      <Modal close={() => setOpen(false)} open={open} size="xl" title="">
        <BookingVisit dataById={dataById} isFetchingById={isFetchingById}/>
      </Modal>
    </>
  );
}

export default Booking;
