import useGetData from "@/services/useGetData";
import { queryKey, url } from "../_fixtures/data";
import CustomTabs from "@/components/Headless/Tab/CustomTab";
import { useTabItems } from "../_hooks/useTabItems";
import { PermissionsProvider } from "./PermissionsContext";
import type { TPermissions } from "../_types/type";
import Button from "@/components/Button";
import Lucide from "@/components/Lucide";
import { useState } from "react";
import Modal from "@/components/Headless/Dialog/Modal";
import PermissionsFormCreate from "./PermissionsFormCreate";

const Permissions = () => {
  const { data } = useGetData<TPermissions>({
    url: url,
    queryKey: queryKey,
  });
  const tabItems = useTabItems(data);
  const [openModal, setOpenModal] = useState<boolean>(false);
  return (
    <PermissionsProvider>
      <Button
        variant="outline-success"
        className="my-2 bg-transparent"
        onClick={() => {
          setOpenModal(true);
        }}>
        <Lucide icon="Plus" className="stroke-[1.3] w-4 h-4 me-2" />
        <span className="md:hidden inline-block">جدید</span>
        <span className="hidden md:inline-block">دسترسی جدید</span>
      </Button>
      <CustomTabs items={tabItems} />
      <Modal
        size="xxl"
        open={openModal}
        cancelBtn={false}
        close={() => setOpenModal(false)}
        title="دسترسی جدید">
        <PermissionsFormCreate setOpenModal={setOpenModal} />
      </Modal>
    </PermissionsProvider>
  );
};

export default Permissions;
