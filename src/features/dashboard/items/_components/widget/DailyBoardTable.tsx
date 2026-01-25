import React from "react";
import type { TDailyBoard } from "../../_types/type";
import { InboxIcon } from "lucide-react";

type TProps = {
  data: TDailyBoard;
};

const DailyBoardTable: React.FC<TProps> = ({ data }) => {
  if (!data) return;
  const columns = data.data.columns;
  const rows = data.data.rows;
  return (
    <div className="overflow-auto border rounded-xl bg-white p-4">
      <table className="w-full border-collapse text-center text-sm">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            {columns.map((col, index) => (
              <th className="border p-2 w-20" key={index}>
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows.map((row, index) => (
              <tr key={index} className="bg-gray-100 font-bold">
                {row.map((item, index) => (
                  <td
                    className="border p-3 text-black"
                    key={index}
                    dangerouslySetInnerHTML={{ __html: item }}
                  />
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="p-6">
                <div className="flex items-center justify-center gap-3 text-gray-500">
                  <InboxIcon className="h-6 w-6" />
                  <span className="text-sm font-medium">
                    داده‌ای برای نمایش وجود ندارد
                  </span>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DailyBoardTable;
