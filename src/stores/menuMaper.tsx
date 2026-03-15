import type { TBackendMenu } from "@/features/dashboard/_types/types";
import type { TMenu } from "@/features/dashboard/items/_types/type";

export const flattenMenu = (menu: Array<TMenu | string>) => {
  const map: Record<string, { label: string }> = {};

  const walk = (items: Array<TMenu | string>) => {
    items?.forEach((item) => {
      if (typeof item === "string") return;

      if (item.pathname) {
        map[item.pathname] = {
          label: item.label,
        };
      }

      if (item.subMenu) walk(item.subMenu);
    });
  };

  walk(menu);

  return map;
};

const mapBackendMenuToMenu = (menus: TBackendMenu[]): TMenu[] => {
  return menus?.map((item) => ({
    label: item.label,
    pathname: item.url ?? undefined,
    icon: (item.icon as TMenu["icon"]) ?? "Dot",
    subMenu: item.children?.length
      ? mapBackendMenuToMenu(item.children)
      : undefined,
  }));
};

export const menuContainer = (menus: TBackendMenu[]) => {
  if (!menus) return [];
  const menu: TMenu[] = [
    {
      icon: "LayoutDashboard",
      pathname: "/dashboard",
      label: "داشبورد",
    },
    ...mapBackendMenuToMenu(menus ?? []),
    {
      icon: "Headset",
      pathname: "/tickets",
      label: "تیکت",
    },
  ];

  return menu;
};
