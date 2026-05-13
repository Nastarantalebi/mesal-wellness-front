import { Banknote, CalendarCheck2, UserRoundSearch, Users } from "lucide-react";
import type { TSummary } from "../_types/types";

type TProp = {
  summary: TSummary;
};
const ServicesReportSummary = ({ summary }: TProp) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-2">
      <div className="flex items-center flex-col justify-center gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
          <Users className="h-6 w-6" />
        </div>

        <div className="flex-1 ">
          <p className="text-sm text-gray-500">درمانگران فعال</p>
          <p className="mt-1 text-2xl font-bold text-gray-900  text-center">
            {summary.active_therapists}
          </p>
        </div>
      </div>

      <div className="flex items-center flex-col justify-center gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <CalendarCheck2 className="h-6 w-6" />
        </div>

        <div className="flex-1">
          <p className="text-sm text-gray-500">تعداد رزروها</p>
          <p className="mt-1 text-2xl font-bold text-gray-900 text-center">
            {summary.total_bookings}
          </p>
        </div>
      </div>

      <div className="flex items-center flex-col justify-center gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-50 text-amber-600">
          <Banknote className="h-6 w-6" />
        </div>

        <div className="flex-1">
          <p className="text-sm text-gray-500">درآمد کل</p>
          <p className="mt-1 text-2xl font-bold text-gray-900  text-center">
            {summary.total_revenue}
          </p>
        </div>
      </div>

      <div className="flex items-center flex-col justify-center gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-50 text-violet-600">
          <UserRoundSearch className="h-6 w-6" />
        </div>

        <div className="flex-1">
          <p className="text-sm text-gray-500">تعداد درمانگران</p>
          <p className="mt-1 text-2xl font-bold text-gray-900  text-center">
            {summary.total_therapists}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServicesReportSummary;
