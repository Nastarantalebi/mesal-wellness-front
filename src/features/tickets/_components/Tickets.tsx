import { TextAlignJustify } from "lucide-react";
import { useState } from "react";
import TicketsMain from "./main/TicketsMain";
import type { TResList } from "../_types/type";
import TicketsSidebar from "./sidebar/TicketsSidebar";

const Tickets = () => {
  const [selectedList, setSelectedList] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [selectedTicket, setSelectedTicket] = useState<TResList | null>(null);
  return (
    <div className="flex flex-col h-full overflow-hidden bg-gray-50 dark:bg-neutral-900">
      {/* Header فقط در موبایل */}
      <header className="lg:hidden w-full h-12 bg-gray-100 dark:bg-neutral-800 flex items-center justify-between px-3 shadow-sm z-30">
        <span className="text-gray-800 dark:text-gray-100 font-medium">
          پشتیبانی
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
        <TicketsSidebar
          setSelectedList={setSelectedList}
          selectedList={selectedList}
          mobileOpen={mobileOpen}
          onClose={() => setMobileOpen(false)}
          setSelectedTicket={setSelectedTicket}
        />
      </div>
    </div>
  );
};

export default Tickets;
