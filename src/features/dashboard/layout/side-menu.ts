import type { NavigateFunction } from "react-router-dom";
import type { Menu } from "../../../stores/sideMenuSlice";

interface Location {
  pathname: string;
  search: string;
  forceActiveMenu?: string;
}

export interface FormattedMenu extends Menu {
  active?: boolean;
  activeDropdown?: boolean;
  subMenu?: FormattedMenu[];
}

// Setup side menu
const findActiveMenu = (subMenu: Menu[], location: Location): boolean => {
  let match = false;
  subMenu.forEach((item) => {
    if (
      ((location.forceActiveMenu !== undefined &&
        item.pathname === location.forceActiveMenu) ||
        (location.forceActiveMenu === undefined &&
          item.pathname === location.pathname + location.search)) &&
      !item.ignore
    ) {
      match = true;
    } else if (!match && item.subMenu) {
      match = findActiveMenu(item.subMenu, location);
    }
  });
  return match;
};
const nestedMenu = (menu: Menu[] | undefined, location: Location) => {
  const formattedMenu: Array<FormattedMenu | string> = [];
  menu?.forEach((item) => {
    const menuItem: FormattedMenu = {
      ...item,
      subMenu: undefined,
    };
    menuItem.active =
      ((location.forceActiveMenu &&
        item.pathname === location.forceActiveMenu) ||
        (!location.forceActiveMenu &&
          item.pathname === location.pathname + location.search) ||
        (item.subMenu && findActiveMenu(item.subMenu, location))) &&
      !item.ignore;

    if (item.subMenu) {
      menuItem.activeDropdown = findActiveMenu(item.subMenu, location);
      menuItem.subMenu = nestedMenu(item.subMenu, location).filter(
        (i): i is FormattedMenu => typeof i !== "string"
      );
    }
    formattedMenu.push(menuItem);
  });

  return formattedMenu;
};

const linkTo = (menu: FormattedMenu, navigate: NavigateFunction) => {
  if (menu.subMenu) {
    menu.activeDropdown = !menu.activeDropdown;
  } else {
    if (menu.pathname !== undefined) {
      navigate(menu.pathname);
    }
  }
};

const enter = () => {};
const leave = () => {};

export { nestedMenu, linkTo, enter, leave };
