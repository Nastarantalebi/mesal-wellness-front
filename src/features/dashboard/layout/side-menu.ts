import type { NavigateFunction } from "react-router-dom";
import type { TBackendMenu } from "../_types/types";

interface Location {
  pathname: string;
  search: string;
  forceActiveMenu?: string;
}

export type FormattedMenu = Omit<TBackendMenu, "children"> & {
  active?: boolean;
  activeDropdown?: boolean;
  children?: FormattedMenu[]; // ✅ recursive: children are also FormattedMenu
};
// Setup side menu
const findActiveMenu = (
  subMenu: TBackendMenu[],
  location: Location,
): boolean => {
  let match = false;
  const customUrl = location.pathname.replace(/\/(create|edit|view)$/, "");
  subMenu.forEach((item) => {
    if (
      (location.forceActiveMenu !== undefined &&
        item.url === location.forceActiveMenu) ||
      (location.forceActiveMenu === undefined &&
        item.url === customUrl + location.search)
      //  &&!item.ignore
    ) {
      match = true;
    } else if (!match && item.children) {
      match = findActiveMenu(item.children, location);
    }
  });
  return match;
};
const nestedMenu = (menu: TBackendMenu[] | undefined, location: Location) => {
  const formattedMenu: Array<FormattedMenu | string> = [];
  const customUrl = location.pathname.replace(/\/(create|edit|view)$/, "");
  menu?.forEach((item) => {
    const menuItem: FormattedMenu = {
      ...item,
      children: undefined,
    };
    menuItem.active =
      (location.forceActiveMenu && item.url === location.forceActiveMenu) ||
      (!location.forceActiveMenu && item.url === customUrl + location.search) ||
      (item.children && findActiveMenu(item.children, location));
    // && !item.ignore;

    if (item.children) {
      menuItem.activeDropdown = findActiveMenu(item.children, location);
      menuItem.children = nestedMenu(item.children, location).filter(
        (i): i is FormattedMenu => typeof i !== "string",
      );
    }
    formattedMenu.push(menuItem);
  });

  return formattedMenu;
};

const linkTo = (menu: FormattedMenu, navigate: NavigateFunction) => {
  if (menu.children) {
    menu.activeDropdown = !menu.activeDropdown;
  } else {
    if (menu.url !== undefined) {
      navigate(menu.url || "");
    }
  }
};

const enter = () => {};
const leave = () => {};

export { nestedMenu, linkTo, enter, leave };
