"use client";

import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from "recharts";
import type { TPieChart } from "../../_types/type";

type Props = {
  data?: TPieChart[];
};

const PieCahrtWidget = ({ data }: Props) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="col-span-12 xl:col-span-6">
      {data.map((chart, index) => (
        <div
          key={index}
          className="col-span-12 md:col-span-6 lg:col-span-4 bg-white rounded-xl p-4 shadow">
          <h3 className="mb-4 font-semibold text-gray-700">{chart.title}</h3>

          <div className="w-full h-[250px]">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={chart.data.values.map((item) => ({
                    ...item,
                    fill: item.color,
                  }))}
                  dataKey="value"
                  nameKey="label"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                />

                <Tooltip
                  formatter={(value, _name, item) => {
                    if (!item || value == null) return null;

                    const payload = item.payload as {
                      label: string;
                      percent: number;
                    };

                    return [`${value} (${payload.percent}%)`, payload.label];
                  }}
                />

                <Legend
                  verticalAlign="middle"
                  align="right"
                  layout="vertical"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PieCahrtWidget;
