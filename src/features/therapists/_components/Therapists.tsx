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
import TherapistsInfo from "./TherapistsInfo";

function Therapists() {
  const navigate = useNavigate();
  const { data, isFetching } = useGetData<any>({
    queryKey: queryKey,
    url: url,
  });
  const { mutate: Delete } = useDeleteData({
    queryKey: queryKey,
    url: url,
  });
  const [showModalTA, setShowModalTA] = useState<boolean>(false);
  const [showModalTS, setShowModalTS] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const full_name = [
    selectedRecord?.first_name,
    selectedRecord?.last_name,
  ].join(" ");

  return (
    <>
      <CustomTable
        isLoading={isFetching}
        title="ماساژیست"
        columns={data?.columns}
        singleActionColumns={[
          {
            title: "خدمات",
            tooltip: "خدمات ماساژیست",
            field: "therapist-services",
            icon: <HandHeartIcon />,
            onClick: (record) => {
              setShowModalTS(true);
              setSelectedRecord(record);
            },
          },
          {
            title: "دردسترس بودن",
            tooltip: "ماساژیست دردسترس",
            field: "therapist-availabilties",
            icon: <AlarmClockCheckIcon />,
            onClick: (record) => {
              setShowModalTA(true);
              setSelectedRecord(record);
            },
          },
        ]}
        onVisit={(record) => {
          setSelectedRecord(record);
          setOpen(true);
        }}
        data={data?.data}
        dataPagination={data?.paginate}
        // onAdd={() => navigate("create")}
        onEdit={(record) => navigate("create", { state: { record } })}
        onDelete={(record) => Delete(record.id)}
      />
      <Modal
        title={`در دسترس بودن ${full_name}`}
        open={showModalTA}
        cancelBtn={false}
        size="xxl"
        close={() => {
          setSelectedRecord(null);
          setShowModalTA(false);
        }}
      >
        <TherapistsAvailabilities id={selectedRecord && selectedRecord.id} />
      </Modal>
      <Modal
        title={`آمار و جزییات ${full_name}`}
        open={open}
        cancelBtn={false}
        size="xxl"
        close={() => {
          setSelectedRecord(null);
          setOpen(false);
        }}
      >
        <TherapistsInfo id={selectedRecord && selectedRecord.id} />
      </Modal>
      <Modal
        title={`  خدمات ماساژیست ${full_name}`}
        open={showModalTS}
        cancelBtn={false}
        size="xxl"
        close={() => {
          setSelectedRecord(null);
          setShowModalTS(false);
        }}
      >
        <TherapistService id={selectedRecord && selectedRecord.id} />
      </Modal>
    </>
  );
}

export default Therapists;
