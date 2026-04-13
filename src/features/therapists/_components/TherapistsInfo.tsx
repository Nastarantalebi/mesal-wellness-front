import useGetData from "@/services/useGetData";
import type { TTherapistInfo } from "../_types/types";
import {
  CheckIcon,
  ClockIcon,
  DollarSignIcon,
  UsersIcon,
  XCircleIcon,
} from "lucide-react";

type TProps = {
  id: number;
};
const TherapistsInfo = ({ id }: TProps) => {
  const url = `/wellness/therapists/${id}/statistics/`;
  const { data } = useGetData<TTherapistInfo>({
    queryKey: url,
    url,
    enabled: !!id,
  });
  if (!data?.data) return;
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl shadow-xl border border-blue-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
        آمار ماساژور
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <TherapistsInfoComponents
          icon={<UsersIcon className="h-6 w-6" />}
          label="کل جلسات"
          value={data.data.total_sessions}
        />
        <TherapistsInfoComponents
          icon={<CheckIcon className="h-6 w-6" />}
          label="جلسات تکمیل‌شده"
          value={data.data.completed_sessions}
        />
        <TherapistsInfoComponents
          icon={<XCircleIcon className="h-6 w-6" />}
          label="جلسات لغوشده"
          value={data.data.canceled_sessions}
        />
        <TherapistsInfoComponents
          icon={<UsersIcon className="h-6 w-6" />}
          label="مشتریان غیرتکراری"
          value={data.data.unique_customers}
        />
        <TherapistsInfoComponents
          icon={<ClockIcon className="h-6 w-6" />}
          label="زمان‌ کل(دقیقه)"
          value={data.data.total_minutes}
        />
        <TherapistsInfoComponents
          icon={<DollarSignIcon className="h-6 w-6" />}
          label="درآمد کل(تومان)"
          value={data.data.total_revenue}
        />
      </div>
    </div>
  );
};

export default TherapistsInfo;
type TPropsC = {
  icon: React.ReactNode;
  label: string;
  value: number;
};
const TherapistsInfoComponents = ({ icon, label, value }: TPropsC) => {
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
