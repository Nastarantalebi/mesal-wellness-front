import type { LucideIcon } from "lucide-react";
import React from "react";

interface QuickLink {
  title: string;
  icon: LucideIcon;
  colorClass: string; // مثال: "primary", "info", "success"
  href: string;
}

interface QuickLinksProps {
  title?: string;
  links: QuickLink[];
}

const QuickLinks: React.FC<QuickLinksProps> = ({
  title = "لینک‌های سریع",
  links,
}) => {
  return (
    <div>
      <div className="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row">
        <div className="text-base font-medium 2xl:group-[.mode--light]:text-white">
          {title}
        </div>
      </div>
      <div className="mt-3.5 box box--stacked">
        <div className="grid grid-cols-2 px-5 py-10 border-b sm:grid-cols-3 md:grid-cols-5 gap-y-5 lg:grid-cols-7">
          {links.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className="flex flex-col items-center">
              <div
                className={`flex items-center justify-center w-12 h-12 border rounded-full border-${link.colorClass}/10 bg-${link.colorClass}/10`}>
                <link.icon
                  className={`w-6 h-6 text-${link.colorClass} fill-${link.colorClass}/10`}
                />
              </div>
              <div className="mt-3 text-slate-500">{link.title}</div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickLinks;
