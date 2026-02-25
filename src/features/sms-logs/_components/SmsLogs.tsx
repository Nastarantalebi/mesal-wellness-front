import useGetData from "@/services/useGetData";
import { queryKey, url } from "../_fixtures/data";
import CustomTable from "@/components/Tabulator";
import { useState } from "react";
import Modal from "@/components/Headless/Dialog/Modal";
import SmsDetails from "./SmsDetails";
import useGetById from "@/services/useGetById";
import type { TDataSmsLogs } from "../_types/types";

const SmsLogs = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<number | null>(null);
  const { data, refetch, isFetching } = useGetData<any>({
    queryKey: queryKey,
    url: url,
  });
  const { data: dataById } = useGetById<TDataSmsLogs>({
    queryKey,
    url,
    id: selectedRecord,
  });

  return (
    <div>
      <CustomTable
        refetch={refetch}
        isLoading={isFetching}
        title="پیام‌های ارسال شده"
        columns={data?.columns}
        data={data?.data}
        dataPagination={data?.paginate}
        onVisit={(record) => {
          setSelectedRecord(record?.id);
          setOpenModal(true);
        }}
      />
      <Modal
        close={() => setOpenModal(false)}
        open={openModal}
        size="lg"
        cancelBtn={false}
        title="جزییات پیامک ارسال شده">
        {dataById && <SmsDetails data={dataById?.data} />}
      </Modal>
    </div>
  );
};

export default SmsLogs;
