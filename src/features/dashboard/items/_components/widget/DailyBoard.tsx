import { useForm, Controller } from "react-hook-form";
import DatePickerField from "@/components/Form/DatePicker";
import useGetData from "@/services/useGetData";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import DailyBoardTable from "./DailyBoardTable";
import type { TDailyBoard } from "../../_types/type";

type FormValues = {
  date: string;
};

const DailyBoard = () => {
  const { control, watch, setValue } = useForm<FormValues>({
    defaultValues: { date: "" },
  });

  const date = watch("date");

  const { data } = useGetData<TDailyBoard>({
    url: `wellness/bookings/daily-board?date=${date}`,
    queryKey: ["daily_board", date],
    enabled: !!date,
  });
  const updateDateFromUrl = (url?: string) => {
    if (!url) return;
    const params = new URLSearchParams(url.split("?")[1]);
    const newDate = params.get("date");
    if (newDate) setValue("date", newDate);
  };

  return (
    <div className="py-5 space-y-3 col-span-full">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-lg font-semibold">دفتر نوبت دهی روزانه</h1>

        <div className="flex items-center gap-2 bg-white p-2 rounded-xl shadow-sm border">
          <ChevronRightIcon
            className="cursor-pointer text-gray-600 hover:text-black transition"
            onClick={() => updateDateFromUrl(data?.prev_url)}
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
            onClick={() => updateDateFromUrl(data?.next_url)}
          />
        </div>
      </div>

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
