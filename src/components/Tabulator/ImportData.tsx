import { RotateCcwIcon, SearchIcon } from "lucide-react";
import Button from "../Button";
import { FormInline, FormInput } from "../Form";
import { Menu } from "../Headless";
import Lucide from "../Lucide";
import { useLocation, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { TabulatorFull as Tabulator } from "tabulator-tables";
type TProps = {
  data: any[] | undefined;
  onImport: any;
  printTable: any;
  refetch: any;
  title: string;
};
const ImportData = ({ data, onImport, printTable, refetch, title }: TProps) => {
  const tabulator = useRef<Tabulator | null>(null);
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
  //ایمپورت فایل اکسل
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [filter, setFilter] = useState({
    field: "name",
    type: "like",
    value: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
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
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onImport?.(file);
  };
  return (
    <div className="flex flex-col p-5 pb-1 xl:items-center xl:flex-row gap-y-2">
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
        {refetch && (
          <FormInline className="flex-col items-start xl:flex-row xl:items-center gap-y-2 w-full">
            <div className="relative w-full xl:w-auto flex-1">
              <FormInput
                id="tabulator-htms-filter-value"
                value={filter.value}
                onChange={(e) =>
                  setFilter({ ...filter, value: e.target.value })
                }
                type="text"
                className="pl-10 pr-3 w-full"
                placeholder="جست‌وجو..."
              />
              {/* ایکون داخل input */}
              <Button
                type="button"
                onClick={onFilter}
                variant={`${
                  !filter.value ? "outline-secondary" : "outline-primary"
                }`}
                disabled={!filter.value}
                className="absolute left-0 top-1/2 -translate-y-1/2 h-full px-2  flex items-center justify-center">
                <SearchIcon className="w-5 h-5" />
              </Button>
            </div>
          </FormInline>
        )}
      </form>
      <div className="flex items-center justify-end mt-3 flex-row gap-x-3 gap-y-2 xl:ms-auto xl:mt-0">
        {refetch && (
          <Button
            id="tabulator-htms-filter-reset"
            variant="outline-secondary"
            type="button"
            className="w-fit md:w-auto bg-slate-50/50 flex items-center gap-1"
            onClick={onResetFilter}>
            <RotateCcwIcon className="w-5 h-5" />
            <span className="hidden md:inline-block">تنظیم مجدد</span>
          </Button>
        )}
        <Button
          variant="outline-secondary"
          onClick={printTable}
          disabled={!data}>
          <Lucide icon="Printer" className="stroke-[1.3] w-4 h-4 md:me-2" />
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
            disabled={!data}
            variant="outline-secondary"
            className="w-full sm:w-auto">
            <Lucide icon="Upload" className="stroke-[1.3] w-4 h-4 md:me-2" />
            <span className="hidden md:inline-block">صادر کردن</span>
            <Lucide
              icon="ChevronDown"
              className="stroke-[1.3] w-4 h-4 md:ms-2"
            />
          </Menu.Button>
          <Menu.Items className="w-40">
            <Menu.Item onClick={() => exportTable("csv")}>
              <Lucide icon="FileCheck2" className="w-4 h-4 me-2" /> خروجی CSV
            </Menu.Item>

            <Menu.Item onClick={() => exportTable("xlsx")}>
              <Lucide icon="FileCheck2" className="w-4 h-4 me-2" />
              خروجی XLSX
            </Menu.Item>
          </Menu.Items>
        </Menu>
      </div>
    </div>
  );
};

export default ImportData;
