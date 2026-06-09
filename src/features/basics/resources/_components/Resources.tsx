import useGetData from "@/services/useGetData";
import CustomTable from "@/components/Tabulator";
import { queryKey, url } from "../_fixtures/data";
import useDeleteData from "@/services/useDeleteData";
import { CalendarCheck } from "lucide-react";
import { useState } from "react";
import Modal from "@/components/Headless/Dialog/Modal";
import ResourceAvailabilities from "./resource-availabilities/_components/ResourceAvailabilities";
import ResourcesForm from "./ResourcesForm";

function Resources() {
  const { data, isFetching, refetch } = useGetData<any>({
    queryKey: queryKey,
    url: url,
  });
  const { mutate: Delete } = useDeleteData({
    queryKey: queryKey,
    url: url,
  });
  const [selectedRecord, setSelectedRecord] = useState<{
    form: any;
    availabilities: any;
  }>({
    availabilities: null,
    form: null,
  });
  const [open, setOpen] = useState<{ form: boolean; availabilities: boolean }>({
    availabilities: false,
    form: false,
  });
  return (
    <>
      <CustomTable
        isLoading={isFetching}
        refetch={refetch}
        title="مکان‌های مجموعه"
        columns={data?.columns}
        data={data?.data}
        dataPagination={data?.paginate}
        singleActionColumns={[
          {
            field: "therapist-services",
            tooltip: "زمان‌های در دسترس",
            title: "زمانبندی",
            icon: <CalendarCheck className="w-4 h-4" />,
            onClick: (record) => {
              setOpen({ availabilities: true, form: false });
              setSelectedRecord({ availabilities: record, form: null });
            },
          },
        ]}
        onAdd={() => {
          setSelectedRecord({ availabilities: null, form: null });
          setOpen({ availabilities: false, form: true });
        }}
        onDelete={(record) => Delete(record.id)}
        onEdit={(record) => {
          setSelectedRecord({ availabilities: null, form: record });
          setOpen({ availabilities: false, form: true });
        }}
      />
      <Modal
        title={`در دسترس بودن ${selectedRecord.availabilities?.name}`}
        open={open.availabilities}
        size="xxl"
        cancelBtn={false}
        close={() => {
          setSelectedRecord({ availabilities: null, form: null });
          setOpen({ availabilities: false, form: false });
        }}
      >
        <ResourceAvailabilities
          id={selectedRecord.availabilities && selectedRecord.availabilities.id}
        />
      </Modal>
      <Modal
        size="xxl"
        cancelBtn={false}
        close={() => setOpen({ availabilities: false, form: false })}
        open={open.form}
        title={
          selectedRecord.form
            ? `ویرایش ${selectedRecord.form?.name}`
            : "افزودن مکان جدید"
        }
      >
        <ResourcesForm setOpen={setOpen} id={selectedRecord.form?.id} />
      </Modal>
    </>
  );
}

export default Resources;
