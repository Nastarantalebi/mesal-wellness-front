import { useNavigate } from "react-router-dom";
import CustomTable from "../../../components/Tabulator";
import useGetData from "../../../services/useGetData";
import { queryKey, url } from "../_fixtures/data";
import useDeleteData from "@/services/useDeleteData";
import { AlarmClockCheckIcon, HandHeartIcon } from "lucide-react";
import { useState } from "react";
import TherapistsAvailabilities from "./therapist-availabilities/_components/TherapistsAvailabilities";
import Modal from "@/components/Headless/Dialog/Modal";
import TherapistService from "./therapistService/_components/TherapistService";

function Therapists() {
  const navigate = useNavigate();
  const { data, isFetching, refetch } = useGetData<any>({
    queryKey: queryKey,
    url: url,
  });
  const { mutate: Delete } = useDeleteData({
    queryKey: queryKey,
    url: url,
  });
  const [showModalTA, setShowModalTA] = useState<boolean>(false);
  const [showModalTS, setShowModalTS] = useState<boolean>(false);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const full_name = [
    selectedRecord?.first_name,
    selectedRecord?.last_name,
  ].join(" ");

  return (
    <>
      <CustomTable
        isLoading={isFetching}
        refetch={refetch}
        title="درمانگر"
        columns={data?.columns}
        customActions={[
          {
            title: "خدمات درمانگر",
            icon: <HandHeartIcon className="w-4 h-4" />,
            onClick: (record) => {
              setShowModalTS(true);
              setSelectedRecord(record);
            },
          },
          {
            title: "درمانگر دردسترس",
            icon: <AlarmClockCheckIcon className="w-4 h-4" />,
            onClick: (record) => {
              setShowModalTA(true);
              setSelectedRecord(record);
            },
          },
        ]}
        data={data?.data}
        dataPagination={data?.paginate}
        onAdd={() => navigate("create")}
        onEdit={(record) => navigate("create", { state: { record } })}
        onDelete={(record) => Delete(record.id)}
      />
      <Modal
        title={`در دسترس بودن ${full_name}`}
        open={showModalTA}
        size="xxl"
        close={() => {
          setSelectedRecord(null);
          setShowModalTA(false);
        }}>
        <TherapistsAvailabilities id={selectedRecord && selectedRecord.id} />
      </Modal>
      <Modal
        title={`  خدمات درمانگر ${full_name}`}
        open={showModalTS}
        size="xxl"
        close={() => {
          setSelectedRecord(null);
          setShowModalTS(false);
        }}>
        <TherapistService id={selectedRecord && selectedRecord.id} />
      </Modal>
    </>
  );
}

export default Therapists;
