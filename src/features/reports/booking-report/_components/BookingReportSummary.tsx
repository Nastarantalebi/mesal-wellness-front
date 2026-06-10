import {
  Banknote,
  CalendarCheck2,
  CircleDollarSign,
  TrendingUp,
  Wallet,
} from "lucide-react";
import type { TSummary } from "../_types/types";
type TPropsStat = {
  icon: React.ReactNode;
  title: string;
  value: string;
};
const SammaryCard = ({ icon, title, value }: TPropsStat) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200">
      <div className="w-12 h-12 mb-2 flex items-center justify-center rounded-full bg-primary/20 text-primary">
        {icon}{" "}
      </div>
      <div className="text-sm text-slate-500">{title}</div>
      <div className="mt-1 text-lg font-semibold text-slate-800">{value}</div>
    </div>
  );
};

type TProp = {
  summary: TSummary;
};
const BookingReportSummary = ({ summary }: TProp) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      <SammaryCard
        icon={<CalendarCheck2 className="h-6 w-6" />}
        title="تعداد رزروها"
        value={summary.total_bookings}
      />
      <SammaryCard
        icon={<TrendingUp className="h-6 w-6" />}
        title="میانگین قیمت رزروها"
        value={summary.average_booking_value}
      />

      <SammaryCard
        icon={<CircleDollarSign className="h-6 w-6" />}
        title="مجموع هزینه پرداخت شده"
        value={summary.total_paid}
      />
      <SammaryCard
        icon={<Wallet className="h-6 w-6" />}
        title="مجموع هزینه باقی مانده"
        value={summary.total_remaining}
      />
      <SammaryCard
        icon={<Banknote className="h-6 w-6" />}
        title="درآمد کل"
        value={summary.total_revenue}
      />
    </div>
  );
};

export default BookingReportSummary;
