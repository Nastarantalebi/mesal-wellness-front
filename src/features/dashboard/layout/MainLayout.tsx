import { Outlet } from "react-router-dom";
import { useAppSelector } from "../../../stores/hooks";
import { selectCompactMenu } from "../../../stores/compactMenuSlice";
import SidebarWrapper from "./SidebarWrapper";
import { clsx } from "clsx";
import { useState } from "react";
// import "../../../assets/css/themes/shuriken.css";

function MainLayout() {
  const [topBarActive, setTopBarActive] = useState(false);

  const compactMenu = useAppSelector(selectCompactMenu);

  window.onscroll = () => {
    // Topbar
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
      setTopBarActive(true);
    } else {
      setTopBarActive(false);
    }
  };

  return (
    <div
      className={clsx([
        "echo group bg-gradient-to-b from-slate-200/70 to-slate-50 background relative min-h-screen",
        "before:content-[''] before:h-[370px] before:w-screen before:bg-gradient-to-t before:from-theme-1/80 before:to-theme-2 [&.background--hidden]:before:opacity-0 before:transition-[opacity,height] before:ease-in-out before:duration-300 before:top-0 before:fixed",
        "after:content-[''] after:h-[370px] after:w-screen [&.background--hidden]:after:opacity-0 after:transition-[opacity,height] after:ease-in-out after:duration-300 after:top-0 after:fixed after:bg-texture-white after:bg-contain after:bg-fixed after:bg-[center_-13rem] after:bg-no-repeat",
        topBarActive && "background--hidden",
      ])}
    >
      <SidebarWrapper topBarActive={topBarActive} />

      <div
        className={clsx([
          "transition-[margin,width] duration-100 xl:ps-3.5 pt-[54px] pb-16 relative z-10 group mode",
          { "xl:ms-[275px]": !compactMenu },
          { "xl:ms-[91px]": compactMenu },
          { "mode--light": !topBarActive },
        ])}
      >
        <div className="px-5 mt-16">
          <div className="container">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
