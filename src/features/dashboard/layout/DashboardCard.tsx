import React from "react";
import clsx from "clsx";
import Lucide from "@/components/Lucide";
import { FormSelect } from "@/components/Form";

interface StatItem {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "success" | "danger" | "neutral";
  icon: string;
  iconColor?: "primary" | "success" | "neutral";
}

interface DashboardCardProps {
  title: string;
  stats: StatItem[][];
  generalReportFilter: string;
  setGeneralReportFilter: (value: string) => void;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  stats,
  generalReportFilter,
  setGeneralReportFilter,
}) => {
  return (
    <div>
      <div className="flex items-center h-10">
        <div className="text-base font-medium 2xl:group-[.mode--light]:text-white">
          {title}
        </div>
      </div>

      <div className="p-5 mt-3.5 box box--stacked">
        <div className="flex flex-col lg:items-center lg:flex-row gap-y-5">
          <div className="flex flex-col sm:items-center sm:flex-row gap-x-3 gap-y-2">
            <div className="relative">
              <Lucide
                icon="CalendarCheck2"
                className="absolute inset-y-0 start-0 z-10 w-4 h-4 my-auto ms-3 stroke-[1.3]"
              />
              <FormSelect
                className="sm:w-44 ps-9"
                value={generalReportFilter}
                onChange={(e) => setGeneralReportFilter(e.target.value)}>
                <option value="custom-date">تاریخ سفارشی</option>
                <option value="daily">روزانه</option>
                <option value="weekly">هفتگی</option>
                <option value="monthly">ماهانه</option>
                <option value="yearly">سالیانه</option>
              </FormSelect>
            </div>

            <div className="relative">
              <Lucide
                icon="Calendar"
                className="absolute inset-y-0 start-0 z-10 w-4 h-4 my-auto ms-3 stroke-[1.3]"
              />
            </div>
          </div>

          <div className="flex items-center lg:ms-auto gap-3.5">
            <a href="" className="flex items-center text-slate-500">
              <Lucide icon="Printer" className="w-3.5 h-3.5 stroke-[1.7]" />
              <div className="ms-1.5 whitespace-nowrap underline decoration-dotted decoration-slate-300 underline-offset-[3px]">
                صدور به PDF
              </div>
            </a>
            <a href="" className="flex items-center text-primary">
              <Lucide
                icon="ExternalLink"
                className="w-3.5 h-3.5 stroke-[1.7]"
              />
              <div className="ms-1.5 whitespace-nowrap underline decoration-dotted decoration-primary/30 underline-offset-[3px]">
                نمایش گزارش کامل
              </div>
            </a>
          </div>
        </div>

        <div className="py-5 mt-5 border border-dashed rounded-md border-slate-300/70">
          {stats.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={`flex flex-col md:flex-row ${
                rowIndex > 0 ? "mt-5" : ""
              }`}>
              {row.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-center flex-1 py-3 border-dashed md:border-e border-slate-300/70 last:border-0">
                  <div
                    className={clsx(
                      "group flex items-center justify-center w-10 h-10 border rounded-full me-5",
                      item.iconColor === "primary" &&
                        "[&.group]:border-primary/10 [&.group]:bg-primary/10",
                      item.iconColor === "success" &&
                        "[&.group]:border-success/10 [&.group]:bg-success/10"
                    )}>
                    <Lucide
                      icon={"AArrowDown"}
                      className={clsx(
                        "w-5 h-5",
                        item.iconColor === "primary" &&
                          "group-[.primary]:text-primary group-[.primary]:fill-primary/10",
                        item.iconColor === "success" &&
                          "group-[.success]:text-success group-[.success]:fill-success/10"
                      )}
                    />
                  </div>

                  <div className="flex flex-col flex-start">
                    <div className="text-slate-500">{item.title}</div>
                    <div className="flex items-center mt-1.5">
                      <div className="text-base font-medium">{item.value}</div>
                      {item.change && (
                        <div
                          className={clsx(
                            "flex items-center ms-2 -me-1 text-xs",
                            item.changeType === "success"
                              ? "text-success"
                              : item.changeType === "danger"
                              ? "text-danger"
                              : "text-slate-500"
                          )}>
                          {item.change}
                          {item.changeType === "success" && (
                            <Lucide
                              icon="ChevronUp"
                              className="w-4 h-4 ms-px"
                            />
                          )}
                          {item.changeType === "danger" && (
                            <Lucide
                              icon="ChevronDown"
                              className="w-4 h-4 ms-px"
                            />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
