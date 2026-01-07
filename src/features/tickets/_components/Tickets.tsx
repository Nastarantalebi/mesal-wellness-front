import { TextAlignJustify } from "lucide-react";
import { useEffect, useState } from "react";
import TicketsSideBar from "./TicketsSideBar";
import TicketsMain from "./TicketsMain";
import type { TResList } from "../_types/type";
import { TICKETS_QUERY_KEY, ticketsUrl } from "../_fixtures/data";
import useGetData from "@/services/useGetData";
import { useNavigate, useParams } from "react-router-dom";
import type { IResData } from "@/types";
import TitlePage from "@/features/_components/TitlePage";

const Tickets = () => {
  const [selectedList, setSelectedList] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<"" | "OPEN" | "CLOSED">(
    ""
  );
  const apiUrl = selectedFilter
    ? `${ticketsUrl}?status=${selectedFilter}`
    : ticketsUrl;

  const { data, isFetching } = useGetData<IResData<TResList>>({
    url: apiUrl,
    support: true,
    queryKey: [TICKETS_QUERY_KEY, selectedFilter],
  });
  const selectedTicket =
    data?.results &&
    data.results?.find((item) => String(item.id) === selectedList);
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  useEffect(() => {
    if (!data?.results?.length) return;
    if (params.id) {
      setSelectedList(params.id);
    } else {
      const firstId = data.results[data.results.length - 1].id;
      setSelectedList(firstId);
      navigate(`/tickets/${firstId}`, { replace: true });
    }
  }, [data, params.id, navigate]);
  return (
    <div className="flex flex-col h-full overflow-hidden bg-gray-50 dark:bg-neutral-900">
      <TitlePage title="تیکت" />
      {/* Header فقط در موبایل */}
      <header className="lg:hidden w-full h-12 bg-gray-100 dark:bg-neutral-800 flex items-center justify-between px-3 shadow-sm z-30">
        <span className="text-gray-800 dark:text-gray-100 font-medium">
          تیکت
        </span>
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 hover:bg-gray-200 dark:hover:bg-neutral-700 rounded-xl transition-all">
          <TextAlignJustify className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>
      </header>

      {/* محتوا */}
      <div className="flex flex-1 overflow-hidden">
        {/* صفحه اصلی چت */}
        <div className="flex-1 overflow-hidden bg-white dark:bg-neutral-800">
          <TicketsMain
            selectedList={selectedList}
            selectedTicket={selectedTicket}
          />
        </div>

        {/* سایدبار */}
        <TicketsSideBar
          setSelectedList={setSelectedList}
          selectedList={selectedList}
          mobileOpen={mobileOpen}
          onClose={() => setMobileOpen(false)}
          selectedFilter={selectedFilter}
          data={data}
          setSelectedFilter={setSelectedFilter}
          isFetching={isFetching}
        />
      </div>
    </div>
  );
};

export default Tickets;
