import React from "react";
import type { TDailyBoard } from "../../_types/type";

type TProps = {
  data: TDailyBoard;
};
const DailyBoardTable: React.FC<TProps> = ({ data }) => {
  return (
    <div className="overflow-auto border rounded-xl bg-white p-4">
      {/* Table */}
      <table className="w-full border-collapse text-center text-sm">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="border p-2 w-20">ساعت</th>
            <th className="border p-2 w-10">اتاق 1</th>
            <th className="border p-2 w-10">اتاق 2</th>
            <th className="border p-2 w-10">اتاق 3</th>
            <th className="border p-2 w-10">اتاق 4</th>
            <th className="border p-2">ماساژور</th>
            <th className="border p-2">مشتری</th>
            <th className="border p-2">شماره تماس</th>
            <th className="border p-2">نوع ماساژ</th>
            <th className="border p-2">بیعانه</th>
            <th className="border p-2">ثبت نهایی</th>
            <th className="border p-2">همکار</th>
          </tr>
        </thead>

        <tbody>
          {data.slots.map((slot, i) => (
            <React.Fragment key={i}>
              <tr className="bg-gray-100 font-bold">
                <td className="border p-3 text-black">
                  {slot.label.replace("تا", "تا")}
                </td>

                {/* اتاق‌ها (فعلاً خالی چون rows خالیه) */}
                {[1, 2, 3, 4].map((r) => (
                  <td key={r} className="border p-3"></td>
                ))}

                {/* ستون‌های اطلاعات (خالی چون rows خالیه) */}
                <td className="border p-3"></td>
                <td className="border p-3"></td>
                <td className="border p-3"></td>
                <td className="border p-3"></td>
                <td className="border p-3"></td>
                <td className="border p-3"></td>
                <td className="border p-3"></td>
              </tr>

              {/* اگر ردیف داشت، نمایش بده */}
              {slot.rows.map((r, idx) => (
                <tr key={idx}>
                  <td className="border p-2"></td>

                  {/* اتاق‌ها */}
                  {[1, 2, 3, 4].map((room) => (
                    <td className="border p-2" key={room}>
                      {r.room.id === room ? r.room.name : ""}
                    </td>
                  ))}

                  <td className="border p-2">{r.therapist.name}</td>
                  <td className="border p-2">{r.customer.name}</td>
                  <td className="border p-2">{r.customer.phone}</td>
                  <td className="border p-2">{r.service.title}</td>
                  <td className="border p-2">{r.deposit}</td>
                  <td className="border p-2">{r.status}</td>
                  <td className="border p-2"></td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DailyBoardTable;
