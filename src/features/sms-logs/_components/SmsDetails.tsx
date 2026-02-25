import type { TData } from "../_types/types";

const SmsDetails = ({ data }: { data: TData }) => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full bg-white shadow-xl rounded-2xl p-6 space-y-6 border border-gray-200">
        <div className="flex justify-between items-center border-b pb-4">
          <h2 className="text-lg font-bold text-gray-800">وضعیت پیامک:</h2>
          <span className="text-sm px-3 py-1 rounded-full bg-yellow-100 text-yellow-700">
            {data.delivery_status_label}
          </span>
        </div>

        <div className="w-full flex justify-center bg-gray-100 py-10">
          <div className="w-full max-w-sm">
            <div className="bg-blue-500 text-white rounded-3xl rounded-br-md px-4 py-3 shadow-md whitespace-pre-line leading-7 text-sm">
              <div className="text-xs text-gray-300 flex items-center justify-between gap-1">
                <span>{data.sms_parts} پیام</span>
                <span>{data.sms_length} کاراکتر</span>
              </div>
              <span>{data.message}</span>
            </div>
            <div className="mt-2 text-xs text-gray-500 space-y-1 px-2 flex items-center justify-between">
              {data.status_updated_at && (
                <span>
                  بروزرسانی:
                  {data.status_updated_at}
                </span>
              )}
              <span>نوع پیام: {data.type}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmsDetails;
