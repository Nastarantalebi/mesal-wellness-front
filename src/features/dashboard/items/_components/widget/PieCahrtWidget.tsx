"use client";

import { useState } from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import type { TPieChart } from "../../_types/type";

type Props = {
  data: TPieChart;
};

const PieChartWidget = ({ data }: Props) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  if (!data) return null;
  return (
    <div className="col-span-12 xl:col-span-6 grid grid-cols-12 gap-4">
      <div className="col-span-12 bg-white rounded-xl shadow">
        <h3 className="px-4 py-2 font-semibold text-gray-700">{data.title}</h3>

        <div className="w-full h-[320px]">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data.data.values}
                dataKey="value"
                nameKey="label"
                cx="50%"
                cy="50%"
                outerRadius="95%"
                stroke="none"
                onMouseEnter={(_data, index) => {
                  setActiveIndex(index);
                }}
                onMouseLeave={() => setActiveIndex(null)}
                onClick={(_data, index) => {
                  setSelectedIndex(selectedIndex === index ? null : index);
                }}
                label={(props: any) => {
                  const {
                    cx,
                    cy,
                    midAngle,
                    innerRadius,
                    outerRadius,
                    payload,
                  } = props;
                  const RADIAN = Math.PI / 180;
                  const radius =
                    innerRadius + (outerRadius - innerRadius) * 0.5;
                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
                  const y = cy + radius * Math.sin(-midAngle * RADIAN);
                  return (
                    <text
                      x={x}
                      y={y}
                      textAnchor="middle"
                      dominantBaseline="central"
                      className="text-xs font-semibold fill-white select-none pointer-events-none">
                      {payload.percent}%
                    </text>
                  );
                }}
                labelLine={false}
                animationDuration={400}>
                {data.data.values.map((item, index) => {
                  const isActive =
                    index === activeIndex || index === selectedIndex;

                  return (
                    <Cell
                      key={index}
                      fill={item.color}
                      opacity={selectedIndex !== null && !isActive ? 0.4 : 1}
                      style={{
                        transform: isActive ? "scale(1.07)" : "scale(1)",
                        transformOrigin: "center",
                        transition: "all 0.4s ease",
                        cursor: "pointer",
                      }}
                    />
                  );
                })}
              </Pie>

              <Tooltip
                formatter={(value, _name, item) => {
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
                content={({ payload }: any) => (
                  <ul className="flex flex-col gap-3 text-sm pr-4">
                    {payload.map((entry: any, index: number) => {
                      const isActive =
                        index === activeIndex || index === selectedIndex;
                      return (
                        <li
                          key={index}
                          className={`flex items-center gap-2 cursor-pointer transition-all ${
                            isActive
                              ? "font-semibold text-gray-800"
                              : "text-gray-500"
                          }`}
                          onMouseEnter={() => setActiveIndex(index)}
                          onMouseLeave={() => setActiveIndex(null)}
                          onClick={() =>
                            setSelectedIndex(
                              selectedIndex === index ? null : index,
                            )
                          }>
                          <span
                            className="w-3 h-3 rounded-full"
                            style={{
                              backgroundColor: entry.color,
                              opacity:
                                selectedIndex !== null && !isActive ? 0.4 : 1,
                            }}
                          />
                          <span>{`${entry.value} (${entry.payload.percent}%)`}</span>
                        </li>
                      );
                    })}
                  </ul>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default PieChartWidget;
