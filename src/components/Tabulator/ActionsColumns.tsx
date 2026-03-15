import type { TableAction } from ".";
import Button from "../Button";
import { BadgeAlert, EditIcon, EyeIcon, Trash2Icon } from "lucide-react";
import Modal from "../Headless/Dialog/Modal";
import { useState } from "react";
type TProps = {
  customActions: TableAction[] | undefined;
  rowData: {
    [key: string]: any;
  };
  onEdit: ((record: any) => void) | undefined;
  onDelete: ((record: any) => void) | undefined;
  onVisit: ((record: any) => void) | undefined;
};
const ActionsColumns = ({
  customActions,
  rowData,
  onEdit,
  onDelete,
  onVisit,
}: TProps) => {
  const [openModal, setOpenModal] = useState<any>(null);

  return (
    <>
      <div className="flex justify-center items-center gap-1">
        {customActions?.map((action, i) => (
          <Button
            key={i}
            title={action.title}
            variant={action.variant || "outline-primary"}
            size="sm"
            onClick={() => action.onClick(rowData)}
            className="flex items-center gap-1 p-1">
            {action.icon}
          </Button>
        ))}
        {onEdit && (
          <Button
            title="ویرایش"
            variant="outline-primary"
            size="sm"
            onClick={() => onEdit(rowData)}
            className="flex items-center gap-1 p-1">
            <EditIcon className="w-4 h-4" />
          </Button>
        )}
        {onVisit && (
          <Button
            title="مشاهده"
            variant="outline-primary"
            size="sm"
            onClick={() => onVisit(rowData)}
            className="flex items-center gap-1 p-1">
            <EyeIcon className="w-4 h-4" />
          </Button>
        )}
        {onDelete && (
          <Button
            title="حذف"
            variant="outline-danger"
            size="sm"
            onClick={() => setOpenModal(rowData)}
            className="flex items-center gap-1 p-1">
            <Trash2Icon className="w-4 h-4" />
          </Button>
        )}
      </div>
      <Modal
        close={() => setOpenModal(null)}
        open={!!openModal}
        title="حذف آیتم"
        cancelText="انصراف"
        submitText="حذف"
        variant_cancel="outline-dark"
        variant_submit="outline-danger"
        onSubmit={() => {
          setOpenModal(null);
          onDelete?.(openModal as any);
        }}>
        <div className="flex flex-row items-center gap-2 text-center py-2">
          <div className="text-red-600">
            <BadgeAlert className="w-5 h-5" />
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            آیا از حذف این آیتم اطمینان دارید؟ این عمل قابل بازگشت نیست.
          </p>
        </div>
      </Modal>
    </>
  );
};

export default ActionsColumns;
