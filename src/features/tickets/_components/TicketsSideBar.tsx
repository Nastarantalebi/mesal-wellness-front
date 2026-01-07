import { LockIcon, MessageCircle, UnlockIcon, X } from "lucide-react";
import { useEffect, useState } from "react";
import TicketsListForm from "./TicketsListForm";
import { useNavigate, useParams } from "react-router-dom";
import type { IResData } from "@/types";
import type { TResList } from "../_types/type";
import { ticketsUrl } from "../_fixtures/data";
import Button from "@/components/Button";
import LoadingSpin from "@/components/Loading";
import Sort from "@/features/_components/Sort";
type TProps = {
  setSelectedList: (id: string | null) => void;
  selectedList: string | null;
  mobileOpen: boolean;
  onClose: () => void;
  selectedFilter: "" | "OPEN" | "CLOSED";
  isFetching: boolean;
  setSelectedFilter: React.Dispatch<
    React.SetStateAction<"" | "OPEN" | "CLOSED">
  >;
  data?: IResData<TResList>;
};
const TicketsSideBar = ({
  setSelectedList,
  selectedList,
  mobileOpen,
  onClose,
  selectedFilter,
  isFetching,
  setSelectedFilter,
  data,
}: TProps) => {
  const navigate = useNavigate();
  const [newList, setNewList] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      setSelectedList(id);
    }
  }, [id]);
  const handleSelectList = (id: string) => {
    setSelectedList(id);
    navigate(`${ticketsUrl}${id}`);
  };
  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed lg:static z-50 lg:z-10 top-0 bottom-0 left-0 w-72 md:w-1/4 mt-16 lg:my-0
  bg-white dark:bg-neutral-900 border-r dark:border-gray-700 shadow-lg
  transform transition-transform duration-300 ease-in-out
  ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="flex items-center justify-between p-3 border-b dark:border-gray-700 lg:hidden">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition">
            <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
          <span className="text-gray-800 dark:text-gray-100 font-medium">
            منو
          </span>
        </div>

        <div className="flex flex-col gap-1 p-3 border-b dark:border-gray-700">
          <Button
            variant="outline-secondary"
            className="bg-transparent text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={() => setNewList(!newList)}>
            <MessageCircle className="w-5 h-5" />
            <span>{newList ? "بستن" : "تیکت جدید"}</span>
          </Button>

          {newList && <TicketsListForm setNewList={setNewList} />}
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-1">
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
                  selectedFilter === "OPEN"
                    ? "bg-gray-200 dark:bg-gray-700"
                    : ""
                }`}>
                باز
              </span>
              <span
                onClick={() => setSelectedFilter("CLOSED")}
                className={`px-2 py-1 rounded cursor-pointer ${
                  selectedFilter === "CLOSED"
                    ? "bg-gray-200 dark:bg-gray-700"
                    : ""
                }`}>
                بسته
              </span>
            </div>
          </div>

          {isFetching ? (
            <LoadingSpin />
          ) : (
            data?.results?.map((item) => {
              const isActive = selectedList === item.id;
              return (
                <div
                  key={item.id}
                  className={`rounded-lg flex justify-between items-center transition text-sm lg:text-base
            ${
              isActive
                ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                : "hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
            }`}
                  onClick={onClose}>
                  <div className="flex-1">
                    <div
                      onClick={() => handleSelectList(item.id)}
                      className="cursor-pointer flex items-center justify-between gap-2 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors duration-200">
                      <span className="truncate text-sm md:text-base font-medium text-gray-800 dark:text-gray-100">
                        {item.title}
                      </span>

                      <div className="flex items-center gap-1 text-xs md:text-sm">
                        {item.status === "OPEN" ? (
                          <div className="flex items-center text-green-600 dark:text-green-400">
                            <UnlockIcon className="w-4 h-4 ml-1" />
                            <span>باز</span>
                          </div>
                        ) : (
                          <div className="flex items-center text-gray-500 dark:text-gray-400">
                            <LockIcon className="w-4 h-4 ml-1" />
                            <span>بسته</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </aside>
    </>
  );
};

export default TicketsSideBar;
