import "../../assets/css/vendors/tabulator.css";
import { useEffect, useRef, useState } from "react";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import { createIcons, icons } from "lucide";
import { mapFieldsToColumns } from "./columnsTransform";
import type { TColumns, TPaginate } from "../../types";
import Button from "../Button";
import Lucide from "../Lucide";
import { FormInline, FormInput, FormLabel } from "../Form";
import { Menu } from "../Headless";
import { createRoot } from "react-dom/client";
import { Edit, Eye, RotateCcwIcon, SearchIcon, Trash2Icon } from "lucide-react";
import TitlePage from "@/features/_components/TitlePage";
import Pagination from "./Pagination";
import Modal from "../Headless/Dialog/Modal";
import type {
  QueryObserverResult,
  RefetchOptions,
} from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
type TableAction = {
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
  isLoading?: boolean;
  customAddText?: string;
  addText?: string;
  onAdd?: () => void;
  customAdd?: () => void;
  onEdit?: (record: any) => void;
  onDelete?: (record: any) => void;
  onVisit?: (record: any) => void;
  onImport?: (file: File) => void;
  customActions?: TableAction[];
  refetch?: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<any, Error>>;
};

function CustomTable({
  title = "جدول اطلاعات",
  columns,
  refetch,
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
  customActions,
}: // enableExport = true,
// enableFilter = true,
CustomTableProps) {
  const tableRef = useRef<HTMLDivElement | null>(null);
  const tabulator = useRef<Tabulator | null>(null);
  const [filter, setFilter] = useState({
    field: "name",
    type: "like",
    value: "",
  });
  const [openModal, setOpenModal] = useState<any>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const initTabulator = () => {
    if (!tableRef.current) return;

    tabulator.current = new Tabulator(tableRef.current, {
      data,
      columns: [
        ...mapFieldsToColumns(columns || {}),
        {
          title: "عملیات",
          field: "actions",
          headerSort: false,
          print: false,
          hozAlign: "center",
          minWidth: 150,
          formatter: (cell) => {
            const rowData = cell.getRow().getData();
            const container = document.createElement("div");
            container.className = "min-w-fit h-fit";
            const root = createRoot(container);

            root.render(
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
                    <Edit className="w-4 h-4" />
                  </Button>
                )}
                {onVisit && (
                  <Button
                    title="مشاهده"
                    variant="outline-primary"
                    size="sm"
                    onClick={() => onVisit(rowData)}
                    className="flex items-center gap-1 p-1">
                    <Eye className="w-4 h-4" />
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
            );

            return container;
          },
        },
      ],
      nestedFieldSeparator: false,
      layout: "fitColumns",
      // paginationMode: "local",
      filterMode: "local",
      sortMode: "local",
      // pagination: false,
      paginationSize,
      // paginationSizeSelector: [10, 20, 30, 50, 100, 200],
      printAsHtml: true,
      printStyled: true,
      responsiveLayout: "hide",
      placeholder: "داده‌ای یافت نشد",
    });

    tabulator.current.on("renderComplete", () => {
      createIcons({
        icons,
        attrs: { "stroke-width": 1.5 },
        nameAttr: "data-lucide",
      });
    });
  };

  const onFilter = () => {
    // if (tabulator.current) {
    //   tabulator.current.setFilter(filter.field, filter.type, filter.value);
    // }
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("q", filter.value);
    navigate({ pathname: location.pathname, search: searchParams.toString() });
  };

  // On reset filter
  const onResetFilter = () => {
    setFilter({
      ...filter,
      field: "name",
      type: "like",
      value: "",
    });
    navigate(location.pathname, { replace: true });
    refetch && refetch();
  };

  useEffect(() => {
    initTabulator();
    const resizeHandler = () => tabulator.current?.redraw();
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columns, data]);
  //ایمپورت فایل اکسل
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onImport?.(file);
  };
  // توابع خروجی
  const exportTable = (type: "csv" | "json" | "xlsx" | "html") => {
    if (!tabulator.current) return;
    const filename = `${title}.${type}`;
    if (type === "xlsx") {
      import("xlsx").then((xlsx) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).XLSX = xlsx;
        tabulator.current?.download("xlsx", filename, { sheetName: title });
      });
    } else {
      tabulator.current.download(type, filename);
    }
  };

  const printTable = () => tabulator.current?.print();

  return (
    <div className="grid grid-cols-12 gap-y-10 gap-x-6">
      <TitlePage title={title} />
      <div className="col-span-12">
        <div className="flex flex-row items-center justify-between gap-y-2">
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
        <div className="flex flex-col gap-8 mt-3.5">
          <div className="flex flex-col box box--stacked">
            <div className="flex flex-col p-5 xl:items-center xl:flex-row gap-y-2">
              <form
                id="tabulator-htms-filter-form"
                className="flex md:flex-row flex-col border-dashed gap-x-5 gap-y-2 border border-slate-300/80 xl:border-0 rounded-[0.6rem] p-4 sm:p-5 xl:p-0"
                onSubmit={(e) => {
                  e.preventDefault();
                  onFilter();
                }}>
                {/* <FormInline className="flex-col items-start xl:flex-row xl:items-center gap-y-2">
                  <FormLabel className="me-3 whitespace-nowrap">
                    جستجو بر اساس
                  </FormLabel>
                  <FormSelect
                    id="tabulator-htms-filter-field"
                    value={filter.field}
                    onChange={(e) => {
                      setFilter({
                        ...filter,
                        field: e.target.value,
                      });
                    }}
                    className="">
                    {Object.entries(columns || [])
                      .filter(([_, config]) => config.filterable)
                      .map(([field, config]) => (
                        <option key={field} value={field}>
                          {config.label}
                        </option>
                      ))}
                  </FormSelect>
                </FormInline> */}
                {/* <FormInline className="flex-col items-start xl:flex-row xl:items-center gap-y-2">
                  <FormLabel className="me-3 whitespace-nowrap">Type</FormLabel>
                  <FormSelect
                    id="tabulator-htms-filter-type"
                    value={filter.type}
                    onChange={(e) => {
                      setFilter({
                        ...filter,
                        type: e.target.value,
                      });
                    }}
                    className="">
                    <option value="like">like</option>
                    <option value="=">=</option>
                    <option value="<">&lt;</option>
                    <option value="<=">&lt;=</option>
                    <option value=">">&gt;</option>
                    <option value=">=">&gt;=</option>
                    <option value="!=">!=</option>
                  </FormSelect>
                </FormInline> */}
                <FormInline className="flex-col items-start xl:flex-row xl:items-center gap-y-2">
                  <FormLabel className="me-3 whitespace-nowrap">
                    جستجو
                  </FormLabel>
                  <FormInput
                    id="tabulator-htms-filter-value"
                    value={filter.value}
                    onChange={(e) => {
                      setFilter({
                        ...filter,
                        value: e.target.value,
                      });
                    }}
                    type="text"
                    className=""
                    placeholder="جست‌وجو..."
                  />
                </FormInline>
                <div className="flex gap-2 mt-2 flex-row xl:mt-0">
                  <Button
                    id="tabulator-htms-filter-go"
                    variant="outline-primary"
                    type="button"
                    className="w-fit md:w-auto bg-primary/5 border-primary/20"
                    onClick={onFilter}>
                    <SearchIcon className="md:hidden inline-block" />
                    <span className="hidden md:inline-block">یافتن</span>
                  </Button>
                  <Button
                    id="tabulator-htms-filter-reset"
                    variant="outline-secondary"
                    type="button"
                    className="w-fit md:w-auto bg-slate-50/50"
                    onClick={onResetFilter}>
                    <RotateCcwIcon className="md:hidden inline-block" />
                    <span className="hidden md:inline-block"> تنظیم مجدد</span>
                  </Button>
                </div>
              </form>
              <div className="flex items-center justify-end mt-3 flex-row gap-x-3 gap-y-2 xl:ms-auto xl:mt-0">
                <Button variant="outline-secondary" onClick={printTable}>
                  <Lucide
                    icon="Printer"
                    className="stroke-[1.3] w-4 h-4 md:me-2"
                  />
                  <span className="hidden md:inline-block"> چاپ</span>
                </Button>
                {onImport && (
                  <>
                    <Button
                      variant="outline-secondary"
                      onClick={() => fileInputRef.current?.click()}>
                      <Lucide
                        icon="Download"
                        className="stroke-[1.3] w-4 h-4 md:me-2"
                      />
                      <span className="hidden md:inline-block">وارد کردن</span>
                    </Button>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".xlsx,.csv"
                      className="hidden"
                      onChange={handleImport}
                    />
                  </>
                )}
                <Menu>
                  <Menu.Button
                    as={Button}
                    variant="outline-secondary"
                    className="w-full sm:w-auto">
                    <Lucide
                      icon="Upload"
                      className="stroke-[1.3] w-4 h-4 md:me-2"
                    />
                    <span className="hidden md:inline-block">صادر کردن</span>
                    <Lucide
                      icon="ChevronDown"
                      className="stroke-[1.3] w-4 h-4 md:ms-2"
                    />
                  </Menu.Button>
                  <Menu.Items className="w-40">
                    <Menu.Item onClick={() => exportTable("csv")}>
                      <Lucide icon="FileCheck2" className="w-4 h-4 me-2" />{" "}
                      خروجی CSV
                    </Menu.Item>

                    <Menu.Item onClick={() => exportTable("xlsx")}>
                      <Lucide icon="FileCheck2" className="w-4 h-4 me-2" />
                      خروجی XLSX
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              </div>
            </div>
            <div className="p-1 xl:p-4">
              <div className="overflow-x-auto scrollbar-hidden">
                <div
                  id="tabulator"
                  ref={tableRef}
                  className="min-w-max w-full"></div>
              </div>
              {dataPagination && dataPagination.total > 10 && (
                <Pagination dataPagination={dataPagination} />
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal
        close={() => setOpenModal(null)}
        open={!!openModal}
        title="حذف آیتم"
        cancelText="انصراف"
        submitText="حذف"
        onSubmit={() => {
          setOpenModal(null);
          onDelete?.(openModal as any);
        }}>
        <div className="flex flex-row items-center gap-2 text-center py-2">
          <div className="text-red-600">
            <Lucide icon="BadgeAlert" className="w-7 h-7" />
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            آیا از حذف این آیتم اطمینان دارید؟ این عمل قابل بازگشت نیست.
          </p>
        </div>
      </Modal>
    </div>
  );
}

export default CustomTable;
