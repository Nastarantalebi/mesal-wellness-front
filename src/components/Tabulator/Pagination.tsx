import type { TPaginate } from "@/types";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { FormSelect } from "../Form";

type TProps = {
  dataPagination: TPaginate;
};

const Pagination = ({ dataPagination }: TProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    current_page = 1,
    last_page = 1,
    total = 0,
    per_page = 20, // مقدار اولیه از سرور
  } = dataPagination || {};

  const paginationSizeSelector = [10, 20, 30, 50, 100, 200];

  // مقدار per_page کنترل شده
  const perPage = searchParams.get("per_page") || per_page.toString();
  const page = Number(searchParams.get("page")) || current_page;

  const goToPage = (newPage: number) => {
    if (newPage < 1 || newPage > last_page) return;
    searchParams.set("page", newPage.toString());
    searchParams.set("per_page", perPage);
    setSearchParams(searchParams);
  };

  const changePerPage = (size: number) => {
    searchParams.set("page", "1"); // وقتی per_page عوض شد، به صفحه اول برگرد
    searchParams.set("per_page", size.toString());
    setSearchParams(searchParams);
  };

  const generatePageNumbers = () => {
    const pages: (number | "...")[] = [];
    if (last_page <= 7) {
      for (let i = 1; i <= last_page; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push("...");
      const start = Math.max(2, page - 1);
      const end = Math.min(last_page - 1, page + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (page < last_page - 2) pages.push("...");
      pages.push(last_page);
    }
    return pages;
  };

  return (
    <div className="w-full flex items-center justify-between flex-wrap gap-4 m-1">
      {/* Left: نمایش و تعداد کل */}
      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
        <span>نمایش</span>
        <FormSelect
          value={perPage} // کنترل‌شده
          onChange={(e) => changePerPage(Number(e.target.value))}>
          {paginationSizeSelector.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </FormSelect>
        <span>از</span>
        <span className="font-bold text-gray-800 dark:text-gray-100">
          {total}
        </span>
        <span>آیتم</span>
      </div>

      {/* Center: Page numbers */}
      <div className="flex items-center gap-2">
        {/* Prev */}
        <button
          disabled={page === 1}
          onClick={() => goToPage(page - 1)}
          className={`p-2 rounded-lg border dark:border-neutral-700 hover:bg-gray-100 dark:hover:bg-neutral-800 transition
          ${page === 1 ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}>
          <ChevronRight size={18} />
        </button>

        {/* Page Numbers */}
        {generatePageNumbers().map((p, i) =>
          p === "..." ? (
            <span
              key={i}
              className="px-3 py-1 text-gray-400 dark:text-gray-500">
              ...
            </span>
          ) : (
            <button
              key={i}
              onClick={() => goToPage(p as number)}
              className={`px-3 py-1 rounded-lg transition
              ${
                p === page
                  ? "bg-blue-600 text-white font-bold"
                  : "bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700"
              }`}>
              {p}
            </button>
          )
        )}

        {/* Next */}
        <button
          disabled={page === last_page}
          onClick={() => goToPage(page + 1)}
          className={`p-2 rounded-lg border dark:border-neutral-700 hover:bg-gray-100 dark:hover:bg-neutral-800 transition
          ${
            page === last_page
              ? "opacity-40 cursor-not-allowed"
              : "cursor-pointer"
          }`}>
          <ChevronLeft size={18} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
