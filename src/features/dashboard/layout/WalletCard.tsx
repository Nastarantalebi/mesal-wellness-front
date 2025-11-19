import React from "react";
import { Menu } from "@/components/Headless";
import Lucide from "@/components/Lucide";
import clsx from "clsx";

interface WalletItem {
  name: string;
  symbol: string;
  icon: React.ReactNode; // svg یا کامپوننت
  value: string;
  change?: string;
  changeType?: "success" | "danger" | "neutral";
  total?: string;
}

interface WalletCardProps {
  title: string;
  items: WalletItem[];
}

const WalletCard: React.FC<WalletCardProps> = ({ title, items }) => {
  return (
    <div className="col-span-12">
      <div className="flex items-center h-10">
        <div className="text-base font-medium group-[.mode--light]:text-white">
          {title}
        </div>
      </div>
      <div className="grid grid-cols-12 gap-5 mt-3.5">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col col-span-12 p-5 sm:col-span-6 xl:col-span-3 box box--stacked relative"
          >
            <Menu className="absolute top-0 end-0 mt-5 me-5">
              <Menu.Button className="w-5 h-5 text-slate-500">
                <Lucide
                  icon="MoveVertical"
                  className="w-6 h-6 stroke-slate-400/70 fill-slate-400/70"
                />
              </Menu.Button>
              <Menu.Items className="w-40">
                <Menu.Item>
                  <Lucide icon="Copy" className="w-4 h-4 me-2" /> کپی لینک
                </Menu.Item>
                <Menu.Item>
                  <Lucide icon="Trash" className="w-4 h-4 me-2" /> حذف
                </Menu.Item>
              </Menu.Items>
            </Menu>

            <div className="flex items-center">
              <div className="w-[54px] h-[54px] p-0.5 border border-primary/80 rounded-full bg-slate-50 cursor-pointer">
                <div className="w-full h-full p-1 bg-white border rounded-full border-slate-300/70">
                  {item.icon}
                </div>
              </div>
              <div className="ms-4">
                <div className="-mt-0.5 text-lg font-medium text-primary">
                  {item.name}
                </div>
                <div className="mt-0.5 text-slate-500">{item.symbol}</div>
              </div>
            </div>

            <div className="px-4 py-2.5 mt-16 border border-dashed rounded-[0.6rem] border-slate-300/80 box shadow-sm">
              <div className="flex items-center">
                <div className="text-xl font-medium leading-tight">{item.value}</div>
                {item.change && (
                  <div
                    className={clsx(
                      "flex items-center ms-2.5 font-medium text-xs",
                      item.changeType === "success" ? "text-success" : item.changeType === "danger" ? "text-danger" : "text-slate-500"
                    )}
                  >
                    {item.change}
                    {item.changeType === "success" && <Lucide icon="ChevronUp" className="w-4 h-4 ms-px stroke-[1.5]" />}
                    {item.changeType === "danger" && <Lucide icon="ChevronDown" className="w-4 h-4 ms-px stroke-[1.5]" />}
                  </div>
                )}
              </div>
              {item.total && (
                <div className="mt-1 text-base text-slate-500">{item.total}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WalletCard;
