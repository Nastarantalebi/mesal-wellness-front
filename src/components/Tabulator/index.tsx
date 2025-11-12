import "../../assets/css/vendors/tabulator.css";
import { useEffect, useRef, useState } from "react";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import { createIcons, icons } from "lucide";
import { mapFieldsToColumns } from "./columnsTransform";
import type { TColumns } from "../../types";
import Button from "../Button";
import Lucide from "../Lucide";
import { FormInline, FormInput, FormLabel, FormSelect } from "../Form";
import { Menu } from "../Headless";
import { createRoot } from "react-dom/client";
import { Edit, Eye, Trash2 } from "lucide-react";
import TitlePage from "@/features/_components/TitlePage";

type CustomTableProps = {
  /** عنوان جدول */
  title?: string;
  /** ستون‌ها بر اساس ساختار Tabulator */
  columns?: Record<string, TColumns>;
  /** داده‌ها برای نمایش در جدول */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any[];
  /** اندازه‌ی صفحه‌بندی */
  paginationSize?: number;
  /** فعال‌سازی چاپ و خروجی‌ها */
  enableExport?: boolean;
  /** فعال‌سازی فیلتر */
  enableFilter?: boolean;
  onAdd?: () => void;
  onEdit?: (record: any) => void;
  onDelete?: (record: any) => void;
  onVisit?: (record: any) => void;
};

function CustomTable({
  title = "جدول اطلاعات",
  columns,
  data,
  paginationSize = 10,
  onAdd,
  onEdit,
  onDelete,
  onVisit,
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
          hozAlign: "center",
          formatter: (cell) => {
            const rowData = cell.getRow().getData();
            const container = document.createElement("div");
            const root = createRoot(container);

            root.render(
              <div className="flex justify-center gap-2">
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
                    onClick={() => onDelete(rowData)}
                    className="flex items-center gap-1 p-1">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            );

            return container; // <== این مهمه
          },
          widthGrow: 0.6,
        },
      ],
      layout: "fitColumns",
      paginationMode: "remote",
      filterMode: "remote",
      sortMode: "remote",
      pagination: true,
      paginationSize,
      paginationSizeSelector: [10, 20, 30, 50],
      printAsHtml: true,
      printStyled: true,
      responsiveLayout: "collapse",
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
    if (tabulator.current) {
      tabulator.current.setFilter(filter.field, filter.type, filter.value);
    }
  };

  // On reset filter
  const onResetFilter = () => {
    setFilter({
      ...filter,
      field: "name",
      type: "like",
      value: "",
    });
    onFilter();
  };

  useEffect(() => {
    initTabulator();
    const resizeHandler = () => tabulator.current?.redraw();
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columns, data]);

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
        <div className="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row">
          <div className="text-base font-medium group-[.mode--light]:text-white">
            {title}
          </div>
          <div className="flex flex-col sm:flex-row gap-x-3 gap-y-2 md:ms-auto">
            {onAdd && (
              <Button
                onClick={onAdd}
                variant="primary"
                className="group-[.mode--light]:!bg-white/[0.12] group-[.mode--light]:!text-slate-200 group-[.mode--light]:!border-transparent">
                <Lucide icon="PenLine" className="stroke-[1.3] w-4 h-4 me-2" />{" "}
                افزودن جدید
              </Button>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-8 mt-3.5">
          <div className="flex flex-col box box--stacked">
            <div className="flex flex-col p-5 xl:items-center xl:flex-row gap-y-2">
              <form
                id="tabulator-htms-filter-form"
                className="flex xl:flex-row flex-col border-dashed gap-x-5 gap-y-2 border border-slate-300/80 xl:border-0 rounded-[0.6rem] p-4 sm:p-5 xl:p-0"
                onSubmit={(e) => {
                  e.preventDefault();
                  onFilter();
                }}>
                <FormInline className="flex-col items-start xl:flex-row xl:items-center gap-y-2">
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
                    {Object.entries(columns || []).map(([field, config]) => (
                      <option key={field} value={field}>
                        {config.label}
                      </option>
                    ))}
                  </FormSelect>
                </FormInline>
                <FormInline className="flex-col items-start xl:flex-row xl:items-center gap-y-2">
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
                </FormInline>
                <FormInline className="flex-col items-start xl:flex-row xl:items-center gap-y-2">
                  <FormLabel className="me-3 whitespace-nowrap">
                    کلمات کلیدی
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
                    placeholder="Search..."
                  />
                </FormInline>
                <div className="flex flex-col gap-2 mt-2 sm:flex-row xl:mt-0">
                  <Button
                    id="tabulator-htms-filter-go"
                    variant="outline-primary"
                    type="button"
                    className="w-full sm:w-auto bg-primary/5 border-primary/20"
                    onClick={onFilter}>
                    Search
                  </Button>
                  <Button
                    id="tabulator-htms-filter-reset"
                    variant="outline-secondary"
                    type="button"
                    className="w-full sm:w-auto bg-slate-50/50"
                    onClick={onResetFilter}>
                    تنظیم مجدد
                  </Button>
                </div>
              </form>
              <div className="flex flex-col mt-3 sm:flex-row gap-x-3 gap-y-2 xl:ms-auto xl:mt-0">
                <Button variant="outline-secondary" onClick={printTable}>
                  <Lucide
                    icon="Printer"
                    className="stroke-[1.3] w-4 h-4 me-2"
                  />
                  چاپ
                </Button>
                <Menu className="sm:ms-auto xl:ms-0">
                  <Menu.Button
                    as={Button}
                    variant="outline-secondary"
                    className="w-full sm:w-auto">
                    <Lucide
                      icon="FileCheck2"
                      className="stroke-[1.3] w-4 h-4 me-2"
                    />
                    صادر کردن
                    <Lucide
                      icon="ChevronDown"
                      className="stroke-[1.3] w-4 h-4 ms-2"
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
            <div className="pb-5">
              <div className="overflow-x-auto scrollbar-hidden">
                <div id="tabulator" ref={tableRef}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomTable;
