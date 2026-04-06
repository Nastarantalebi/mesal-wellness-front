import {
  LoaderIcon,
  LockIcon,
  MessageCircle,
  UnlockIcon,
  X,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import TicketsListForm from "./TicketsSidebarForm";
import { useNavigate, useParams } from "react-router-dom";
import type { TResList } from "../../_types/type";
import { ticketsUrl } from "../../_fixtures/data";
import TicketsSidebarFilter from "./TicketsSidebarFilter";
import useInfiniteData from "@/services/useInfiniteData";
import { toPersianDateTimeISO } from "@/utils/convertDate";
import Button from "@/components/Button";
type TProps = {
  setSelectedList: (id: string | null) => void;
  selectedList: string | null;
  mobileOpen: boolean;
  onClose: () => void;
  setSelectedTicket: Dispatch<SetStateAction<TResList | null>>;
};
const TicketsSidebar = ({
  setSelectedList,
  selectedList,
  mobileOpen,
  onClose,
  setSelectedTicket,
}: TProps) => {
  const navigate = useNavigate();
  const [newList, setNewList] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const observerTargetRef = useRef<HTMLDivElement>(null);
  const [selectedFilter, setSelectedFilter] = useState<"" | "OPEN" | "CLOSED">(
    "",
  );
  const handleSelectList = useCallback(
    (id: string) => {
      setSelectedList(id);
      navigate(`/tickets/${id}`);
    },
    [setSelectedList, navigate],
  );

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setSelectedList(id);
    }
  }, [id, setSelectedList]);
  const apiUrl = selectedFilter
    ? `${ticketsUrl}?status=${selectedFilter}`
    : ticketsUrl;

  // استفاده از useInfiniteData برای لیست تیکت‌ها
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isFetchingInitial,
    isFetching,
  } = useInfiniteData({
    queryKey: [ticketsUrl, selectedFilter],
    initialUrl: apiUrl,
    support: true,
    refetchInterval: 15000,
    refetchIntervalInBackground: true,
  });

  // جمع‌آوری همه آیتم‌ها از تمام صفحات
  const allTickets = useMemo(() => {
    if (!data?.pages) return [];

    return data.pages.flatMap((page: any) => {
      // چندین حالت ممکن برای ساختار پاسخ
      if (page?.results) return page.results;
      if (Array.isArray(page)) return page;
      if (page?.data?.results) return page.data.results;
      return [];
    });
  }, [data]);

  // Infinite Scroll با Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          hasNextPage &&
          !isFetchingNextPage &&
          !isFetching
        ) {
          fetchNextPage();
        }
      },
      {
        root: containerRef.current,
        threshold: 0.1,
        rootMargin: "100px",
      },
    );

    const currentTarget = observerTargetRef.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasNextPage, isFetchingNextPage, isFetching, fetchNextPage]);

  // هندل اسکرول برای نمایش دکمه بازگشت به بالا
  const handleScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
  }, []);

  // تنظیم event listener برای اسکرول
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);
  useEffect(() => {
    if (allTickets) {
      setSelectedTicket(
        allTickets?.find((item) => String(item.id) === selectedList),
      );
    }
  }, [allTickets]);
  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`mt-16 h-full fixed lg:static z-50 lg:z-10 top-0 bottom-0 left-0 w-72 md:w-96 lg:my-0 flex flex-col 
          bg-white dark:bg-neutral-900 border-r dark:border-gray-700 shadow-lg transform transition-transform
           duration-300 ease-in-out ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
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
            variant="outline-primary"
            className="bg-transparent text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={() => setNewList(!newList)}>
            <MessageCircle className="w-5 h-5" />
            <span className="mx-1">{newList ? "بستن" : "تیکت جدید"}</span>
          </Button>

          {newList && <TicketsListForm setNewList={setNewList} />}
          <TicketsSidebarFilter
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
          />
        </div>

        <div className="flex-1 overflow-y-auto px-3 space-y-1 mb-0">
          {/* لیست تیکت‌ها با Infinite Scroll */}
          <div ref={containerRef} className="flex-1 overflow-y-auto">
            {/* نمایش لیست تیکت‌ها */}
            <div className="p-3 space-y-2">
              {allTickets.length === 0 && !isFetchingInitial ? (
                <div className="text-center text-gray-400 dark:text-gray-500 py-8">
                  هیچ تیکتی یافت نشد
                </div>
              ) : (
                <>
                  {allTickets.map((item: TResList) => {
                    const isActive = selectedList === String(item.id);
                    return (
                      <div
                        key={item.id}
                        className={`rounded-lg transition-all duration-200
                        ${
                          isActive
                            ? "bg-blue-200 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
                            : "bg-gray-50 dark:bg-neutral-800 border border-gray-100 dark:border-neutral-700 hover:bg-gray-100 dark:hover:bg-neutral-700"
                        }`}>
                        <div
                          onClick={() => {
                            setSelectedTicket(item);
                            handleSelectList(String(item.id));
                          }}
                          className="cursor-pointer p-3 rounded-lg">
                          <div className="flex justify-between items-start gap-2">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-2">
                                <span className="truncate text-xs md:text-sm font-medium text-gray-800 dark:text-gray-100">
                                  {item.title}
                                </span>
                                {item.status === "OPEN" ? (
                                  <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                                    <UnlockIcon className="w-4 h-4" />
                                    <span>باز</span>
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                                    <LockIcon className="w-4 h-4" />
                                    <span>بسته</span>
                                  </div>
                                )}
                              </div>

                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-gray-500 dark:text-gray-400">
                                    ایجاد:
                                  </span>
                                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                    {toPersianDateTimeISO(item.created_at)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* عنصر هدف برای Intersection Observer */}
                  <div ref={observerTargetRef} className="h-4" />

                  {/* نمایش لودر برای بارگذاری صفحات جدید */}
                  {(isFetchingNextPage || isFetching) && (
                    <div className="flex justify-center items-center py-4">
                      <div className="flex items-center gap-2">
                        <LoaderIcon className="w-5 h-5 animate-spin text-blue-500" />
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default TicketsSidebar;
