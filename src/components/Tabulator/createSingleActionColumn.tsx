import { createRoot } from "react-dom/client";
import Button from "../Button";
export type SingleActionColumn = {
  title: string;
  field: string;
  icon: React.ReactNode;
  onClick: (rowData: any) => void;
  tooltip?: string;
};

export const createSingleActionColumn = (action: SingleActionColumn) => ({
  title: action.title,
  field: action.field,
  headerSort: false,
  hozAlign: "center",
  vertAlign: "middle",
  print: false,
  resizable: false,
  minWidth: 40,
  formatter: (cell: any) => {
    const rowData = cell.getRow().getData();
    const el = document.createElement("div");
    const root = createRoot(el);

    root.render(
      <Button
        title={action.tooltip}
        variant="outline-primary"
        size="sm"
        onClick={() => action.onClick(rowData)}
        className="
          flex items-center justify-center
          hover:opacity-80
          !h-8 !w-8
        ">
        {action.icon}
      </Button>
    );

    return el;
  },
});
