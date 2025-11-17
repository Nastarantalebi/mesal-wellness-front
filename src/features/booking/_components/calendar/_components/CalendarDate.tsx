import { url } from "@/features/booking/_fixtures/data";
import useGetData from "@/services/useGetData";
import { useEffect, useState } from "react";
import { Calendar, DateObject } from "react-multi-date-picker";
import highlightWeekends from "react-multi-date-picker/plugins/highlight_weekends";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import AppointmentReservation from "./AppointmentReservation";
import type { DayEvents } from "../_types/type";
const CalendarDate = () => {
  const [value, setValue] = useState<DateObject | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const faToEn = (str: string) => {
    const faDigits = "۰۱۲۳۴۵۶۷۸۹";
    return str.replace(/[۰-۹]/g, (w) => faDigits.indexOf(w).toString());
  };
  useEffect(() => {
    const today = new DateObject({ calendar: persian });
    setValue(today);
    setSelectedDate(faToEn(today.format("YYYY/MM/DD")));
  }, []);
  useEffect(() => {
    if (value) {
      setSelectedDate(faToEn(value.format("YYYY/MM/DD")));
    }
  }, [value]);
  const { data } = useGetData<DayEvents>({
    url: `${url}calendar?date=${selectedDate}`,
    queryKey: ["CalendarDate", String(selectedDate)],
    enabled: !!selectedDate,
  });
  return (
    <>
    <div className="p-5 space-y-4">
      {/* انتخاب تاریخ */}
      <Calendar
        className={`
    !z-10 !rounded-xl p-2 !w-full h-fit 
    lg:!w-1/4 rmdp-mobile 
    !border !border-neutral-200 dark:!border-neutral-700
    !bg-white dark:!bg-neutral-800
    !text-neutral-900 dark:!text-neutral-100
    shadow-sm dark:shadow-none

    /* تنظیمات داخلی اجزای تقویم */
    [&_.rmdp-calendar]:w-full [&_.rmdp-calendar]:!h-fit [&_.rmdp-calendar]:*:h-fit
    [&_.rmdp-day-picker]:w-full [&_.rmdp-day-picker]:h-4/5 [&_.rmdp-day-picker]:*:w-full
    [&_.rmdp-day-picker]:*:flex [&_.rmdp-day-picker]:*:flex-col [&_.rmdp-day-picker]:*:justify-between

    /* 🎨 هدر تقویم */
    [&_.rmdp-header]:w-full [&_.rmdp-header]:!h-fit
    [&_.rmdp-header]:!border-b [&_.rmdp-header]:!border-neutral-200 dark:[&_.rmdp-header]:!border-neutral-700
    [&_.rmdp-header]:!text-neutral-800 dark:[&_.rmdp-header]:!text-neutral-200

    /* 🔥 عنوان ماه/سال */
    [&_.rmdp-header-values]:!text-neutral-800 dark:[&_.rmdp-header-values]:!text-neutral-100
    [&_.rmdp-header-values_span]:!text-neutral-800 dark:[&_.rmdp-header-values_span]:!text-neutral-100

    /* روزها */
    [&_.rmdp-day]:!text-neutral-800 dark:[&_.rmdp-day]:!text-neutral-200
  `}
        format="YYYY/MM/DD"
        value={value}
        onChange={(date) => setValue(date)}
        calendar={persian}
        locale={persian_fa}
        plugins={[highlightWeekends()]}
      />
    </div>
    <AppointmentReservation data={data}/>
    </>
  );
};

export default CalendarDate;
