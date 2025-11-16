import Button from "@/components/Button";
import { Dialog } from "@/components/Headless";
import type { ReactNode } from "react";
type TProps = {
  open: boolean;
  close: () => void;
  children: ReactNode;
  title: string;
  size?: "sm" | "md" | "lg" | "xl";
  cancelText?: string;
};
export default function Modal({
  open,
  close,
  title,
  cancelText,
  children,
  size = "md",
}: TProps) {
  return (
    <>
      <Dialog open={open} onClose={close} size={size}>
        <Dialog.Panel>
          <Dialog.Title>{title}</Dialog.Title>

          <Dialog.Description>{children}</Dialog.Description>

          <Dialog.Footer>
            <Button variant="danger" onClick={close}>
              {cancelText ?? "بستن"}
            </Button>
          </Dialog.Footer>
        </Dialog.Panel>
      </Dialog>
    </>
  );
}
