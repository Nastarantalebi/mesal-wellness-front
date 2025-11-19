import React from "react";
import { Menu, Button } from "@headlessui/react";
import Lucide from "@/components/Lucide";

interface CountryData {
  name: string;
  image: string;
  population: string;
}

interface DemographicsSummaryProps {
  totalCustomers: string;
  totalChange: number; // درصد تغییر منفی یا مثبت
  countries: CountryData[];
}

const DemographicsSummary: React.FC<DemographicsSummaryProps> = ({
  totalCustomers,
  totalChange,
  countries,
}) => {
  return (
    <div className="col-span-12 md:col-span-6 2xl:col-span-3">
      <div>
        <div className="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row">
          <div className="text-base font-medium 2xl:group-[.mode--light]:text-white">
            خلاصه جمعیت‌شناسی
          </div>
        </div>

        <div className="p-5 mt-3.5 box box--stacked relative">
          {/* منو */}
          <Menu >
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
                <Lucide icon="Trash" className="w-4 h-4 me-2" />
                حذف
              </Menu.Item>
            </Menu.Items>
          </Menu>

          {/* کل مشتریان */}
          <div className="pb-5 mb-6 border-b border-dashed border-slate-300/70">
            <div className="text-base text-slate-500">کل مشتریان</div>
            <div className="flex items-center mt-1">
              <div className="text-xl font-medium">{totalCustomers}</div>
              <div
                className={`flex items-center ms-2 -me-1 text-xs ${
                  totalChange >= 0 ? "text-success" : "text-danger"
                }`}
              >
                {Math.abs(totalChange)}%
                <Lucide
                  icon={totalChange >= 0 ? "ChevronUp" : "ChevronDown"}
                  className="w-4 h-4 ms-px"
                />
              </div>
            </div>
          </div>

          {/* لیست کشورها */}
          <div>
            {countries.slice(0, 7).map((country, idx) => (
              <div
                className="flex items-center mb-[18px] [&:nth-of-type(n+5)]:hidden [&:nth-of-type(n+5)]:2xl:flex"
                key={idx}
              >
                <div className="w-[22px] h-[22px] overflow-hidden border-2 rounded-full image-fit border-slate-200/70 box">
                  <img alt={country.name} src={country.image} />
                </div>
                <div className="pe-8 ms-2.5 truncate">{country.name}</div>
                <div className="ms-auto">{country.population}</div>
              </div>
            ))}
          </div>

          {/* دکمه مشاهده گزارش کامل */}
          <Button className="w-full mt-1.5 border-dashed border-slate-300 hover:bg-slate-50 flex items-center justify-center">
            <Lucide icon="ExternalLink" className="stroke-[1.3] w-4 h-4 me-2" />
            مشاهده گزارش کامل
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DemographicsSummary;
