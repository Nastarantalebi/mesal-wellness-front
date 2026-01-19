import type { TBackendMenu } from "@/features/dashboard/_types/types";
import type { Menu } from "@/stores/sideMenuSlice";

export const mapBackendMenuToMenu = (menus: TBackendMenu[]): Menu[] => {
  return menus.map((item) => ({
    label: item.label,
    pathname: item.url ?? undefined,
    icon: (item.icon as Menu["icon"]) ?? "Dot",
    subMenu: item.children?.length
      ? mapBackendMenuToMenu(item.children)
      : undefined,
  }));
};
