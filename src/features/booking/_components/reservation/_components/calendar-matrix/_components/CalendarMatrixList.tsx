import type { TResponse, TRow, TEvent } from "../_types/type";

type TProps = { data?: TResponse };

const CalendarMatrixList = ({ data }: TProps) => {
  if (!data) return null;

  return (
    <div className="w-full overflow-auto rounded-xl border shadow bg-white dark:bg-gray-900">
      <div className="flex flex-col w-full">
        {/* Header: Names */}
        <div className="flex border bg-gray-100 dark:bg-gray-800">
          <div className="w-32 p-3 font-bold text-gray-700 dark:text-gray-200 border-r text-center">
            تاریخ‌ها
          </div>
          {data.rows.map((row: TRow) => (
            <div
              key={row.id}
              className="flex-1 p-3 font-bold text-gray-700 dark:text-gray-200 border-l text-center"
            >
              {row.name}
            </div>
          ))}
        </div>

        {/* Rows */}
        {data.dates.map((date, rowIndex) => (
          <div key={date} className="flex items-stretch border-b last:border-b-0">
            {/* Date column */}
            <div className="w-32 p-2 border-r text-sm text-gray-500 dark:text-gray-400 flex flex-col justify-center">
              تعداد: {data.rows.reduce((acc, r) => acc + r.days[rowIndex]?.count, 0)}
              <div className="mt-1">{date}</div>
            </div>

            {/* Cells */}
            {data.rows.map((row: TRow) => {
              const day = row.days[rowIndex];
              return (
                <div
                  key={row.id}
                  className="flex-1 p-2 border-l flex flex-col gap-1 items-stretch"
                >
                  {day.events.length === 0 && (
                    <div className="flex-1"></div> // برای هم‌ارتفاع کردن
                  )}
                  {day.events.map((event: TEvent) => (
                    <div
                      key={event.id}
                      className="text-xs p-2 rounded-lg shadow-sm border-r-4 text-right overflow-hidden whitespace-nowrap overflow-ellipsis"
                      style={{ borderColor: event.color }}
                    >
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
                        }}
                      >
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
    </div>
  );
};

export default CalendarMatrixList;
