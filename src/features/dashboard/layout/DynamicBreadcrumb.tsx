import Breadcrumb from "@/components/Breadcrumb";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import * as LucideIcons from "lucide-react"; // برای ساخت آیکون داینامیک
import { flattenMenu, selectSideMenu } from "@/stores/sideMenuSlice";

const isId = (str: string) => /^[0-9]+$/.test(str);

export default function DynamicBreadcrumb() {
  const { pathname } = useLocation();
  const menu = useSelector(selectSideMenu);

  // تبدیل منو به map قابل جستجو
  const menuMap = flattenMenu(menu);

  // /service-category/12/edit → ["service-category", "12", "edit"]
  const parts = pathname.split("/").filter(Boolean);

  const buildPath = (i: number) => "/" + parts.slice(0, i + 1).join("/");

  const translate = (segment: string) => {
    // اگر ID بود → حذف شده و معنی‌دار بشه
    if (isId(segment)) {
      return {
        label: "جزئیات",
        icon: "FileText",
      };
    }

    const path = "/" + segment;

    // اگر در منو باشد
    if (menuMap[path]) {
      return {
        label: menuMap[path].title,
      };
    }

    // fallback → segment → فارسی‌سازی معمولی
    return {
      label: segment.replace(/-/g, " "),
    };
  };

  return (
    <Breadcrumb>
      {/* داشبورد همیشه هست */}
      <Breadcrumb.Link to="/" index={0}>
        <span className="flex items-center gap-1">
          <LucideIcons.LayoutDashboard className="w-4 h-4" />
          داشبورد
        </span>
      </Breadcrumb.Link>

      {parts.map((part, i) => {
        const info = translate(part);
        const isLast = i + 1 === parts.length;

        return (
          <Breadcrumb.Link
            key={i}
            index={i + 1}
            to={isLast ? undefined : buildPath(i)}
            active={isLast}
          >
            <span className="flex items-center gap-1">
              {info.label}
            </span>
          </Breadcrumb.Link>
        );
      })}
    </Breadcrumb>
  );
}
