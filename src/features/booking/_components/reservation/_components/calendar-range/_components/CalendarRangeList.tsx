import type { TResponse } from "../_types/type";

type TProps = { data?: TResponse };

const CalendarRangeList = ({ data }: TProps) => {
  return (
    <div className="space-y-6">
      {data?.days?.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400">
          برای این تاریخ نوبتی ثبت نشده است.
        </p>
      )}

      {data?.days?.map((day) => (
        <div key={day.date} className="space-y-2">
          {/* تاریخ روز */}
          <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            {day.date.split(" ")[0]} {/* فقط قسمت تاریخ */}
          </h2>

          {/* لیست رویدادهای روز */}
          {day.events.map((event) => (
            <div
              key={event.id}
              className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 rounded-xl shadow-lg border-l-4 transition-all hover:shadow-xl hover:scale-[1.02] duration-200 bg-white dark:bg-gray-800"
              style={{ borderColor: event.color }}>
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {event.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  سرویس: <span className="font-medium">{event.service}</span> |
                  درمانگر:{" "}
                  <span className="font-medium">{event.therapist}</span>| مکان:{" "}
                  <span className="font-medium">{event.resource}</span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  مشتری: <span className="font-medium">{event.customer}</span>
                </p>
              </div>

              <div className="mt-3 md:mt-0 text-right flex flex-col items-end space-y-1">
                <p className="text-xs font-medium text-gray-700 dark:text-gray-200">
                  {event.start.split(" ")[1]} - {event.end.split(" ")[1]}
                </p>
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    event.status === "تایید شده"
                      ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"
                  }`}>
                  {event.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CalendarRangeList;
