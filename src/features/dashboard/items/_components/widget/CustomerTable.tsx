import { useEffect, useState } from "react";
import Table from "@/components/Table";
import type { WidgetItem, WidgetListData } from "../../_types/type";

interface TProps {
  listData?: WidgetItem;
}

const CustomerTable: React.FC<TProps> = ({ listData }) => {
  const [data, setData] = useState<WidgetListData | null>(
    listData?.data || null
  );

  useEffect(() => {
    setData(listData?.data || null);
  }, [listData]);

  if (!data) return null;

  return (
    <div className="col-span-12 xl:col-span-6 my-3">
      <div className="text-lg font-medium mb-3">{listData?.title}</div>
      <div className="overflow-auto">
        <Table className="border-spacing-y-[10px] border-separate w-full">
          <Table.Tbody>
            <Table.Tr>
              {data.headers.map((h) => (
                <Table.Th key={h.key}>{h.label}</Table.Th>
              ))}
            </Table.Tr>
            {data.rows.map((row) => (
              <Table.Tr key={row.id}>
                {data.headers.map((h) => (
                  <Table.Td
                    key={h.key}
                    className="box shadow-[5px_3px_5px_#00000005]">
                    {String((row as any)[h.key] ?? "-")}
                  </Table.Td>
                ))}
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </div>
    </div>
  );
};
export default CustomerTable;
