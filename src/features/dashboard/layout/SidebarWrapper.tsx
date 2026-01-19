import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import {
  selectCompactMenu,
  setCompactMenu as setCompactMenuStore,
} from "../../../stores/compactMenuSlice";
import { useLocation } from "react-router-dom";
import { nestedMenu, type FormattedMenu } from "./side-menu";
import { mapBackendMenuToMenu } from "@/stores/menuMaper";
import type { TMenu } from "../items/_types/type";
import { useAuthStore } from "@/features/auth/_hooks/authStore";
import type { TSidebarMenu } from "../_types/types";

function SidebarWrapper() {
  const sidebar: TSidebarMenu = useAuthStore((state) => state.sidebar);
  const menus = sidebar.data.menus;
  const [compactMenuOnHover, setCompactMenuOnHover] = useState(false);
  const [activeMobileMenu, setActiveMobileMenu] = useState(false);
  const [formattedMenu, setFormattedMenu] = useState<
    Array<FormattedMenu | string>
  >([]);

  const location = useLocation();
  const compactMenu = useAppSelector(selectCompactMenu);
  const dispatch = useAppDispatch();
  const setCompactMenu = useCallback(
    (val: boolean) => {
      localStorage.setItem("compactMenu", val.toString());
      dispatch(setCompactMenuStore(val));
    },
    [dispatch]
  );

  const sideMenu = useCallback(() => {
    if (!menus) return [];
    const menu: TMenu[] = [
      {
        icon: "LayoutDashboard",
        pathname: "/",
        label: "داشبورد",
      },
      ...mapBackendMenuToMenu(menus),
    ];

    return nestedMenu(menu, location);
  }, [menus, location]);

  const compactLayout = useCallback(() => {
    if (window.innerWidth <= 1600) setCompactMenu(true);
  }, [setCompactMenu]);

  useEffect(() => {
    setFormattedMenu(sideMenu());
    compactLayout();
    window.addEventListener("resize", compactLayout);
    return () => window.removeEventListener("resize", compactLayout);
  }, [sideMenu, compactLayout]);

  return (
    <div
      className={clsx([
        "fixed top-0 start-0 z-50 h-screen side-menu group",
        { "side-menu--collapsed": compactMenu },
        { "side-menu--on-hover": compactMenuOnHover },
      ])}>
      {/* Close Button for Mobile */}
      {/* <div
        className={clsx([
          "fixed ms-[275px] w-10 h-10 items-center justify-center xl:hidden z-50",
          { flex: activeMobileMenu },
          { hidden: !activeMobileMenu },
        ])}
      >
        <a
          href=""
          onClick={(event) => {
            event.preventDefault();
            setActiveMobileMenu(false);
          }}
          className="mt-5 ms-5"
        >
          <Lucide icon="X" className="w-8 h-8 text-white" />
        </a>
      </div> */}

      {/* Top Bar */}
      <Topbar
        setActiveMobileMenu={setActiveMobileMenu}
        setCompactMenuOnHover={setCompactMenuOnHover}
        toggleCompactMenu={() => setCompactMenu(!compactMenu)}
      />
      {/* Sidebar */}
      <Sidebar
        setCompactMenuOnHover={setCompactMenuOnHover}
        activeMobileMenu={activeMobileMenu}
        setActiveMobileMenu={setActiveMobileMenu}
        formattedMenu={formattedMenu}
        setFormattedMenu={setFormattedMenu}
      />
    </div>
  );
}

export default SidebarWrapper;
