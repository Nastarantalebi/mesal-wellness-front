import type { DayEvents } from "../_types/type";

type TProps = { data?: DayEvents };
const AppointmentReservation = ({ data }: TProps) => {
  return (
    <div className="space-y-4">
      {data?.events?.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400">
          برای این تاریخ نوبتی ثبت نشده است.
        </p>
      )}

      {data?.events?.map((event) => (
        <div
          key={event.id}
          className="flex items-start justify-between p-4 rounded-lg shadow-sm border-l-4"
          style={{ borderColor: event.color }}>
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-gray-800 dark:text-gray-100">
              {event.title}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              سرویس: {event.service} | درمانگر: {event.therapist}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              مشتری: {event.customer}
            </p>
          </div>
          <div className="text-right space-y-1">
            <p className="text-xs font-medium text-gray-700 dark:text-gray-200">
              {event.start.split(" ")[1]} - {event.end.split(" ")[1]}
            </p>
            <span
              className={`px-2 py-0.5 text-xs rounded-full font-medium ${
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
  );
};

export default AppointmentReservation;
