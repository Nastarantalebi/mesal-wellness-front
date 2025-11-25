import { useNavigate } from "react-router-dom";
import useGetData from "@/services/useGetData";
import CustomTable from "@/components/Tabulator";
import { queryKey, url } from "../_fixtures/data";
import useDeleteData from "@/services/useDeleteData";
import { CalendarCheck } from "lucide-react";
import { useState } from "react";
import Modal from "@/components/Headless/Dialog/Modal";
import ResourceAvailabilities from "./resource-availabilities/_components/ResourceAvailabilities";

function Resources() {
  const navigate = useNavigate();
  const { data ,isFetching,refetch} = useGetData<any>({
    queryKey: queryKey,
    url: url,
  });
  const { mutate: Delete } = useDeleteData({
    queryKey: queryKey,
    url: url,
  });
  const [showModalRA, setShowModalRA] = useState<boolean>(false);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  return (
    <>
      <CustomTable
       isLoading={isFetching}
       refetch={refetch}
        title="مکان‌های مجموعه"
        columns={data?.columns}
        data={data?.data}
        dataPagination={data?.paginate}
        customActions={[
          {
            title: "زمان‌های در دسترس",
            icon: <CalendarCheck className="w-4 h-4" />,
            onClick: (record) => {
              setShowModalRA(true);
              setSelectedRecord(record);
            },
          },
        ]}
        onAdd={() => navigate("create")}
        onDelete={(record) => Delete(record.id)}
        onEdit={(record) => navigate("create", { state: { record } })}
      />
      <Modal
        title={`در دسترس بودن ${selectedRecord?.name}`}
        open={showModalRA}
        size="xxl"
        close={() => {
          setSelectedRecord(null);
          setShowModalRA(false);
        }}>
        <ResourceAvailabilities
          id={selectedRecord && selectedRecord.id}
        />
      </Modal>
    </>
  );
}

export default Resources;
