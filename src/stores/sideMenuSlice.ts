import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import type { icons } from "../components/Lucide";

export interface Menu {
  icon: keyof typeof icons;
  title: string;
  badge?: number;
  pathname?: string;
  subMenu?: Menu[];
  ignore?: boolean;
}

export interface SideMenuState {
  menu: Array<Menu | string>;
}

const initialState: SideMenuState = {
  menu: [
    {
      icon: "LayoutDashboard",
      pathname: "/",
      title: "داشبورد",
    },
    {
      icon: "Shapes",
      pathname: "/service-category",
      title: "دسته‌بندی خدمات",
    },
    {
      icon: "Sparkles",
      pathname: "/services",
      title: "خدمات",
    },
    {
      icon: "Building2",
      pathname: "/facilities",
      title: "محل ارائه خدمات",
    },
    {
      icon: "MapPinHouse",
      pathname: "/resource-type",
      title: "نوع مکان",
    },
    {
      icon: "MapPin",
      pathname: "/resources",
      title: "مکان‌های مجموعه",
    },
    // {
    //   icon: "CalendarCheck",
    //   pathname: "/resource-availabilities",
    //   title: "مکان‌های در دسترس",
    // },
    {
      icon: "HeartHandshake",
      pathname: "/therapists",
      title: "درمانگر",
    },
    // {
    //   icon: "HandHeart",
    //   pathname: "/therapist-services",
    //   title: "خدمات درمانگر",
    // },
    // {
    //   icon: "AlarmClockCheck",
    //   pathname: "/therapist-availabilities",
    //   title: "درمانگر در دسترس",
    // },
    {
      icon: "UsersRound",
      pathname: "/customers",
      title: "مشتریان",
    },
    {
      icon: "CalendarClock",
      pathname: "/booking",
      title: "رزرو نوبت",
    },
  ],
};

export const sideMenuSlice = createSlice({
  name: "sideMenu",
  initialState,
  reducers: {},
});

export const selectSideMenu = (state: RootState) => state.sideMenu.menu;

export default sideMenuSlice.reducer;
export const flattenMenu = (menu: Array<Menu | string>) => {
  const map: Record<string, { title: string }> = {};

  const walk = (items: Array<Menu | string>) => {
    items.forEach((item) => {
      if (typeof item === "string") return;

      if (item.pathname) {
        map[item.pathname] = {
          title: item.title,
        };
      }

      if (item.subMenu) walk(item.subMenu);
    });
  };

  walk(menu);

  return map;
};
