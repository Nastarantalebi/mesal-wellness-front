import Breadcrumb from "@/components/Breadcrumb";
import { useLocation } from "react-router-dom";
import * as LucideIcons from "lucide-react"; // برای ساخت آیکون داینامیک
import { flattenMenu, menuContainer } from "@/stores/menuMaper";
import { useAuthStore } from "@/features/auth/store/authStore";
import type { TMenu } from "../items/_types/type";

const isId = (str: string) => /^[0-9]+$/.test(str);

export default function DynamicBreadcrumb() {
  const { pathname } = useLocation();
  const sidebar = useAuthStore((state) => state.sidebar?.menus);
  const menus = menuContainer(sidebar);
  // تبدیل منو به map قابل جستجو
  const menuMap = menus && flattenMenu(menus as Array<TMenu | string>);
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
    if (segment.toLowerCase() === "create") {
      return { label: "ایجاد" };
    }
    if (segment.toLowerCase() === "edit") {
      return { label: "ویرایش" };
    }
    if (segment.toLowerCase() === "profile") {
      return { label: "پروفایل" };
    }
    const path = "/" + segment;

    // اگر در منو باشد
    if (menuMap && menuMap[path]) {
      return {
        label: menuMap[path].label,
      };
    }

    // fallback → segment → فارسی‌سازی معمولی
    return {
      label: segment.replace(/-/g, " "),
    };
  };

  return (
    <Breadcrumb className=" p-3">
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
            active={isLast}>
            <span className="flex items-center gap-1">{info.label}</span>
          </Breadcrumb.Link>
        );
      })}
    </Breadcrumb>
  );
}
