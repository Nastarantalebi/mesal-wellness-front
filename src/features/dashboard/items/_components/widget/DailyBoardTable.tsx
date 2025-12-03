import React from "react";
import type { TDailyBoard } from "../../_types/type";
import { CheckIcon } from "lucide-react";

type TProps = {
  data: TDailyBoard;
};

const DailyBoardTable: React.FC<TProps> = ({ data }) => {
  // لیست اتاق‌ها از resources
  const rooms = data.resources;

  return (
    <div className="overflow-auto border rounded-xl bg-white p-4">
      <table className="w-full border-collapse text-center text-sm">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th rowSpan={2} className="border p-2 w-20">
              ساعت
            </th>
            <th colSpan={rooms?.length} className="border p-2">
              اتاق
            </th>
            <th rowSpan={2} className="border p-2">
              ماساژور
            </th>
            <th rowSpan={2} className="border p-2">
              مشتری
            </th>
            <th rowSpan={2} className="border p-2">
              شماره تماس
            </th>
            <th rowSpan={2} className="border p-2">
              نوع ماساژ
            </th>
            <th rowSpan={2} className="border p-2">
              بیعانه
            </th>
            <th rowSpan={2} className="border p-2">
              وضعیت
            </th>
          </tr>
          <tr className="bg-gray-200 text-gray-700">
            {rooms?.map((room) => (
              <th key={room.id} className="border p-2">
                {room.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.slots?.map((slot, i) => {
            const slotRows = slot.rows;

            if (slotRows.length === 0) {
              // اگر ردیفی نیست، فقط ساعت را نمایش بده
              return (
                <tr key={i} className="bg-gray-100 font-bold">
                  <td className="border p-3 text-black">{slot.label}</td>
                  {rooms?.map((room) => (
                    <td key={room.id} className="border p-3"></td>
                  ))}
                  <td className="border p-3"></td>
                  <td className="border p-3"></td>
                  <td className="border p-3"></td>
                  <td className="border p-3"></td>
                  <td className="border p-3"></td>
                  <td className="border p-3"></td>
                </tr>
              );
            }

            return slotRows.map((r, idx) => (
              <tr key={idx}>
                {idx === 0 && (
                  <td
                    rowSpan={slotRows.length}
                    className="border p-2 text-black font-bold">
                    {slot.label}
                  </td>
                )}
                {rooms?.map((room) => (
                  <td key={room.id} className="border p-2">
                    {r.room.id === room.id ? (
                      <CheckIcon className="h-6 w-6 text-green-600 mx-auto" />
                    ) : (
                      ""
                    )}
                  </td>
                ))}
                <td className="border p-2">{r.therapist.name}</td>
                <td className="border p-2">{r.customer.name}</td>
                <td className="border p-2">{r.customer.phone}</td>
                <td className="border p-2">{r.service.title}</td>
                <td className="border p-2">{r.deposit}</td>
                <td className="border p-2">{r.status}</td>
              </tr>
            ));
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DailyBoardTable;
