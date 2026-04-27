import useGetById from "@/services/useGetById";
import type { TServicesInfo } from "../_types/types";

import type { TOption } from "@/types";
import { Navigate, useLocation } from "react-router-dom";
import TitlePage from "@/features/_components/TitlePage";
import { formatMoney } from "@/utils/formValues";

const ServicesInfo = () => {
  const location = useLocation();
  const selectedRecord = location.state?.record;
  const id = selectedRecord.id;
  if (!selectedRecord) return <Navigate to={"/services"} />;
  const url = `/wellness/services/${id}/statistics/`;
  const { data } = useGetById<TServicesInfo>({
    queryKey: url,
    url,
    enabled: !!id,
  });
  if (!data?.data) return;
  const hasVisit = data.data.last_used_at && data.data.first_used_at;
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-180 p-8 rounded-2xl shadow-xl border border-blue-100 my-20">
      <TitlePage title={"آمار خدمت"} />
      <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
        آمار {selectedRecord.title}
      </h2>
      <div className="flex items-center justify-between flex-wrap rounded bg-green-700 my-2 p-3 text-white">
        {data.data.first_used_at && (
          <div className="flex gap-1">
            <span>اولین استفاده</span>
            <span>{data.data.first_used_at}</span>
          </div>
        )}
        {data.data.last_used_at && (
          <div className="flex gap-1">
            <span>آخرین استفاده</span>
            <span>{data.data.last_used_at}</span>
          </div>
        )}
        {!hasVisit && (
          <div className="w-full text-center">هنوز رزروی انجام نداده است.</div>
        )}
      </div>
      {/* total count */}
      <div className="my-2 bg-gradient-to-br from-blue-500 to-purple-800 flex flex-col items-center justify-center p-6 rounded-2xl shadow-2xl border border-white/20 backdrop-blur-sm">
        <p className="text-white font-bold text-lg mb-4 drop-shadow-lg">
          آمار رزروهای خدمت
        </p>
        <div className="flex items-center justify-center flex-wrap w-full gap-3">
          <ServicesInfoComponent
            label="تعداد رزروها"
            value={data.data.total_bookings}
          />
          <ServicesInfoComponent
            label="تعداد جلسات"
            value={data.data.total_sessions}
          />
          <ServicesInfoComponent
            label="تعداد مشتریان"
            value={data.data.total_customers}
          />
          <ServicesInfoComponent
            label="جلسات برگزارشده"
            value={data.data.total_corporate_sessions}
          />
          <ServicesInfoComponent
            label="جلسات تاییدشده"
            value={data.data.confirmed_bookings}
          />
          <ServicesInfoComponent
            label="جلسات لغوشده"
            value={data.data.canceled_bookings}
          />
          <ServicesInfoComponent
            label="مشتریان جدید"
            value={data.data.new_customers_count}
          />
          <ServicesInfoComponent
            label="مشتریان تکراری"
            value={data.data.repeat_customers_count}
          />
        </div>
      </div>
      {/*total price */}
      <div className="my-2 bg-gradient-to-br from-blue-500 to-purple-800 flex flex-col items-center justify-center p-6 rounded-2xl shadow-2xl border border-white/20 backdrop-blur-sm">
        <p className="text-white font-bold text-lg mb-4 drop-shadow-lg">
          آمار قیمت خدمت
        </p>
        <div className="flex items-center justify-center flex-wrap w-full gap-3">
          <ServicesInfoComponent
            label="زمان‌ کل(دقیقه)"
            value={data.data.total_minutes ?? 0}
          />
          <ServicesInfoComponent
            label="میانگین زمان هرجلسه(دقیقه)"
            value={Number(data.data.average_session_minutes).toFixed(0) || "0"}
          />
          <ServicesInfoComponent
            label=" درآمد کل(تومان)"
            value={formatMoney(String(data.data.total_revenue) || "0")}
          />
          <ServicesInfoComponent
            label=" پرداختی(تومان)"
            value={formatMoney(String(data.data.total_paid.toFixed(0)) || "0")}
          />
          <ServicesInfoComponent
            label=" درآمد متوسط هرجلسه(تومان)"
            value={formatMoney(
              String(data.data.average_revenue_per_session.toFixed(0)) || "0",
            )}
          />
          <ServicesInfoComponent
            label=" تخفیف(تومان)"
            value={formatMoney(data.data.total_discount || "0")}
          />
          <ServicesInfoComponent
            label="میانگین قیمت(تومان)"
            value={formatMoney(
              String(data.data.average_price.toFixed(0)) || "0",
            )}
          />
        </div>
      </div>
      {/*therapists */}
      {data.data.therapist_distribution.length > 0 && (
        <div className="my-2 bg-gradient-to-br from-blue-500 to-purple-800 flex flex-col items-center justify-center p-6 rounded-2xl shadow-2xl border border-white/20 backdrop-blur-sm">
          <p className="text-white font-bold text-lg mb-4 drop-shadow-lg">
            ماساژیست‌های این خدمت (براساس رزرو)
          </p>
          <div className="flex items-center justify-center flex-wrap w-full gap-3">
            {data.data.therapist_distribution.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-3 bg-white/20 rounded-xl backdrop-blur-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border border-white/30 min-w-[80px]">
                <span className="text-white font-semibold text-sm drop-shadow-md">
                  {item.full_name}
                </span>
                <span className="text-2xl font-bold text-yellow-400 drop-shadow-lg">
                  {item.cnt}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      {/*company */}
      {data.data.company_distribution.length > 0 && (
        <div className="my-2 bg-gradient-to-br from-blue-500 to-purple-800 flex flex-col items-center justify-center p-6 rounded-2xl shadow-2xl border border-white/20 backdrop-blur-sm">
          <p className="text-white font-bold text-lg mb-4 drop-shadow-lg">
            شرکت‌های این خدمت (براساس رزرو)
          </p>
          <div className="flex items-center justify-center flex-wrap w-full gap-3">
            {data.data.company_distribution.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-3 bg-white/20 rounded-xl backdrop-blur-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border border-white/30 min-w-[80px]">
                <span className="text-white font-semibold text-sm drop-shadow-md">
                  {item.company_name}
                </span>
                <span className="text-2xl font-bold text-yellow-400 drop-shadow-lg">
                  {item.cnt}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* peak days */}
      {data.data.peak_days.length > 0 && (
        <div className="my-2 bg-gradient-to-br from-blue-500 to-purple-800 flex flex-col items-center justify-center p-6 rounded-2xl shadow-2xl border border-white/20 backdrop-blur-sm">
          <p className="text-white font-bold text-lg mb-4 drop-shadow-lg">
            پیک روزکاری (براساس رزرو)
          </p>
          <div className="flex items-center justify-center flex-wrap w-full gap-3">
            {data.data.peak_days.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-3 bg-white/20 rounded-xl backdrop-blur-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border border-white/30 min-w-[80px]">
                <span className="text-white font-semibold text-sm drop-shadow-md">
                  {item.day}
                </span>
                <span className="text-2xl font-bold text-yellow-400 drop-shadow-lg">
                  {item.cnt}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* peak hours */}
      {data.data.peak_hours.length > 0 && (
        <div className="my-2 bg-gradient-to-br from-blue-500 to-purple-800 flex flex-col items-center justify-center p-6 rounded-2xl shadow-2xl border border-white/20 backdrop-blur-sm">
          <p className="text-white font-bold text-lg mb-4 drop-shadow-lg">
            پیک ساعت‌کاری (براساس رزرو)
          </p>
          <div className="flex items-center justify-center flex-wrap w-full gap-3">
            {data.data.peak_hours.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-3 bg-white/20 rounded-xl backdrop-blur-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border border-white/30 min-w-[80px]">
                <span className="text-white font-semibold text-sm drop-shadow-md">
                  {item.booking}
                </span>
                <span className="text-white font-semibold text-sm drop-shadow-md">
                  ساعت {item.hour}
                </span>
                <span className="text-2xl font-bold text-yellow-400 drop-shadow-lg">
                  {item.cnt}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* top */}
      {(data.data.top_company || data.data.top_therapist) && (
        <div className="my-2 bg-gradient-to-br from-blue-500 to-purple-800 flex flex-col items-center justify-center p-6 rounded-2xl shadow-2xl border border-white/20 backdrop-blur-sm">
          <p className="text-white font-bold text-lg mb-4 drop-shadow-lg">
            برترین‌های خدمت (براساس رزرو)
          </p>
          <div className="flex items-center justify-center flex-wrap w-full gap-3">
            <div className="flex flex-col items-center p-3 bg-white/20 rounded-xl backdrop-blur-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border border-white/30 min-w-[80px]">
              <span className="text-yellow-300 font-semibold text-sm drop-shadow-md my-1">
                شرکت برتر
              </span>
              <span className="text-white font-semibold text-sm drop-shadow-md">
                {data.data.top_company.company_name}
              </span>
              <span className="text-2xl font-bold text-yellow-400 drop-shadow-lg">
                {data.data.top_company.cnt}
              </span>
            </div>
            <div className="flex flex-col items-center p-3 bg-white/20 rounded-xl backdrop-blur-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border border-white/30 min-w-[80px]">
              <span className="text-yellow-300 font-semibold text-sm drop-shadow-md my-1">
                ماساژیست برتر
              </span>
              <span className="text-white font-semibold text-sm drop-shadow-md">
                {data.data.top_therapist.concat}
              </span>
              <span className="text-white font-semibold text-sm drop-shadow-md">
                {data.data.top_therapist.booking}
              </span>
              <span className="text-2xl font-bold text-yellow-400 drop-shadow-lg">
                {data.data.top_therapist.cnt}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesInfo;

const ServicesInfoComponent = ({ label, value }: TOption) => {
  return (
    <div className="flex flex-col items-center p-3 bg-white/20 rounded-xl backdrop-blur-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border border-white/30 min-w-[80px]">
      <span className="text-white font-semibold text-sm drop-shadow-md">
        {label}
      </span>
      <span className="text-2xl font-bold text-yellow-400 drop-shadow-lg">
        {value}
      </span>
    </div>
  );
};
