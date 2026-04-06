import Sort from "@/features/_components/Sort";

type TProps = {
  selectedFilter: "" | "OPEN" | "CLOSED";
  setSelectedFilter: React.Dispatch<
    React.SetStateAction<"" | "OPEN" | "CLOSED">
  >;
};
const TicketsSidebarFilter = ({
  selectedFilter,
  setSelectedFilter,
}: TProps) => {
  return (
    <div className="text-sm text-gray-700 dark:text-gray-300 mb-4 p-3 bg-gray-50 dark:bg-neutral-900 rounded-lg shadow-sm">
      <h2 className="font-medium mb-2 text-center">لیست تیکت‌ها</h2>
      <p className="font-medium whitespace-nowrap mb-1">
        مرتب سازی بر اساس تاریخ:
      </p>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-start gap-2 sm:gap-6">
        <div className="flex gap-3 ">
          <div className="flex items-center gap-1">
            <span className="whitespace-nowrap"> ایجاد</span>
            <Sort field="created_at" iconSize={15} />
          </div>
          <div className="flex items-center gap-1">
            <span className="whitespace-nowrap"> ویرایش</span>
            <Sort field="updated_at" iconSize={15} />
          </div>
        </div>
      </div>
      <p className="font-medium whitespace-nowrap mt-3">وضعیت:</p>
      <div className="flex flex-row items-center justify-start gap-3 mt-1">
        <span
          onClick={() => setSelectedFilter("")}
          className={`px-2 py-1 rounded cursor-pointer ${
            selectedFilter === "" ? "bg-gray-200 dark:bg-gray-700" : ""
          }`}>
          همه
        </span>
        <span
          onClick={() => setSelectedFilter("OPEN")}
          className={`px-2 py-1 rounded cursor-pointer ${
            selectedFilter === "OPEN" ? "bg-gray-200 dark:bg-gray-700" : ""
          }`}>
          باز
        </span>
        <span
          onClick={() => setSelectedFilter("CLOSED")}
          className={`px-2 py-1 rounded cursor-pointer ${
            selectedFilter === "CLOSED" ? "bg-gray-200 dark:bg-gray-700" : ""
          }`}>
          بسته
        </span>
      </div>
    </div>
  );
};

export default TicketsSidebarFilter;
