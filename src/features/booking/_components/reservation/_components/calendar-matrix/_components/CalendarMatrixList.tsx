import type { TResponse, TRow, TEvent } from "../_types/type";

type TProps = { data?: TResponse };

const CalendarMatrixList = ({ data }: TProps) => {
  if (!data) return null;

  return (
    <div className="w-full overflow-auto rounded-xl border shadow bg-gray-100 dark:bg-gray-900">
      {/* Grid Header */}
      <div className="grid grid-cols-[150px_repeat(auto-fit,minmax(100px,1fr))] border-b border-gray-300 dark:border-gray-700">
        {/* تاریخ‌ها */}
        <div className="p-3 font-bold text-gray-700 dark:text-gray-200 border-x border-gray-300 dark:border-gray-700 text-center">
       تاریخ
        </div>
        {/* نام ردیف‌ها */}
        {data.rows.map((row: TRow) => (
          <div
            key={row.id}
            className="p-3 font-bold text-gray-700 dark:text-gray-200 border-l border-gray-300 dark:border-gray-700 text-center">
            {row.name}
          </div>
        ))}
      </div>

      {/* Grid Rows */}
      {data.dates.map((date, rowIndex) => (
        <div
          key={date}
          className="grid grid-cols-[150px_repeat(auto-fit,minmax(100px,1fr))] border-b border-gray-200 dark:border-gray-700">
          {/* ستون تاریخ‌ها */}
          <div className="p-2  border-x border-gray-300 dark:border-gray-700 flex flex-col justify-center text-sm text-gray-500 dark:text-gray-400">
            تعداد:{" "}
            {data.rows.reduce((acc, r) => acc + r.days[rowIndex]?.count, 0)}
            <div className="mt-1">{date}</div>
          </div>

          {/* سلول‌ها */}
          {data.rows.map((row: TRow) => {
            const day = row.days[rowIndex];
            return (
              <div
                key={row.id}
                className="p-2 border-l border-gray-200 dark:border-gray-700 flex flex-col gap-1"
                style={{ minHeight: "60px" }} // ارتفاع پایه برای هم‌ارتفاع بودن
              >
                {day.events.length === 0 && <div className="flex-1"></div>}
                {day.events.map((event: TEvent) => (
                  <div
                    key={event.id}
                    className="text-xs p-2 rounded-lg shadow-sm border-r-4 text-right overflow-hidden whitespace-nowrap overflow-ellipsis"
                    style={{ borderColor: event.color }}>
                    <p className="font-bold text-gray-800 dark:text-gray-100 truncate">
                      {event.service}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 truncate">
                      {event.customer}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-[10px]">
                      {event.start.split(" ")[1]} - {event.end.split(" ")[1]}
                    </p>
                    <span
                      className="inline-block mt-1 text-[10px] rounded-full px-2 py-0.5 font-medium truncate"
                      style={{
                        backgroundColor: `${event.color}22`,
                        color: event.color,
                      }}>
                      {event.status}
                    </span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default CalendarMatrixList;
