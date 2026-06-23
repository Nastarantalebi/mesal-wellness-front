import "../../assets/css/vendors/tabulator.css";
import { useEffect, useRef } from "react";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import { createIcons, icons } from "lucide";
import { mapFieldsToColumns } from "./columnsTransform";
import type { TColumns, TPaginate } from "../../types";
import { createRoot } from "react-dom/client";
import TitlePage from "@/features/_components/TitlePage";
import Pagination from "./Pagination";
import type {
  QueryObserverResult,
  RefetchOptions,
} from "@tanstack/react-query";
import ImportData from "./ImportData";
import ActionsColumns from "./ActionsColumns";
import TableHeader from "./TableHeader";
import LoadingSpin from "../Loading";
import {
  createSingleActionColumn,
  type SingleActionColumn,
} from "./createSingleActionColumn";
export type TableAction = {
  title: string;
  icon: React.ReactNode;
  onClick: (record: any) => void;
  variant?: "outline-primary" | "outline-danger" | "outline-success";
};
type CustomTableProps = {
  /** عنوان جدول */
  title?: string;
  /** ستون‌ها بر اساس ساختار Tabulator */
  columns?: Record<string, TColumns>;
  /** داده‌ها برای نمایش در جدول */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any[];
  dataPagination: TPaginate;
  /** اندازه‌ی صفحه‌بندی */
  paginationSize?: number;
  /** فعال‌سازی چاپ و خروجی‌ها */
  enableExport?: boolean;
  /** فعال‌سازی فیلتر */
  enableFilter?: boolean;
  showActions?: boolean;
  isLoading?: boolean;
  customAddText?: string;
  addText?: string;
  filter?: () => void;
  onAdd?: () => void;
  customAdd?: () => void;
  onEdit?: (record: any) => void;
  onDelete?: (record: any) => void;
  onVisit?: (record: any) => void;
  onImport?: (file: File) => void;
  singleActionColumns?: SingleActionColumn[];
  customActions?: TableAction[];
  refetch?: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<any, Error>>;
};

function CustomTable({
  title = "جدول اطلاعات",
  columns,
  refetch,
  showActions = true,
  data,
  paginationSize = 10,
  addText = "افزودن جدید",
  onAdd,
  customAddText,
  dataPagination,
  customAdd,
  onEdit,
  onDelete,
  onVisit,
  onImport,
  singleActionColumns,
  customActions,
  isLoading,
  filter,
}: CustomTableProps) {
  const tableRef = useRef<HTMLDivElement | null>(null);
  const tabulator = useRef<Tabulator | null>(null);
  const getLayout = () => {
    if (window.innerWidth < 520) return "fitDataFill";
    return "fitColumns";
  };
  const initTabulator = () => {
    if (!tableRef.current) return;

    tabulator.current = new Tabulator(tableRef.current, {
      data,
      columns: [
        ...mapFieldsToColumns(columns || {}),
        ...((singleActionColumns?.map(createSingleActionColumn) || []) as any),
        {
          title: "عملیات",
          field: "actions",
          headerSort: false,
          print: false,
          resizable: false,
          visible: !!data && showActions,
          hozAlign: "center",
          vertAlign: "middle",
          headerHozAlign: "center",
          minWidth: 70,
          formatter: (cell) => {
            const rowData = cell.getRow().getData();
            const container = document.createElement("div");
            container.className = "min-w-fit h-fit";
            const root = createRoot(container);

            root.render(
              <ActionsColumns
                customActions={customActions}
                onDelete={onDelete}
                onEdit={onEdit}
                onVisit={onVisit}
                rowData={rowData}
              />,
            );
            return container;
          },
        },
      ],
      dataTree: true, // ⭐ فعال‌سازی Tree
      dataTreeChildField: "children",
      dataTreeExpandElement:
        "<span class='text-xl font-bold mx-1 select-none'>+</span>",
      dataTreeCollapseElement:
        "<span class='text-xl font-bold mx-1 select-none'>−</span>",
      dataTreeStartExpanded: false,
      nestedFieldSeparator: false,
      layout: getLayout(),
      // paginationMode: "local",
      filterMode: "local",
      sortMode: "local",
      // pagination: false,
      paginationSize,
      // paginationSizeSelector: [10, 20, 30, 50, 100, 200],
      printAsHtml: true,
      printStyled: true,
      responsiveLayout: "hide",
      placeholder: `
        <div class="flex flex-col items-center justify-center text-gray-400 p-4 select-none">
          <svg xmlns="http://www.w3.org/2000/svg" 
              class="w-10 h-10 sm:w-12 sm:h-12 mb-2 text-gray-300" 
              viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/>
            <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>
          </svg>
          <span class="text-gray-500 text-xs sm:text-sm text-center ">هیچ داده‌ای یافت نشد</span>
        </div>
        `,
    });

    tabulator.current.on("renderComplete", () => {
      createIcons({
        icons,
        attrs: { "stroke-width": 1.5 },
        nameAttr: "data-lucide",
      });
    });
  };
  useEffect(() => {
    initTabulator();
    // const resizeHandler = () => tabulator.current?.redraw();
    const resizeHandler = () => {
      if (!tabulator.current) return;
      tabulator.current.destroy();
      initTabulator();
    };
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columns, data]);

  const printTable = () => tabulator.current?.print();
  return (
    <div className="grid grid-cols-12 gap-y-10 gap-x-6">
      <TitlePage title={title} />
      <div className="col-span-12">
        <TableHeader
          addText={addText}
          customAdd={customAdd}
          customAddText={customAddText}
          onAdd={onAdd}
          title={title}
        />
        <div className="flex flex-col gap-8 mt-3.5">
          <div className="flex flex-col box box--stacked">
            <ImportData
              data={data}
              title={title}
              onImport={onImport}
              refetch={refetch}
              filterProps={filter}
              printTable={printTable}
            />
            {isLoading ? (
              <LoadingSpin />
            ) : (
              <div className="p-1 xl:p-4 xl:pt-1 ">
                <div
                  className="overflow-x-auto custom-scrollbar"
                  // style={{ maxHeight: "600px" }}
                >
                  <div
                    id="tabulator"
                    ref={tableRef}
                    className="min-w-max w-full"
                  ></div>
                </div>

                {dataPagination && dataPagination.total > 10 && (
                  <Pagination dataPagination={dataPagination} />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomTable;
