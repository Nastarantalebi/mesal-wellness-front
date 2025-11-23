import React from "react";
import Lucide from "@/components/Lucide";
import clsx from "clsx";

interface WalletItem {
  title: string;
  value: string | number;
  symbol?: string;
  icon?: React.ReactNode;
  change?: string;
  changeType?: "success" | "danger" | "neutral";
  total?: string;
}

interface TProps {
  titleText: string;
  items: WalletItem[];
}

const StatisticsCard: React.FC<TProps> = ({ titleText, items }) => {
  return (
    <div className="col-span-12">
      {/* عنوان کارت */}
      <div className="flex items-center h-12 border-b border-slate-200 mb-4">
        <div className="text-lg font-semibold text-slate-700">{titleText}</div>
      </div>

      {/* گرید آیتم‌ها */}
      <div className="grid grid-cols-12 gap-5">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="col-span-12 sm:col-span-6 xl:col-span-3 p-5 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 relative"
          >
            {/* آیکون و عنوان */}
            <div className="flex flex-col items-center text-center">
              <div className="w-[60px] h-[60px] mb-3 p-2 bg-gradient-to-br from-primary/30 to-primary/10 rounded-full flex items-center justify-center shadow-inner">
                {item.icon ?? <Lucide icon="ChartNoAxesCombined" className="w-6 h-6 text-primary" />}
              </div>
              <div className="text-lg font-semibold text-slate-800">{item.title}</div>
              {item.symbol && <div className="text-sm text-slate-500">{item.symbol}</div>}
            </div>

            {/* مقدار و تغییر */}
            <div className="mt-6 p-4 rounded-lg bg-slate-50 border border-slate-200 flex flex-col items-center">
              <div className="flex items-center text-xl font-bold text-slate-800">
                {item.value}
                {item.change && (
                  <div
                    className={clsx(
                      "flex items-center ms-2 font-medium text-sm",
                      item.changeType === "success"
                        ? "text-green-500"
                        : item.changeType === "danger"
                        ? "text-red-500"
                        : "text-slate-500"
                    )}
                  >
                    {item.change}
                    {item.changeType === "success" && (
                      <Lucide icon="ChevronUp" className="w-4 h-4 ms-1 stroke-[1.5]" />
                    )}
                    {item.changeType === "danger" && (
                      <Lucide icon="ChevronDown" className="w-4 h-4 ms-1 stroke-[1.5]" />
                    )}
                  </div>
                )}
              </div>
              {item.total && <div className="mt-1 text-sm text-slate-500">{item.total}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatisticsCard;
