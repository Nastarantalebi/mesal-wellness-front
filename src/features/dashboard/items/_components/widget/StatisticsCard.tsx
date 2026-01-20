import React from "react";
import Lucide from "@/components/Lucide";
import type { WidgetNumberItem } from "../../_types/type";

interface TProps {
  titleText: string;
  items?: WidgetNumberItem[];
}

const StatisticsCard: React.FC<TProps> = ({ titleText, items }) => {
  if (!items) return;
  return (
    <div className="col-span-12">
      {/* عنوان کارت */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-700">{titleText}</h3>
      </div>

      {/* گرید آیتم‌ها */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200">
            {/* آیکون */}
            <div className="w-12 h-12 mb-2 flex items-center justify-center rounded-full bg-primary/20 text-primary">
              <Lucide
                icon={item.icon ? item.icon : "ChartNoAxesCombined"}
                className="w-6 h-6"
              />
            </div>

            {/* عنوان */}
            <div className="text-sm text-slate-500">{item.title}</div>

            {/* مقدار */}
            <div className="mt-1 text-lg font-semibold text-slate-800">
              {item.data.count}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatisticsCard;
