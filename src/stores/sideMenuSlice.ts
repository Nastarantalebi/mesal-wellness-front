import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import type { icons } from "../components/Lucide";

export interface Menu {
  icon: keyof typeof icons;
  label: string;
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
      label: "داشبورد",
    },
    {
      icon: "Baseline",
      label: "اطلاعات پایه",
      subMenu: [
        {
          icon: "Shapes",
          pathname: "/service-category",
          label: "دسته‌بندی خدمات",
        },
        {
          icon: "Sparkles",
          pathname: "/services",
          label: "خدمات",
        },
        {
          icon: "Building2",
          pathname: "/facilities",
          label: "محل ارائه خدمات",
        },
        {
          icon: "MapPinHouse",
          pathname: "/resource-type",
          label: "نوع مکان",
        },
        {
          icon: "MapPin",
          pathname: "/resources",
          label: "مکان‌های مجموعه",
        },
        {
          icon: "Building2",
          pathname: "/company",
          label: "شرکت‌های طرف قرارداد",
        },
        {
          icon: "Handshake",
          pathname: "/contract",
          label: "قراردادها",
        },
      ],
    },

    {
      icon: "HeartHandshake",
      pathname: "/therapists",
      label: "ماساژیست",
    },
    {
      icon: "UsersRound",
      pathname: "/customers",
      label: "مشتریان",
    },
    {
      icon: "BriefcaseMedical",
      pathname: "/staff",
      label: "کارمندان",
    },
    {
      icon: "CalendarClock",
      pathname: "/booking",
      label: "لیست رزروها",
    },
    {
      icon: "CalendarCheck2",
      pathname: "/calendar",
      label: "نوبت‌های رزرو شده",
    },
    {
      icon: "Settings",
      label: "تنظیمات سامانه",
      subMenu: [
        {
          icon: "UserCog",
          pathname: "/roles",
          label: "مدیریت نقش‌ها",
        },
        {
          icon: "LayoutList",
          pathname: "/widgets",
          label: "مدیریت ویجت‌ها",
        },
        {
          icon: "SquareMenu",
          pathname: "/menus",
          label: "مدیریت منوها",
        },
        {
          icon: "ShieldCheck",
          pathname: "/permissions",
          label: "تعیین سطوح دسترسی",
        },
      ],
    },
    {
      icon: "Headset",
      pathname: "/tickets",
      label: "تیکت",
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
  const map: Record<string, { label: string }> = {};

  const walk = (items: Array<Menu | string>) => {
    items.forEach((item) => {
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
