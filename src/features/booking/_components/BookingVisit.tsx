import type { TDataById } from "../_types/type";

type TProps = { isFetchingById: boolean; dataById?: TDataById };

export default function BookingVisit({ isFetchingById, dataById }: TProps) {
  if (isFetchingById) return <div>در حال بارگذاری...</div>;
  if (!dataById) return <div>داده‌ای یافت نشد</div>;

  const booking = dataById.booking;

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-6xl mx-auto">
      {/* --- اطلاعات مراجعه کننده --- */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
        <h2 className="text-xl font-bold mb-4">اطلاعات مراجعه کننده</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <p>
            <span className="font-medium">نام:</span> {booking.customer_name}
          </p>
          <p>
            <span className="font-medium">وضعیت مراجعه کننده:</span>{" "}
            {booking.status_label}
          </p>
          {booking.notes && (
            <p>
              <span className="font-medium">یادداشت:</span> {booking.notes}
            </p>
          )}
        </div>
      </div>

      {/* --- لیست نوبت‌های ویزیت --- */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
        <h3 className="text-lg font-bold mb-4">نوبت‌های این ویزیت</h3>

        <div className="space-y-4">
          {booking.items.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-4 rounded-lg bg-gray-50 shadow-sm">
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium">خدمت:</span>{" "}
                  {item.service_label ?? ""}
                </p>
                <p>
                  <span className="font-medium">درمانگر:</span>{" "}
                  {item.therapist_label ??""}
                </p>
                <p>
                  <span className="font-medium">مکان:</span>{" "}
                  {item.resource_label ?? ""}
                </p>
              </div>

              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium">زمان شروع:</span>{" "}
                  {item.start_at}
                </p>
                <p>
                  <span className="font-medium">زمان پایان:</span> {item.end_at}
                </p>
                <p>
                  <span className="font-medium">وضعیت:</span>{" "}
                  {item.status_label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
