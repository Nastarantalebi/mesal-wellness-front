import { useEffect, useState } from "react";
import { FormSelect } from "@/components/Form";
import { Menu } from "@/components/Headless";
import Lucide from "@/components/Lucide";
import Tippy from "@/components/Tippy";
import axios from "axios";
import Table from "@/components/Table";

const OrdersTable = ({ apiEndpoint }: { apiEndpoint?: any }) => {
  const [orders, setOrders] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get(apiEndpoint);
        setOrders(response.data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [apiEndpoint]);

  if (loading) {
    return <div>در حال بارگذاری سفارش‌ها...</div>;
  }

  return (
    <div className="col-span-12">
      <div className="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row">
        <div className="text-base font-medium">سفارش‌های اخیر</div>
        <div className="flex flex-col sm:flex-row gap-x-3 gap-y-2 md:ms-auto">
          <div className="relative">
            <Lucide
              icon="CalendarCheck2"
              className="absolute inset-y-0 start-0 z-10 w-4 h-4 my-auto ms-3 stroke-[1.3]"
            />
            <FormSelect className="sm:w-44 rounded-[0.5rem] ps-9">
              <option value="custom-date">تاریخ سفارشی</option>
              <option value="daily">روزانه</option>
              <option value="weekly">هفتگی</option>
              <option value="monthly">ماهانه</option>
              <option value="yearly">سالیانه</option>
            </FormSelect>
          </div>
        </div>
      </div>

      <div className="mt-2 overflow-auto lg:overflow-visible">
        <Table className="border-spacing-y-[10px] border-separate">
          <Table.Tbody>
            {orders.map((order: any, idx: any) => (
              <Table.Tr key={idx}>
                <Table.Td className="box shadow-[5px_3px_5px_#00000005] first:border-s last:border-e rounded-s-none rounded-e-none border-x-0 dark:bg-darkmode-600">
                  <div className="flex items-center">
                    <Lucide
                      icon={order.icon || "Activity"}
                      className="w-6 h-6 text-theme-1 fill-primary/10 stroke-[0.8]"
                    />
                    <div className="ms-3.5">
                      <a
                        href={order.link || "#"}
                        className="font-medium whitespace-nowrap">
                        {order.title}
                      </a>
                      <div className="mt-1 text-xs text-slate-500 whitespace-nowrap">
                        {order.subtitle}
                      </div>
                    </div>
                  </div>
                </Table.Td>

                <Table.Td className="w-60 box shadow-[5px_3px_5px_#00000005] dark:bg-darkmode-600">
                  <div className="mb-1 text-xs text-slate-500 whitespace-nowrap">
                    نام مشتری
                  </div>
                  <a
                    href={order.customerLink || "#"}
                    className="flex items-center text-primary">
                    <Lucide
                      icon="ExternalLink"
                      className="w-3.5 h-3.5 stroke-[1.7]"
                    />
                    <div className="ms-1.5 whitespace-nowrap">
                      {order.customerName}
                    </div>
                  </a>
                </Table.Td>

                <Table.Td className="w-44 box shadow-[5px_3px_5px_#00000005] dark:bg-darkmode-600">
                  <div className="mb-1.5 text-xs text-slate-500 whitespace-nowrap">
                    موارد خریداری شده
                  </div>
                  <div className="flex mb-1">
                    {order.items?.map((item: any, i: any) => (
                      <div
                        key={i}
                        className={`w-5 h-5 ${
                          i > 0 ? "-ms-1.5" : ""
                        } image-fit zoom-in`}>
                        <Tippy
                          as="img"
                          alt={item.name}
                          className="rounded-full shadow-[0px_0px_0px_2px_#fff,_1px_1px_5px_rgba(0,0,0,0.32)] dark:shadow-[0px_0px_0px_2px_#3f4865,_1px_1px_5px_rgba(0,0,0,0.32)]"
                          src={item.image}
                          content={item.name}
                        />
                      </div>
                    ))}
                  </div>
                </Table.Td>

                <Table.Td className="w-44 box shadow-[5px_3px_5px_#00000005] dark:bg-darkmode-600">
                  <div className="mb-1 text-xs text-slate-500 whitespace-nowrap">
                    وضعیت
                  </div>
                  <div className="flex items-center">
                    <Lucide
                      icon={order.statusIcon || "Apple"}
                      className="w-3.5 h-3.5 stroke-[1.7]"
                    />
                    <div className="ms-1.5 whitespace-nowrap">
                      {order.status}
                    </div>
                  </div>
                </Table.Td>

                <Table.Td className="w-44 box shadow-[5px_3px_5px_#00000005] dark:bg-darkmode-600">
                  <div className="mb-1 text-xs text-slate-500 whitespace-nowrap">
                    تاریخ
                  </div>
                  <div className="whitespace-nowrap">{order.date}</div>
                </Table.Td>

                <Table.Td className="w-20 relative py-0 box shadow-[5px_3px_5px_#00000005] dark:bg-darkmode-600">
                  <div className="flex items-center justify-center">
                    <Menu className="h-5">
                      <Menu.Button className="w-5 h-5 text-slate-500">
                        <Lucide
                          icon="MoveRight"
                          className="w-5 h-5 stroke-slate-400/70 fill-slate-400/70"
                        />
                      </Menu.Button>
                      <Menu.Items className="w-40">
                        <Menu.Item>مشاهده جزئیات</Menu.Item>
                        <Menu.Item>ویرایش سفارش</Menu.Item>
                        <Menu.Item>چاپ فاکتور</Menu.Item>
                      </Menu.Items>
                    </Menu>
                  </div>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </div>
    </div>
  );
};

export default OrdersTable;
