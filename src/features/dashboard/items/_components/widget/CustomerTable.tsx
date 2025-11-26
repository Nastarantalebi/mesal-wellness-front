import { useEffect, useState } from "react";
import Table from "@/components/Table";
import type { TDashboard } from "../../_types/type";

interface TProps {
  listData?: TDashboard["widgets"]["lists"][string];
}

const CustomerTable: React.FC<TProps> = ({ listData }) => {
  const [orders, setOrders] = useState(listData?.data || []);

  useEffect(() => {
    setOrders(listData?.data || []);
  }, [listData]);

  if (!orders.length) {
    return;
  }

  return (
    <div className="col-span-12 xl:col-span-6 my-3">
      <div className="text-lg font-medium mb-3">
        {"customer_name" in orders[0] ? "رزروهای اخیر" : "مشتریان اخیر"}
      </div>
      <div className="overflow-auto">
        <Table className="border-spacing-y-[10px] border-separate w-full">
          <Table.Tbody>
            {orders.map((order) => (
              <Table.Tr key={order.id}>
                <Table.Td className="box shadow-[5px_3px_5px_#00000005] dark:bg-darkmode-600">
                  <div className="flex flex-col">
                    <div className="font-medium">
                      {"customer_name" in order ? (
                        order.customer_name
                      ) : (
                        <span>
                          {order.first_name} {order.last_name}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-500">{order.phone}</div>
                  </div>
                </Table.Td>
                <Table.Td className="box shadow-[5px_3px_5px_#00000005] dark:bg-darkmode-600">
                  <div className="text-xs text-slate-500">کد ملی</div>
                  <div>{order.national_code || "-"}</div>
                </Table.Td>

                {"customer_name" in order ? (
                  <>
                    <Table.Td className="box shadow-[5px_3px_5px_#00000005] dark:bg-darkmode-600">
                      <div className="text-xs text-slate-500">تاریخ رزرو</div>
                      <div className="whitespace-nowrap">
                        {order.start_at.split(" ")[0]}
                      </div>
                    </Table.Td>
                    <Table.Td className="box shadow-[5px_3px_5px_#00000005] dark:bg-darkmode-600">
                      <div className="text-xs text-slate-500">ساعت</div>
                      <div className="whitespace-nowrap">
                        {order.end_at.split(" ")[1]} -{" "}
                        {order.start_at.split(" ")[1]}
                      </div>
                    </Table.Td>
                    <Table.Td className="box shadow-[5px_3px_5px_#00000005] dark:bg-darkmode-600">
                      <div className="text-xs text-slate-500">وضعیت</div>
                      <div>{order.status}</div>
                    </Table.Td>
                  </>
                ) : (
                  <>
                    {/* <Table.Td className="box shadow-[5px_3px_5px_#00000005] dark:bg-darkmode-600">
                      <div className="text-xs text-slate-500">جنسیت</div>
                      <div>{order.gender}</div>
                    </Table.Td> */}
                    <Table.Td className="box shadow-[5px_3px_5px_#00000005] dark:bg-darkmode-600">
                      <div className="text-xs text-slate-500">نوع عضویت</div>
                      <div>{order.membership_type}</div>
                    </Table.Td>
                    <Table.Td className="box shadow-[5px_3px_5px_#00000005] dark:bg-darkmode-600">
                      <div className="text-xs text-slate-500">تاریخ عضویت</div>
                      <div>{order.joined_at || "-"}</div>
                    </Table.Td>
                  </>
                )}
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </div>
    </div>
  );
};

export default CustomerTable;
