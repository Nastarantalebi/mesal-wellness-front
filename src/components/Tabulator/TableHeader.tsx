import Button from "../Button";
import Lucide from "../Lucide";
type TProps = {
  addText: string;
  title: string;
  customAdd: (() => void) | undefined;
  onAdd: (() => void) | undefined;
  customAddText?: string;
};
const TableHeader = ({
  addText,
  title,
  customAdd,
  onAdd,
  customAddText,
}: TProps) => {
  return (
    <div className="flex flex-row items-center justify-between gap-y-2 mt-1">
      <div className="text-base font-medium group-[.mode--light]:text-white">
        {title}
      </div>
      <div className="flex flex-col sm:flex-row gap-x-3 gap-y-2 md:ms-auto">
        {customAdd && (
          <Button
            onClick={customAdd}
            variant="outline-primary"
            className="group-[.mode--light]:!bg-white/[0.12] group-[.mode--light]:!text-slate-200 group-[.mode--light]:!border-transparent">
            <Lucide
              icon="CalendarCheck2"
              className="stroke-[1.3] w-4 h-4 me-2"
            />{" "}
            {customAddText}
          </Button>
        )}
        {onAdd && (
          <Button
            onClick={onAdd}
            variant="outline-success"
            className="group-[.mode--light]:!bg-white/[0.12] group-[.mode--light]:!text-slate-200 group-[.mode--light]:!border-transparent">
            <Lucide icon="Plus" className="stroke-[1.3] w-4 h-4 me-2" />{" "}
            <span className="md:hidden inline-block"> جدید</span>
            <span className="hidden md:inline-block">{addText}</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default TableHeader;
