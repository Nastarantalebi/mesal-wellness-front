import { useForm, Controller } from "react-hook-form";
import DatePickerField from "@/components/Form/DatePicker";
import useGetData from "@/services/useGetData";
import DailyBoardTable from "./DailyBoardTable";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import type { TDailyBoard } from "../../_types/type";

type FormValues = {
  date: string;
};

const DailyBoard = () => {
  const today = new DateObject({ calendar: persian }).format("YYYY/MM/DD");
  const { control, watch, setValue } = useForm<FormValues>({
    defaultValues: { date: today },
  });

  const date = watch("date");

  const { data } = useGetData<TDailyBoard>({
    url: `wellness/bookings/daily-board?date=${date}`,
    queryKey: ["daily_board", date],
    enabled: !!date,
  });

  // فلش عقب (یک روز کم کن)
  const handlePrev = () => {
    const prevDate = new DateObject({ calendar: persian, date })
      .add(-1, "days")
      .format("YYYY/MM/DD");
    setValue("date", prevDate);
  };
  // فلش جلو (یک روز اضافه کن)
  const handleNext = () => {
    const nextDate = new DateObject({ calendar: persian, date })
      .add(1, "days")
      .format("YYYY/MM/DD");
    setValue("date", nextDate);
  };

  return (
    <div className="py-5 space-y-3 col-span-full">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-lg font-semibold">دفتر نوبت دهی روزانه</h1>

        <div className="flex items-center gap-2 bg-white p-2 rounded-xl shadow-sm border ">
          <ChevronRightIcon
            className="cursor-pointer text-gray-600 hover:text-black transition"
            onClick={handlePrev}
          />

          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <DatePickerField
                field={{
                  ...field,
                }}
                inputClassName="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400"
              />
            )}
          />

          <ChevronLeftIcon
            className="cursor-pointer text-gray-600 hover:text-black transition"
            onClick={handleNext}
          />
        </div>
      </div>

      {/* Body */}
      {data ? (
        <DailyBoardTable data={data} />
      ) : (
        <p className="text-center text-gray-400 pt-10">
          لطفا یک تاریخ انتخاب کنید
        </p>
      )}
    </div>
  );
};

export default DailyBoard;
