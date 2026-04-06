import Button, { type Variant } from "@/components/Button";
import { Dialog } from "@/components/Headless";
import { XIcon } from "lucide-react";
import type { ReactNode } from "react";
type TProps = {
  open: boolean;
  close: () => void;
  onSubmit?: () => void;
  children: ReactNode;
  title: string;
  submitText?: string;
  size?: "sm" | "md" | "lg" | "xl" | "xxl";
  cancelText?: string;
  variant_cancel?: Variant;
  variant_submit?: Variant;
  cancelBtn?: boolean;
  showCloseIcon?: boolean;
};
export default function Modal({
  open,
  close,
  title,
  cancelText,
  children,
  size = "md",
  cancelBtn = true,
  showCloseIcon = true,
  onSubmit,
  submitText = "تایید",
  variant_submit = "outline-success",
  variant_cancel = "outline-danger",
}: TProps) {
  return (
    <>
      <Dialog open={open} onClose={close} size={size}>
        <Dialog.Panel>
          <div className="flex flex-row items-center justify-between px-1">
            <Dialog.Title>{title}</Dialog.Title>
            {showCloseIcon && (
              <span onClick={close} className="p-2 cursor-pointer">
                <XIcon size={16} />
              </span>
            )}
          </div>

          <Dialog.Description>{children}</Dialog.Description>

          <Dialog.Footer className="flex gap-1 items-center justify-end">
            {!!cancelBtn && (
              <Button variant={variant_cancel} onClick={close}>
                {cancelText ?? "بستن"}
              </Button>
            )}
            {!!onSubmit && (
              <Button variant={variant_submit} onClick={onSubmit}>
                {submitText ?? "تایید"}
              </Button>
            )}
          </Dialog.Footer>
        </Dialog.Panel>
      </Dialog>
    </>
  );
}
