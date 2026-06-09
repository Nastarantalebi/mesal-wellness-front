import type { TBackendMenu } from "@/features/dashboard/_types/types";

export const flattenMenu = (menu: Array<TBackendMenu | string>) => {
  const map: Record<string, { label: string }> = {};

  const walk = (items: Array<TBackendMenu | string>) => {
    items?.forEach((item) => {
      if (typeof item === "string") return;

      if (item.url) {
        map[item.url] = {
          label: item.label,
        };
      }

      if (item.children) walk(item.children);
    });
  };

  walk(menu);

  return map;
};

const mapBackendMenuToMenu = (menus: TBackendMenu[]): TBackendMenu[] => {
  return menus?.map((item) => ({
    label: item.label,
    url: item.url ?? null,
    icon: (item.icon as TBackendMenu["icon"]) ?? "Dot",
    children: item.children?.length
      ? mapBackendMenuToMenu(item.children)
      : undefined,
  }));
};

export const menuContainer = (menus: TBackendMenu[]) => {
  if (!menus) return [];
  const menu: TBackendMenu[] = [
    {
      icon: "LayoutDashboard",
      url: "/dashboard",
      label: "داشبورد",
    },
    ...mapBackendMenuToMenu(menus ?? []),
    {
      icon: "Headset",
      url: "/tickets",
      label: "پشتیبانی",
    },
  ];

  return menu;
};
