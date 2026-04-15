import useGetData from "@/services/useGetData";
import {
  CheckIcon,
  ClockIcon,
  DollarSignIcon,
  HeartIcon,
  UsersIcon,
  XCircleIcon,
} from "lucide-react";
import type { TCustomersInfo } from "../_types/types";
import { formatMoney } from "@/utils/formValues";

type TProps = {
  id: number;
};
const CustomersInfo = ({ id }: TProps) => {
  const url = `/wellness/customers/${id}/statistics/`;
  const { data } = useGetData<TCustomersInfo>({
    queryKey: url,
    url,
    enabled: !!id,
  });
  if (!data?.data) return;
  const hasVisit = data.data.last_visit && data.data.first_visit;
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl shadow-xl border border-blue-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
        آمار مشتری
      </h2>
      <div className="flex items-center justify-between flex-wrap rounded bg-green-700 my-2 p-3 text-white">
        {data.data.first_visit && (
          <div className="flex gap-1">
            <span>اولین ویزیت</span>
            <span>{data.data.first_visit}</span>
          </div>
        )}
        {data.data.last_visit && (
          <div className="flex gap-1">
            <span>آخرین ویزیت</span>
            <span>{data.data.last_visit}</span>
          </div>
        )}
        {!hasVisit && (
          <div className="w-full text-center">هنوز رزروی انجام نداده است.</div>
        )}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <CustomersInfoComponents
          icon={<UsersIcon className="h-6 w-6" />}
          label="کل رزروها"
          value={data.data.total_bookings}
        />
        <CustomersInfoComponents
          icon={<UsersIcon className="h-6 w-6" />}
          label="کل جلسات"
          value={data.data.total_sessions}
        />
        <CustomersInfoComponents
          icon={<CheckIcon className="h-6 w-6" />}
          label="جلسات تکمیل‌شده"
          value={data.data.completed_bookings}
        />
        <CustomersInfoComponents
          icon={<XCircleIcon className="h-6 w-6" />}
          label="جلسات لغوشده"
          value={data.data.canceled_bookings}
        />
        <CustomersInfoComponents
          icon={<HeartIcon className="h-6 w-6" />}
          label="سرویس‌های موردعلاقه"
          value={Number(data.data.favorite_service) ?? 0}
        />

        <CustomersInfoComponents
          icon={<ClockIcon className="h-6 w-6" />}
          label="زمان‌ کل(دقیقه)"
          value={data.data.total_minutes}
        />
        <CustomersInfoComponents
          icon={<DollarSignIcon className="h-6 w-6" />}
          label=" مجموع هزینه‌ها(تومان)"
          value={formatMoney(String(data.data.total_amount) || "0")}
        />
        <CustomersInfoComponents
          icon={<DollarSignIcon className="h-6 w-6" />}
          label=" تخفیف(تومان)"
          value={formatMoney(String(data.data.total_discount) || "0")}
        />
        <CustomersInfoComponents
          icon={<DollarSignIcon className="h-6 w-6" />}
          label=" پرداختی(تومان)"
          value={formatMoney(String(data.data.total_paid) || "0")}
        />
      </div>
    </div>
  );
};

export default CustomersInfo;
type TPropsC = {
  icon: React.ReactNode;
  label: string;
  value: number | string;
};
const CustomersInfoComponents = ({ icon, label, value }: TPropsC) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200">
      {/* آیکون */}
      <div className="w-12 h-12 mb-2 flex items-center justify-center rounded-full bg-primary/20 text-primary">
        {icon}
      </div>

      {/* عنوان */}
      <div className="text-sm text-slate-500">{label}</div>

      {/* مقدار */}
      <div className="mt-1 text-lg font-semibold text-slate-800">{value}</div>
    </div>
  );
};
